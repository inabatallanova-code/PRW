import React from 'react';
import { 
  BookOpen, 
  PenTool, 
  LayoutDashboard, 
  Layers, 
  Award, 
  BarChart3, 
  Volume2, 
  VolumeX, 
  UserCheck, 
  Sparkles, 
  Flame, 
  Globe, 
  ChevronDown,
  User,
  GraduationCap,
  ShieldCheck,
  List
} from 'lucide-react';
import { sound } from '../services/sound';
import { StudentLevel, InterfaceLang, UserAccount } from '../types/lesson';
import { getTranslation } from '../i18n/translations';

export type NavTab = 
  | 'dashboard' 
  | 'lessons-catalog'
  | 'lesson' 
  | 'vocabulary' 
  | 'reading' 
  | 'writing' 
  | 'grammar' 
  | 'progress' 
  | 'author'
  | 'teacher';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  xp: number;
  streak: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isTeacherMode: boolean;
  onToggleTeacherMode: () => void;
  studentLevel: StudentLevel;
  onOpenLevelModal: () => void;
  interfaceLang: InterfaceLang;
  onToggleInterfaceLang: () => void;
  activeLessonNumber?: number;
  currentUser: UserAccount;
  onOpenAccountModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  xp,
  streak,
  soundEnabled,
  onToggleSound,
  isTeacherMode,
  onToggleTeacherMode,
  studentLevel,
  onOpenLevelModal,
  interfaceLang,
  onToggleInterfaceLang,
  activeLessonNumber = 1,
  currentUser,
  onOpenAccountModal
}) => {
  const t = getTranslation(interfaceLang);
  const isAuthor = currentUser.role === 'author';

  return (
    <>
      {/* Desktop & Tablet Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single text element wordmark + Quick Level Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-indigo-700 transition-colors">
                PEL
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
                  Professional English Lab
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium whitespace-nowrap">
                  {t.appSubtitle}
                </span>
              </div>
            </button>

            {/* Clickable Level Selector Pill */}
            <button
              onClick={() => { sound.playClick(); onOpenLevelModal(); }}
              title={t.chooseLevelTitle}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all shadow-2xs"
            >
              <span className="font-mono">{studentLevel}</span>
              <ChevronDown className="w-3 h-3 text-indigo-500" />
            </button>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'dashboard' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.navDashboard}
            </button>

            {/* Lessons Catalog */}
            <button
              onClick={() => onSelectTab('lessons-catalog')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1 ${
                currentTab === 'lessons-catalog' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{t.navLessons} (5)</span>
            </button>

            {/* Current Active Lesson */}
            <button
              onClick={() => onSelectTab('lesson')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'lesson' 
                  ? 'bg-indigo-50 text-indigo-700 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{t.navLesson} {activeLessonNumber}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </button>

            <button
              onClick={() => onSelectTab('vocabulary')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'vocabulary' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.navVocabulary}
            </button>
            <button
              onClick={() => onSelectTab('reading')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'reading' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.navReading}
            </button>
            <button
              onClick={() => onSelectTab('writing')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'writing' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.navWriting}
            </button>
            <button
              onClick={() => onSelectTab('grammar')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'grammar' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.navGrammar}
            </button>

            {/* About Author Tab */}
            <button
              onClick={() => onSelectTab('author')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1 ${
                currentTab === 'author' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.navAboutAuthor}</span>
            </button>

            <button
              onClick={() => onSelectTab('progress')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                currentTab === 'progress' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.navProgress}
            </button>
          </nav>

          {/* Zone 3: 1 primary action area / user telemetry & account */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Interface Language Toggle */}
            <button
              onClick={() => { sound.playClick(); onToggleInterfaceLang(); }}
              title={t.interfaceLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{interfaceLang === 'en' ? 'EN' : 'UZ'}</span>
            </button>

            {/* Gamification indicators */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
              <span className="flex items-center gap-1 text-amber-600" title="Daily Learning Streak">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="tabular-nums">{streak}d</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-indigo-600" title="Academic Experience Points">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span className="tabular-nums">{xp} XP</span>
              </span>
            </div>

            {/* Audio toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute audio' : 'Enable audio'}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-100 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* User Account / Role Pill */}
            <button
              onClick={() => { sound.playClick(); onOpenAccountModal(); }}
              title={isAuthor ? 'Author Dominations Active' : 'Student Account'}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border ${
                isAuthor 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              {isAuthor ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-200" />
                  <span className="hidden sm:inline">Inabat A. (Author)</span>
                  <span className="sm:hidden">Author</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
                  <span className="sm:hidden">Profile</span>
                </>
              )}
            </button>

            {/* Teacher / Author Mode Toggle */}
            <button
              onClick={onToggleTeacherMode}
              title={isTeacherMode ? 'Exit Author Studio' : 'Enter Author Studio'}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 border ${
                isTeacherMode
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isTeacherMode ? (interfaceLang === 'uz' ? 'Muallif rejimi' : 'Author Mode') : (interfaceLang === 'uz' ? 'Studiyaga o\'tish' : 'Author Studio')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => { sound.playClick(); onSelectTab('dashboard'); }}
          className={`flex flex-col items-center py-1 px-1.5 rounded-md transition-colors ${
            currentTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">{t.navDashboard}</span>
        </button>

        <button
          onClick={() => { sound.playClick(); onSelectTab('lessons-catalog'); }}
          className={`flex flex-col items-center py-1 px-1.5 rounded-md transition-colors ${
            currentTab === 'lessons-catalog' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <List className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">{t.navLessons}</span>
        </button>

        <button
          onClick={() => { sound.playClick(); onSelectTab('lesson'); }}
          className={`flex flex-col items-center py-1 px-1.5 rounded-md transition-colors ${
            currentTab === 'lesson' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">{t.navLesson} {activeLessonNumber}</span>
        </button>

        <button
          onClick={() => { sound.playClick(); onSelectTab('vocabulary'); }}
          className={`flex flex-col items-center py-1 px-1.5 rounded-md transition-colors ${
            currentTab === 'vocabulary' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">{t.navVocabulary}</span>
        </button>

        <button
          onClick={() => { sound.playClick(); onSelectTab('writing'); }}
          className={`flex flex-col items-center py-1 px-1.5 rounded-md transition-colors ${
            currentTab === 'writing' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <PenTool className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">{t.navWriting}</span>
        </button>

        <button
          onClick={() => { sound.playClick(); onSelectTab('author'); }}
          className={`flex flex-col items-center py-1 px-1.5 rounded-md transition-colors ${
            currentTab === 'author' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">{interfaceLang === 'uz' ? 'Muallif' : 'Author'}</span>
        </button>
      </nav>
    </>
  );
};
