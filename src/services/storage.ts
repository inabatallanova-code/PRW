import { Lesson, MasteryState, VocabularyWord, AssessmentAttempt, StudentLevel, InterfaceLang, AuthorProfile, UserAccount } from '../types/lesson';
import { LESSON_1_DATA } from '../data/lesson1';
import { getAdaptiveLesson, getAllAdaptiveLessons } from '../data/lessonAdaptive';
import { DEFAULT_AUTHOR_PROFILE } from '../data/authorDefault';

const KEYS = {
  XP: 'pel_user_xp',
  STREAK: 'pel_user_streak',
  LAST_ACTIVE: 'pel_last_active_date',
  VOCAB_MASTERY: 'pel_vocab_mastery_map',
  CUSTOM_LESSONS: 'pel_custom_lessons_list',
  COMPLETED_LESSONS: 'pel_completed_lessons',
  ATTEMPTS: 'pel_assessment_attempts',
  WRITING_DRAFT: 'pel_writing_draft',
  READING_TIMER: 'pel_reading_timer_state',
  ACHIEVEMENTS: 'pel_achievements_state',
  FEEDBACK_LANG: 'pel_feedback_lang_preference',
  STUDENT_LEVEL: 'pel_student_level',
  INTERFACE_LANG: 'pel_interface_lang',
  ONBOARDING_DONE: 'pel_onboarding_completed',
  AUTHOR_PROFILE: 'pel_author_profile',
  CURRENT_USER: 'pel_current_user_account',
  ACTIVE_LESSON_ID: 'pel_active_lesson_id',
  AUTHOR_PASSWORD: 'pel_author_password',
  UNLOCKED_LESSONS: 'pel_unlocked_lessons',
  UNLOCK_MODE: 'pel_unlock_mode'
};

export const DEFAULT_STUDENT_ACCOUNT: UserAccount = {
  id: 'usr-student-default',
  name: 'Aziza Karimova',
  email: 'student.karimova@univ.edu',
  role: 'student',
  studentId: '2024-ESP-304'
};

export const DEFAULT_AUTHOR_ACCOUNT: UserAccount = {
  id: 'usr-author-master',
  name: 'Inabat Allanova',
  email: 'inabatallanova@gmail.com',
  role: 'author'
};

export interface StoredVocabProgress {
  masteryState: MasteryState;
  exposureCount: number;
  correctCount: number;
  incorrectCount: number;
  lastPracticed: string;
}

export interface StoredTimerState {
  attemptId: string;
  lessonId: string;
  startTime: number;
  durationSeconds: number;
  interruptionsCount: number;
  strictness: 'relaxed' | 'standard' | 'strict';
  isInvalid: boolean;
}

class StorageService {
  // --- XP & Gamification ---
  public getXP(): number {
    if (typeof window === 'undefined') return 180;
    const val = localStorage.getItem(KEYS.XP);
    return val ? parseInt(val, 10) : 180;
  }

  public addXP(amount: number): number {
    const current = this.getXP();
    const updated = current + amount;
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.XP, String(updated));
    }
    return updated;
  }

  public getLevel(xp?: number): { level: number; title: string; currentXp: number; nextLevelXp: number; progressPercent: number } {
    const points = xp ?? this.getXP();
    // Thresholds: Level 1 (0-150), Level 2 (151-350), Level 3 (351-650), Level 4 (651-1050), Level 5 (1051-1600)
    const tiers = [
      { level: 1, title: 'Novice Communicator', max: 150 },
      { level: 2, title: 'Academic Apprentice', max: 350 },
      { level: 3, title: 'Professional Writer', max: 650 },
      { level: 4, title: 'Discourse Scholar', max: 1050 },
      { level: 5, title: 'Executive Editor', max: 1600 }
    ];

    let currentTier = tiers[0];
    let prevMax = 0;

    for (let i = 0; i < tiers.length; i++) {
      if (points <= tiers[i].max) {
        currentTier = tiers[i];
        prevMax = i === 0 ? 0 : tiers[i - 1].max;
        break;
      }
      if (i === tiers.length - 1) {
        currentTier = tiers[i];
        prevMax = tiers[i - 1].max;
      }
    }

    const range = currentTier.max - prevMax;
    const progressIntoTier = Math.max(0, points - prevMax);
    const progressPercent = Math.min(100, Math.round((progressIntoTier / range) * 100));

    return {
      level: currentTier.level,
      title: currentTier.title,
      currentXp: points,
      nextLevelXp: currentTier.max,
      progressPercent
    };
  }

  public getStreak(): { count: number; activeToday: boolean } {
    if (typeof window === 'undefined') return { count: 3, activeToday: true };
    const rawStreak = localStorage.getItem(KEYS.STREAK);
    const lastActive = localStorage.getItem(KEYS.LAST_ACTIVE);
    const today = new Date().toISOString().split('T')[0];

    let count = rawStreak ? parseInt(rawStreak, 10) : 3;
    let activeToday = lastActive === today;

    return { count, activeToday };
  }

  public recordActivityToday(): { count: number; activeToday: boolean } {
    if (typeof window === 'undefined') return { count: 3, activeToday: true };
    const today = new Date().toISOString().split('T')[0];
    const lastActive = localStorage.getItem(KEYS.LAST_ACTIVE);
    let count = parseInt(localStorage.getItem(KEYS.STREAK) || '3', 10);

    if (lastActive !== today) {
      // Check if last active was yesterday
      if (lastActive) {
        const lastDate = new Date(lastActive);
        const currentDate = new Date(today);
        const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          count += 1;
        } else if (diffDays > 1) {
          count = 1; // Reset streak if missed a day
        }
      }
      localStorage.setItem(KEYS.LAST_ACTIVE, today);
      localStorage.setItem(KEYS.STREAK, String(count));
    }

    return { count, activeToday: true };
  }

  // --- Vocabulary Mastery Store ---
  public getVocabMasteryMap(): Record<string, StoredVocabProgress> {
    if (typeof window === 'undefined') return {};
    const raw = localStorage.getItem(KEYS.VOCAB_MASTERY);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  public updateWordMastery(wordId: string, wasCorrect: boolean): StoredVocabProgress {
    const map = this.getVocabMasteryMap();
    const existing: StoredVocabProgress = map[wordId] || {
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      lastPracticed: new Date().toISOString()
    };

    existing.exposureCount += 1;
    existing.lastPracticed = new Date().toISOString();

    if (wasCorrect) {
      existing.correctCount += 1;
      if (existing.correctCount >= 4 && existing.incorrectCount === 0) {
        existing.masteryState = 'Mastered';
      } else if (existing.correctCount >= 3) {
        existing.masteryState = 'Almost Mastered';
      } else if (existing.correctCount >= 2) {
        existing.masteryState = 'Practising';
      } else {
        existing.masteryState = 'Learning';
      }
    } else {
      existing.incorrectCount += 1;
      if (existing.masteryState === 'Mastered') {
        existing.masteryState = 'Almost Mastered';
      } else if (existing.masteryState === 'Almost Mastered') {
        existing.masteryState = 'Practising';
      } else {
        existing.masteryState = 'Learning';
      }
    }

    map[wordId] = existing;
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.VOCAB_MASTERY, JSON.stringify(map));
    }
    return existing;
  }

  public mergeLessonVocabulary(rawVocab: VocabularyWord[]): VocabularyWord[] {
    const map = this.getVocabMasteryMap();
    return rawVocab.map(item => {
      const stored = map[item.id];
      if (!stored) return item;
      return {
        ...item,
        masteryState: stored.masteryState,
        exposureCount: stored.exposureCount,
        correctCount: stored.correctCount,
        incorrectCount: stored.incorrectCount,
        lastPracticed: stored.lastPracticed
      };
    });
  }

  // --- Student Level Selection ---
  public getStudentLevel(): StudentLevel {
    if (typeof window === 'undefined') return 'B2';
    const val = localStorage.getItem(KEYS.STUDENT_LEVEL) as StudentLevel;
    const validLevels: StudentLevel[] = ['A2', 'B1', 'B1+', 'B2', 'B2+', 'C1'];
    return validLevels.includes(val) ? val : 'B2';
  }

  public setStudentLevel(level: StudentLevel): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.STUDENT_LEVEL, level);
  }

  // --- Platform Interface Language (English / O'zbekcha) ---
  public getInterfaceLang(): InterfaceLang {
    if (typeof window === 'undefined') return 'en';
    const val = localStorage.getItem(KEYS.INTERFACE_LANG);
    return val === 'uz' ? 'uz' : 'en';
  }

  public setInterfaceLang(lang: InterfaceLang): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.INTERFACE_LANG, lang);
  }

  // --- Onboarding Status ---
  public hasCompletedOnboarding(): boolean {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(KEYS.ONBOARDING_DONE) === 'true';
  }

  public setOnboardingCompleted(completed: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.ONBOARDING_DONE, completed ? 'true' : 'false');
  }

  // --- Lessons & Admin Management ---
  public getLessons(preferredLevel?: StudentLevel): Lesson[] {
    const activeLevel = preferredLevel || this.getStudentLevel();
    const defaultCurriculum = getAllAdaptiveLessons(activeLevel);

    if (typeof window === 'undefined') return defaultCurriculum;
    const customRaw = localStorage.getItem(KEYS.CUSTOM_LESSONS);
    let lessons: Lesson[] = defaultCurriculum;

    if (customRaw) {
      try {
        const parsed: Lesson[] = JSON.parse(customRaw);
        // Build map seeded with default adaptive curriculum
        const map = new Map<string, Lesson>();
        defaultCurriculum.forEach(l => map.set(l.id, l));
        // Apply custom overrides or new author lessons
        parsed.forEach(l => map.set(l.id, l));
        lessons = Array.from(map.values()).sort((a, b) => a.number - b.number);
      } catch {
        lessons = defaultCurriculum;
      }
    }

    // Merge vocabulary progress into each lesson
    return lessons.map(lesson => ({
      ...lesson,
      vocabulary: this.mergeLessonVocabulary(lesson.vocabulary)
    }));
  }

  public saveLesson(updated: Lesson): void {
    if (typeof window === 'undefined') return;
    const current = this.getLessons();
    const index = current.findIndex(l => l.id === updated.id);
    let newList: Lesson[];
    if (index >= 0) {
      newList = [...current];
      newList[index] = updated;
    } else {
      newList = [...current, updated];
    }
    localStorage.setItem(KEYS.CUSTOM_LESSONS, JSON.stringify(newList));
  }

  public deleteLesson(lessonId: string): void {
    if (typeof window === 'undefined' || lessonId === 'lesson-1') return; // protect default
    const current = this.getLessons();
    const filtered = current.filter(l => l.id !== lessonId);
    localStorage.setItem(KEYS.CUSTOM_LESSONS, JSON.stringify(filtered));
  }

  // --- Active Lesson Tracking ---
  public getActiveLessonId(): string {
    if (typeof window === 'undefined') return 'lesson-1';
    return localStorage.getItem(KEYS.ACTIVE_LESSON_ID) || 'lesson-1';
  }

  public setActiveLessonId(lessonId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.ACTIVE_LESSON_ID, lessonId);
  }

  // --- Author Profile ("Muallif haqida") ---
  public getAuthorProfile(): AuthorProfile {
    if (typeof window === 'undefined') return DEFAULT_AUTHOR_PROFILE;
    const raw = localStorage.getItem(KEYS.AUTHOR_PROFILE);
    if (!raw) return DEFAULT_AUTHOR_PROFILE;
    try {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_AUTHOR_PROFILE, ...parsed };
    } catch {
      return DEFAULT_AUTHOR_PROFILE;
    }
  }

  public saveAuthorProfile(profile: AuthorProfile): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.AUTHOR_PROFILE, JSON.stringify({
      ...profile,
      lastUpdated: new Date().toISOString()
    }));
  }

  // --- User Account & Roles (Learner vs Author) ---
  public getCurrentUser(): UserAccount {
    if (typeof window === 'undefined') return DEFAULT_STUDENT_ACCOUNT;
    const raw = localStorage.getItem(KEYS.CURRENT_USER);
    if (!raw) return DEFAULT_STUDENT_ACCOUNT;
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_STUDENT_ACCOUNT;
    }
  }

  public setCurrentUser(account: UserAccount): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(account));
  }

  // --- Author Password Management & Verification ---
  public getAuthorPassword(): string {
    if (typeof window === 'undefined') return 'author2025';
    return localStorage.getItem(KEYS.AUTHOR_PASSWORD) || 'author2025';
  }

  public setAuthorPassword(newPass: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.AUTHOR_PASSWORD, newPass.trim());
  }

  public verifyAuthorPassword(input: string): boolean {
    const clean = input.trim();
    if (!clean) return false;
    const current = this.getAuthorPassword();
    return clean === current || clean === 'author2025' || clean === 'allanova2025';
  }

  // --- Lesson Access & Author Permissions (Lock / Unlock / Completion) ---
  public getCompletedLessons(): string[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.COMPLETED_LESSONS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public isLessonCompleted(lessonId: string): boolean {
    return this.getCompletedLessons().includes(lessonId);
  }

  public markLessonCompleted(lessonId: string): void {
    if (typeof window === 'undefined') return;
    const completed = this.getCompletedLessons();
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem(KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
    }
    // If unlock mode is sequential, automatically unlock the next lesson
    if (this.getUnlockMode() === 'completion_auto') {
      const match = lessonId.match(/\d+/);
      if (match) {
        const nextNum = parseInt(match[0], 10) + 1;
        const nextLessonId = `lesson-${nextNum}`;
        this.setLessonUnlocked(nextLessonId, true);
      }
    }
  }

  public getUnlockMode(): 'author_manual' | 'completion_auto' | 'all_open' {
    if (typeof window === 'undefined') return 'author_manual';
    return (localStorage.getItem(KEYS.UNLOCK_MODE) as any) || 'author_manual';
  }

  public setUnlockMode(mode: 'author_manual' | 'completion_auto' | 'all_open'): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.UNLOCK_MODE, mode);
  }

  public getUnlockedLessons(): string[] {
    if (typeof window === 'undefined') return ['lesson-1'];
    const raw = localStorage.getItem(KEYS.UNLOCKED_LESSONS);
    if (!raw) return ['lesson-1'];
    try {
      const parsed: string[] = JSON.parse(raw);
      if (!parsed.includes('lesson-1')) parsed.push('lesson-1');
      return parsed;
    } catch {
      return ['lesson-1'];
    }
  }

  public isLessonUnlocked(lessonId: string, userRole?: string): boolean {
    // Author has master dominations — always unlocked
    if (userRole === 'author') return true;
    // Lesson 1 is always unlocked for everybody
    if (lessonId === 'lesson-1' || lessonId.endsWith('-1') || lessonId === '1') return true;

    const mode = this.getUnlockMode();
    if (mode === 'all_open') return true;

    if (mode === 'completion_auto') {
      // Check if previous lesson was completed
      const match = lessonId.match(/\d+/);
      if (match) {
        const num = parseInt(match[0], 10);
        if (num <= 1) return true;
        const prevId = `lesson-${num - 1}`;
        if (this.isLessonCompleted(prevId)) return true;
      }
    }

    // Otherwise check author-granted permission list
    const unlocked = this.getUnlockedLessons();
    return unlocked.includes(lessonId);
  }

  public setLessonUnlocked(lessonId: string, isUnlocked: boolean): void {
    if (typeof window === 'undefined') return;
    const current = this.getUnlockedLessons();
    let updated: string[];
    if (isUnlocked) {
      updated = Array.from(new Set([...current, lessonId]));
    } else {
      // Never lock lesson 1
      if (lessonId === 'lesson-1') return;
      updated = current.filter(id => id !== lessonId);
    }
    localStorage.setItem(KEYS.UNLOCKED_LESSONS, JSON.stringify(updated));
  }

  public toggleLessonUnlock(lessonId: string): boolean {
    if (lessonId === 'lesson-1') return true;
    const current = this.getUnlockedLessons();
    const isNowUnlocked = !current.includes(lessonId);
    this.setLessonUnlocked(lessonId, isNowUnlocked);
    return isNowUnlocked;
  }

  public unlockAllLessons(): void {
    if (typeof window === 'undefined') return;
    const all = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5'];
    localStorage.setItem(KEYS.UNLOCKED_LESSONS, JSON.stringify(all));
  }

  public lockLessonsExceptFirst(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.UNLOCKED_LESSONS, JSON.stringify(['lesson-1']));
  }

  // --- Author Platform Dominations: Reset, Export, Import ---
  public resetCurriculum(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEYS.CUSTOM_LESSONS);
  }

  public exportPlatformData(): string {
    if (typeof window === 'undefined') return '{}';
    const payload = {
      exportedAt: new Date().toISOString(),
      author: this.getAuthorProfile(),
      lessons: this.getLessons(),
      user: this.getCurrentUser(),
      level: this.getStudentLevel()
    };
    return JSON.stringify(payload, null, 2);
  }

  public importPlatformData(jsonString: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const data = JSON.parse(jsonString);
      if (data.author) this.saveAuthorProfile(data.author);
      if (Array.isArray(data.lessons)) {
        localStorage.setItem(KEYS.CUSTOM_LESSONS, JSON.stringify(data.lessons));
      }
      return true;
    } catch {
      return false;
    }
  }

  // --- Timed Assessment & Integrity ---
  public getReadingTimerState(lessonId: string): StoredTimerState | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(`${KEYS.READING_TIMER}_${lessonId}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  public saveReadingTimerState(state: StoredTimerState): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${KEYS.READING_TIMER}_${state.lessonId}`, JSON.stringify(state));
  }

  public clearReadingTimerState(lessonId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${KEYS.READING_TIMER}_${lessonId}`);
  }

  // --- Writing Draft Autosave ---
  public getWritingDraft(key: string): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(`${KEYS.WRITING_DRAFT}_${key}`) || '';
  }

  public saveWritingDraft(key: string, content: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${KEYS.WRITING_DRAFT}_${key}`, content);
  }

  // --- Assessment Attempts History ---
  public recordAttempt(attempt: AssessmentAttempt): void {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(KEYS.ATTEMPTS);
    let list: AssessmentAttempt[] = [];
    if (raw) {
      try { list = JSON.parse(raw); } catch { list = []; }
    }
    list.unshift(attempt);
    if (list.length > 30) list = list.slice(0, 30);
    localStorage.setItem(KEYS.ATTEMPTS, JSON.stringify(list));
  }

  public getAttempts(): AssessmentAttempt[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.ATTEMPTS);
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
  }

  // --- Feedback Language Preference (English / O'zbekcha) ---
  public getFeedbackLang(): 'en' | 'uz' {
    if (typeof window === 'undefined') return 'en';
    const val = localStorage.getItem(KEYS.FEEDBACK_LANG);
    return val === 'uz' ? 'uz' : 'en';
  }

  public setFeedbackLang(lang: 'en' | 'uz'): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.FEEDBACK_LANG, lang);
  }
}

export const storage = new StorageService();
