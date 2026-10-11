import React, { useState, useEffect, useRef } from 'react';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { Clock, Zap, RotateCcw, CheckCircle2, Award } from 'lucide-react';

interface TypingSprintProps {
  passageText: string;
  passageTitle: string;
  timeLimitSeconds?: number;
  onFinish?: (wpm: number, accuracy: number) => void;
}

export const TypingSprint: React.FC<TypingSprintProps> = ({
  passageText,
  passageTitle,
  timeLimitSeconds = 60,
  onFinish
}) => {
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(timeLimitSeconds);
  const [isFinished, setIsFinished] = useState(false);
  const [personalBest, setPersonalBest] = useState<number>(() => {
    if (typeof window === 'undefined') return 45;
    const val = localStorage.getItem('pel_typing_pb');
    return val ? parseInt(val, 10) : 45;
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);

  // Focus input when started
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleStart = () => {
    setUserInput('');
    setIsActive(true);
    setIsFinished(false);
    setSecondsLeft(timeLimitSeconds);
    startTimeRef.current = Date.now();
    sound.playSuccess();

    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleComplete = () => {
    setIsActive(false);
    setIsFinished(true);
    sound.playComplete();

    const stats = calculateStats();
    if (stats.wpm > personalBest) {
      setPersonalBest(stats.wpm);
      if (typeof window !== 'undefined') {
        localStorage.setItem('pel_typing_pb', String(stats.wpm));
      }
    }

    const earnedXP = Math.round(stats.wpm * 1.5);
    storage.addXP(earnedXP);

    if (onFinish) onFinish(stats.wpm, stats.accuracy);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive && !isFinished) {
      handleStart();
    }
    const val = e.target.value;
    setUserInput(val);

    // If student finished entire passage before timer expires
    if (val.trim() === passageText.trim()) {
      clearInterval(timerRef.current);
      handleComplete();
    }
  };

  const calculateStats = () => {
    const elapsedMinutes = (timeLimitSeconds - secondsLeft) / 60 || 1 / 60;
    const typedWords = userInput.trim().split(/\s+/).filter(Boolean).length;
    const wpm = Math.round(typedWords / elapsedMinutes) || 0;

    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === passageText[i]) {
        correctChars += 1;
      }
    }
    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;

    return { wpm, accuracy, characters: userInput.length, correctChars };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-2xl mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 mb-0.5">
            <Zap className="w-3.5 h-3.5" />
            <span>TIMED TYPING SPRINT</span>
            <span>·</span>
            <span className="tabular-nums">{timeLimitSeconds} SECONDS</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {passageTitle}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] text-slate-500 font-medium">Personal Best</div>
            <div className="text-xs font-bold text-slate-800 font-mono tabular-nums">
              {personalBest} WPM
            </div>
          </div>

          <div className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 ${
            secondsLeft <= 10 && isActive ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse' : 'bg-slate-100 text-slate-800'
          }`}>
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="tabular-nums text-sm">{secondsLeft}s</span>
          </div>
        </div>
      </div>

      {/* Target Passage Reference Box with live typing character feedback */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm font-mono leading-relaxed select-none">
        {passageText.split('').map((char, index) => {
          let charClass = 'text-slate-500';
          if (index < userInput.length) {
            if (userInput[index] === char) {
              charClass = 'text-emerald-700 bg-emerald-100 font-semibold';
            } else {
              charClass = 'text-rose-700 bg-rose-200 font-bold';
            }
          } else if (index === userInput.length && isActive) {
            charClass = 'bg-indigo-300 text-indigo-900 underline animate-pulse';
          }
          return (
            <span key={index} className={charClass}>
              {char}
            </span>
          );
        })}
      </div>

      {/* Typing Area */}
      {!isFinished ? (
        <div className="space-y-2">
          <textarea
            ref={inputRef}
            disabled={isFinished}
            value={userInput}
            onChange={handleInputChange}
            placeholder={isActive ? "Keep typing..." : "Type here to initiate the 60-second typing sprint..."}
            className="w-full h-28 p-3.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm font-mono text-slate-800 resize-none outline-none transition-all"
          />

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-4">
              <span>WPM: <strong className="text-slate-800 font-mono tabular-nums">{stats.wpm}</strong></span>
              <span>Accuracy: <strong className="text-slate-800 font-mono tabular-nums">{stats.accuracy}%</strong></span>
              <span>Chars: <strong className="text-slate-800 font-mono tabular-nums">{stats.characters}/{passageText.length}</strong></span>
            </div>

            {!isActive && (
              <button
                onClick={handleStart}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
              >
                Start Sprint
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Completion Results Card */
        <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-4 text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900">Sprint Complete!</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Fluency in typing professional academic prose improves written production velocity.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto text-left">
            <div className="bg-white p-3 rounded-lg border border-emerald-200">
              <span className="text-[11px] text-slate-500 block">Speed</span>
              <span className="text-lg font-bold text-indigo-700 font-mono tabular-nums">{stats.wpm}</span>
              <span className="text-[10px] text-slate-400 block">WPM</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-emerald-200">
              <span className="text-[11px] text-slate-500 block">Accuracy</span>
              <span className="text-lg font-bold text-emerald-700 font-mono tabular-nums">{stats.accuracy}%</span>
              <span className="text-[10px] text-slate-400 block">Correct</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-emerald-200">
              <span className="text-[11px] text-slate-500 block">XP Reward</span>
              <span className="text-lg font-bold text-amber-600 font-mono tabular-nums">+{Math.round(stats.wpm * 1.5)}</span>
              <span className="text-[10px] text-slate-400 block">XP</span>
            </div>
          </div>

          {stats.wpm >= personalBest && stats.wpm > 0 && (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              <Award className="w-3.5 h-3.5" />
              <span>New Personal Best Recorded!</span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Sprint</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
