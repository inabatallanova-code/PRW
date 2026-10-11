import React, { useState } from 'react';
import { WritingActivity } from '../../types/lesson';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  PenTool, 
  Shuffle, 
  Check 
} from 'lucide-react';

interface WritingPrepProps {
  activities: WritingActivity[];
  onCompleteAll?: () => void;
}

export const WritingPrep: React.FC<WritingPrepProps> = ({
  activities,
  onCompleteAll
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentActivity = activities[currentIndex] || activities[0];

  // Sentence Builder tokens state
  const [builderTokens, setBuilderTokens] = useState<string[]>(() => {
    return Array.isArray(currentActivity.initialState) ? [...currentActivity.initialState] : [];
  });
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  // Fix Sentence / Option selection state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Feedback state
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; xp: number } | null>(null);

  // Reset states when changing activity
  const loadActivity = (index: number) => {
    setCurrentIndex(index);
    setSelectedOption(null);
    setFeedback(null);
    const act = activities[index];
    if (act && Array.isArray(act.initialState)) {
      setBuilderTokens([...act.initialState]);
      setSelectedTokens([]);
    }
  };

  // Sentence Builder handler: Add token to student's constructed sequence
  const handleAddToken = (token: string, idx: number) => {
    sound.playClick();
    setSelectedTokens(prev => [...prev, token]);
    setBuilderTokens(prev => prev.filter((_, i) => i !== idx));
  };

  // Sentence Builder handler: Return token back to available pool
  const handleRemoveToken = (token: string, idx: number) => {
    sound.playClick();
    setBuilderTokens(prev => [...prev, token]);
    setSelectedTokens(prev => prev.filter((_, i) => i !== idx));
  };

  // Check Sentence Builder
  const handleCheckBuilder = () => {
    const solution = Array.isArray(currentActivity.solution) 
      ? currentActivity.solution 
      : [currentActivity.solution];

    const isMatch = selectedTokens.length === solution.length && 
      selectedTokens.every((val, i) => val.trim().toLowerCase() === solution[i].trim().toLowerCase());

    if (isMatch) {
      sound.playSuccess();
      const earnedXP = 20;
      storage.addXP(earnedXP);
      setFeedback({
        isCorrect: true,
        message: currentActivity.explanation,
        xp: earnedXP
      });
    } else {
      sound.playError();
      setFeedback({
        isCorrect: false,
        message: 'The grammatical sequence needs adjustment. Notice how academic syntax organizes subject, predicate, and purpose clause.',
        xp: 0
      });
    }
  };

  // Check multiple choice / classification
  const handleCheckOption = (option: string) => {
    if (feedback !== null) return;
    setSelectedOption(option);

    const isMatch = option.trim().toLowerCase() === (currentActivity.solution as string).trim().toLowerCase();

    if (isMatch) {
      sound.playSuccess();
      const earnedXP = 20;
      storage.addXP(earnedXP);
      setFeedback({
        isCorrect: true,
        message: currentActivity.explanation,
        xp: earnedXP
      });
    } else {
      sound.playError();
      setFeedback({
        isCorrect: false,
        message: `Incorrect. In academic writing, we seek formal precision and unambiguous register. ${currentActivity.explanation}`,
        xp: 0
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < activities.length - 1) {
      loadActivity(currentIndex + 1);
    } else if (onCompleteAll) {
      onCompleteAll();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
        <div>
          <span className="font-bold text-indigo-600">WRITING PREPARATION</span>
          <span className="text-slate-400 mx-1.5">·</span>
          <span className="text-slate-500 font-medium">Activity {currentIndex + 1} of {activities.length}</span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-amber-600">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+20 XP</span>
        </div>
      </div>

      {/* Activity Title and Context */}
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          {currentActivity.title}
        </h3>
        <p className="text-xs text-slate-600">
          {currentActivity.instruction}
        </p>
        <div className="p-3 bg-slate-50 rounded-lg text-xs font-serif italic text-slate-800 border border-slate-100 mt-2">
          {currentActivity.contextPrompt}
        </div>
      </div>

      {/* TYPE 1: SENTENCE BUILDER */}
      {currentActivity.type === 'sentence-builder' && (
        <div className="space-y-4">
          {/* Construction Dropzone */}
          <div className="min-h-24 p-3.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 flex flex-wrap gap-2 items-center">
            {selectedTokens.length === 0 ? (
              <span className="text-xs text-slate-400 italic">
                Tap words below to arrange them into an academic sentence...
              </span>
            ) : (
              selectedTokens.map((token, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveToken(token, idx)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors shadow-xs flex items-center gap-1"
                >
                  <span>{token}</span>
                  <span className="text-indigo-200 text-[10px]">✕</span>
                </button>
              ))
            )}
          </div>

          {/* Available Word Bank */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Word Bank:</span>
            <div className="flex flex-wrap gap-2">
              {builderTokens.map((token, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddToken(token, idx)}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-800 rounded-lg text-xs font-medium transition-all shadow-2xs"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>

          {selectedTokens.length > 0 && feedback === null && (
            <div className="flex justify-end">
              <button
                onClick={handleCheckBuilder}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Check Sentence</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TYPE 2, 3, 4, 5: MULTIPLE CHOICE REGISTER UPGRADES */}
      {currentActivity.type !== 'sentence-builder' && (
        <div className="space-y-2.5">
          {/* Options list */}
          {[
            currentActivity.solution as string,
            currentActivity.type === 'fix-sentence' 
              ? 'The project guys got plenty of good numbers that proved things are way better.' 
              : currentActivity.type === 'formal-informal' 
              ? 'Let\'s check out these results before we put that new policy into play.' 
              : currentActivity.type === 'vocab-upgrade'
              ? 'compromise'
              : 'furthermore'
          ].sort(() => 0.5 - Math.random()).map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentActivity.solution;

            let style = 'border-slate-200 hover:border-indigo-400 bg-white text-slate-800';
            if (feedback !== null) {
              if (isCorrect) {
                style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
              } else if (isSelected && !isCorrect) {
                style = 'border-rose-300 bg-rose-50 text-rose-950 line-through';
              } else {
                style = 'border-slate-200 opacity-50 bg-slate-50 text-slate-600';
              }
            }

            return (
              <button
                key={idx}
                disabled={feedback !== null}
                onClick={() => handleCheckOption(opt)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${style}`}
              >
                <span>{opt}</span>
                {feedback !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                {feedback !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Immediate Feedback Banner */}
      {feedback && (
        <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
          feedback.isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
        }`}>
          <div className="text-xs space-y-0.5">
            <div className="font-bold flex items-center gap-1.5">
              {feedback.isCorrect ? '✓ Well Done!' : '✗ Let\'s Review'}
              {feedback.isCorrect && <span className="text-emerald-700 font-mono">+{feedback.xp} XP</span>}
            </div>
            <div className="text-slate-700">{feedback.message}</div>
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>{currentIndex < activities.length - 1 ? 'Next' : 'Finish Prep'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
