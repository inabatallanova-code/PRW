import React, { useState } from 'react';
import { GrammarActivity } from '../../types/lesson';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  FileCheck2,
  Info
} from 'lucide-react';

interface GrammarModuleProps {
  activities: GrammarActivity[];
  onCompleteAll?: () => void;
}

export const GrammarModule: React.FC<GrammarModuleProps> = ({
  activities,
  onCompleteAll
}) => {
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; rule: string; xp: number } | null>(null);

  const currentActivity = activities[selectedActivityIndex] || activities[0];
  const currentQ = currentActivity.questions[currentQuestionIndex] || currentActivity.questions[0];

  const handleSelectOption = (opt: string) => {
    if (feedback !== null) return;
    setSelectedOption(opt);

    const isMatch = opt === currentQ.correctAnswer;
    if (isMatch) {
      sound.playSuccess();
      const earnedXP = 20;
      storage.addXP(earnedXP);
      setFeedback({
        isCorrect: true,
        message: currentQ.explanation,
        rule: currentQ.academicRule,
        xp: earnedXP
      });
    } else {
      sound.playError();
      setFeedback({
        isCorrect: false,
        message: currentQ.explanation,
        rule: currentQ.academicRule,
        xp: 0
      });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setFeedback(null);

    if (currentQuestionIndex < currentActivity.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (selectedActivityIndex < activities.length - 1) {
      setSelectedActivityIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else if (onCompleteAll) {
      onCompleteAll();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
            <span>GRAMMAR FOR PROFESSIONAL WRITING</span>
            <span>·</span>
            <span>ACADEMIC SYNTAX</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {currentActivity.title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {currentActivity.objective}
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {activities.map((act, idx) => (
            <button
              key={act.id}
              onClick={() => {
                sound.playClick();
                setSelectedActivityIndex(idx);
                setCurrentQuestionIndex(0);
                setSelectedOption(null);
                setFeedback(null);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                idx === selectedActivityIndex
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Drill {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Grammar Rule Summary Callout */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 block mb-0.5">Academic Grammar Rule:</strong>
          {currentActivity.ruleSummary}
        </div>
      </div>

      {/* Question Card */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
          <span>Question {currentQuestionIndex + 1} of {currentActivity.questions.length}</span>
          <span className="font-semibold text-amber-600 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+20 XP</span>
          </span>
        </div>

        <div className="text-sm font-semibold text-slate-900 leading-snug">
          {currentQ.prompt}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentQ.correctAnswer;

            let optStyle = 'border-slate-200 hover:border-indigo-400 bg-white text-slate-800';
            if (feedback !== null) {
              if (isCorrect) {
                optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
              } else if (isSelected && !isCorrect) {
                optStyle = 'border-rose-300 bg-rose-50 text-rose-950 line-through';
              } else {
                optStyle = 'border-slate-200 opacity-50 bg-slate-50 text-slate-600';
              }
            }

            return (
              <button
                key={idx}
                disabled={feedback !== null}
                onClick={() => handleSelectOption(opt)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-2.5 ${optStyle}`}
              >
                <div className="flex items-start gap-2">
                  <span className="font-mono text-slate-400 font-bold shrink-0">{idx + 1}.</span>
                  <span className="leading-snug">{opt}</span>
                </div>
                {feedback !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {feedback !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback */}
        {feedback && (
          <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
            feedback.isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="font-bold flex items-center justify-between">
              <span>{feedback.isCorrect ? '✓ Correct Syntactic Choice!' : '✗ Let\'s Analyze the Syntax'}</span>
              {feedback.isCorrect && <span className="text-emerald-700 font-mono">+{feedback.xp} XP</span>}
            </div>
            <div className="text-slate-700 leading-relaxed">{feedback.message}</div>
            <div className="text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-200/60">
              Guideline: {feedback.rule}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
