import React, { useState, useEffect, useRef } from 'react';
import { WritingTask, AIAssessmentResponse, VocabularyWord } from '../../types/lesson';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { 
  Clock, 
  PenTool, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Send, 
  Save, 
  BookOpen, 
  Loader2,
  FileText
} from 'lucide-react';

interface WritingEditorProps {
  task: WritingTask;
  allLessonVocab: VocabularyWord[];
  onAssessmentReceived: (result: AIAssessmentResponse, studentDraft: string) => void;
  isRewriteMode?: boolean;
  initialDraft?: string;
  originalFeedback?: AIAssessmentResponse | null;
}

export const WritingEditor: React.FC<WritingEditorProps> = ({
  task,
  allLessonVocab,
  onAssessmentReceived,
  isRewriteMode = false,
  initialDraft = '',
  originalFeedback = null
}) => {
  const [content, setContent] = useState<string>(() => {
    if (initialDraft) return initialDraft;
    return storage.getWritingDraft(task.id) || '';
  });

  const [secondsRemaining, setSecondsRemaining] = useState<number>(task.timeLimitMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Autosaved');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const timerRef = useRef<any>(null);

  // Autosave
  useEffect(() => {
    const handler = setTimeout(() => {
      if (content) {
        storage.saveWritingDraft(task.id, content);
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSavedTime(`Saved at ${timeStr}`);
      }
    }, 1500);

    return () => clearTimeout(handler);
  }, [content, task.id]);

  // Timer
  useEffect(() => {
    if (!isTimerRunning) return;

    timerRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimerRunning(false);
          sound.playError();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  // Word Count Calculation
  const words = content.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const isBelowMin = wordCount < task.targetMinWords;
  const isAboveMax = wordCount > task.targetMaxWords;
  const isInTargetRange = wordCount >= task.targetMinWords && wordCount <= task.targetMaxWords;

  // Real-time Target Vocabulary Tracker
  const usedTargetWords = allLessonVocab.filter(v => {
    const root = v.word.toLowerCase().replace(/(e|ing|ed|es|s)$/, '');
    const textLower = content.toLowerCase();
    return textLower.includes(v.word.toLowerCase()) || textLower.includes(root);
  });

  // Handle Submission to Server API (/api/assess-writing)
  const handleSubmit = async () => {
    if (wordCount < 20) {
      setSubmitError('Please write at least 20 words before requesting AI assessment.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    sound.playClick();

    try {
      const currentLevel = storage.getStudentLevel();
      const response = await fetch('/api/assess-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: 'lesson-1',
          taskTitle: task.title,
          studentText: content,
          studentLevel: currentLevel,
          targetVocabulary: task.targetVocabulary,
          lang: storage.getFeedbackLang(),
          isRewrite: isRewriteMode,
          originalText: initialDraft
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result: AIAssessmentResponse = await response.json();
      sound.playComplete();

      // Award XP for completing writing mission
      const earnedXP = isRewriteMode ? 80 : 150;
      storage.addXP(earnedXP);

      onAssessmentReceived(result, content);
    } catch (err: any) {
      console.error('Submission failed:', err);
      setSubmitError('Assessment service encountered a network error. Please try submitting again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timerFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Task Specification Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <span>{isRewriteMode ? 'WRITING REVISION' : 'FINAL WRITING MISSION'}</span>
              <span>·</span>
              <span>ACADEMIC MEMORANDUM</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {task.title}
            </h2>
          </div>

          {/* Timer pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setIsTimerRunning(!isTimerRunning);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                isTimerRunning 
                  ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span className="tabular-nums">{timerFormatted}</span>
              <span className="text-[10px] font-sans font-medium text-slate-500">
                ({isTimerRunning ? 'Pause' : 'Start Timer'})
              </span>
            </button>
          </div>
        </div>

        {/* Background Scenario & Prompt */}
        <div className="space-y-2 text-xs text-slate-700">
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 leading-relaxed">
            <strong className="text-slate-900 block mb-0.5">Scenario:</strong>
            {task.contextScenario}
          </div>

          <div className="p-3.5 bg-indigo-50/50 rounded-lg border border-indigo-100/60 text-slate-800 leading-relaxed font-medium">
            <strong className="text-indigo-900 block mb-0.5">Instructions:</strong>
            {task.prompt}
          </div>
        </div>

        {/* Recommended Structure Steps */}
        <div className="border-t border-slate-100 pt-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Recommended Academic Structure:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {task.recommendedStructure.map((st, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-900 block">{st.step}</span>
                <span className="text-slate-500 text-[11px]">{st.guideline}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor & Target Vocabulary Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Editor Main Area */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-medium">Word Count:</span>
              <span className={`font-mono font-bold text-sm tabular-nums ${
                isInTargetRange ? 'text-emerald-600' : isAboveMax ? 'text-amber-600' : 'text-slate-700'
              }`}>
                {wordCount}
              </span>
              <span className="text-slate-400">/ {task.targetMinWords}–{task.targetMaxWords} words</span>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Save className="w-3 h-3" />
              <span>{lastSavedTime}</span>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="MEMORANDUM&#10;To: Department Directors&#10;From: Communications Coordinator&#10;Date: October 2026&#10;Subject: Standardizing Communication Protocols&#10;&#10;The primary objective of this memorandum is to..."
            className="w-full h-80 p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm font-sans text-slate-800 leading-relaxed resize-y outline-none transition-all placeholder:text-slate-400 font-normal"
          />

          {submitError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] text-slate-500">
              {isBelowMin ? (
                <span className="text-amber-600">Need {task.targetMinWords - wordCount} more words to reach target minimum</span>
              ) : isInTargetRange ? (
                <span className="text-emerald-600 font-semibold">✓ Optimal academic length achieved</span>
              ) : (
                <span className="text-amber-600">Consider condensing text to stay under {task.targetMaxWords} words</span>
              )}
            </div>

            <button
              disabled={isSubmitting || wordCount < 15}
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating via AI...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{isRewriteMode ? 'Submit Rewrite for Reassessment' : 'Submit for AI Assessment'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Sidebar: Real-time Target Vocabulary Tracker */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Target Vocabulary Checklist
              </h4>
              <span className="text-xs font-mono font-bold text-indigo-600 tabular-nums">
                {usedTargetWords.length} / {allLessonVocab.length} Used
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Words light up automatically in green as you incorporate them into your draft.
            </p>

            <div className="flex flex-wrap gap-1.5 max-h-80 overflow-y-auto pt-1">
              {allLessonVocab.map(word => {
                const isUsed = usedTargetWords.some(w => w.id === word.id);
                return (
                  <span
                    key={word.id}
                    title={`${word.pos}: ${word.simpleDefinition}`}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                      isUsed 
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200 opacity-70'
                    }`}
                  >
                    {isUsed ? '✓ ' : ''}{word.word}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Model Answer Hint */}
          {task.sampleModelResponse && (
            <details className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 text-xs text-slate-700">
              <summary className="font-semibold text-slate-800 cursor-pointer hover:text-indigo-600">
                View University Model Response (Guideline)
              </summary>
              <div className="mt-2 pt-2 border-t border-slate-200 font-serif italic text-slate-700 whitespace-pre-line text-[11.5px] leading-relaxed">
                {task.sampleModelResponse}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};
