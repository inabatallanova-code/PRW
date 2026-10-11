import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ReadingPassage, ReadingQuestion, VocabularyWord } from '../../types/lesson';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ShieldAlert, 
  RotateCcw, 
  Sparkles,
  BookOpen,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ReadingExperienceProps {
  passage: ReadingPassage;
  questions: ReadingQuestion[];
  targetVocabulary: VocabularyWord[];
  onComplete?: (score: number, maxScore: number) => void;
  onLaunchWriting?: () => void;
}

export const ReadingExperience: React.FC<ReadingExperienceProps> = ({
  passage,
  questions,
  targetVocabulary,
  onComplete,
  onLaunchWriting
}) => {
  // Timer & Integrity state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(passage.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [attemptId, setAttemptId] = useState<string>('');
  const [integrityMode, setIntegrityMode] = useState<'relaxed' | 'standard' | 'strict'>('standard');
  const [interruptionsCount, setInterruptionsCount] = useState<number>(0);
  const [isInvalidated, setIsInvalidated] = useState<boolean>(false);
  const [warningModalMessage, setWarningModalMessage] = useState<string | null>(null);

  // Question answering state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<boolean>(false);

  // Tooltip for vocabulary in text
  const [hoveredVocab, setHoveredVocab] = useState<VocabularyWord | null>(null);

  const startTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<any>(null);

  // Initialize or restore persistent timer and attempt
  useEffect(() => {
    const existing = storage.getReadingTimerState(passage.id);
    const now = Date.now();

    if (existing) {
      setAttemptId(existing.attemptId);
      setIntegrityMode(existing.strictness);
      setInterruptionsCount(existing.interruptionsCount);
      setIsInvalidated(existing.isInvalid);

      const elapsedSeconds = Math.floor((now - existing.startTime) / 1000);
      const remaining = Math.max(0, existing.durationSeconds - elapsedSeconds);
      setSecondsRemaining(remaining);
      startTimeRef.current = existing.startTime;

      if (remaining === 0) {
        handleAutoSubmit();
      }
    } else {
      const newAttemptId = `read-att-${Date.now()}`;
      setAttemptId(newAttemptId);
      startTimeRef.current = now;
      storage.saveReadingTimerState({
        attemptId: newAttemptId,
        lessonId: passage.id,
        startTime: now,
        durationSeconds: passage.timeLimitMinutes * 60,
        interruptionsCount: 0,
        strictness: integrityMode,
        isInvalid: false
      });
    }
  }, [passage.id]);

  // Real-time countdown based on elapsed timestamp
  useEffect(() => {
    if (isSubmitted || isInvalidated) return;

    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      const totalDuration = passage.timeLimitMinutes * 60;
      const left = Math.max(0, totalDuration - elapsed);

      setSecondsRemaining(left);

      if (left <= 0) {
        clearInterval(timerIntervalRef.current);
        handleAutoSubmit();
      }
    }, 1000);

    return () => clearInterval(timerIntervalRef.current);
  }, [isSubmitted, isInvalidated, passage.timeLimitMinutes]);

  // Assessment Integrity: Detect browser visibility and window focus changes
  useEffect(() => {
    if (isSubmitted || isInvalidated) return;

    const handleVisibilityOrBlur = () => {
      if (document.hidden) {
        setInterruptionsCount(prev => {
          const nextCount = prev + 1;
          sound.playError();

          // Update stored state
          storage.saveReadingTimerState({
            attemptId,
            lessonId: passage.id,
            startTime: startTimeRef.current,
            durationSeconds: passage.timeLimitMinutes * 60,
            interruptionsCount: nextCount,
            strictness: integrityMode,
            isInvalid: integrityMode === 'strict' && nextCount >= 3
          });

          if (integrityMode === 'strict' && nextCount >= 3) {
            setIsInvalidated(true);
            setWarningModalMessage('Attempt Invalidated: Strict assessment integrity limit reached (3 browser window focus losses detected). A fresh attempt is required under examination conditions.');
          } else if (nextCount === 1) {
            setWarningModalMessage('Assessment Integrity Notice (Warning 1/3): Browser window focus loss detected. Please remain focused on the reading tab during timed assessments.');
          } else if (nextCount === 2) {
            setWarningModalMessage('Urgent Integrity Warning (Warning 2/3): Multiple window focus shifts recorded. Another interruption will invalidate your test under Strict integrity rules.');
          }

          return nextCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityOrBlur);
    window.addEventListener('blur', handleVisibilityOrBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityOrBlur);
      window.removeEventListener('blur', handleVisibilityOrBlur);
    };
  }, [isSubmitted, isInvalidated, attemptId, integrityMode, passage.id, passage.timeLimitMinutes]);

  const handleSelectAnswer = (questionId: string, answer: string) => {
    if (submittedAnswers) return;
    sound.playClick();
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleAutoSubmit = () => {
    setSubmittedAnswers(true);
    setIsSubmitted(true);
    storage.clearReadingTimerState(passage.id);
    sound.playComplete();
  };

  const handleSubmitAssessment = () => {
    sound.playComplete();
    setSubmittedAnswers(true);
    setIsSubmitted(true);
    storage.clearReadingTimerState(passage.id);

    // Calculate score
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const earnedXP = Math.round((correctCount / questions.length) * 150) + 50;
    storage.addXP(earnedXP);

    storage.recordAttempt({
      id: attemptId || `att-${Date.now()}`,
      lessonId: passage.id,
      type: 'reading',
      startedAt: new Date(startTimeRef.current).toISOString(),
      completedAt: new Date().toISOString(),
      score: correctCount,
      maxScore: questions.length,
      timeSpentSeconds: Math.floor((Date.now() - startTimeRef.current) / 1000),
      integrityMode,
      interruptionsCount,
      isValid: !isInvalidated
    });

    if (onComplete) onComplete(correctCount, questions.length);
  };

  const handleRestartAttempt = () => {
    storage.clearReadingTimerState(passage.id);
    setSelectedAnswers({});
    setSubmittedAnswers(false);
    setIsSubmitted(false);
    setIsInvalidated(false);
    setInterruptionsCount(0);
    setWarningModalMessage(null);
    setCurrentQuestionIndex(0);
    const now = Date.now();
    startTimeRef.current = now;
    const newAttemptId = `read-att-${now}`;
    setAttemptId(newAttemptId);
    setSecondsRemaining(passage.timeLimitMinutes * 60);

    storage.saveReadingTimerState({
      attemptId: newAttemptId,
      lessonId: passage.id,
      startTime: now,
      durationSeconds: passage.timeLimitMinutes * 60,
      interruptionsCount: 0,
      strictness: integrityMode,
      isInvalid: false
    });
  };

  // Format time remaining
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Current Question
  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  // Calculate results if submitted
  const scoreStats = useMemo(() => {
    if (!submittedAnswers) return null;
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct += 1;
    });
    const percentage = Math.round((correct / questions.length) * 100);
    return { correct, total: questions.length, percentage };
  }, [submittedAnswers, questions, selectedAnswers]);

  return (
    <div className="space-y-6">
      {/* Integrity Warning Modal */}
      {warningModalMessage && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Integrity Alert</h4>
                <p className="text-xs text-slate-500">Browser Focus Monitor</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {warningModalMessage}
            </p>

            <div className="bg-slate-50 rounded-lg p-2.5 text-[11px] text-slate-500 border border-slate-100">
              *Note: Only browser tab visibility and window focus events are logged to maintain examination integrity.
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setWarningModalMessage(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Return to Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Control Bar: Countdown Timer, Integrity Mode, Progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-bold ${
            secondsRemaining < 180 ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse' : 'bg-slate-100 text-slate-800'
          }`}>
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="tabular-nums text-sm">{timeFormatted}</span>
          </div>

          <div className="text-xs text-slate-500">
            <span>Questions: </span>
            <span className="font-semibold text-slate-900 tabular-nums">{answeredCount}/{questions.length}</span>
          </div>
        </div>

        {/* Integrity Mode Selector & Interruption audit */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 hidden sm:inline">Mode:</span>
            <select
              disabled={isSubmitted}
              value={integrityMode}
              onChange={(e) => setIntegrityMode(e.target.value as any)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none"
            >
              <option value="relaxed">Relaxed (Unlimited focus shifts)</option>
              <option value="standard">Standard (Warning on blur)</option>
              <option value="strict">Strict (3 warnings invalidate)</option>
            </select>
          </div>

          {interruptionsCount > 0 && (
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              {interruptionsCount} {interruptionsCount === 1 ? 'focus shift' : 'focus shifts'}
            </span>
          )}

          {!isSubmitted && (
            <button
              onClick={handleSubmitAssessment}
              disabled={answeredCount === 0}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              Submit Attempt
            </button>
          )}
        </div>
      </div>

      {/* Invalidated state notice */}
      {isInvalidated && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-center justify-between gap-4">
          <div>
            <div className="font-bold flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Assessment Invalidated Under Strict Integrity Policy</span>
            </div>
            <div className="mt-0.5 text-rose-700">
              Multiple browser focus shifts were logged. Please start a fresh assessment attempt without navigating away.
            </div>
          </div>
          <button
            onClick={handleRestartAttempt}
            className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
          >
            Restart Assessment
          </button>
        </div>
      )}

      {/* Main Two-Zone Reading Interface (Desktop Split, Mobile Stacked) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Zone: Academic Reading Passage (600+ words) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 max-h-[750px] overflow-y-auto">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
              <span>ACADEMIC READING PASSAGE</span>
              <span>·</span>
              <span className="tabular-nums font-mono">{passage.wordCount} words</span>
              <span>·</span>
              <span>Paragraphs 1–5</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {passage.title}
            </h3>
          </div>

          {/* Interactive Paragraphs */}
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
            {passage.paragraphs.map(para => (
              <div key={para.id} className="space-y-1.5 relative group">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-sm">
                    Paragraph {para.number}
                  </span>
                  {para.heading && (
                    <span className="text-xs font-semibold text-slate-500">
                      {para.heading}
                    </span>
                  )}
                </div>
                
                {/* Paragraph Text with Target Vocabulary Recognition */}
                <p className="text-slate-800 text-[13.5px] leading-relaxed">
                  {para.text}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-100 flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Target vocabulary words are integrated throughout paragraphs 1 to 5 to model academic collocations.</span>
          </div>
        </div>

        {/* Right Zone: Interactive Questions & Comprehension Deck */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Question Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
              <div className="flex items-center gap-1.5 font-medium text-slate-600">
                <span>Question</span>
                <span className="font-bold text-slate-900 tabular-nums">{currentQuestionIndex + 1}</span>
                <span>of</span>
                <span className="tabular-nums">{questions.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-sm">
                  Paragraph {currentQ.paragraphRef}
                </span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                  {currentQ.type}
                </span>
              </div>
            </div>

            {/* Prompt */}
            <div className="text-sm font-semibold text-slate-900 leading-snug">
              {currentQ.prompt}
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === opt;
                let optStyle = 'border-slate-200 hover:border-indigo-400 bg-white text-slate-800';

                if (isSelected) {
                  optStyle = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-xs';
                }

                if (submittedAnswers) {
                  if (opt === currentQ.correctAnswer) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                  } else if (isSelected && opt !== currentQ.correctAnswer) {
                    optStyle = 'border-rose-300 bg-rose-50 text-rose-950 line-through';
                  } else {
                    optStyle = 'border-slate-200 opacity-60 bg-slate-50 text-slate-600';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={submittedAnswers}
                    onClick={() => handleSelectAnswer(currentQ.id, opt)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${optStyle}`}
                  >
                    <span className="font-mono text-slate-400 shrink-0 font-bold">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation (Shown only after submission) */}
            {submittedAnswers && (
              <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                selectedAnswers[currentQ.id] === currentQ.correctAnswer
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="font-bold flex items-center gap-1.5">
                  {selectedAnswers[currentQ.id] === currentQ.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Correct Answer</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Incorrect — Correct Answer: {currentQ.correctAnswer}</span>
                    </>
                  )}
                </div>
                <div className="text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">Explanation:</span> {currentQ.explanation}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Citation: Paragraph {currentQ.paragraphRef}
                </div>
              </div>
            )}

            {/* Navigation between questions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => { sound.playClick(); setCurrentQuestionIndex(prev => prev - 1); }}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1 overflow-x-auto max-w-[180px] py-1">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => { sound.playClick(); setCurrentQuestionIndex(idx); }}
                    className={`w-6 h-6 rounded-md text-[11px] font-mono font-semibold transition-colors shrink-0 ${
                      idx === currentQuestionIndex 
                        ? 'bg-indigo-600 text-white' 
                        : selectedAnswers[q.id] 
                        ? 'bg-indigo-100 text-indigo-800' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentQuestionIndex === questions.length - 1}
                onClick={() => { sound.playClick(); setCurrentQuestionIndex(prev => prev + 1); }}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Results Summary Card if Submitted */}
          {submittedAnswers && scoreStats && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Reading Assessment Complete</h4>
                  <p className="text-xs text-slate-500">Official Lesson 1 Reading Score</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-indigo-600 font-mono tabular-nums">
                    {scoreStats.percentage}%
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {scoreStats.correct} of {scoreStats.total} Correct
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block">XP Earned</span>
                  <span className="font-bold text-slate-900 font-mono">
                    +{Math.round((scoreStats.correct / scoreStats.total) * 150) + 50} XP
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block">Integrity Status</span>
                  <span className={`font-bold ${isInvalidated ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {isInvalidated ? 'Invalidated' : 'Verified'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleRestartAttempt}
                  className="flex-1 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Reading</span>
                </button>

                {onLaunchWriting && (
                  <button
                    onClick={onLaunchWriting}
                    className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Proceed to Writing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
