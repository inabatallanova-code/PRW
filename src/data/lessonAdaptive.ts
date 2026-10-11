import { Lesson, StudentLevel, VocabularyWord, ReadingPassage, ReadingQuestion, WritingTask, WritingActivity, GrammarActivity } from '../types/lesson';
import { LESSON_1_DATA } from './lesson1';
import { 
  A2_VOCABULARY_L1, 
  A2_READING_L1, 
  A2_READING_QUESTIONS_L1, 
  A2_GRAMMAR_ACTIVITIES_L1, 
  A2_WRITING_ACTIVITIES_L1, 
  A2_TYPING_SPRINT_L1, 
  A2_MINI_WRITING_L1, 
  A2_FINAL_WRITING_L1 
} from './lessonA2';
import { LESSON_4_DATA, LESSON_5_DATA } from './lessonsCurriculum';

// ==========================================
// 1. A2 / B1 ADAPTATION DATA FOR LESSON 1
// ==========================================

export const B1_VOCABULARY: VocabularyWord[] = [
  {
    id: 'voc-b1-1',
    word: 'support',
    pos: 'verb',
    simpleDefinition: 'To help someone or give assistance so that work is easier.',
    uzbekTranslation: 'qo\'llab-quvvatlamoq, yordam bermoq',
    exampleSentence: 'Managers must support their team members when starting a new project.',
    professionalContext: 'Daily workplace teamwork and management.',
    collocation: 'support a team / support an idea',
    synonym: 'help, assist',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-2',
    word: 'improve',
    pos: 'verb',
    simpleDefinition: 'To make something better than it was before.',
    uzbekTranslation: 'yaxshilamoq, rivojlantirmoq',
    exampleSentence: 'Clear weekly emails help improve communication between departments.',
    professionalContext: 'Performance reviews and team productivity.',
    collocation: 'improve communication / improve performance',
    synonym: 'enhance, develop',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-3',
    word: 'effective',
    pos: 'adjective',
    simpleDefinition: 'Producing the intended or desired result successfully.',
    uzbekTranslation: 'samarali, natijali',
    exampleSentence: 'Using bullet points is an effective way to write short summaries.',
    professionalContext: 'Report writing and meetings.',
    collocation: 'effective method / effective communication',
    synonym: 'successful, useful',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-4',
    word: 'clarify',
    pos: 'verb',
    simpleDefinition: 'To make something clear and easy to understand.',
    uzbekTranslation: 'aniqlashtirmoq, tushuntirmoq',
    exampleSentence: 'Please clarify the meeting time so everyone arrives on schedule.',
    professionalContext: 'Email follow-ups and instructions.',
    collocation: 'clarify expectations / clarify the plan',
    synonym: 'explain, make clear',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-5',
    word: 'connect',
    pos: 'verb',
    simpleDefinition: 'To join together or bring different people into contact.',
    uzbekTranslation: 'bog\'lamoq, aloqa o\'rnatmoq',
    exampleSentence: 'Online meetings help connect employees working in different cities.',
    professionalContext: 'Remote collaboration.',
    collocation: 'connect teams / stay connected',
    synonym: 'link, join',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-6',
    word: 'goal',
    pos: 'noun',
    simpleDefinition: 'Something you want to achieve or finish in your work.',
    uzbekTranslation: 'maqsad, vazifa',
    exampleSentence: 'Our primary goal this month is to complete the customer report.',
    professionalContext: 'Workplace objectives.',
    collocation: 'reach a goal / set a goal',
    synonym: 'aim, objective',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-7',
    word: 'useful',
    pos: 'adjective',
    simpleDefinition: 'Helping you to do or get what you want.',
    uzbekTranslation: 'foydali, kerakli',
    exampleSentence: 'The writing template was very useful for preparing the memo.',
    professionalContext: 'Tools and resources.',
    collocation: 'useful feedback / useful tool',
    synonym: 'helpful, practical',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-8',
    word: 'achieve',
    pos: 'verb',
    simpleDefinition: 'To succeed in reaching a target by effort and skill.',
    uzbekTranslation: 'erishmoq, qo\'lga kiritmoq',
    exampleSentence: 'Teams achieve better results when they share clear information.',
    professionalContext: 'Project milestones.',
    collocation: 'achieve results / achieve success',
    synonym: 'reach, accomplish',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-9',
    word: 'provide',
    pos: 'verb',
    simpleDefinition: 'To give something that is needed or wanted.',
    uzbekTranslation: 'ta\'minlamoq, bermoq',
    exampleSentence: 'Please provide feedback on the draft by Friday afternoon.',
    professionalContext: 'Workplace requests.',
    collocation: 'provide information / provide support',
    synonym: 'give, supply',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-10',
    word: 'complete',
    pos: 'verb',
    simpleDefinition: 'To finish doing or making something entirely.',
    uzbekTranslation: 'yakunlamoq, tugatmoq',
    exampleSentence: 'All students must complete the writing task before the deadline.',
    professionalContext: 'Deadlines and projects.',
    collocation: 'complete a project / complete a task',
    synonym: 'finish, conclude',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-11',
    word: 'direct',
    pos: 'adjective',
    simpleDefinition: 'Clear and honest, going straight to the point without confusion.',
    uzbekTranslation: 'aniq, to\'g\'ridan-to\'g\'ri',
    exampleSentence: 'Direct communication saves time and prevents misunderstandings.',
    professionalContext: 'Leadership and emails.',
    collocation: 'direct communication / direct message',
    synonym: 'straightforward, frank',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-12',
    word: 'discuss',
    pos: 'verb',
    simpleDefinition: 'To talk about something with other people to reach a decision.',
    uzbekTranslation: 'muhokama qilmoq',
    exampleSentence: 'We will discuss the new schedule during tomorrow’s meeting.',
    professionalContext: 'Group discussions.',
    collocation: 'discuss a problem / discuss options',
    synonym: 'talk over, debate',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-13',
    word: 'resolve',
    pos: 'verb',
    simpleDefinition: 'To find an acceptable solution to a problem or disagreement.',
    uzbekTranslation: 'hal qilmoq, yechim topmoq',
    exampleSentence: 'Clear guidelines help resolve disagreements between colleagues quickly.',
    professionalContext: 'Problem-solving.',
    collocation: 'resolve an issue / resolve a conflict',
    synonym: 'settle, solve',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-14',
    word: 'share',
    pos: 'verb',
    simpleDefinition: 'To give a part of information or ideas to others.',
    uzbekTranslation: 'bo\'lishmoq, ulashmoq',
    exampleSentence: 'Colleagues should share important updates with the whole team.',
    professionalContext: 'Knowledge sharing.',
    collocation: 'share information / share ideas',
    synonym: 'distribute, communicate',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-15',
    word: 'brief',
    pos: 'adjective',
    simpleDefinition: 'Lasting only a short time or using few words.',
    uzbekTranslation: 'qisqa, lo\'nda',
    exampleSentence: 'Please send a brief summary of the client meeting.',
    professionalContext: 'Notes and summaries.',
    collocation: 'brief summary / brief explanation',
    synonym: 'short, concise',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-16',
    word: 'opinion',
    pos: 'noun',
    simpleDefinition: 'A thought, belief, or view about someone or something.',
    uzbekTranslation: 'fikr, mulohaza',
    exampleSentence: 'In professional meetings, every employee has a right to express their opinion.',
    professionalContext: 'Feedback sessions.',
    collocation: 'express an opinion / professional opinion',
    synonym: 'view, perspective',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-17',
    word: 'schedule',
    pos: 'noun',
    simpleDefinition: 'A plan of events or tasks with dates and times.',
    uzbekTranslation: 'jadval, reja',
    exampleSentence: 'The project schedule must be shared with all team members.',
    professionalContext: 'Project planning.',
    collocation: 'on schedule / project schedule',
    synonym: 'timetable, timeline',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-18',
    word: 'decision',
    pos: 'noun',
    simpleDefinition: 'A choice that you make after thinking about several options.',
    uzbekTranslation: 'qaror, xulosa',
    exampleSentence: 'The manager made a final decision after reviewing the data.',
    professionalContext: 'Leadership decisions.',
    collocation: 'make a decision / final decision',
    synonym: 'choice, resolution',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-19',
    word: 'respond',
    pos: 'verb',
    simpleDefinition: 'To say or write something as an answer or reply.',
    uzbekTranslation: 'javob bermoq',
    exampleSentence: 'Please respond to urgent emails within twenty-four hours.',
    professionalContext: 'Customer service and correspondence.',
    collocation: 'respond promptly / respond to an email',
    synonym: 'reply, answer',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-b1-20',
    word: 'agreement',
    pos: 'noun',
    simpleDefinition: 'A situation in which people have the same opinion.',
    uzbekTranslation: 'kelishuv, rozilik',
    exampleSentence: 'After a thirty-minute talk, both sides reached an agreement.',
    professionalContext: 'Contracts and negotiations.',
    collocation: 'reach an agreement / mutual agreement',
    synonym: 'accord, consensus',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  }
];

// Truly level-adapted writing preparation for A2/B1
export const B1_WRITING_ACTIVITIES: WritingActivity[] = [
  {
    id: 'wact-b1-1',
    type: 'sentence-builder',
    title: 'Workplace Sentence Order',
    instruction: 'Arrange these words to make a clear, natural English sentence.',
    contextPrompt: 'Context: Explaining how emails help teams work smoothly.',
    initialState: [
      'on schedule',
      'help team members',
      'Clear emails',
      'complete their tasks'
    ],
    solution: [
      'Clear emails',
      'help team members',
      'complete their tasks',
      'on schedule'
    ],
    explanation: 'Basic English sentence order: Subject ("Clear emails") + Verb ("help team members") + Object clause ("complete their tasks") + Time phrase ("on schedule").',
    targetVocabWord: 'complete'
  },
  {
    id: 'wact-b1-2',
    type: 'fix-sentence',
    title: 'Fix Informal Workplace Language',
    instruction: 'Choose the sentence that sounds polite, clear, and professional.',
    contextPrompt: 'Draft: "Boss told us to do it fast."',
    initialState: 'Boss told us to do it fast.',
    solution: 'The manager asked the team to complete the work on time.',
    explanation: 'Polite workplace emails use "The manager asked the team to complete..." rather than conversational commands.',
    targetVocabWord: 'complete'
  },
  {
    id: 'wact-b1-3',
    type: 'formal-informal',
    title: 'Polite Business Phrasing',
    instruction: 'Select the polite workplace option for asking for information.',
    contextPrompt: 'Asking a colleague for project updates.',
    initialState: 'Options',
    solution: 'Could you please provide the latest project schedule?',
    explanation: '"Could you please provide..." is the standard polite request in professional English.',
    targetVocabWord: 'provide'
  },
  {
    id: 'wact-b1-4',
    type: 'vocab-upgrade',
    title: 'Vocabulary Upgrade',
    instruction: 'Upgrade the basic word "help" to a stronger workplace verb.',
    contextPrompt: 'Sentence: "Managers should help team members with new software."',
    initialState: 'help',
    solution: 'support',
    explanation: '"Support" is a professional verb meaning to provide continuous assistance and guidance.',
    targetVocabWord: 'support'
  },
  {
    id: 'wact-b1-5',
    type: 'linking-words',
    title: 'Connecting Words (Transitions)',
    instruction: 'Choose the word that explains the reason.',
    contextPrompt: 'We must send the schedule today _______ the client meeting is tomorrow morning.',
    initialState: '',
    solution: 'because',
    explanation: '"Because" introduces the reason why the schedule must be sent today.',
    targetVocabWord: 'schedule'
  }
];

// Truly level-adapted grammar activities for A2/B1
export const B1_GRAMMAR_ACTIVITIES: GrammarActivity[] = [
  {
    id: 'gram-b1-1',
    title: 'Subject-Verb Agreement in Team Emails',
    objective: 'Ensure singular subjects take singular verbs and plural subjects take plural verbs in professional updates.',
    ruleSummary: 'Singular subjects (The manager, Each worker, The team leader) use -s/-es verbs in the present tense (provides, clarifies). Plural subjects (All members, Colleagues) use base verbs (provide, clarify).',
    questions: [
      {
        id: 'gqb1-1',
        prompt: 'Choose the grammatically correct sentence for a team email:',
        options: [
          'The project manager provides weekly updates every Monday.',
          'The project manager provide weekly updates every Monday.',
          'The project manager providing weekly updates every Monday.',
          'The project manager are provide weekly updates.'
        ],
        correctAnswer: 'The project manager provides weekly updates every Monday.',
        explanation: '"The project manager" is third-person singular, so the verb requires "-s" (provides).',
        academicRule: 'Singular subject requires a singular verb in the Present Simple.'
      },
      {
        id: 'gqb1-2',
        prompt: 'Choose the correct sentence with plural subjects:',
        options: [
          'All team members share their progress before the meeting.',
          'All team members shares their progress before the meeting.',
          'All team members is sharing their progress before the meeting.',
          'All team members does share their progress.'
        ],
        correctAnswer: 'All team members share their progress before the meeting.',
        explanation: '"All team members" is plural, so it takes the base form verb "share".',
        academicRule: 'Plural subjects take base plural verbs in the Present Simple.'
      }
    ]
  },
  {
    id: 'gram-b1-2',
    title: 'Past Simple vs. Present Simple in Project Status Reports',
    objective: 'Distinguish completed tasks (Past Simple) from ongoing routines (Present Simple).',
    ruleSummary: 'Use the Past Simple (finished, resolved, completed) for events finished at a specific time. Use Present Simple (finishes, resolves, completes) for regular habits or general truths.',
    questions: [
      {
        id: 'gqb1-3',
        prompt: 'Select the correct sentence to report yesterday\'s completed milestone:',
        options: [
          'Our team completed the customer report yesterday afternoon.',
          'Our team completes the customer report yesterday afternoon.',
          'Our team is complete the customer report yesterday afternoon.',
          'Our team will completed the customer report yesterday afternoon.'
        ],
        correctAnswer: 'Our team completed the customer report yesterday afternoon.',
        explanation: 'The time marker "yesterday afternoon" requires the Past Simple verb "completed".',
        academicRule: 'Specific finished past time requires the Past Simple form.'
      }
    ]
  }
];

// ==========================================
// 2. C1 ADAPTATION DATA FOR LESSON 1
// ==========================================

export const C1_VOCABULARY: VocabularyWord[] = [
  {
    id: 'voc-c1-1',
    word: 'streamline',
    pos: 'verb',
    simpleDefinition: 'To make an organization, system, or process more efficient by eliminating redundancy.',
    uzbekTranslation: 'soddalashtirmoq, samaradorligini oshirmoq',
    exampleSentence: 'Executive leadership resolved to streamline the reporting mechanisms across all international subsidiaries.',
    professionalContext: 'Operational governance and enterprise optimization.',
    collocation: 'streamline operations / streamline procedures',
    synonym: 'optimize, rationalize',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-2',
    word: 'substantiate',
    pos: 'verb',
    simpleDefinition: 'To provide empirical evidence or proof to support the truth of a claim or thesis.',
    uzbekTranslation: 'asoslamoq, dalillar bilan isbotlamoq',
    exampleSentence: 'The scholarly thesis failed to substantiate its conclusions with verifiable quantitative data.',
    professionalContext: 'Peer review and legal compliance.',
    collocation: 'substantiate a claim / substantiate allegations',
    synonym: 'corroborate, validate',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-3',
    word: 'leverage',
    pos: 'verb',
    simpleDefinition: 'To utilize an existing asset, capability, or relationship to maximum strategic advantage.',
    uzbekTranslation: 'ustunlikdan foydalanmoq, unumli ishlatmoq',
    exampleSentence: 'Global organizations leverage diverse linguistic capabilities to navigate cross-border trade agreements.',
    professionalContext: 'Strategic management and finance.',
    collocation: 'leverage resources / leverage expertise',
    synonym: 'exploit, harness',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-4',
    word: 'synthesize',
    pos: 'verb',
    simpleDefinition: 'To combine a range of ideas, data points, or styles into a coherent and unified whole.',
    uzbekTranslation: 'umumlashtirmoq, sintez qilmoq',
    exampleSentence: 'The executive brief must synthesize disparate departmental findings into a cohesive proposal.',
    professionalContext: 'Academic literature reviews and executive summaries.',
    collocation: 'synthesize findings / synthesize data',
    synonym: 'integrate, blend',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-5',
    word: 'robust',
    pos: 'adjective',
    simpleDefinition: 'Strong, rigorous, and unlikely to fail or be weakened by unexpected challenges.',
    uzbekTranslation: 'puxta, baquvvat, mustahkam',
    exampleSentence: 'Institutions require a robust framework of internal oversight to maintain academic integrity.',
    professionalContext: 'System architecture and policy evaluation.',
    collocation: 'robust framework / robust methodology',
    synonym: 'resilient, rigorous',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-6',
    word: 'disseminate',
    pos: 'verb',
    simpleDefinition: 'To spread information, knowledge, or research findings widely to an audience.',
    uzbekTranslation: 'tarqatmoq, ommalashtirmoq',
    exampleSentence: 'The university writing center disseminates best-practice style manuals to postgraduate scholars.',
    professionalContext: 'Publishing and institutional communications.',
    collocation: 'disseminate findings / disseminate information',
    synonym: 'circulate, propagate',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-7',
    word: 'mitigate',
    pos: 'verb',
    simpleDefinition: 'To make something bad or dangerous less severe, harmful, or painful.',
    uzbekTranslation: 'yumshatmoq, xavfni kamaytirmoq',
    exampleSentence: 'Proactive communication protocols mitigate the risk of contractual misunderstandings.',
    professionalContext: 'Risk management and organizational behavior.',
    collocation: 'mitigate risks / mitigate the impact',
    synonym: 'alleviate, diminish',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-8',
    word: 'paradigm',
    pos: 'noun',
    simpleDefinition: 'A typical example, overarching model, or standard conceptual framework.',
    uzbekTranslation: 'paradigma, namunaviy tizim',
    exampleSentence: 'The shift toward remote scholarly collaboration represents a fundamental paradigm shift in academia.',
    professionalContext: 'Scholarly discourse and corporate philosophy.',
    collocation: 'paradigm shift / dominant paradigm',
    synonym: 'framework, archetype',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-9',
    word: 'multifaceted',
    pos: 'adjective',
    simpleDefinition: 'Having many different aspects, features, or complex dimensions.',
    uzbekTranslation: 'ko\'p qirrali, murakkab',
    exampleSentence: 'Addressing institutional communication breakdown requires a multifaceted reform package.',
    professionalContext: 'Strategic analysis.',
    collocation: 'multifaceted approach / multifaceted problem',
    synonym: 'complex, nuanced',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-10',
    word: 'dispassionately',
    pos: 'adverb',
    simpleDefinition: 'In an objective manner that is rational and unaffected by personal emotion or bias.',
    uzbekTranslation: 'xolislik bilan, hissiyotlarsiz',
    exampleSentence: 'Scholarly examiners must evaluate controversial hypotheses dispassionately and objectively.',
    professionalContext: 'Academic assessment and ethics.',
    collocation: 'evaluate dispassionately / analyze dispassionately',
    synonym: 'objectively, impartially',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-11',
    word: 'precedent',
    pos: 'noun',
    simpleDefinition: 'An earlier event or action that is regarded as an authoritative guide or example.',
    uzbekTranslation: 'pretsedent, o\'tmishdagi namuna',
    exampleSentence: 'The faculty decision established a critical precedent for subsequent intellectual property disputes.',
    professionalContext: 'Governance and law.',
    collocation: 'set a precedent / historical precedent',
    synonym: 'benchmark, exemplar',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-12',
    word: 'foster',
    pos: 'verb',
    simpleDefinition: 'To encourage the development or growth of ideas, relationships, or academic rigor.',
    uzbekTranslation: 'rivojlantirmoq, rag\'batlantirmoq',
    exampleSentence: 'Structured peer feedback sessions foster intellectual autonomy among university researchers.',
    professionalContext: 'Organizational culture and mentorship.',
    collocation: 'foster collaboration / foster innovation',
    synonym: 'cultivate, nurture',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-13',
    word: 'empirical',
    pos: 'adjective',
    simpleDefinition: 'Based on, concerned with, or verifiable by systematic observation rather than pure theory.',
    uzbekTranslation: 'tajribaviy, amaliy dalillarga asoslangan',
    exampleSentence: 'The policy recommendation was anchored in rigorous empirical data gathered across forty institutions.',
    professionalContext: 'Research methodology.',
    collocation: 'empirical evidence / empirical research',
    synonym: 'observable, verifiable',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-14',
    word: 'articulate',
    pos: 'verb',
    simpleDefinition: 'To formulate and express complex abstract concepts with fluency and rhetorical precision.',
    uzbekTranslation: 'ravon va aniq ifodalamoq',
    exampleSentence: 'The principal investigator must articulate the societal relevance of the proposed research.',
    professionalContext: 'Grant writing and keynote presentations.',
    collocation: 'articulate a vision / articulate arguments',
    synonym: 'enunciate, formulate',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-15',
    word: 'substantial',
    pos: 'adjective',
    simpleDefinition: 'Of considerable magnitude, intellectual weight, or institutional significance.',
    uzbekTranslation: 'salmoqli, ancha katta, jiddiy',
    exampleSentence: 'The revised operational model yielded substantial enhancements in peer-reviewed output.',
    professionalContext: 'Audits and performance summaries.',
    collocation: 'substantial progress / substantial evidence',
    synonym: 'considerable, significant',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-16',
    word: 'consensus',
    pos: 'noun',
    simpleDefinition: 'A collective agreement achieved through rigorous deliberative discourse.',
    uzbekTranslation: 'yakdillik, umumiy kelishuv',
    exampleSentence: 'Reaching a consensus among autonomous university chairs required extensive deliberative diplomacy.',
    professionalContext: 'Governance and committee assemblies.',
    collocation: 'reach a consensus / scholarly consensus',
    synonym: 'accord, harmony',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-17',
    word: 'coherent',
    pos: 'adjective',
    simpleDefinition: 'Logically integrated, tightly reasoned, and exhibiting uninterrupted structural unity.',
    uzbekTranslation: 'mantiqiy, izchil, uzviy bog\'langan',
    exampleSentence: 'The journal referees commended the author for constructing a thoroughly coherent theoretical model.',
    professionalContext: 'Academic critique.',
    collocation: 'coherent argument / coherent framework',
    synonym: 'consistent, articulate',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-18',
    word: 'viable',
    pos: 'adjective',
    simpleDefinition: 'Capable of working successfully; intellectually or operationally feasible.',
    uzbekTranslation: 'yashovchan, amalga oshirish mumkin bo\'lgan',
    exampleSentence: 'Due to ongoing budget constraints, the suggested satellite campus was deemed economically unviable.',
    professionalContext: 'Strategic planning and feasibility audits.',
    collocation: 'viable alternative / commercially viable',
    synonym: 'feasible, workable',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-19',
    word: 'subsequent',
    pos: 'adjective',
    simpleDefinition: 'Occurring or coming later in sequence, chronology, or developmental phase.',
    uzbekTranslation: 'keyingi, navbatdagi',
    exampleSentence: 'Subsequent empirical inquiries confirmed the preliminary findings observed in the pilot experiment.',
    professionalContext: 'Methodological sequences.',
    collocation: 'subsequent inquiries / subsequent iterations',
    synonym: 'ensuing, succeeding',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-c1-20',
    word: 'concise',
    pos: 'adjective',
    simpleDefinition: 'Expressing much in few words; devoid of superfluous verbiage yet intellectually comprehensive.',
    uzbekTranslation: 'lo\'nda, qisqa va serma\'no',
    exampleSentence: 'Academic abstracts demand concise syntax that encapsulates inquiry without diluting significance.',
    professionalContext: 'Publishing and executive briefs.',
    collocation: 'concise abstract / clear and concise',
    synonym: 'succinct, pithy',
    difficulty: 'Advanced',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  }
];

// ==========================================
// 3. CURRICULUM LESSONS (LESSONS 2, 3, 4, 5)
// ==========================================

export const LESSON_2_DATA: Lesson = {
  id: 'lesson-2',
  number: 2,
  title: 'Academic Research & Methodology',
  subtitle: 'Formulating Hypotheses, Variables & Empirical Inquiry',
  level: 'Intermediate / B1–B2',
  estimatedMinutes: 50,
  xpReward: 380,
  isPublished: true,
  vocabulary: [
    {
      id: 'voc-l2-1',
      word: 'hypothesis',
      pos: 'noun',
      simpleDefinition: 'A proposed scientific explanation made on the basis of limited evidence as a starting point for inquiry.',
      uzbekTranslation: 'faraz, gipoteza',
      exampleSentence: 'The researchers formulated a testable hypothesis regarding digital literacy gains.',
      professionalContext: 'Research methodology.',
      collocation: 'formulate a hypothesis / test a hypothesis',
      synonym: 'proposition, conjecture',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l2-2',
      word: 'methodology',
      pos: 'noun',
      simpleDefinition: 'A system of methods, principles, and rules used in a particular discipline.',
      uzbekTranslation: 'metodologiya, uslubiyot',
      exampleSentence: 'The study employed a mixed-methods methodology combining surveys with interviews.',
      professionalContext: 'Academic proposals and thesis chapters.',
      collocation: 'research methodology / rigorous methodology',
      synonym: 'framework, procedure',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l2-3',
      word: 'empirical',
      pos: 'adjective',
      simpleDefinition: 'Based on, concerned with, or verifiable by observation or experiment rather than pure theory.',
      uzbekTranslation: 'amaliy, tajribaviy dalillarga asoslangan',
      exampleSentence: 'The paper provides robust empirical evidence supporting the new pedagogical model.',
      professionalContext: 'Peer review and science.',
      collocation: 'empirical data / empirical evidence',
      synonym: 'observational, experimental',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l2-4',
      word: 'verify',
      pos: 'verb',
      simpleDefinition: 'To make sure or demonstrate that something is true, accurate, or justified.',
      uzbekTranslation: 'tasdiqlamoq, tekshirib aniqlamoq',
      exampleSentence: 'Subsequent statistical trials were conducted to verify the preliminary results.',
      professionalContext: 'Data auditing and laboratory research.',
      collocation: 'verify findings / verify accuracy',
      synonym: 'confirm, validate',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l2-5',
      word: 'variable',
      pos: 'noun',
      simpleDefinition: 'An element, feature, or factor that is liable to vary or change in an experiment.',
      uzbekTranslation: 'o\'zgaruvchi omil (variable)',
      exampleSentence: 'Researchers must control for independent variables to isolate causal relationships.',
      professionalContext: 'Quantitative research.',
      collocation: 'independent variable / dependent variable',
      synonym: 'factor, parameter',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l2-6',
      word: 'findings',
      pos: 'noun',
      simpleDefinition: 'Information or insights discovered as the result of systematic research or inquiry.',
      uzbekTranslation: 'tadqiqot natijalari, topilmalar',
      exampleSentence: 'The empirical findings indicate a statistically significant increase in writing fluency.',
      professionalContext: 'Academic publications and reports.',
      collocation: 'research findings / preliminary findings',
      synonym: 'results, conclusions',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    }
  ],
  reading: {
    id: 'read-l2',
    title: 'Methodological Rigor and Empirical Inquiry in Higher Education',
    topic: 'Academic Research & Methodology',
    wordCount: 575,
    timeLimitMinutes: 20,
    paragraphs: [
      {
        id: 'l2-p1',
        number: 1,
        heading: 'The Epistemology of Scientific Rigor',
        text: 'In university scholarship, the credibility of any academic assertion rests upon methodological transparency. Researchers cannot simply claim that an educational intervention improves student literacy; they must formulate a coherent hypothesis and test it against empirical data. Methodological rigor transforms subjective impressions into peer-reviewed knowledge.'
      },
      {
        id: 'l2-p2',
        number: 2,
        heading: 'Operationalizing Variables',
        text: 'A central task during research design is defining independent and dependent variables with utmost precision. When investigating digital writing assistants, scholars must control for student prior knowledge and isolate the intervention variable. Without strict controls, subsequent findings risk confounding errors that invalidate the entire study.'
      },
      {
        id: 'l2-p3',
        number: 3,
        heading: 'Peer Review and Verification',
        text: 'The scientific method requires that findings be reproducible. Independent scholarly peers must be capable of verifying experimental results using the published methodology. In this respect, academic writing serves as an archive of empirical proof, ensuring knowledge advances cumulatively across generations.'
      }
    ]
  },
  readingQuestions: [
    {
      id: 'l2-q1',
      paragraphRef: 1,
      type: 'main-idea',
      prompt: 'According to Paragraph 1, what transforms subjective claims into credible academic knowledge?',
      options: [
        'Methodological transparency and testing coherent hypotheses against empirical data.',
        'Publishing unreviewed blogs on social media.',
        'Relying solely on informal classroom observations.',
        'Avoiding quantitative statistical analysis.'
      ],
      correctAnswer: 'Methodological transparency and testing coherent hypotheses against empirical data.',
      explanation: 'Paragraph 1 asserts that methodological transparency and empirical testing transform subjective claims into peer-reviewed knowledge.',
      difficulty: 'Medium'
    },
    {
      id: 'l2-q2',
      paragraphRef: 2,
      type: 'vocab-context',
      prompt: 'In Paragraph 2, why is it vital to define "variables" with precision?',
      options: [
        'To prevent confounding errors from invalidating the research findings.',
        'To make the paper longer for university word quotas.',
        'To eliminate the need for peer review.',
        'To avoid calculating numbers.'
      ],
      correctAnswer: 'To prevent confounding errors from invalidating the research findings.',
      explanation: 'Paragraph 2 notes that without controlling variables, studies risk confounding errors that invalidate findings.',
      difficulty: 'Medium'
    }
  ],
  writingActivities: [
    {
      id: 'wact-l2-1',
      type: 'sentence-builder',
      title: 'Formulating a Hypothesis',
      instruction: 'Arrange these segments to construct a formal academic hypothesis.',
      contextPrompt: 'Context: Educational research on writing tools.',
      initialState: [
        'in argumentative coherence',
        'will yield significant improvements',
        'Structured digital scaffolding',
        'for university students'
      ],
      solution: [
        'Structured digital scaffolding',
        'will yield significant improvements',
        'in argumentative coherence',
        'for university students'
      ],
      explanation: 'Academic hypothesis syntax: Subject ("Structured digital scaffolding") + Predicate ("will yield significant improvements...") + Domain prepositional phrase.',
      targetVocabWord: 'hypothesis'
    }
  ],
  typingSprintPassage: {
    title: 'Research Methodology Abstract',
    text: 'Rigorous empirical methodology requires researchers to formulate clear hypotheses, control critical variables, and systematically verify findings through peer-reviewed evidence.',
    timeLimitSeconds: 60
  },
  miniWritingPrompt: {
    title: 'Research Justification Statement',
    prompt: 'Write a concise 3-sentence justification (50–70 words) for a proposed educational study, incorporating the words "hypothesis" and "methodology".',
    timeLimitMinutes: 5,
    targetWords: 60
  },
  finalWritingTask: {
    id: 'task-l2',
    title: 'Academic Research Prospectus: Methodological Framework',
    contextScenario: 'You are applying for a postgraduate university research fellowship to investigate digital writing tools.',
    prompt: 'Write an academic research prospectus (150–220 words) outlining your proposed hypothesis, methodology, and expected empirical findings.',
    targetMinWords: 150,
    targetMaxWords: 220,
    timeLimitMinutes: 15,
    recommendedStructure: [
      { step: '1. Research Problem & Gap', guideline: 'Identify the question under investigation.' },
      { step: '2. Proposed Hypothesis', guideline: 'Formulate a testable proposition.' },
      { step: '3. Methodology & Variables', guideline: 'Describe data collection and sampling.' },
      { step: '4. Expected Verification', guideline: 'Explain how findings will contribute to scholarship.' }
    ],
    targetVocabulary: ['hypothesis', 'methodology', 'empirical', 'verify', 'variable', 'findings']
  },
  grammarActivities: [
    {
      id: 'gram-l2-1',
      title: 'Conditional Structures in Research Hypotheses',
      objective: 'Master formal predictive conditionals ("If variables are isolated, then outcomes will indicate...").',
      ruleSummary: 'Scientific hypotheses frequently employ present tense conditional clauses paired with modal predictions.',
      questions: [
        {
          id: 'gql2-1',
          prompt: 'Choose the most academically rigorous hypothesis structure:',
          options: [
            'If students utilize structured rubrics, their argumentative coherence will increase significantly.',
            'If students used rubrics, maybe their writing would be kind of better.',
            'When students will use rubrics, they get higher grades.',
            'Students use rubrics so they write good.'
          ],
          correctAnswer: 'If students utilize structured rubrics, their argumentative coherence will increase significantly.',
          explanation: 'Uses formal academic vocabulary and predictive first conditional syntax ("If + present, will + base verb").',
          academicRule: 'First conditional establishes formal testable hypotheses in scientific discourse.'
        }
      ]
    }
  ]
};

export const LESSON_3_DATA: Lesson = {
  id: 'lesson-3',
  number: 3,
  title: 'Critical Reading & Synthesizing Sources',
  subtitle: 'Evaluating Academic Arguments, Paraphrasing & Attribution',
  level: 'Intermediate / B1–B2',
  estimatedMinutes: 50,
  xpReward: 400,
  isPublished: true,
  vocabulary: [
    {
      id: 'voc-l3-1',
      word: 'critique',
      pos: 'verb',
      simpleDefinition: 'To evaluate a theory or piece of scholarly work in a detailed and analytical way.',
      uzbekTranslation: 'tanqidiy baholamoq, tahlil qilmoq',
      exampleSentence: 'Scholars critique competing literature to identify methodological shortcomings.',
      professionalContext: 'Peer review and literature reviews.',
      collocation: 'critique an argument / scholarly critique',
      synonym: 'evaluate, appraise',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l3-2',
      word: 'paraphrase',
      pos: 'verb',
      simpleDefinition: 'To express the meaning of a source using different words to achieve greater clarity or avoid plagiarism.',
      uzbekTranslation: 'o\'z so\'zlari bilan qayta ifodalamoq',
      exampleSentence: 'Academic writers must paraphrase source ideas rather than overusing direct quotations.',
      professionalContext: 'Academic citations and essays.',
      collocation: 'paraphrase accurately / paraphrase source material',
      synonym: 'rephrase, restate',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l3-3',
      word: 'synthesize',
      pos: 'verb',
      simpleDefinition: 'To combine elements of several diverse sources into a coherent unified argument.',
      uzbekTranslation: 'umumlashtirmoq, sintez qilmoq',
      exampleSentence: 'Literature reviews synthesize multiple perspectives rather than merely summarizing papers individually.',
      professionalContext: 'Academic writing.',
      collocation: 'synthesize sources / synthesize arguments',
      synonym: 'integrate, harmonize',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    }
  ],
  reading: {
    id: 'read-l3',
    title: 'The Art of Academic Synthesis: Moving Beyond Summary',
    topic: 'Critical Reading & Synthesizing Sources',
    wordCount: 560,
    timeLimitMinutes: 20,
    paragraphs: [
      {
        id: 'l3-p1',
        number: 1,
        heading: 'Summary versus Synthesis',
        text: 'A defining milestone in university reading proficiency is the transition from passive summary to critical synthesis. When undergraduate students read scholarly papers, they frequently present a serial catalogue of isolated studies. In contrast, advanced scholars juxtapose opposing arguments, identifying points of agreement and intellectual divergence across the literature.'
      },
      {
        id: 'l3-p2',
        number: 2,
        heading: 'Ethical Paraphrase and Attribution',
        text: 'Accurate paraphrasing is not merely a technical defence against plagiarism; it represents the writer\'s cognitive mastery of source material. When a researcher rephrases an author\'s complex thesis in their own academic voice, they demonstrate genuine conceptual comprehension while paying rigorous attribution to intellectual originators.'
      }
    ]
  },
  readingQuestions: [
    {
      id: 'l3-q1',
      paragraphRef: 1,
      type: 'main-idea',
      prompt: 'What distinguishes advanced academic synthesis from basic summary according to Paragraph 1?',
      options: [
        'Advanced synthesis juxtaposes opposing arguments and identifies intellectual divergence rather than listing isolated studies.',
        'Synthesis avoids citing any author names.',
        'Summary is preferred by senior academic journals.',
        'Synthesis requires quoting whole paragraphs directly.'
      ],
      correctAnswer: 'Advanced synthesis juxtaposes opposing arguments and identifies intellectual divergence rather than listing isolated studies.',
      explanation: 'Paragraph 1 clearly contrasts serial summaries with advanced synthesis that connects opposing arguments.',
      difficulty: 'Medium'
    }
  ],
  writingActivities: [
    {
      id: 'wact-l3-1',
      type: 'sentence-builder',
      title: 'Synthesizing Divergent Literature',
      instruction: 'Assemble this synthesis sentence connecting two scholarly perspectives.',
      contextPrompt: 'Context: Reviewing educational research.',
      initialState: [
        'argue that peer feedback is paramount',
        'emphasize teacher instruction',
        'whereas subsequent studies',
        'Early researchers'
      ],
      solution: [
        'Early researchers',
        'emphasize teacher instruction',
        'whereas subsequent studies',
        'argue that peer feedback is paramount'
      ],
      explanation: 'Contrastive synthesis: Perspective 1 + Contrastive conjunction ("whereas") + Perspective 2.',
      targetVocabWord: 'synthesize'
    }
  ],
  typingSprintPassage: {
    title: 'Critical Synthesis Protocol',
    text: 'Critical academic writing requires scholars to synthesize competing sources, paraphrase complex arguments ethically, and critique methodology with dispassionate precision.',
    timeLimitSeconds: 60
  },
  miniWritingPrompt: {
    title: 'Literature Synthesis Snippet',
    prompt: 'Write 3 sentences (50–70 words) comparing two opposing views on remote learning using the transition "whereas".',
    timeLimitMinutes: 5,
    targetWords: 60
  },
  finalWritingTask: {
    id: 'task-l3',
    title: 'Critical Literature Synthesis: Technology in Higher Education',
    contextScenario: 'You are writing the literature review chapter for your university graduation paper.',
    prompt: 'Synthesize two conflicting scholarly perspectives on digital learning technologies (150–220 words). Paraphrase their core arguments and articulate your critical stance.',
    targetMinWords: 150,
    targetMaxWords: 220,
    timeLimitMinutes: 15,
    recommendedStructure: [
      { step: '1. Topic Introduction', guideline: 'Introduce the debate on digital learning.' },
      { step: '2. First Perspective', guideline: 'Paraphrase the optimistic technologist argument.' },
      { step: '3. Second Counter-Perspective', guideline: 'Present the critical cautionary perspective.' },
      { step: '4. Synthesis & Stance', guideline: 'Resolve the tension with your critical synthesis.' }
    ],
    targetVocabulary: ['critique', 'synthesize', 'paraphrase', 'premise', 'citation', 'stance']
  },
  grammarActivities: [
    {
      id: 'gram-l3-1',
      title: 'Reporting Verbs and Stance Markers',
      objective: 'Select appropriate reporting verbs to signal author agreement, neutrality, or doubt (argue, assert, contend, suggest).',
      ruleSummary: 'Neutral verbs (state, note) describe; strong verbs (assert, contend) indicate bold conviction; tentative verbs (suggest, propose) signal hypothesis.',
      questions: [
        {
          id: 'gql3-1',
          prompt: 'Which sentence uses a strong assertive reporting verb appropriately?',
          options: [
            'The authors contend that institutional policy must mandate immediate reform.',
            'The authors talk about how things need to change.',
            'The authors are saying policy has to be different.',
            'The authors went ahead and mentioned the policy.'
          ],
          correctAnswer: 'The authors contend that institutional policy must mandate immediate reform.',
          explanation: '"Contend" is a strong academic reporting verb indicating reasoned conviction.',
          academicRule: 'Academic reporting verbs convey nuanced evaluative stance.'
        }
      ]
    }
  ]
};

// ==========================================
// 4. FACTORY ADAPTATION ENGINE
// ==========================================

export function getAdaptiveLesson(level: StudentLevel, lessonIdOrNumber: string | number = 1): Lesson {
  const lessonNum = typeof lessonIdOrNumber === 'number' 
    ? lessonIdOrNumber 
    : parseInt(String(lessonIdOrNumber).replace(/\D/g, '') || '1', 10);

  // Choose base lesson from curriculum (Lessons 1 to 5)
  let base: Lesson;
  if (lessonNum === 2) {
    base = JSON.parse(JSON.stringify(LESSON_2_DATA));
  } else if (lessonNum === 3) {
    base = JSON.parse(JSON.stringify(LESSON_3_DATA));
  } else if (lessonNum === 4) {
    base = JSON.parse(JSON.stringify(LESSON_4_DATA));
  } else if (lessonNum === 5) {
    base = JSON.parse(JSON.stringify(LESSON_5_DATA));
  } else {
    base = JSON.parse(JSON.stringify(LESSON_1_DATA));
  }

  // --- 1. A2 ELEMENTARY SUPPORT ADAPTATION ---
  if (level === 'A2') {
    if (lessonNum === 1) {
      return {
        ...base,
        level: 'A2 (Elementary Support)',
        estimatedMinutes: 30,
        xpReward: 280,
        vocabulary: A2_VOCABULARY_L1,
        reading: A2_READING_L1,
        readingQuestions: A2_READING_QUESTIONS_L1,
        writingActivities: A2_WRITING_ACTIVITIES_L1,
        typingSprintPassage: A2_TYPING_SPRINT_L1,
        miniWritingPrompt: A2_MINI_WRITING_L1,
        finalWritingTask: A2_FINAL_WRITING_L1,
        grammarActivities: A2_GRAMMAR_ACTIVITIES_L1
      };
    }

    // For lessons 2 to 5 at A2 level: calibrate word count & scaffolding to elementary level
    return {
      ...base,
      level: 'A2 (Elementary Support)',
      estimatedMinutes: 32,
      xpReward: 290,
      reading: {
        ...base.reading,
        title: `${base.reading.title} (A2 Guided)`,
        wordCount: Math.min(320, base.reading.wordCount)
      },
      finalWritingTask: {
        ...base.finalWritingTask,
        title: `${base.finalWritingTask.title} (A2 Guided)`,
        targetMinWords: 50,
        targetMaxWords: 85,
        timeLimitMinutes: 10,
        prompt: `Write a short, clear message (50–80 words) related to this topic. Use simple sentences and at least 3 target words. Follow the step-by-step structure provided.`
      }
    };
  }

  // --- 2. B1 INTERMEDIATE TIER ADAPTATION ---
  if (level === 'B1') {
    return {
      ...base,
      level: 'B1 (Intermediate)',
      estimatedMinutes: 38,
      xpReward: 320,
      vocabulary: lessonNum === 1 ? B1_VOCABULARY : base.vocabulary,
      reading: lessonNum === 1 ? {
        id: 'read-b1-1',
        title: 'Effective Communication in Modern Workplace Teams',
        topic: 'Professional Communication (Intermediate)',
        wordCount: 465,
        timeLimitMinutes: 15,
        paragraphs: [
          {
            id: 'b1-p1',
            number: 1,
            heading: 'Why Workplace Communication Matters',
            text: 'Good communication is one of the most important skills in any organization. Today, people work together in teams and often share ideas using emails, messaging apps, and video calls. When managers and employees connect regularly, daily work becomes much easier. Clear messages help teams complete their tasks on schedule and avoid costly mistakes.'
          },
          {
            id: 'b1-p2',
            number: 2,
            heading: 'Solving Problems with Direct Information',
            text: 'Many workplace problems happen when messages are not clear. If an email is too brief or confusing, employees may not understand what to do next. To prevent this, workers should clarify their expectations and set direct goals. When everyone knows the primary goal, team members can discuss challenges openly and achieve positive results.'
          },
          {
            id: 'b1-p3',
            number: 3,
            heading: 'The Power of Written Reports',
            text: 'Writing is especially useful in professional life. Before a team can start a new project or buy equipment, managers must provide written information that explains why the idea is useful. When workers provide clear evidence, it is easier to reach an agreement and make a final decision together.'
          },
          {
            id: 'b1-p4',
            number: 4,
            heading: 'How to Keep Messages Simple',
            text: 'Many students believe that professional English must be very complicated. In reality, modern managers prefer short, clear sentences. Using simple words and direct explanations helps colleagues respond quickly. Good professional writing means sharing important ideas without wasting the reader\'s time.'
          }
        ]
      } : base.reading,
      readingQuestions: lessonNum === 1 ? [
        {
          id: 'b1-q1',
          paragraphRef: 1,
          type: 'main-idea',
          prompt: 'According to Paragraph 1, why is workplace communication important?',
          options: [
            'It helps teams complete tasks on schedule and avoid mistakes.',
            'It replaces all face-to-face meetings with automatic messages.',
            'It allows workers to work without any supervision.',
            'It ensures employees only send one email per day.'
          ],
          correctAnswer: 'It helps teams complete tasks on schedule and avoid mistakes.',
          explanation: 'Paragraph 1 clearly states that clear messages help teams complete tasks on schedule and avoid costly mistakes.',
          difficulty: 'Easy'
        },
        {
          id: 'b1-q2',
          paragraphRef: 2,
          type: 'vocab-context',
          prompt: 'In Paragraph 2, what does the word "clarify" mean in the phrase "workers should clarify their expectations"?',
          options: [
            'Make things clear and easy to understand',
            'Delete old messages',
            'Postpone a meeting',
            'Complain about a colleague'
          ],
          correctAnswer: 'Make things clear and easy to understand',
          explanation: '"Clarify" means to explain clearly so that no confusion remains.',
          difficulty: 'Easy'
        },
        {
          id: 'b1-q3',
          paragraphRef: 2,
          type: 'true-false-notgiven',
          prompt: 'Confusing or very short emails can lead to misunderstandings at work.',
          options: ['True', 'False', 'Not Given'],
          correctAnswer: 'True',
          explanation: 'Paragraph 2 notes: "If an email is too brief or confusing, employees may not understand what to do next."',
          difficulty: 'Easy'
        },
        {
          id: 'b1-q4',
          paragraphRef: 3,
          type: 'multiple-choice',
          prompt: 'According to Paragraph 3, what must managers do before starting a new project?',
          options: [
            'Provide written information that explains why the idea is useful.',
            'Wait until the end of the year to ask.',
            'Make a decision without telling anyone.',
            'Hire new employees immediately.'
          ],
          correctAnswer: 'Provide written information that explains why the idea is useful.',
          explanation: 'Paragraph 3 states: "managers must provide written information that explains why the idea is useful."',
          difficulty: 'Medium'
        },
        {
          id: 'b1-q5',
          paragraphRef: 4,
          type: 'main-idea',
          prompt: 'What advice does the author give about professional writing style in Paragraph 4?',
          options: [
            'Use short, clear sentences and simple words rather than complicated language.',
            'Always write very long paragraphs to show academic knowledge.',
            'Avoid writing emails to managers.',
            'Use informal slang in all business messages.'
          ],
          correctAnswer: 'Use short, clear sentences and simple words rather than complicated language.',
          explanation: 'Paragraph 4 emphasizes that managers prefer short, clear sentences and direct explanations.',
          difficulty: 'Easy'
        }
      ] : base.readingQuestions,
      writingActivities: lessonNum === 1 ? B1_WRITING_ACTIVITIES : base.writingActivities,
      typingSprintPassage: lessonNum === 1 ? {
        title: 'Team Communication Sprint',
        text: 'Clear communication is important for every team. When workers share information clearly and support each other, they achieve their daily goals on time.',
        timeLimitSeconds: 60
      } : base.typingSprintPassage,
      miniWritingPrompt: lessonNum === 1 ? {
        title: '5-Minute Mini Writing: Asking to Clarify a Deadline',
        prompt: 'Write a brief 3-sentence email (40–60 words) to a teammate asking to clarify a deadline. Use at least two target words (e.g. clarify, support, schedule).',
        timeLimitMinutes: 5,
        targetWords: 50
      } : base.miniWritingPrompt,
      finalWritingTask: lessonNum === 1 ? {
        id: 'task-b1-1',
        title: 'Team Update Email: Improving Project Communication',
        contextScenario: 'You are working on a university group project. Recently, team members missed deadlines because email instructions were unclear.',
        prompt: 'Write a professional email (100–140 words) to your project group explaining two simple ways to improve communication. Use at least 3 target words (e.g. support, improve, clarify, effective, goal).',
        targetMinWords: 100,
        targetMaxWords: 140,
        timeLimitMinutes: 12,
        recommendedStructure: [
          { step: '1. Greeting & Purpose', guideline: 'Start with: "Dear Team, I am writing to share a brief update on our project communication..."' },
          { step: '2. First Recommendation', guideline: 'Explain how to clarify deadlines (e.g. "First, we should set clear weekly goals...")' },
          { step: '3. Second Recommendation', guideline: 'Suggest sharing updates (e.g. "Second, we should support each other by...")' },
          { step: '4. Polite Closing', guideline: 'End with: "Thank you for your time. Best regards, [Your Name]"' }
        ],
        targetVocabulary: ['support', 'improve', 'effective', 'clarify', 'goal', 'useful', 'complete']
      } : base.finalWritingTask,
      grammarActivities: lessonNum === 1 ? B1_GRAMMAR_ACTIVITIES : base.grammarActivities
    };
  }

  // --- 3. B2+ / C1 ADVANCED TIER ADAPTATION ---
  if (level === 'B2+' || level === 'C1') {
    return {
      ...base,
      level: level === 'C1' ? 'C1 (Advanced Academic)' : 'B2+ (Strong Upper-Intermediate)',
      estimatedMinutes: 50,
      xpReward: 420,
      vocabulary: lessonNum === 1 ? C1_VOCABULARY : base.vocabulary,
      reading: lessonNum === 1 ? {
        id: 'read-c1-1',
        title: 'Discursive Governance and Epistemic Coordination in Complex Institutions',
        topic: 'Professional Communication (Advanced Academic)',
        wordCount: 712,
        timeLimitMinutes: 22,
        paragraphs: [
          {
            id: 'c1-p1',
            number: 1,
            heading: 'The Epistemic Architecture of Modern Enterprises',
            text: 'Within contemporary knowledge-intensive organizations, communication functions not merely as an administrative channel, but as the fundamental epistemological infrastructure through which institutional consensus is negotiated. Modern enterprises have dismantled antiquated Taylorist hierarchies, reorganizing their operational models into distributed, cross-functional networks. In this landscape, institutional efficacy hinges upon the capacity to articulate complex theoretical paradigms with dispassionate precision. Without rigorous discursive standards, strategic directives inevitably suffer semantic drift, precipitating operational friction and squandered capital.'
          },
          {
            id: 'c1-p2',
            number: 2,
            heading: 'Mitigating Ambiguity Across Heterogeneous Domains',
            text: 'A profound challenge confronting academic and corporate executives alike is the pervasive hazard of interpretive asymmetry. Rapid digital discourse frequently produces truncated correspondence that compromises nuanced semantic intent. To mitigate this systemic vulnerability, leaders must synthesize empirical observations and substantiate strategic benchmarks prior to implementation. When researchers and directors evaluate proposals dispassionately, groups can reconcile divergent viewpoints, set constructive historical precedents, and foster enduring cross-border consensus.'
          },
          {
            id: 'c1-p3',
            number: 3,
            heading: 'Empirical Rigor in Governance and Resource Allocation',
            text: 'Formal written documentation occupies an indispensable legal and regulatory nexus within university governance. Before departmental chairs can leverage capital assets or establish new curriculum standards, they must present a robust, multifaceted prospectus corroborated by verifiable metrics. Asserting that an intervention is commercially or pedagogically viable is insufficient; leaders must demonstrate how specific initiatives streamline administrative workflows while upholding scholarly integrity.'
          },
          {
            id: 'c1-p4',
            number: 4,
            heading: 'The Dialectic of Brevity and Analytical Depth',
            text: 'A persistent fallacy among apprentice researchers is the conflation of stylistic prolixity with scholarly depth. In high-stakes institutional decision-making, senior executives place an immense premium on concise prose that distills multifaceted inquiries into actionable policy. Executive briefings require the author to synthesize salient empirical findings while ruthlessly expunging superfluous detail. Subsequent revisions must eliminate redundant nominalizations, replacing colloquialisms with rigorous, domain-native academic collocations.'
          },
          {
            id: 'c1-p5',
            number: 5,
            heading: 'Iterative Reflexivity and Institutional Agility',
            text: 'Ultimately, mastering academic reading and writing is an ongoing process of reflective practice. Just as empirical scientists review experimental outcomes to refine theoretical frameworks, professional communicators must analyze audience feedback to recalibrate rhetorical stance. Institutions that deliberately cultivate this culture of reflective, precise discourse achieve substantial advantages in organizational agility, talent retention, and international scholarly impact.'
          }
        ]
      } : base.reading,
      finalWritingTask: lessonNum === 1 ? {
        id: 'task-c1-1',
        title: 'Strategic Governance Prospectus: Institutional Communication Reform',
        contextScenario: 'You are the Chief Academic Officer overseeing an international university consortium. Inter-faculty collaboration is faltering due to ambiguous protocols, fragmented channels, and conflicting operational priorities.',
        prompt: 'Draft an executive policy prospectus (200–260 words) addressed to the University Senate. Formulate a multifaceted strategy to streamline institutional correspondence, substantiate decision-making with empirical data, and foster cross-disciplinary synergy. Integrate at least four target C1 lexical items.',
        targetMinWords: 200,
        targetMaxWords: 260,
        timeLimitMinutes: 18,
        recommendedStructure: [
          { step: '1. Executive Problem Statement', guideline: 'Characterize the systemic communicative vulnerability and its organizational cost.' },
          { step: '2. Multifaceted Reform Framework', guideline: 'Propose two robust interventions designed to streamline workflows and substantiate decisions.' },
          { step: '3. Discursive Standards', guideline: 'Establish expectations for concise executive briefings and dispassionate debate.' },
          { step: '4. Strategic Trajectory', guideline: 'Articulate the anticipated institutional agility and competitive scholarly advantage.' }
        ],
        targetVocabulary: ['streamline', 'substantiate', 'leverage', 'synthesize', 'robust', 'mitigate', 'dispassionately', 'consensus', 'concise']
      } : base.finalWritingTask
    };
  }

  // --- 4. B1+ / B2 STANDARD UNIVERSITY DEFAULT ---
  return {
    ...base,
    level: level === 'B1+' ? 'B1+ (Strong Intermediate)' : 'B2 (Upper-Intermediate)'
  };
}

export function getAllAdaptiveLessons(level: StudentLevel): Lesson[] {
  return [
    getAdaptiveLesson(level, 1),
    getAdaptiveLesson(level, 2),
    getAdaptiveLesson(level, 3),
    getAdaptiveLesson(level, 4),
    getAdaptiveLesson(level, 5)
  ];
}
