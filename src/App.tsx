import React, { useState, useEffect } from 'react';
import { Navigation, NavTab } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { LessonJourney } from './components/lesson/LessonJourney';
import { LessonsCatalogView } from './components/lessons/LessonsCatalogView';
import { AuthorSection } from './components/author/AuthorSection';
import { AccountModal } from './components/account/AccountModal';
import { VocabularyExperience } from './components/vocabulary/VocabularyExperience';
import { ReadingExperience } from './components/reading/ReadingExperience';
import { WritingEditor } from './components/writing/WritingEditor';
import { TypingSprint } from './components/writing/TypingSprint';
import { WritingPrep } from './components/writing/WritingPrep';
import { AIFeedbackView } from './components/writing/AIFeedbackView';
import { GrammarModule } from './components/grammar/GrammarModule';
import { ProgressDashboard } from './components/progress/ProgressDashboard';
import { TeacherAdminPanel } from './components/teacher/TeacherAdminPanel';
import { LevelSelectorModal } from './components/LevelSelectorModal';
import { OnboardingModal } from './components/OnboardingModal';
import { storage } from './services/storage';
import { sound } from './services/sound';
import { Lesson, AIAssessmentResponse, StudentLevel, InterfaceLang, UserAccount } from './types/lesson';
import { getTranslation, LEVEL_DESCRIPTORS } from './i18n/translations';
import { PenTool, Zap, CheckSquare, Sparkles, X } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [studentLevel, setStudentLevel] = useState<StudentLevel>(() => storage.getStudentLevel());
  const [interfaceLang, setInterfaceLang] = useState<InterfaceLang>(() => storage.getInterfaceLang());
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => storage.getCurrentUser());
  const [lessons, setLessons] = useState<Lesson[]>(() => storage.getLessons(storage.getStudentLevel()));
  const [activeLesson, setActiveLesson] = useState<Lesson>(() => {
    const activeId = storage.getActiveLessonId();
    const all = storage.getLessons(storage.getStudentLevel());
    return all.find(l => l.id === activeId) || all[0];
  });
  const [xp, setXp] = useState<number>(() => storage.getXP());
  const [streak, setStreak] = useState<number>(() => storage.getStreak().count);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.isEnabled());
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(() => storage.getCurrentUser().role === 'author');

  // Modals
  const [isLevelModalOpen, setIsLevelModalOpen] = useState<boolean>(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => !storage.hasCompletedOnboarding());
  const [levelToastMessage, setLevelToastMessage] = useState<string | null>(null);

  // Writing tab sub-view
  const [writingSubView, setWritingSubView] = useState<'editor' | 'sprint' | 'prep' | 'feedback'>('editor');
  const [writingAssessment, setWritingAssessment] = useState<AIAssessmentResponse | null>(null);
  const [studentWritingDraft, setStudentWritingDraft] = useState<string>('');

  const t = getTranslation(interfaceLang);

  // Daily streak activity record on mount
  useEffect(() => {
    const updated = storage.recordActivityToday();
    setStreak(updated.count);
  }, []);

  // Sync state helper
  const refreshProgress = (customLevel?: StudentLevel) => {
    const lvl = customLevel || studentLevel;
    setXp(storage.getXP());
    setStreak(storage.getStreak().count);
    const updatedLessons = storage.getLessons(lvl);
    setLessons(updatedLessons);
    const activeId = storage.getActiveLessonId();
    const current = updatedLessons.find(l => l.id === activeId) || updatedLessons[0];
    setActiveLesson(current);
  };

  const handleSelectLesson = (lessonId: string) => {
    storage.setActiveLessonId(lessonId);
    const found = lessons.find(l => l.id === lessonId);
    if (found) {
      setActiveLesson(found);
    }
    handleSelectTab('lesson');
  };

  const handleLevelChange = (newLevel: StudentLevel) => {
    setStudentLevel(newLevel);
    storage.setStudentLevel(newLevel);
    refreshProgress(newLevel);

    const desc = LEVEL_DESCRIPTORS[newLevel];
    const message = interfaceLang === 'uz'
      ? `${t.levelChangedToast} ${newLevel} (${desc.nameUz}).`
      : `${t.levelChangedToast} ${newLevel} (${desc.nameEn}).`;

    setLevelToastMessage(message);
    setTimeout(() => {
      setLevelToastMessage(null);
    }, 4500);
  };

  const handleToggleInterfaceLang = () => {
    const nextLang: InterfaceLang = interfaceLang === 'en' ? 'uz' : 'en';
    setInterfaceLang(nextLang);
    storage.setInterfaceLang(nextLang);
  };

  const handleOnboardingComplete = (level: StudentLevel, lang: InterfaceLang) => {
    storage.setOnboardingCompleted(true);
    setIsOnboardingOpen(false);
    setStudentLevel(level);
    storage.setStudentLevel(level);
    setInterfaceLang(lang);
    storage.setInterfaceLang(lang);
    refreshProgress(level);
  };

  const handleToggleSound = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
  };

  const handleToggleTeacherMode = () => {
    sound.playClick();
    if (currentUser.role !== 'author') {
      setIsAccountModalOpen(true);
      return;
    }
    const next = !isTeacherMode;
    setIsTeacherMode(next);
    if (next) {
      setCurrentTab('teacher');
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleSelectTab = (tab: NavTab) => {
    sound.playClick();
    if (tab === 'teacher' && currentUser.role !== 'author') {
      setIsAccountModalOpen(true);
      return;
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessmentDone = (result: AIAssessmentResponse, draft: string) => {
    setWritingAssessment(result);
    setStudentWritingDraft(draft);
    setWritingSubView('feedback');
    refreshProgress();
  };

  const handleUserChange = (updatedUser: UserAccount) => {
    setCurrentUser(updatedUser);
    setIsTeacherMode(updatedUser.role === 'author');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Level Adapted Notification Toast */}
      {levelToastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 text-xs flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="font-medium">{levelToastMessage}</span>
          <button
            onClick={() => setLevelToastMessage(null)}
            className="text-slate-400 hover:text-white ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Header & Mobile Bottom Bar */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        xp={xp}
        streak={streak}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isTeacherMode={isTeacherMode}
        onToggleTeacherMode={handleToggleTeacherMode}
        studentLevel={studentLevel}
        onOpenLevelModal={() => setIsLevelModalOpen(true)}
        interfaceLang={interfaceLang}
        onToggleInterfaceLang={handleToggleInterfaceLang}
        activeLessonNumber={activeLesson.number}
        currentUser={currentUser}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-12">
        {/* TAB 1: DASHBOARD */}
        {currentTab === 'dashboard' && (
          <Dashboard
            currentLesson={activeLesson}
            allLessons={lessons}
            onSelectTab={handleSelectTab}
            onStartLessonJourney={() => handleSelectTab('lesson')}
            onLaunchDifficultReview={() => handleSelectTab('vocabulary')}
            studentLevel={studentLevel}
            onOpenLevelModal={() => setIsLevelModalOpen(true)}
            interfaceLang={interfaceLang}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {/* TAB 2: ALL LESSONS CATALOG (Finding Lesson 2, 3, 4, 5...) */}
        {currentTab === 'lessons-catalog' && (
          <LessonsCatalogView
            lessons={lessons}
            activeLessonId={activeLesson.id}
            studentLevel={studentLevel}
            interfaceLang={interfaceLang}
            userRole={currentUser.role}
            onSelectLesson={handleSelectLesson}
            onOpenTeacherPanel={() => handleSelectTab('teacher')}
          />
        )}

        {/* TAB 3: LESSON JOURNEY */}
        {currentTab === 'lesson' && (
          <LessonJourney
            lesson={activeLesson}
            onLessonComplete={() => {
              storage.markLessonCompleted(activeLesson.id);
              refreshProgress();
              handleSelectTab('dashboard');
            }}
            onNavigateTab={handleSelectTab}
            onOpenLessonsCatalog={() => handleSelectTab('lessons-catalog')}
          />
        )}

        {/* TAB 4: ABOUT THE AUTHOR (Inabat Allanova) */}
        {currentTab === 'author' && (
          <AuthorSection
            interfaceLang={interfaceLang}
            userRole={currentUser.role}
            onOpenAuthorStudio={() => handleSelectTab('teacher')}
            onNavigateToLessons={() => handleSelectTab('lessons-catalog')}
          />
        )}

        {/* TAB 5: VOCABULARY LAB */}
        {currentTab === 'vocabulary' && (
          <VocabularyExperience
            vocabulary={activeLesson.vocabulary}
            onWordMasteryChange={() => refreshProgress()}
            onLaunchReading={() => handleSelectTab('reading')}
            onLaunchWriting={() => handleSelectTab('writing')}
          />
        )}

        {/* TAB 6: READING COMPREHENSION */}
        {currentTab === 'reading' && (
          <ReadingExperience
            passage={activeLesson.reading}
            questions={activeLesson.readingQuestions}
            targetVocabulary={activeLesson.vocabulary}
            onComplete={() => refreshProgress()}
            onLaunchWriting={() => handleSelectTab('writing')}
          />
        )}

        {/* TAB 7: WRITING LAB */}
        {currentTab === 'writing' && (
          <div className="space-y-6">
            {/* Writing Hub Sub-Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-xs flex items-center justify-center gap-1.5 max-w-md mx-auto">
              <button
                onClick={() => { sound.playClick(); setWritingSubView('editor'); }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  writingSubView === 'editor' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Mission ({studentLevel})</span>
              </button>

              <button
                onClick={() => { sound.playClick(); setWritingSubView('prep'); }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  writingSubView === 'prep' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Preparation</span>
              </button>

              <button
                onClick={() => { sound.playClick(); setWritingSubView('sprint'); }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  writingSubView === 'sprint' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Typing Sprint</span>
              </button>
            </div>

            {/* Sub-view switcher */}
            {writingSubView === 'editor' && (
              <WritingEditor
                task={activeLesson.finalWritingTask}
                allLessonVocab={activeLesson.vocabulary}
                onAssessmentReceived={handleAssessmentDone}
              />
            )}

            {writingSubView === 'prep' && (
              <WritingPrep
                activities={activeLesson.writingActivities}
                onCompleteAll={() => setWritingSubView('editor')}
              />
            )}

            {writingSubView === 'sprint' && (
              <TypingSprint
                passageText={activeLesson.typingSprintPassage.text}
                passageTitle={activeLesson.typingSprintPassage.title}
                timeLimitSeconds={activeLesson.typingSprintPassage.timeLimitSeconds}
                onFinish={() => refreshProgress()}
              />
            )}

            {writingSubView === 'feedback' && writingAssessment && (
              <AIFeedbackView
                assessment={writingAssessment}
                studentDraft={studentWritingDraft}
                onInitiateRewrite={() => setWritingSubView('editor')}
                onNavigateToPractice={(actionId) => handleSelectTab(actionId as any)}
              />
            )}
          </div>
        )}

        {/* TAB 8: GRAMMAR */}
        {currentTab === 'grammar' && (
          <GrammarModule
            activities={activeLesson.grammarActivities}
            onCompleteAll={() => handleSelectTab('dashboard')}
          />
        )}

        {/* TAB 9: PROGRESS & ACHIEVEMENTS */}
        {currentTab === 'progress' && (
          <ProgressDashboard
            vocabulary={activeLesson.vocabulary}
            onLaunchDifficultReview={() => handleSelectTab('vocabulary')}
            onNavigateToTab={handleSelectTab}
          />
        )}

        {/* TAB 10: TEACHER / AUTHOR MASTER PANEL */}
        {currentTab === 'teacher' && (
          <TeacherAdminPanel
            lessons={lessons}
            onLessonsChange={() => refreshProgress()}
            onSelectLessonToPreview={(l) => {
              setActiveLesson(l);
              storage.setActiveLessonId(l.id);
              setCurrentTab('lesson');
            }}
          />
        )}
      </main>

      {/* Level Selector Modal */}
      <LevelSelectorModal
        isOpen={isLevelModalOpen}
        onClose={() => setIsLevelModalOpen(false)}
        currentLevel={studentLevel}
        onSelectLevel={handleLevelChange}
        interfaceLang={interfaceLang}
      />

      {/* Account & Author Dominations Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        currentUser={currentUser}
        onUserChange={handleUserChange}
        interfaceLang={interfaceLang}
        studentLevel={studentLevel}
        onOpenTeacherPanel={() => {
          setIsAccountModalOpen(false);
          handleSelectTab('teacher');
        }}
      />

      {/* First-Time Onboarding Flow */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={handleOnboardingComplete}
      />

      {/* Footer */}
      <footer className="hidden lg:block border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Professional English Lab</span>
            <span>·</span>
            <span>{t.appSubtitle}</span>
            <span>·</span>
            <button
              onClick={() => handleSelectTab('author')}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Author: Inabat Allanova
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Adaptive Level: <strong>{studentLevel}</strong></span>
            <span>·</span>
            <span>Active Unit: <strong>Lesson {activeLesson.number}</strong></span>
            <span>·</span>
            <span>Interface: <strong>{interfaceLang.toUpperCase()}</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
