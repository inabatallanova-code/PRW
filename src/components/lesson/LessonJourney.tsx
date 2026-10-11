import React, { useState } from 'react';
import { Lesson, AIAssessmentResponse } from '../../types/lesson';
import { VocabularyExperience } from '../vocabulary/VocabularyExperience';
import { ReadingExperience } from '../reading/ReadingExperience';
import { WritingPrep } from '../writing/WritingPrep';
import { TypingSprint } from '../writing/TypingSprint';
import { WritingEditor } from '../writing/WritingEditor';
import { AIFeedbackView } from '../writing/AIFeedbackView';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  Layers, 
  PenTool, 
  Award, 
  Flame,
  Zap,
  Check
} from 'lucide-react';

interface LessonJourneyProps {
  lesson: Lesson;
  onLessonComplete: () => void;
  onNavigateTab: (tab: any) => void;
  onOpenLessonsCatalog?: () => void;
}

export type JourneyStep = 
  | 1 // Learn the words
  | 2 // Practise the words
  | 3 // Read passage
  | 4 // Check understanding
  | 5 // Prepare to write
  | 6 // Typing sprint
  | 7 // Final writing mission
  | 8 // AI feedback
  | 9 // Lesson complete

export const LessonJourney: React.FC<LessonJourneyProps> = ({
  lesson,
  onLessonComplete,
  onNavigateTab,
  onOpenLessonsCatalog
}) => {
  const [currentStep, setCurrentStep] = useState<JourneyStep>(1);
  const [aiFeedback, setAiFeedback] = useState<AIAssessmentResponse | null>(null);
  const [studentDraft, setStudentDraft] = useState<string>('');
  const [readingScore, setReadingScore] = useState<{ score: number; maxScore: number } | null>(null);
  const [isRewriteMode, setIsRewriteMode] = useState<boolean>(false);

  const stepTitles = [
    '01. Discover Words',
    '02. Vocabulary Challenges',
    '03. Academic Reading',
    '04. Comprehension Questions',
    '05. Writing Preparation',
    '06. Typing Sprint (60s)',
    '07. Final Writing Mission',
    '08. AI Writing Evaluation',
    '09. Lesson Complete'
  ];

  const handleStepChange = (step: JourneyStep) => {
    sound.playClick();
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadingCompleted = (score: number, maxScore: number) => {
    setReadingScore({ score, maxScore });
    sound.playComplete();
  };

  const handleAssessmentReceived = (result: AIAssessmentResponse, draft: string) => {
    setAiFeedback(result);
    setStudentDraft(draft);
    setIsRewriteMode(false);
    setCurrentStep(8); // Go to AI Feedback step
  };

  const handleInitiateRewrite = () => {
    setIsRewriteMode(true);
    setCurrentStep(7); // Return to writing editor with rewrite mode active
  };

  // Completion calculation
  const masteredCount = lesson.vocabulary.filter(w => w.masteryState === 'Mastered').length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Journey Step Progress Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-indigo-600 uppercase">Lesson {lesson.number}</span>
            <span>·</span>
            <span className="font-semibold text-slate-800">{lesson.title}</span>
            {onOpenLessonsCatalog && (
              <button
                onClick={onOpenLessonsCatalog}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline ml-1"
              >
                (Switch Lesson)
              </button>
            )}
            <span>·</span>
            <span className="text-slate-500">Step {currentStep} of 9</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">{stepTitles[currentStep - 1]}</span>
          </div>
        </div>

        {/* 9-Step Visual Track */}
        <div className="grid grid-cols-9 gap-1.5">
          {stepTitles.map((title, idx) => {
            const stepNum = (idx + 1) as JourneyStep;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <button
                key={idx}
                onClick={() => handleStepChange(stepNum)}
                className={`h-2 rounded-full transition-all ${
                  isCurrent 
                    ? 'bg-indigo-600' 
                    : isCompleted 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
                title={title}
              />
            );
          })}
        </div>
      </div>

      {/* STEP 1: LEARN THE WORDS (Discovery) */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <VocabularyExperience
            vocabulary={lesson.vocabulary}
            onWordMasteryChange={() => {}}
            onLaunchReading={() => setCurrentStep(3)}
            onLaunchWriting={() => setCurrentStep(7)}
          />
          <div className="flex justify-end">
            <button
              onClick={() => handleStepChange(2)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Continue to Step 2: Recognition Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PRACTISE THE WORDS */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <VocabularyExperience
            vocabulary={lesson.vocabulary}
            onWordMasteryChange={() => {}}
            onLaunchReading={() => setCurrentStep(3)}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => handleStepChange(1)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => handleStepChange(3)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Proceed to Step 3: Academic Reading</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 & 4: ACADEMIC READING & COMPREHENSION */}
      {(currentStep === 3 || currentStep === 4) && (
        <div className="space-y-4">
          <ReadingExperience
            passage={lesson.reading}
            questions={lesson.readingQuestions}
            targetVocabulary={lesson.vocabulary}
            onComplete={handleReadingCompleted}
            onLaunchWriting={() => handleStepChange(5)}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => handleStepChange(2)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => handleStepChange(5)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Proceed to Step 5: Writing Prep</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: WRITING PREPARATION */}
      {currentStep === 5 && (
        <div className="space-y-4">
          <WritingPrep
            activities={lesson.writingActivities}
            onCompleteAll={() => handleStepChange(6)}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => handleStepChange(4)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => handleStepChange(6)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Proceed to Step 6: Typing Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: TYPING SPRINT */}
      {currentStep === 6 && (
        <div className="space-y-4">
          <TypingSprint
            passageText={lesson.typingSprintPassage.text}
            passageTitle={lesson.typingSprintPassage.title}
            timeLimitSeconds={lesson.typingSprintPassage.timeLimitSeconds}
            onFinish={() => {}}
          />
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => handleStepChange(5)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => handleStepChange(7)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Proceed to Step 7: Final Writing Mission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: FINAL WRITING MISSION */}
      {currentStep === 7 && (
        <div className="space-y-4">
          <WritingEditor
            task={lesson.finalWritingTask}
            allLessonVocab={lesson.vocabulary}
            onAssessmentReceived={handleAssessmentReceived}
            isRewriteMode={isRewriteMode}
            initialDraft={studentDraft}
            originalFeedback={aiFeedback}
          />
        </div>
      )}

      {/* STEP 8: AI ASSESSMENT & FEEDBACK */}
      {currentStep === 8 && aiFeedback && (
        <div className="space-y-4">
          <AIFeedbackView
            assessment={aiFeedback}
            studentDraft={studentDraft}
            onInitiateRewrite={handleInitiateRewrite}
            onNavigateToPractice={(actionId) => onNavigateTab(actionId)}
          />

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => handleStepChange(7)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Review Writing Draft</span>
            </button>

            <button
              onClick={() => handleStepChange(9)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Complete Lesson & View Result</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 9: LESSON RESULT (Section 30 of prompt) */}
      {currentStep === 9 && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs max-w-2xl mx-auto space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Lesson {lesson.number} Complete!
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              You have completed the full academic reading, writing, and vocabulary cycle for Unit {lesson.number}.
            </p>
          </div>

          {/* Academic Result Card */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Vocabulary</span>
              <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {masteredCount} / 20
              </span>
              <span className="text-[10px] text-slate-400 block">Mastered</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Reading</span>
              <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {readingScore ? `${readingScore.score}/${readingScore.maxScore}` : '9/10'}
              </span>
              <span className="text-[10px] text-slate-400 block">Correct</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Writing</span>
              <span className="text-lg font-bold text-indigo-700 font-mono">
                {aiFeedback ? `${aiFeedback.cefrEstimate} / ${aiFeedback.ieltsEstimate}` : 'B2 (6.5)'}
              </span>
              <span className="text-[10px] text-slate-400 block">Estimated CEFR / Band</span>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl text-left text-xs text-slate-700 space-y-1">
            <div><strong>Strongest Skill:</strong> Professional Reading Analysis</div>
            <div><strong>Recommended Next Step:</strong> Practice 4 difficult vocabulary words before Lesson 2</div>
            <div className="text-indigo-700 font-bold font-mono pt-1">
              +350 Academic XP Awarded
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('vocabulary')}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-800 transition-colors"
            >
              Practice Difficult Words
            </button>

            <button
              onClick={onLessonComplete}
              className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
