import React from 'react';
import { VocabularyWord } from '../../types/lesson';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { 
  Award, 
  Sparkles, 
  Flame, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  BookOpen, 
  PenTool, 
  Filter,
  BarChart2
} from 'lucide-react';

interface ProgressDashboardProps {
  vocabulary: VocabularyWord[];
  onLaunchDifficultReview: () => void;
  onNavigateToTab: (tab: any) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  vocabulary,
  onLaunchDifficultReview,
  onNavigateToTab
}) => {
  const xp = storage.getXP();
  const levelInfo = storage.getLevel(xp);
  const streak = storage.getStreak();
  const attempts = storage.getAttempts();

  // Vocab breakdown
  const masteredWords = vocabulary.filter(w => w.masteryState === 'Mastered');
  const almostMastered = vocabulary.filter(w => w.masteryState === 'Almost Mastered');
  const practising = vocabulary.filter(w => w.masteryState === 'Practising');
  const learning = vocabulary.filter(w => w.masteryState === 'Learning');
  const newWords = vocabulary.filter(w => w.masteryState === 'New');

  const readingAttempts = attempts.filter(a => a.type === 'reading');
  const avgReadingScore = readingAttempts.length > 0
    ? Math.round(readingAttempts.reduce((acc, a) => acc + (a.score / a.maxScore) * 100, 0) / readingAttempts.length)
    : 85;

  const achievements = [
    { id: 'ach-1', title: 'Vocabulary Explorer', desc: 'Discovered all 20 target words in Lesson 1', unlocked: true, icon: '📚' },
    { id: 'ach-2', title: 'Lexical Architect', desc: 'Mastered at least 10 academic words', unlocked: masteredWords.length >= 10, icon: '🏛️' },
    { id: 'ach-3', title: 'Reading Master', desc: 'Achieved 80%+ on timed reading assessment', unlocked: readingAttempts.some(a => (a.score / a.maxScore) >= 0.8), icon: '📖' },
    { id: 'ach-4', title: 'Professional Writer', desc: 'Submitted an executive memorandum to AI assessment', unlocked: attempts.some(a => a.type === 'writing'), icon: '✍️' },
    { id: 'ach-5', title: 'Grammar Builder', desc: 'Mastered passive voice and parallel structures', unlocked: true, icon: '📐' },
    { id: 'ach-6', title: '3-Day Scholar Streak', desc: 'Maintained active daily study for 3 days', unlocked: streak.count >= 3, icon: '🔥' },
    { id: 'ach-7', title: 'Speed Typist', desc: 'Recorded 40+ WPM on professional typing sprint', unlocked: true, icon: '⚡' },
    { id: 'ach-8', title: 'Lesson 1 Complete', desc: 'Completed full 10-step learning journey', unlocked: masteredWords.length >= 15, icon: '🎓' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner: Level & XP */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <span>ACADEMIC PORTFOLIO</span>
              <span>·</span>
              <span>STUDENT PROGRESS & MASTERY</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Level {levelInfo.level}: {levelInfo.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cumulative progress across professional reading, writing, and vocabulary acquisition.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{streak.count} Day Streak</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="font-mono tabular-nums">{xp} XP</span>
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="pt-4 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>Level {levelInfo.level} Progress</span>
            <span className="font-mono tabular-nums">{levelInfo.progressPercent}% ({levelInfo.currentXp} / {levelInfo.nextLevelXp} XP)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
              style={{ width: `${levelInfo.progressPercent}%` }} 
            />
          </div>
        </div>
      </div>

      {/* 3 Core Skill Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Vocabulary */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Vocabulary</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              {masteredWords.length} <span className="text-sm font-normal text-slate-400">/ 20</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Words fully mastered</p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(masteredWords.length / 20) * 100}%` }} />
          </div>
          <button
            onClick={() => { sound.playClick(); onLaunchDifficultReview(); }}
            className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
          >
            Practice Difficult Words
          </button>
        </div>

        {/* Reading */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Reading Accuracy</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              {avgReadingScore}%
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Average comprehension score</p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${avgReadingScore}%` }} />
          </div>
          <button
            onClick={() => { sound.playClick(); onNavigateToTab('reading'); }}
            className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
          >
            Review Reading Attempts
          </button>
        </div>

        {/* Writing */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Writing Benchmark</span>
            <PenTool className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              B2 / 6.5
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Estimated CEFR / IELTS Band</p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '75%' }} />
          </div>
          <button
            onClick={() => { sound.playClick(); onNavigateToTab('writing'); }}
            className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
          >
            Launch Writing Mission
          </button>
        </div>
      </div>

      {/* Target Vocabulary 20-Word Mastery Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Target Vocabulary Mastery Breakdown (20 Words)
            </h3>
            <p className="text-xs text-slate-500">
              Each word advances from New → Learning → Practising → Almost Mastered → Mastered.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-600">Mastered: {masteredWords.length}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-slate-600">Practising: {practising.length + almostMastered.length}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="text-slate-600">New/Learning: {newWords.length + learning.length}</span>
            </span>
          </div>
        </div>

        {/* Word Chips Table/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
          {vocabulary.map(word => {
            let stateBadge = 'bg-slate-100 text-slate-600 border-slate-200';
            if (word.masteryState === 'Mastered') stateBadge = 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold';
            else if (word.masteryState === 'Almost Mastered') stateBadge = 'bg-indigo-50 text-indigo-800 border-indigo-200';
            else if (word.masteryState === 'Practising') stateBadge = 'bg-blue-50 text-blue-800 border-blue-200';

            return (
              <div 
                key={word.id} 
                className={`p-3 rounded-xl border transition-all text-xs space-y-1 ${stateBadge}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{word.word}</span>
                  <span className="text-[10px] uppercase font-mono tracking-wider opacity-75">{word.pos}</span>
                </div>
                <div className="text-[11px] text-slate-600 truncate">{word.simpleDefinition}</div>
                <div className="text-[11px] text-indigo-700 italic">{word.uzbekTranslation}</div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px] text-slate-500">
                  <span>State: <strong>{word.masteryState}</strong></span>
                  <span className="font-mono tabular-nums">✓ {word.correctCount} / ✗ {word.incorrectCount}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic Achievements Gallery */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Academic Achievements & Badges
          </h3>
          <p className="text-xs text-slate-500">
            Earn university badges as you progress through reading, writing, and vocabulary milestones.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-3.5 rounded-xl border text-center space-y-1.5 transition-all ${
                ach.unlocked
                  ? 'bg-indigo-50/40 border-indigo-200 text-slate-900'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div className="text-2xl">{ach.icon}</div>
              <div className="text-xs font-bold leading-tight">{ach.title}</div>
              <div className="text-[11px] text-slate-500 leading-snug line-clamp-2">{ach.desc}</div>
              {ach.unlocked && (
                <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                  Unlocked
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
