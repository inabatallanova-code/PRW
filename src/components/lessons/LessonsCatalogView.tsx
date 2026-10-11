import React, { useState } from 'react';
import { Lesson, StudentLevel, InterfaceLang, UserRole } from '../../types/lesson';
import { COURSE_LESSONS_CATALOG } from '../../data/lessonsCatalog';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { getTranslation } from '../../i18n/translations';
import { 
  BookOpen, 
  Layers, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Edit3, 
  PlusCircle, 
  GraduationCap,
  Award,
  Lock,
  Unlock,
  ShieldCheck,
  AlertCircle,
  X
} from 'lucide-react';

interface LessonsCatalogViewProps {
  lessons: Lesson[];
  activeLessonId: string;
  studentLevel: StudentLevel;
  interfaceLang: InterfaceLang;
  userRole: UserRole;
  onSelectLesson: (lessonId: string) => void;
  onOpenTeacherPanel: () => void;
}

export const LessonsCatalogView: React.FC<LessonsCatalogViewProps> = ({
  lessons,
  activeLessonId,
  studentLevel,
  interfaceLang,
  userRole,
  onSelectLesson,
  onOpenTeacherPanel
}) => {
  const t = getTranslation(interfaceLang);
  const isAuthor = userRole === 'author';

  // State for re-rendering when author toggles permissions
  const [refreshKey, setRefreshKey] = useState(0);
  const [lockedModalLesson, setLockedModalLesson] = useState<Lesson | null>(null);

  const unlockMode = storage.getUnlockMode();

  const handleToggleLessonLock = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    storage.toggleLessonUnlock(lessonId);
    setRefreshKey(prev => prev + 1);
  };

  const handleUnlockAll = () => {
    sound.playSuccess();
    storage.unlockAllLessons();
    setRefreshKey(prev => prev + 1);
  };

  const handleLockLessons = () => {
    sound.playClick();
    storage.lockLessonsExceptFirst();
    setRefreshKey(prev => prev + 1);
  };

  const handleSetUnlockMode = (mode: 'author_manual' | 'completion_auto' | 'all_open') => {
    sound.playClick();
    storage.setUnlockMode(mode);
    setRefreshKey(prev => prev + 1);
  };

  const handleLessonClick = (lesson: Lesson, isUnlocked: boolean) => {
    if (isUnlocked || isAuthor) {
      sound.playSuccess();
      onSelectLesson(lesson.id);
    } else {
      sound.playError();
      setLockedModalLesson(lesson);
    }
  };

  return (
    <div key={refreshKey} className="space-y-6 animate-in fade-in duration-200">
      
      {/* Catalog Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              Curriculum Syllabus · 5 Units
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/20 font-mono">
              Level: {studentLevel}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
              Completed: {storage.getCompletedLessons().length} / {lessons.length}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.allLessonsTitle}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.allLessonsSubtitle}
          </p>
        </div>

        {/* Author Dominations Banner */}
        {isAuthor && (
          <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-indigo-300 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span><strong>Author Dominations:</strong> Inabat Allanova controls lesson availability for university students.</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleUnlockAll}
                  className="px-2.5 py-1 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Unlock className="w-3 h-3" />
                  <span>Unlock All 5 Units</span>
                </button>
                <button
                  onClick={handleLockLessons}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border border-slate-700"
                >
                  <Lock className="w-3 h-3" />
                  <span>Lock Units 2–5</span>
                </button>
                <button
                  onClick={onOpenTeacherPanel}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Author Studio</span>
                </button>
              </div>
            </div>

            {/* Unlock Policy Mode Selector */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <span className="font-semibold text-slate-300">Student Access Policy:</span>
              <button
                onClick={() => handleSetUnlockMode('author_manual')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  unlockMode === 'author_manual'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Manual Author Approval (Strict)
              </button>
              <span>·</span>
              <button
                onClick={() => handleSetUnlockMode('completion_auto')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  unlockMode === 'completion_auto'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Auto-Unlock on Lesson Completion
              </button>
              <span>·</span>
              <button
                onClick={() => handleSetUnlockMode('all_open')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  unlockMode === 'all_open'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Open for Study
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Grid of Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {lessons.map((lesson) => {
          const isActive = lesson.id === activeLessonId;
          const isCompleted = storage.isLessonCompleted(lesson.id);
          const isUnlocked = storage.isLessonUnlocked(lesson.id, userRole);
          const catalogInfo = COURSE_LESSONS_CATALOG.find(c => c.number === lesson.number);

          return (
            <div
              key={lesson.id}
              onClick={() => handleLessonClick(lesson, isUnlocked)}
              className={`rounded-2xl border transition-all p-5 sm:p-6 flex flex-col justify-between gap-4 cursor-pointer relative ${
                isActive
                  ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                  : isUnlocked
                  ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  : 'bg-slate-50/80 border-slate-200 opacity-90 hover:opacity-100 hover:border-amber-300'
              }`}
            >
              <div className="space-y-3">
                
                {/* Header row: Unit, Completion & Active/Lock status */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                      {catalogInfo?.unit || `Unit ${lesson.number}`}
                    </span>
                    {isCompleted && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Completed ✓
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    {isActive ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                        Active Unit
                      </span>
                    ) : isUnlocked ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 flex items-center gap-1">
                        <Unlock className="w-3 h-3 text-emerald-600" />
                        Available
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-600" />
                        Locked · Author Permission Required
                      </span>
                    )}
                  </div>
                </div>

                {/* Lesson Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                    <span>{lesson.number}. {lesson.title}</span>
                    {!isUnlocked && !isAuthor && (
                      <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {lesson.subtitle}
                  </p>
                </div>

                {/* Summary (En or Uz) */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {interfaceLang === 'uz' && catalogInfo?.summaryUz
                    ? catalogInfo.summaryUz
                    : catalogInfo?.summaryEn || 'Interactive vocabulary, timed reading comprehension, and structured writing missions.'}
                </p>

                {/* Core Vocabulary tags preview */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Target Vocabulary
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {lesson.vocabulary.slice(0, 5).map(v => (
                      <span
                        key={v.id}
                        className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-mono font-medium text-slate-700"
                      >
                        {v.word}
                      </span>
                    ))}
                    {lesson.vocabulary.length > 5 && (
                      <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-mono text-slate-400">
                        +{lesson.vocabulary.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom footer: Duration, XP & Switch/Unlock Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lesson.estimatedMinutes}m</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-indigo-600">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+{lesson.xpReward} XP</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Author Direct Unlock / Lock Toggle */}
                  {isAuthor && lesson.id !== 'lesson-1' && (
                    <button
                      onClick={(e) => handleToggleLessonLock(lesson.id, e)}
                      title={isUnlocked ? 'Lock this lesson for students' : 'Unlock this lesson for students'}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors ${
                        isUnlocked 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                      }`}
                    >
                      {isUnlocked ? <Unlock className="w-3 h-3 text-emerald-600" /> : <Lock className="w-3 h-3 text-amber-600" />}
                      <span>{isUnlocked ? 'Unlocked' : 'Locked'}</span>
                    </button>
                  )}

                  {isAuthor && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTeacherPanel();
                      }}
                      title="Edit this lesson in Author Studio"
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLessonClick(lesson, isUnlocked);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all text-xs flex items-center gap-1.5 ${
                      !isUnlocked && !isAuthor
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                        : isActive
                        ? 'bg-indigo-600 text-white shadow-xs hover:bg-indigo-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {!isUnlocked && !isAuthor ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>{interfaceLang === 'uz' ? 'Qulflangan' : 'Locked'}</span>
                      </>
                    ) : (
                      <>
                        <span>{isActive ? (interfaceLang === 'uz' ? 'O\'rganilmoqda' : 'Study Lesson') : (interfaceLang === 'uz' ? 'Darsni tanlash' : 'Select Lesson')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Locked Lesson Dialog for Learners */}
      {lockedModalLesson && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>{interfaceLang === 'uz' ? 'Dars qulflangan' : 'Lesson Access Restricted'}</span>
              </div>
              <button
                onClick={() => setLockedModalLesson(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <h4 className="text-sm font-bold text-slate-900">
                Unit {lockedModalLesson.number}: {lockedModalLesson.title}
              </h4>
              <p className="leading-relaxed">
                {interfaceLang === 'uz'
                  ? 'Ushbu dars hozirda muallif (Inabat Allanova) tomonidan qulflangan. Talabalar avval 1-darsni to\'liq tamomlashi yoki muallif ruxsat berishini kutishi kerak.'
                  : 'This lesson is currently locked. Your university instructor (Inabat Allanova) unlocks subsequent lessons after students complete previous units or upon course milestones.'}
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] space-y-1">
                <div className="font-semibold">How to unlock:</div>
                <div>1. Complete all vocabulary, reading, and writing tasks in Lesson 1.</div>
                <div>2. Or request your course instructor to grant access in the Author Panel.</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setLockedModalLesson(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                {interfaceLang === 'uz' ? 'Tushundim' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
