import React from 'react';
import { Lesson, StudentLevel, InterfaceLang } from '../types/lesson';
import { storage } from '../services/storage';
import { sound } from '../services/sound';
import { NavTab } from './Navigation';
import { LEVEL_DESCRIPTORS, getTranslation } from '../i18n/translations';
import { COURSE_LESSONS_CATALOG } from '../data/lessonsCatalog';
import { 
  BookOpen, 
  Layers, 
  PenTool, 
  Award, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Brain,
  SlidersHorizontal,
  GraduationCap,
  List,
  CheckCircle2,
  Clock,
  Lock,
  Unlock
} from 'lucide-react';

interface DashboardProps {
  currentLesson: Lesson;
  allLessons: Lesson[];
  onSelectTab: (tab: NavTab) => void;
  onStartLessonJourney: () => void;
  onLaunchDifficultReview: () => void;
  studentLevel: StudentLevel;
  onOpenLevelModal: () => void;
  interfaceLang: InterfaceLang;
  onSelectLesson: (lessonId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentLesson,
  allLessons,
  onSelectTab,
  onStartLessonJourney,
  onLaunchDifficultReview,
  studentLevel,
  onOpenLevelModal,
  interfaceLang,
  onSelectLesson
}) => {
  const t = getTranslation(interfaceLang);
  const xp = storage.getXP();
  const streak = storage.getStreak();
  const levelInfo = storage.getLevel(xp);
  const attempts = storage.getAttempts();
  const levelDescriptor = LEVEL_DESCRIPTORS[studentLevel];
  const author = storage.getAuthorProfile();

  const masteredCount = currentLesson.vocabulary.filter(w => w.masteryState === 'Mastered').length;
  const progressPercent = Math.min(100, Math.round((masteredCount / currentLesson.vocabulary.length) * 100));

  return (
    <div className="space-y-7 max-w-5xl mx-auto">
      
      {/* 1. SIMPLIFIED FIRST SCREEN HERO */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Top line: Greeting & Student Level Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {t.welcomeStudent}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-slate-500">{t.yourCurrentLevel}:</span>
              <button
                onClick={() => { sound.playClick(); onOpenLevelModal(); }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
              >
                <span className="font-mono">{studentLevel}</span>
                <span>—</span>
                <span className="font-medium">
                  {interfaceLang === 'uz' ? levelDescriptor.nameUz : levelDescriptor.nameEn}
                </span>
                <SlidersHorizontal className="w-3 h-3 ml-0.5 text-indigo-500" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{streak.count} {t.streakDays}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{xp} {t.xpPoints}</span>
            </div>
          </div>
        </div>

        {/* Current Lesson Hero Focus */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                {t.currentLessonLabel} {currentLesson.number}
              </span>
              <button
                onClick={() => { sound.playClick(); onSelectTab('lessons-catalog'); }}
                className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 underline"
              >
                ({interfaceLang === 'uz' ? 'Darsni o\'zgartirish' : 'Switch lesson'})
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {currentLesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {currentLesson.subtitle}
            </p>
            <div className="text-xs text-slate-500 flex items-center gap-3 pt-1">
              <span>{currentLesson.vocabulary.length} {t.wordsCount}</span>
              <span>·</span>
              <span>{currentLesson.reading.wordCount} words reading</span>
              <span>·</span>
              <span>Adapted to <strong>{studentLevel}</strong></span>
            </div>
          </div>

          {/* Continue Button + Progress */}
          <div className="flex flex-col items-start md:items-end justify-center gap-3 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                onStartLessonJourney();
              }}
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2.5 group"
            >
              <span>{t.continueLessonBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Progress Bar */}
            <div className="w-full md:w-56 space-y-1">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>{t.lessonProgress}</span>
                <span className="font-mono tabular-nums font-bold text-slate-800">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.max(15, progressPercent)}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COURSE CURRICULUM & LESSONS EXPLORER (Quick access to Lessons 1, 2, 3, 4, 5) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {t.allLessonsTitle}
            </h3>
          </div>
          <button
            onClick={() => { sound.playClick(); onSelectTab('lessons-catalog'); }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
          >
            <span>{interfaceLang === 'uz' ? 'Barcha 5 darsni ko\'rish' : 'View All 5 Units'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allLessons.map((l) => {
            const isCurrent = l.id === currentLesson.id;
            const isCompleted = storage.isLessonCompleted(l.id);
            const currentUser = storage.getCurrentUser();
            const isUnlocked = storage.isLessonUnlocked(l.id, currentUser.role);

            return (
              <div
                key={l.id}
                onClick={() => {
                  if (isUnlocked || currentUser.role === 'author') {
                    sound.playSuccess();
                    onSelectLesson(l.id);
                  } else {
                    sound.playError();
                    onSelectTab('lessons-catalog');
                  }
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                  isCurrent
                    ? 'bg-indigo-50/70 border-indigo-400 ring-1 ring-indigo-400/40 shadow-xs'
                    : isUnlocked
                    ? 'bg-slate-50 hover:bg-white hover:border-slate-300'
                    : 'bg-slate-100/80 border-slate-200 opacity-80 hover:opacity-100 hover:border-amber-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="text-indigo-600">Unit {l.number}</span>
                      {isCompleted && (
                        <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Done
                        </span>
                      )}
                    </div>
                    {isCurrent ? (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[9px]">
                        Active
                      </span>
                    ) : !isUnlocked ? (
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" />
                        Locked
                      </span>
                    ) : (
                      <span className="text-slate-400">{l.estimatedMinutes}m</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1 flex items-center gap-1">
                    <span>{l.title}</span>
                    {!isUnlocked && currentUser.role !== 'author' && (
                      <Lock className="w-3 h-3 text-amber-600 shrink-0" />
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {l.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-600 pt-2 border-t border-slate-200/60">
                  <span>+{l.xpReward} XP</span>
                  <span className="flex items-center gap-1">
                    {isCurrent ? (
                      interfaceLang === 'uz' ? 'O\'qilmoqda' : 'In Progress'
                    ) : !isUnlocked && currentUser.role !== 'author' ? (
                      <span className="text-amber-700 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        {interfaceLang === 'uz' ? 'Ruxsat kerak' : 'Permission needed'}
                      </span>
                    ) : (
                      interfaceLang === 'uz' ? 'Tanlash' : 'Select'
                    )}
                    {(isUnlocked || currentUser.role === 'author') && <ArrowRight className="w-3 h-3" />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. VISUAL SECTION CARDS / CATEGORIES */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          {t.whatToPractise}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Vocabulary */}
          <div 
            onClick={() => { sound.playClick(); onSelectTab('vocabulary'); }}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                📚
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {t.cardVocabTitle}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.cardVocabDesc}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>{masteredCount} / {currentLesson.vocabulary.length} {t.mastered}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Academic Reading */}
          <div 
            onClick={() => { sound.playClick(); onSelectTab('reading'); }}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl">
                📖
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {t.cardReadingTitle}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.cardReadingDesc}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>{currentLesson.reading.wordCount} words · {currentLesson.readingQuestions.length} Qs</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Professional Writing */}
          <div 
            onClick={() => { sound.playClick(); onSelectTab('writing'); }}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl">
                ✍️
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                {t.cardWritingTitle}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.cardWritingDesc}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
              <span>AI CEFR Evaluation</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Grammar for Writing */}
          <div 
            onClick={() => { sound.playClick(); onSelectTab('grammar'); }}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xl">
                🧩
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                {t.cardGrammarTitle}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.cardGrammarDesc}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700">
              <span>{currentLesson.grammarActivities.length} Academic Drills</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Student Progress */}
          <div 
            onClick={() => { sound.playClick(); onSelectTab('progress'); }}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl">
                📈
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {t.cardProgressTitle}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.cardProgressDesc}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700">
              <span>Level {levelInfo.level} · {levelInfo.title}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Spaced Recall (Practice Difficult Words) */}
          <div 
            onClick={() => { sound.playClick(); onLaunchDifficultReview(); }}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-rose-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center text-xl">
                🎯
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                {t.practiceDifficultWords}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Target non-mastered words using spaced repetition challenges.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-700">
              <span>{currentLesson.vocabulary.length - masteredCount} words need review</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. MEET COURSE AUTHOR SECTION */}
      <div 
        onClick={() => { sound.playClick(); onSelectTab('author'); }}
        className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xs cursor-pointer hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-xl shrink-0 group-hover:bg-white/20 transition-colors">
            IA
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold block">
              {t.meetAuthorTitle}
            </span>
            <h4 className="text-lg font-bold text-white mt-0.5">
              {author.name}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-1">
              {author.title} · {author.institution}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 group-hover:text-white transition-colors">
          <span>{interfaceLang === 'uz' ? 'Muallif haqida to\'liq ma\'lumot' : 'View Author Profile & Message'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 5. QUIET HISTORICAL RECENT RESULTS */}
      {attempts.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Recent Assessment Activity
          </h4>
          <div className="space-y-2">
            {attempts.slice(0, 2).map((att) => (
              <div 
                key={att.id} 
                className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900 capitalize">{att.type} Assessment</span>
                  <span className="text-slate-400 mx-2">·</span>
                  <span className="text-slate-500">{new Date(att.startedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-indigo-700">
                    {att.score} / {att.maxScore} pts
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    att.isValid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {att.isValid ? 'Valid' : 'Invalidated'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
