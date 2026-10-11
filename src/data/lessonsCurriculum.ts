import { Lesson } from '../types/lesson';

// ==========================================
// LESSON 4: Executive Reports & Data Commentary
// ==========================================
export const LESSON_4_DATA: Lesson = {
  id: 'lesson-4',
  number: 4,
  title: 'Executive Reports & Data Commentary',
  subtitle: 'Interpreting Trends, Quantifying Metrics & Visual Commentary',
  level: 'Intermediate / B1–B2',
  estimatedMinutes: 55,
  xpReward: 420,
  isPublished: true,
  vocabulary: [
    {
      id: 'voc-l4-1',
      word: 'fluctuation',
      pos: 'noun',
      simpleDefinition: 'An irregular rising and falling in number, amount, or rate.',
      uzbekTranslation: 'o\'zgaruvchanlik, tebranish',
      exampleSentence: 'The quarterly data demonstrated significant fluctuation in student enrollment numbers.',
      professionalContext: 'Statistical reporting and analytics.',
      collocation: 'market fluctuation / sharp fluctuation',
      synonym: 'variation, shift',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l4-2',
      word: 'substantial',
      pos: 'adjective',
      simpleDefinition: 'Of considerable importance, size, or worth.',
      uzbekTranslation: 'sezilarli, salmoqli, katta',
      exampleSentence: 'The department observed a substantial improvement in digital literacy across all cohorts.',
      professionalContext: 'Executive evaluations and summaries.',
      collocation: 'substantial increase / substantial evidence',
      synonym: 'considerable, significant',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l4-3',
      word: 'plateau',
      pos: 'noun',
      simpleDefinition: 'A state of little or no change following a period of activity or progress.',
      uzbekTranslation: 'barqarorlik darajasi, turg\'un fazasi',
      exampleSentence: 'After rapid growth in September, completion metrics reached a stable plateau in November.',
      professionalContext: 'Trend analysis and progress charts.',
      collocation: 'reach a plateau / hit a plateau',
      synonym: 'leveling off, stabilization',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l4-4',
      word: 'correlation',
      pos: 'noun',
      simpleDefinition: 'A mutual relationship or connection between two or more things.',
      uzbekTranslation: 'o\'zaro bog\'liqlik, korrelyatsiya',
      exampleSentence: 'The study established a positive correlation between consistent vocabulary drills and writing test scores.',
      professionalContext: 'Quantitative research and analytics.',
      collocation: 'positive correlation / strong correlation',
      synonym: 'link, association',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l4-5',
      word: 'projection',
      pos: 'noun',
      simpleDefinition: 'An estimate or forecast of a future situation based on a study of present trends.',
      uzbekTranslation: 'prognoz, kelajak taxmini',
      exampleSentence: 'Financial projections suggest that campus software licenses will require additional budget next term.',
      professionalContext: 'Forecasting and planning.',
      collocation: 'budget projection / future projection',
      synonym: 'forecast, prediction',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l4-6',
      word: 'trend',
      pos: 'noun',
      simpleDefinition: 'A general direction in which something is developing or changing.',
      uzbekTranslation: 'tendentsiya, yo\'nalish',
      exampleSentence: 'A notable upward trend is evident in student participation throughout the semester.',
      professionalContext: 'Performance reviews.',
      collocation: 'upward trend / downward trend',
      synonym: 'tendency, pattern',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    }
  ],
  reading: {
    id: 'read-l4',
    title: 'Interpreting Quantitative Trends: The Rhetoric of Data Commentary',
    topic: 'Executive Reports & Data Commentary',
    wordCount: 540,
    timeLimitMinutes: 20,
    paragraphs: [
      {
        id: 'l4-p1',
        number: 1,
        heading: 'Translating Numbers into Actionable Discourse',
        text: 'In modern corporate and academic environments, visual charts and raw statistical tables rarely speak for themselves. Decision-makers depend on skilled analysts to construct a coherent data commentary that highlights meaningful trends rather than simply cataloguing every numerical digit. Effective reporting requires balancing descriptive accuracy with analytical foresight.'
      },
      {
        id: 'l4-p2',
        number: 2,
        heading: 'Describing Fluctuations and Plateaus',
        text: 'When communicating performance metrics, writers must select precise lexical verbs and modifiers. Phrases such as "witnessed a substantial rise" or "reached a predictable plateau" convey trajectory far more clearly than ambiguous expressions like "went up a bit." Furthermore, analysts must distinguish between temporary fluctuations and enduring correlations.'
      },
      {
        id: 'l4-p3',
        number: 3,
        heading: 'Strategic Projections and Recommendations',
        text: 'The definitive section of any executive data report is the forward-looking projection. By analyzing historical trends and identifying causal correlations, writers provide institutional leadership with the rationale necessary to allocate resources strategically.'
      }
    ]
  },
  readingQuestions: [
    {
      id: 'l4-q1',
      paragraphRef: 1,
      type: 'main-idea',
      prompt: 'According to Paragraph 1, why do raw numbers and charts require written data commentary?',
      options: [
        'Because charts rarely speak for themselves; decision-makers need coherent explanations of meaningful trends.',
        'Because numbers in charts are usually inaccurate.',
        'Because university leaders do not know how to read graphs.',
        'Because writing reports makes papers twice as long.'
      ],
      correctAnswer: 'Because charts rarely speak for themselves; decision-makers need coherent explanations of meaningful trends.',
      explanation: 'Paragraph 1 emphasizes that visual data requires skilled analysts to interpret meaningful trends for decision-makers.',
      difficulty: 'Medium'
    },
    {
      id: 'l4-q2',
      paragraphRef: 2,
      type: 'vocab-context',
      prompt: 'In Paragraph 2, what does the term "plateau" mean in the phrase "reached a predictable plateau"?',
      options: [
        'A period of stability where numbers stop increasing or decreasing',
        'A sudden sharp drop to zero',
        'An unexpected server malfunction',
        'A financial penalty'
      ],
      correctAnswer: 'A period of stability where numbers stop increasing or decreasing',
      explanation: 'In trend analysis, a plateau represents a leveling-off phase where metrics stabilize.',
      difficulty: 'Medium'
    }
  ],
  writingActivities: [
    {
      id: 'wact-l4-1',
      type: 'sentence-builder',
      title: 'Describing a Statistical Trend',
      instruction: 'Arrange these blocks to construct an executive data commentary sentence.',
      contextPrompt: 'Context: University digital lab adoption metrics.',
      initialState: [
        'demonstrated a substantial increase',
        'in weekly active engagement',
        'During the final quarter',
        'student submissions'
      ],
      solution: [
        'During the final quarter',
        'student submissions',
        'demonstrated a substantial increase',
        'in weekly active engagement'
      ],
      explanation: 'Time frame ("During the final quarter") + Subject ("student submissions") + Verb phrase ("demonstrated a substantial increase") + Metric prepositional phrase.',
      targetVocabWord: 'substantial'
    }
  ],
  typingSprintPassage: {
    title: 'Executive Data Commentary Protocol',
    text: 'Formal data commentary interprets statistical fluctuations, identifies positive correlations, and presents verifiable projections to guide executive resource allocation.',
    timeLimitSeconds: 60
  },
  miniWritingPrompt: {
    title: '5-Minute Mini Writing: Describing a Chart Trend',
    prompt: 'Write 3 sentences (50–70 words) describing a simulated chart where student completion rates increased by 25% and then stabilized, using the words "trend" and "plateau".',
    timeLimitMinutes: 5,
    targetWords: 60
  },
  finalWritingTask: {
    id: 'task-l4',
    title: 'Executive Data Commentary: University Writing Lab Metrics',
    contextScenario: 'You are the Lead Academic Analyst presenting the annual performance report of the University Writing Center.',
    prompt: 'Write a formal executive data commentary (150–220 words) analyzing student engagement trends over the past academic year. Describe key fluctuations, explain positive correlations with grade performance, and provide a 6-month projection.',
    targetMinWords: 150,
    targetMaxWords: 220,
    timeLimitMinutes: 15,
    recommendedStructure: [
      { step: '1. Overview of Data', guideline: 'State the source and primary metric under review.' },
      { step: '2. Trend Analysis & Fluctuations', guideline: 'Highlight substantial increases and periods of plateau.' },
      { step: '3. Correlation with Outcomes', guideline: 'Explain the positive correlation with academic grades.' },
      { step: '4. Executive Projection', guideline: 'Conclude with strategic projections for the upcoming semester.' }
    ],
    targetVocabulary: ['fluctuation', 'substantial', 'plateau', 'correlation', 'projection', 'trend']
  },
  grammarActivities: [
    {
      id: 'gram-l4-1',
      title: 'Adverb-Verb vs. Adjective-Noun Collocations in Data Commentary',
      objective: 'Master formal variations for describing change: "rose substantially" vs. "a substantial rise".',
      ruleSummary: 'Use [Verb + Adverb] (e.g., increased substantially) or [Adjective + Noun] (e.g., showed a substantial increase) to maintain lexical variety in formal reports.',
      questions: [
        {
          id: 'gql4-1',
          prompt: 'Select the grammatically accurate and formal data commentary phrasing:',
          options: [
            'Student participation increased substantially between March and May.',
            'Student participation increased substantial between March and May.',
            'Student participation did a big rise between March and May.',
            'Student participation was substantially increase between March and May.'
          ],
          correctAnswer: 'Student participation increased substantially between March and May.',
          explanation: 'Verbs (increased) are modified by adverbs ending in -ly (substantially).',
          academicRule: 'Verb + Adverb of degree in quantitative reporting.'
        }
      ]
    }
  ]
};

// ==========================================
// LESSON 5: Proposal Writing & Grant Acquisition
// ==========================================
export const LESSON_5_DATA: Lesson = {
  id: 'lesson-5',
  number: 5,
  title: 'Proposal Writing & Grant Acquisition',
  subtitle: 'Feasibility Studies, Deliverables & Institutional Persuasion',
  level: 'Intermediate / B1–B2',
  estimatedMinutes: 60,
  xpReward: 450,
  isPublished: true,
  vocabulary: [
    {
      id: 'voc-l5-1',
      word: 'feasibility',
      pos: 'noun',
      simpleDefinition: 'The state or degree of being easily or conveniently done; practical viability.',
      uzbekTranslation: 'amalga oshiruvchanlik, loyiha maqbulligi',
      exampleSentence: 'The committee conducted a comprehensive feasibility study before allocating campus funds.',
      professionalContext: 'Grant proposals and project management.',
      collocation: 'feasibility study / economic feasibility',
      synonym: 'viability, practicality',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l5-2',
      word: 'stakeholder',
      pos: 'noun',
      simpleDefinition: 'A person with an interest or concern in something, especially a business or educational initiative.',
      uzbekTranslation: 'manfaatdor tomon, ishtirokchi (stakeholder)',
      exampleSentence: 'University stakeholders include students, faculty members, institutional sponsors, and community partners.',
      professionalContext: 'Governance and institutional consultations.',
      collocation: 'key stakeholder / stakeholder engagement',
      synonym: 'interested party, partner',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l5-3',
      word: 'allocate',
      pos: 'verb',
      simpleDefinition: 'To distribute resources or duties for a particular purpose.',
      uzbekTranslation: 'taqsimlamoq, ajratmoq',
      exampleSentence: 'The dean decided to allocate grant funding to upgrade the language laboratory workstations.',
      professionalContext: 'Budgeting and resource allocation.',
      collocation: 'allocate resources / allocate budget',
      synonym: 'assign, designate',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l5-4',
      word: 'milestone',
      pos: 'noun',
      simpleDefinition: 'An action or event marking a significant stage in a project or development.',
      uzbekTranslation: 'bosqich, muhim marra (milestone)',
      exampleSentence: 'Completing the pilot curriculum trial in December is our most critical project milestone.',
      professionalContext: 'Project timelines and deliverables.',
      collocation: 'reach a milestone / project milestone',
      synonym: 'benchmark, breakthrough',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l5-5',
      word: 'deliverable',
      pos: 'noun',
      simpleDefinition: 'A tangible or intangible thing able to be provided as a result of a process or project.',
      uzbekTranslation: 'topshiriladigan natija, mahsulot (deliverable)',
      exampleSentence: 'Key project deliverables include the 5-lesson digital curriculum and student assessment rubrics.',
      professionalContext: 'Contractual proposals and grants.',
      collocation: 'key deliverable / deliverable timeline',
      synonym: 'product, output',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    },
    {
      id: 'voc-l5-6',
      word: 'rationale',
      pos: 'noun',
      simpleDefinition: 'A set of reasons or a logical basis for a course of action or belief.',
      uzbekTranslation: 'asos, mantiqiy asoslash',
      exampleSentence: 'The proposal presents a compelling pedagogical rationale for adopting adaptive writing software.',
      professionalContext: 'Grant justifications and theses.',
      collocation: 'compelling rationale / rationale behind',
      synonym: 'justification, reasoning',
      difficulty: 'Intermediate',
      masteryState: 'New',
      exposureCount: 0,
      correctCount: 0,
      incorrectCount: 0
    }
  ],
  reading: {
    id: 'read-l5',
    title: 'The Architecture of Persuasion: Crafting Winning Academic Proposals',
    topic: 'Proposal Writing & Grant Acquisition',
    wordCount: 560,
    timeLimitMinutes: 20,
    paragraphs: [
      {
        id: 'l5-p1',
        number: 1,
        heading: 'The Competitive Dynamics of Academic Funding',
        text: 'Acquiring research grants and institutional support has become an indispensable facet of university career progression. Review panels evaluate hundreds of competing proposals each cycle. Successful applicants recognize that rhetorical eloquence alone is insufficient; proposals must substantiate their feasibility with concrete operational milestones and transparent budget allocation.'
      },
      {
        id: 'l5-p2',
        number: 2,
        heading: 'Engaging Stakeholders and Articulating Rationale',
        text: 'A persuasive proposal establishes immediate relevance by demonstrating how the planned intervention benefits diverse stakeholders. Whether improving student writing fluency or equipping faculty with modern digital tools, the writer must establish a rigorous pedagogical rationale that aligns directly with institutional priorities.'
      },
      {
        id: 'l5-p3',
        number: 3,
        heading: 'Defining Measurable Deliverables',
        text: 'Review boards place great weight on verifiable outcomes. Rather than offering vague promises of "enhancing education," high-scoring proposals articulate specific, measurable deliverables. Setting clear timeline benchmarks reassures funding bodies that their investment will produce enduring scholarly and institutional dividends.'
      }
    ]
  },
  readingQuestions: [
    {
      id: 'l5-q1',
      paragraphRef: 1,
      type: 'main-idea',
      prompt: 'According to Paragraph 1, what makes a research grant proposal stand out to review panels?',
      options: [
        'Substantiating project feasibility with operational milestones and transparent budget allocation.',
        'Using poetic language without mentioning numbers.',
        'Asking for funding without any timeline.',
        'Submitting handwritten personal notes.'
      ],
      correctAnswer: 'Substantiating project feasibility with operational milestones and transparent budget allocation.',
      explanation: 'Paragraph 1 explains that successful applicants substantiate feasibility with concrete milestones and transparent budgets.',
      difficulty: 'Medium'
    },
    {
      id: 'l5-q2',
      paragraphRef: 3,
      type: 'vocab-context',
      prompt: 'In Paragraph 3, why is it essential to articulate specific "deliverables"?',
      options: [
        'To reassure funding committees with verifiable, measurable project outcomes and products.',
        'To hide the true cost of the project.',
        'To delay the project indefinitely.',
        'To eliminate the need for student evaluations.'
      ],
      correctAnswer: 'To reassure funding committees with verifiable, measurable project outcomes and products.',
      explanation: 'Paragraph 3 notes that articulating specific deliverables reassures funding bodies of measurable dividends.',
      difficulty: 'Medium'
    }
  ],
  writingActivities: [
    {
      id: 'wact-l5-1',
      type: 'sentence-builder',
      title: 'Articulating a Project Deliverable',
      instruction: 'Arrange these phrases into a persuasive grant proposal sentence.',
      contextPrompt: 'Context: University digital learning grant application.',
      initialState: [
        'will allocate matching funds',
        'Upon reaching the second milestone',
        'for verified project deliverables',
        'the university committee'
      ],
      solution: [
        'Upon reaching the second milestone',
        'the university committee',
        'will allocate matching funds',
        'for verified project deliverables'
      ],
      explanation: 'Conditional milestone phrase + Subject ("the university committee") + Modal verb phrase ("will allocate matching funds") + Purpose phrase.',
      targetVocabWord: 'allocate'
    }
  ],
  typingSprintPassage: {
    title: 'Grant Proposal Execution Protocol',
    text: 'Persuasive university proposals demonstrate project feasibility, address key stakeholder priorities, allocate resources transparently, and specify verifiable milestone deliverables.',
    timeLimitSeconds: 60
  },
  miniWritingPrompt: {
    title: '5-Minute Mini Writing: Proposal Rationale',
    prompt: 'Write 3 sentences (50–70 words) formulating the pedagogical rationale for introducing digital writing labs, using the words "rationale" and "stakeholder".',
    timeLimitMinutes: 5,
    targetWords: 60
  },
  finalWritingTask: {
    id: 'task-l5',
    title: 'Grant Proposal Prospectus: University Writing Lab Innovation',
    contextScenario: 'You are applying for a $15,000 University Pedagogical Innovation Grant to establish an Adaptive English Writing Center.',
    prompt: 'Draft an executive grant proposal prospectus (150–220 words) for the Academic Review Committee. Outline your project rationale, explain feasibility, specify key deliverables, and identify primary stakeholders.',
    targetMinWords: 150,
    targetMaxWords: 220,
    timeLimitMinutes: 15,
    recommendedStructure: [
      { step: '1. Executive Project Summary', guideline: 'State the title, funding requested, and primary goal.' },
      { step: '2. Pedagogical Rationale & Need', guideline: 'Justify why university students urgently require adaptive writing instruction.' },
      { step: '3. Feasibility & Resource Allocation', guideline: 'Explain how funds will be allocated across milestones.' },
      { step: '4. Measurable Deliverables', guideline: 'Detail the concrete deliverables and stakeholder benefits.' }
    ],
    targetVocabulary: ['feasibility', 'stakeholder', 'allocate', 'milestone', 'deliverable', 'rationale']
  },
  grammarActivities: [
    {
      id: 'gram-l5-1',
      title: 'Modal Verbs of Obligation and Proposal Intent ("will, shall, ensure")',
      objective: 'Utilize decisive modal verbs in grant proposals to inspire institutional confidence.',
      ruleSummary: 'In grant proposals, use assertive auxiliary verbs ("The project team will deliver...", "The intervention shall ensure...") rather than tentative possibilities ("maybe we can try to...").',
      questions: [
        {
          id: 'gql5-1',
          prompt: 'Select the most persuasive and professionally assertive grant proposal statement:',
          options: [
            'The proposed initiative will deliver verifiable literacy gains across all participating undergraduate cohorts.',
            'We think maybe our idea could possibly make writing a little bit better if things go well.',
            'It is hoped that students might perhaps enjoy writing more.',
            'Maybe the committee could give us some money to see what happens.'
          ],
          correctAnswer: 'The proposed initiative will deliver verifiable literacy gains across all participating undergraduate cohorts.',
          explanation: '"Will deliver verifiable literacy gains" projects confidence, clarity, and accountability.',
          academicRule: 'Assertive modal phrasing conveys commitment and feasibility in proposal discourse.'
        }
      ]
    }
  ]
};
