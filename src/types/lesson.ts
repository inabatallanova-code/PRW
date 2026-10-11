export type MasteryState = 'New' | 'Learning' | 'Practising' | 'Almost Mastered' | 'Mastered';
export type StudentLevel = 'A2' | 'B1' | 'B1+' | 'B2' | 'B2+' | 'C1';
export type InterfaceLang = 'en' | 'uz';

export interface LevelDescriptor {
  level: StudentLevel;
  badge: string;
  nameEn: string;
  nameUz: string;
  descriptionEn: string;
  descriptionUz: string;
  targetVocabComplexity: string;
  readingWordTarget: string;
  writingWordTarget: string;
  scaffoldingLevel: 'High' | 'Moderate' | 'Independent' | 'Advanced';
  xpMultiplier: number;
}

export interface VocabularyWord {
  id: string;
  word: string;
  pos: 'verb' | 'noun' | 'adjective' | 'adverb';
  simpleDefinition: string;
  uzbekTranslation: string;
  exampleSentence: string;
  professionalContext: string;
  collocation: string;
  synonym?: string;
  antonym?: string;
  difficulty: 'Intermediate' | 'Upper-Intermediate' | 'Advanced';
  masteryState: MasteryState;
  exposureCount: number;
  correctCount: number;
  incorrectCount: number;
  lastPracticed?: string;
}

export interface ReadingParagraph {
  id: string;
  number: number;
  heading?: string;
  text: string;
}

export type QuestionType = 
  | 'multiple-choice' 
  | 'true-false-notgiven' 
  | 'main-idea' 
  | 'vocab-context' 
  | 'inference' 
  | 'sentence-completion';

export interface ReadingQuestion {
  id: string;
  paragraphRef: number;
  type: QuestionType;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ReadingPassage {
  id: string;
  title: string;
  topic: string;
  wordCount: number;
  timeLimitMinutes: number;
  paragraphs: ReadingParagraph[];
}

export interface WritingActivity {
  id: string;
  type: 'sentence-builder' | 'fix-sentence' | 'formal-informal' | 'vocab-upgrade' | 'linking-words';
  title: string;
  instruction: string;
  contextPrompt: string;
  initialState?: string[] | string;
  solution: string | string[];
  explanation: string;
  targetVocabWord?: string;
}

export interface WritingTask {
  id: string;
  title: string;
  contextScenario: string;
  prompt: string;
  targetMinWords: number;
  targetMaxWords: number;
  timeLimitMinutes: number;
  recommendedStructure: { step: string; guideline: string }[];
  targetVocabulary: string[];
  sampleModelResponse?: string;
}

export interface GrammarQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  academicRule: string;
}

export interface GrammarActivity {
  id: string;
  title: string;
  objective: string;
  ruleSummary: string;
  questions: GrammarQuestion[];
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  level: string;
  estimatedMinutes: number;
  xpReward: number;
  vocabulary: VocabularyWord[];
  reading: ReadingPassage;
  readingQuestions: ReadingQuestion[];
  writingActivities: WritingActivity[];
  typingSprintPassage: {
    title: string;
    text: string;
    timeLimitSeconds: number;
  };
  miniWritingPrompt: {
    title: string;
    prompt: string;
    timeLimitMinutes: number;
    targetWords: number;
  };
  finalWritingTask: WritingTask;
  grammarActivities: GrammarActivity[];
  isPublished: boolean;
}

export interface CriteriaFeedback {
  score: number;
  strengths: string;
  holdingBack: string;
  improvedExample?: {
    original: string;
    improved: string;
    rule: string;
  };
  upgrades?: {
    basic: string;
    upgraded: string;
    explanation: string;
  }[];
  suggestion?: string;
  usedTargetWords?: string[];
}

export interface AIAssessmentResponse {
  source: 'gemini_ai' | 'educational_diagnostic';
  apiKeyConfigured: boolean;
  overallScore: number;
  cefrEstimate: string;
  ieltsEstimate: string;
  wordCount: number;
  criteria: {
    grammar: CriteriaFeedback;
    vocabulary: CriteriaFeedback;
    taskAchievement: CriteriaFeedback;
    coherence: CriteriaFeedback;
  };
  uzbekFeedback: {
    umumiyXulosa: string;
    kuchliTomonlar: string;
    yaxshilashTavsiyasi: string;
    keyingiQadam: string;
  };
  recommendations: {
    skill: string;
    label: string;
    actionId: string;
  }[];
  isRewrite?: boolean;
  whatImproved?: string[];
  message?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface AssessmentAttempt {
  id: string;
  lessonId: string;
  type: 'reading' | 'writing' | 'summative';
  startedAt: string;
  completedAt?: string;
  score: number;
  maxScore: number;
  timeSpentSeconds: number;
  integrityMode: 'relaxed' | 'standard' | 'strict';
  interruptionsCount: number;
  isValid: boolean;
}

export interface AuthorProfile {
  name: string;
  title: string;
  institution: string;
  department: string;
  email: string;
  bioEn: string;
  bioUz: string;
  teachingPhilosophyEn: string;
  teachingPhilosophyUz: string;
  manualTitle: string;
  manualSubtitle: string;
  manualEdition: string;
  manualDescriptionEn: string;
  manualDescriptionUz: string;
  avatarUrl?: string;
  lastUpdated?: string;
}

export type UserRole = 'student' | 'author';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  avatar?: string;
}
