import { Lesson, StudentLevel } from '../types/lesson';
import { LESSON_1_DATA } from './lesson1';

// Full Curriculum Course Lessons Catalog
export interface LessonCatalogItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  level: string;
  estimatedMinutes: number;
  xpReward: number;
  unit: string;
  summaryEn: string;
  summaryUz: string;
  coreVocabularySnippet: string[];
  isLocked?: boolean;
}

export const COURSE_LESSONS_CATALOG: LessonCatalogItem[] = [
  {
    id: 'lesson-1',
    number: 1,
    title: 'Professional Communication',
    subtitle: 'Strategic Discourse & Written Precision in Global Organizations',
    level: 'A2 – C1 Adaptive',
    estimatedMinutes: 45,
    xpReward: 350,
    unit: 'Unit 1: Foundations of Professional Register',
    summaryEn: 'Master essential workplace and academic discourse, eliminate semantic ambiguity, and compose structured executive memoranda.',
    summaryUz: 'Professional va akademik nutq asoslarini o\'rganing, noaniqliklarni bartaraf eting va rasmiy memorandumlar tuzishni mashq qiling.',
    coreVocabularySnippet: ['facilitate', 'obtain', 'significant', 'coherent', 'implement', 'clarify']
  },
  {
    id: 'lesson-2',
    number: 2,
    title: 'Academic Research & Methodology',
    subtitle: 'Formulating Hypotheses, Variables & Empirical Inquiry',
    level: 'A2 – C1 Adaptive',
    estimatedMinutes: 50,
    xpReward: 380,
    unit: 'Unit 2: Scholarly Inquiries & Empirical Design',
    summaryEn: 'Explore how university researchers formulate research questions, operationalize variables, analyze methodology, and synthesize empirical findings.',
    summaryUz: 'Universitet tadqiqotchilari gipotezalarni qanday shakllantirishi, metodologiyani tanlashi va amaliy xulosalarni tahlil qilishini o\'rganing.',
    coreVocabularySnippet: ['hypothesis', 'methodology', 'empirical', 'verify', 'variable', 'findings']
  },
  {
    id: 'lesson-3',
    number: 3,
    title: 'Critical Reading & Synthesizing Sources',
    subtitle: 'Evaluating Academic Arguments, Paraphrasing & Attribution',
    level: 'A2 – C1 Adaptive',
    estimatedMinutes: 50,
    xpReward: 400,
    unit: 'Unit 3: Critical Analysis & Literature Synthesis',
    summaryEn: 'Deconstruct scholarly arguments, identify logical fallacies, paraphrase source materials accurately, and integrate literature citations ethically.',
    summaryUz: 'Ilmiy maqolalarni tanqidiy tahlil qilish, o\'z so\'zlari bilan bayon etish (paraphrase) va havolalarni to\'g\'ri iqtibos qilishni o\'zlashtiring.',
    coreVocabularySnippet: ['critique', 'synthesize', 'paraphrase', 'premise', 'citation', 'stance']
  },
  {
    id: 'lesson-4',
    number: 4,
    title: 'Executive Reports & Data Commentary',
    subtitle: 'Interpreting Trends, Quantifying Metrics & Visual Commentary',
    level: 'A2 – C1 Adaptive',
    estimatedMinutes: 55,
    xpReward: 420,
    unit: 'Unit 4: Quantitative Data Analysis in Written Discourse',
    summaryEn: 'Learn to write formal data commentaries describing charts, statistical fluctuations, plateau phases, and financial projections.',
    summaryUz: 'Grafiklar, jadvallar va statistik o\'zgarishlarni tushuntirib beruvchi rasmiy hisobotlar va tahliliy xulosalar yozishni o\'rganing.',
    coreVocabularySnippet: ['fluctuation', 'substantial', 'plateau', 'correlation', 'projection', 'trend']
  },
  {
    id: 'lesson-5',
    number: 5,
    title: 'Proposal Writing & Grant Acquisition',
    subtitle: 'Feasibility Studies, Deliverables & Institutional Persuasion',
    level: 'A2 – C1 Adaptive',
    estimatedMinutes: 60,
    xpReward: 450,
    unit: 'Unit 5: Strategic Persuasion & Funding Proposals',
    summaryEn: 'Construct persuasive university research proposals, develop feasibility justifications, allocate budgets, and outline verifiable milestones.',
    summaryUz: 'Grant arizalari, loyiha asosnomalari (feasibility study), byudjet taqsimoti va erishiladigan natijalarni professional tarzda yozish.',
    coreVocabularySnippet: ['feasibility', 'stakeholder', 'allocate', 'milestone', 'deliverable', 'rationale']
  }
];
