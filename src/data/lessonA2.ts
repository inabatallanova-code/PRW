import { VocabularyWord, ReadingPassage, ReadingQuestion, WritingTask, WritingActivity, GrammarActivity } from '../types/lesson';

// ==========================================
// A2 ELEMENTARY SUPPORT VOCABULARY (LESSON 1)
// ==========================================
export const A2_VOCABULARY_L1: VocabularyWord[] = [
  {
    id: 'voc-a2-1',
    word: 'support',
    pos: 'verb',
    simpleDefinition: 'To help someone so their work is easier.',
    uzbekTranslation: 'yordam bermoq, qo\'llab-quvvatlamoq',
    exampleSentence: 'Good teammates support each other when work is difficult.',
    professionalContext: 'Daily teamwork and cooperation.',
    collocation: 'support a teammate / give support',
    synonym: 'help, assist',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-2',
    word: 'improve',
    pos: 'verb',
    simpleDefinition: 'To make something better than before.',
    uzbekTranslation: 'yaxshilamoq, rivojlantirmoq',
    exampleSentence: 'Reading every day helps improve your English skills.',
    professionalContext: 'Personal learning and skill practice.',
    collocation: 'improve skills / improve writing',
    synonym: 'make better, develop',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-3',
    word: 'help',
    pos: 'verb',
    simpleDefinition: 'To do something useful for another person.',
    uzbekTranslation: 'yordam bermoq',
    exampleSentence: 'Can you please help me with the project slide?',
    professionalContext: 'Classroom and office collaboration.',
    collocation: 'help someone / ask for help',
    synonym: 'support, assist',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-4',
    word: 'plan',
    pos: 'noun',
    simpleDefinition: 'A list of steps you decide to do in the future.',
    uzbekTranslation: 'reja',
    exampleSentence: 'We have a clear plan for our group presentation next week.',
    professionalContext: 'Project organization and deadlines.',
    collocation: 'make a plan / follow a plan',
    synonym: 'schedule, project',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-5',
    word: 'team',
    pos: 'noun',
    simpleDefinition: 'A group of people working together on the same task.',
    uzbekTranslation: 'jamoa, guruh',
    exampleSentence: 'Our project team has four university students.',
    professionalContext: 'Workplace groups and study circles.',
    collocation: 'team member / work in a team',
    synonym: 'group, crew',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-6',
    word: 'clear',
    pos: 'adjective',
    simpleDefinition: 'Easy to read, understand, or hear without confusion.',
    uzbekTranslation: 'aniq, ravshan, tushunarli',
    exampleSentence: 'The teacher gave clear instructions for the essay.',
    professionalContext: 'Writing instructions and email messages.',
    collocation: 'clear message / clear explanation',
    synonym: 'simple, plain',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-7',
    word: 'email',
    pos: 'noun',
    simpleDefinition: 'A digital message sent through a computer or smartphone.',
    uzbekTranslation: 'elektron xat (email)',
    exampleSentence: 'I will send an email with the meeting time tonight.',
    professionalContext: 'Official correspondence.',
    collocation: 'send an email / receive an email',
    synonym: 'message, note',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-8',
    word: 'check',
    pos: 'verb',
    simpleDefinition: 'To look at something carefully to find mistakes or make sure it is correct.',
    uzbekTranslation: 'tekshirmoq',
    exampleSentence: 'Always check your spelling before clicking send.',
    professionalContext: 'Proofreading and quality control.',
    collocation: 'check work / double check',
    synonym: 'review, inspect',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-9',
    word: 'meet',
    pos: 'verb',
    simpleDefinition: 'To come together with people to talk or work.',
    uzbekTranslation: 'uchrashmoq, yig\'ilmoq',
    exampleSentence: 'We can meet in the library at 2 PM to prepare.',
    professionalContext: 'Appointments and scheduled discussions.',
    collocation: 'meet for coffee / meet in the office',
    synonym: 'gather, assemble',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-10',
    word: 'work',
    pos: 'noun',
    simpleDefinition: 'The tasks, job, or study activities someone does.',
    uzbekTranslation: 'ish, mehnat',
    exampleSentence: 'Thank you for your hard work on the class report.',
    professionalContext: 'Academic and professional duties.',
    collocation: 'finish work / do work',
    synonym: 'task, job',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-11',
    word: 'simple',
    pos: 'adjective',
    simpleDefinition: 'Easy to do or understand, not complicated.',
    uzbekTranslation: 'oddiy, sodda',
    exampleSentence: 'Use simple English sentences so everyone understands.',
    professionalContext: 'Clear communication.',
    collocation: 'simple sentence / simple rule',
    synonym: 'easy, basic',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-12',
    word: 'share',
    pos: 'verb',
    simpleDefinition: 'To tell information or send files to others.',
    uzbekTranslation: 'ulashmoq, baham ko\'rmoq',
    exampleSentence: 'Please share your research notes with our team.',
    professionalContext: 'Collaborative projects.',
    collocation: 'share information / share notes',
    synonym: 'distribute, send',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-13',
    word: 'idea',
    pos: 'noun',
    simpleDefinition: 'A thought, plan, or suggestion formed in the mind.',
    uzbekTranslation: 'fikr, g\'oya',
    exampleSentence: 'She suggested a great idea for our course project.',
    professionalContext: 'Brainstorming and group planning.',
    collocation: 'good idea / share ideas',
    synonym: 'thought, concept',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-14',
    word: 'message',
    pos: 'noun',
    simpleDefinition: 'A piece of written or spoken information sent to someone.',
    uzbekTranslation: 'xabar, bildirishnoma',
    exampleSentence: 'I left a short message on the group chat.',
    professionalContext: 'Quick updates and inquiries.',
    collocation: 'send a message / read a message',
    synonym: 'note, text',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-15',
    word: 'time',
    pos: 'noun',
    simpleDefinition: 'The hour and minutes when something happens.',
    uzbekTranslation: 'vaqt, soat',
    exampleSentence: 'What time is our university seminar tomorrow?',
    professionalContext: 'Scheduling and deadlines.',
    collocation: 'on time / meeting time',
    synonym: 'hour, schedule',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-16',
    word: 'send',
    pos: 'verb',
    simpleDefinition: 'To cause a message, letter, or file to go to someone else.',
    uzbekTranslation: 'yubormoq, jo\'natmoq',
    exampleSentence: 'Please send the finished report before 5 PM.',
    professionalContext: 'Document dispatch.',
    collocation: 'send an email / send files',
    synonym: 'deliver, dispatch',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-17',
    word: 'goal',
    pos: 'noun',
    simpleDefinition: 'Something you want to achieve or finish successfully.',
    uzbekTranslation: 'maqsad, vazifa',
    exampleSentence: 'Our primary goal this month is to finish the essay.',
    professionalContext: 'Objectives and milestones.',
    collocation: 'reach a goal / set a goal',
    synonym: 'aim, target',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-18',
    word: 'useful',
    pos: 'adjective',
    simpleDefinition: 'Helping you to do or get what you want.',
    uzbekTranslation: 'foydali, kerakli',
    exampleSentence: 'The writing template was very useful for beginners.',
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
    id: 'voc-a2-19',
    word: 'start',
    pos: 'verb',
    simpleDefinition: 'To begin doing an activity or task.',
    uzbekTranslation: 'boshlamoq',
    exampleSentence: 'Let us start our meeting by reviewing the plan.',
    professionalContext: 'Project kickoff and meetings.',
    collocation: 'start a project / start work',
    synonym: 'begin, commence',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'voc-a2-20',
    word: 'finish',
    pos: 'verb',
    simpleDefinition: 'To complete all parts of a task or reach the end.',
    uzbekTranslation: 'tugatmoq, yakunlamoq',
    exampleSentence: 'We can finish the project before Friday.',
    professionalContext: 'Completing assignments.',
    collocation: 'finish on time / finish a task',
    synonym: 'complete, conclude',
    difficulty: 'Intermediate',
    masteryState: 'New',
    exposureCount: 0,
    correctCount: 0,
    incorrectCount: 0
  }
];

// ==========================================
// A2 ELEMENTARY SUPPORT READING PASSAGE (LESSON 1)
// ==========================================
export const A2_READING_L1: ReadingPassage = {
  id: 'read-a2-1',
  title: 'Working in a Team: Clear Communication at Work and University',
  topic: 'Professional Communication (A2 Elementary Support)',
  wordCount: 265,
  timeLimitMinutes: 12,
  paragraphs: [
    {
      id: 'a2-p1',
      number: 1,
      heading: '1. Why Good Communication Matters',
      text: 'Good communication is very important in every workplace and university. Today, students and workers send emails, messages, and files every day. When teammates communicate clearly, daily work is fast and friendly. Everyone understands their role and completes tasks on time.'
    },
    {
      id: 'a2-p2',
      number: 2,
      heading: '2. Writing Simple and Clear Emails',
      text: 'Writing simple emails saves a lot of time. If a message is too long or confusing, colleagues can make mistakes. It is always better to write short sentences. For example, write: "We have a project meeting tomorrow at 10 AM. Please bring your notes." This is clear, polite, and easy to understand.'
    },
    {
      id: 'a2-p3',
      number: 3,
      heading: '3. Supporting Your Teammates Politely',
      text: 'Good team members support each other. If someone has a question, they should ask politely. Writing polite phrases like "Could you please help me?" or "Can we meet today?" makes people happy to cooperate. When we share ideas and check our work before sending, our team reaches its goals successfully.'
    }
  ]
};

// ==========================================
// A2 ELEMENTARY READING QUESTIONS (LESSON 1)
// ==========================================
export const A2_READING_QUESTIONS_L1: ReadingQuestion[] = [
  {
    id: 'a2-q1',
    paragraphRef: 1,
    type: 'main-idea',
    prompt: 'According to Paragraph 1, why is clear communication important?',
    options: [
      'It helps teammates understand their tasks and complete work on time.',
      'It makes sure nobody needs to talk to anyone.',
      'It allows students to skip their university classes.',
      'It stops people from sending emails.'
    ],
    correctAnswer: 'It helps teammates understand their tasks and complete work on time.',
    explanation: 'Paragraph 1 states: "When teammates communicate clearly, daily work is fast and friendly. Everyone understands their role and completes tasks on time."',
    difficulty: 'Easy'
  },
  {
    id: 'a2-q2',
    paragraphRef: 2,
    type: 'vocab-context',
    prompt: 'In Paragraph 2, what does the word "clear" mean in "This is clear, polite, and easy to understand"?',
    options: [
      'Easy to understand and not confusing',
      'Very expensive to buy',
      'Written in secret code',
      'Sent only at night'
    ],
    correctAnswer: 'Easy to understand and not confusing',
    explanation: '"Clear" means simple, plain, and easy to understand.',
    difficulty: 'Easy'
  },
  {
    id: 'a2-q3',
    paragraphRef: 2,
    type: 'multiple-choice',
    prompt: 'According to Paragraph 2, what can happen if an email is confusing or too long?',
    options: [
      'Colleagues can make mistakes.',
      'Computers will stop working.',
      'Everyone will get a promotion.',
      'The manager will be very happy.'
    ],
    correctAnswer: 'Colleagues can make mistakes.',
    explanation: 'Paragraph 2 explains: "If a message is too long or confusing, colleagues can make mistakes."',
    difficulty: 'Easy'
  },
  {
    id: 'a2-q4',
    paragraphRef: 3,
    type: 'sentence-completion',
    prompt: 'Which phrase is given in Paragraph 3 as an example of a polite request?',
    options: [
      '"Could you please help me?"',
      '"Do this right now!"',
      '"I do not want to work."',
      '"Why are you late?"'
    ],
    correctAnswer: '"Could you please help me?"',
    explanation: 'Paragraph 3 highlights polite requests such as "Could you please help me?" and "Can we meet today?".',
    difficulty: 'Easy'
  },
  {
    id: 'a2-q5',
    paragraphRef: 2,
    type: 'true-false-notgiven',
    prompt: 'Writing short and simple sentences helps save time at work.',
    options: ['True', 'False', 'Not Given'],
    correctAnswer: 'True',
    explanation: 'Paragraph 2 confirms: "Writing simple emails saves a lot of time. It is always better to write short sentences."',
    difficulty: 'Easy'
  },
  {
    id: 'a2-q6',
    paragraphRef: 3,
    type: 'main-idea',
    prompt: 'What should teammates do before sending their work to reach their goals?',
    options: [
      'Share ideas and check their work carefully.',
      'Delete all their notes immediately.',
      'Wait for three weeks without talking.',
      'Send messages with informal slang.'
    ],
    correctAnswer: 'Share ideas and check their work carefully.',
    explanation: 'Paragraph 3 concludes: "When we share ideas and check our work before sending, our team reaches its goals successfully."',
    difficulty: 'Easy'
  }
];

// ==========================================
// A2 ELEMENTARY GRAMMAR DRILLS (LESSON 1)
// ==========================================
export const A2_GRAMMAR_ACTIVITIES_L1: GrammarActivity[] = [
  {
    id: 'gram-a2-1',
    title: 'Word Order in Workplace Sentences (S-V-O-T)',
    objective: 'Learn the basic English sentence order: Subject + Verb + Object + Time/Place.',
    ruleSummary: 'English sentences follow Subject (Who) + Verb (Action) + Object (What) + Time/Place (When/Where). Example: "We (Subject) have (Verb) a meeting (Object) tomorrow (Time)."',
    questions: [
      {
        id: 'gqa2-1',
        prompt: 'Choose the sentence with the correct word order:',
        options: [
          'We have a team meeting tomorrow at ten.',
          'Tomorrow at ten have we a team meeting.',
          'A team meeting we have tomorrow at ten.',
          'Have we tomorrow a team meeting at ten.'
        ],
        correctAnswer: 'We have a team meeting tomorrow at ten.',
        explanation: 'Standard order: Subject (We) + Verb (have) + Object (a team meeting) + Time (tomorrow at ten).',
        academicRule: 'Subject + Verb + Object + Time expression.'
      },
      {
        id: 'gqa2-2',
        prompt: 'Choose the correct sentence for sending an email:',
        options: [
          'I sent the project notes yesterday afternoon.',
          'Yesterday afternoon sent I the project notes.',
          'The project notes I sent yesterday afternoon to you was.',
          'I yesterday sent the project notes.'
        ],
        correctAnswer: 'I sent the project notes yesterday afternoon.',
        explanation: 'Subject (I) + Verb (sent) + Object (the project notes) + Time (yesterday afternoon).',
        academicRule: 'Time expressions go at the end of the sentence or at the very beginning with a comma.'
      }
    ]
  },
  {
    id: 'gram-a2-2',
    title: 'Polite Requests with Modal Verbs ("Could you / Can you")',
    objective: 'Use "Could you please..." and "Can we..." for polite workplace emails instead of direct orders.',
    ruleSummary: 'To sound polite in professional emails, do NOT say "Help me" or "Send notes". Instead say: "Could you please help me?" or "Could you send the notes, please?"',
    questions: [
      {
        id: 'gqa2-3',
        prompt: 'Choose the most polite sentence to ask a teammate for their notes:',
        options: [
          'Could you please send me your notes?',
          'Send me your notes right now.',
          'I want notes from you quickly.',
          'Give me notes today.'
        ],
        correctAnswer: 'Could you please send me your notes?',
        explanation: '"Could you please [verb]...?" is the standard polite request in professional English.',
        academicRule: 'Modal auxiliary "Could" + Subject + "please" + base verb forms polite requests.'
      },
      {
        id: 'gqa2-4',
        prompt: 'Choose the polite way to suggest a meeting time:',
        options: [
          'Can we meet tomorrow at two o\'clock?',
          'You must meet me at two o\'clock.',
          'Meeting tomorrow at two now.',
          'Be at my office at two.'
        ],
        correctAnswer: 'Can we meet tomorrow at two o\'clock?',
        explanation: '"Can we meet...?" invites polite agreement rather than giving a strict command.',
        academicRule: '"Can we + base verb" offers a polite scheduling proposal.'
      }
    ]
  },
  {
    id: 'gram-a2-3',
    title: 'Connecting Sentences with "and", "but", "because"',
    objective: 'Connect short thoughts to explain reasons and contrast in simple messages.',
    ruleSummary: 'Use "and" to add information, "but" to show a contrast/difference, and "because" to give a reason.',
    questions: [
      {
        id: 'gqa2-5',
        prompt: 'Choose the correct linking word: "We need to finish the slides today ________ the presentation is tomorrow."',
        options: ['because', 'but', 'or', 'although'],
        correctAnswer: 'because',
        explanation: '"Because" explains the reason why the slides must be finished today.',
        academicRule: 'Use "because" to introduce a cause or reason.'
      },
      {
        id: 'gqa2-6',
        prompt: 'Choose the correct linking word: "I wrote the project summary, ________ I forgot to check the dates."',
        options: ['but', 'because', 'so', 'and'],
        correctAnswer: 'but',
        explanation: '"But" shows contrast between finishing the summary and forgetting the dates.',
        academicRule: 'Use "but" to connect contrasting facts.'
      }
    ]
  }
];

// ==========================================
// A2 ELEMENTARY WRITING PREP ACTIVITIES (LESSON 1)
// ==========================================
export const A2_WRITING_ACTIVITIES_L1: WritingActivity[] = [
  {
    id: 'wact-a2-1',
    type: 'sentence-builder',
    title: 'Build a Clear Workplace Sentence',
    instruction: 'Put these 4 blocks in order to make a clear meeting message.',
    contextPrompt: 'Context: Scheduling a project meeting.',
    initialState: [
      'tomorrow at 10 AM',
      'a project meeting',
      'We have',
      'in room 204'
    ],
    solution: [
      'We have',
      'a project meeting',
      'tomorrow at 10 AM',
      'in room 204'
    ],
    explanation: 'Basic English order: Subject + Verb ("We have") + Object ("a project meeting") + Time ("tomorrow at 10 AM") + Place ("in room 204").',
    targetVocabWord: 'meet'
  },
  {
    id: 'wact-a2-2',
    type: 'formal-informal',
    title: 'Choosing a Polite Email Greeting',
    instruction: 'Select the polite greeting for a university professor or team supervisor.',
    contextPrompt: 'Starting an email to your teacher or manager.',
    initialState: 'Options',
    solution: 'Dear Professor Karimova,',
    explanation: '"Dear Professor [Name]," is respectful and standard for academic and workplace correspondence.',
    targetVocabWord: 'email'
  },
  {
    id: 'wact-a2-3',
    type: 'vocab-upgrade',
    title: 'Upgrading Basic Words',
    instruction: 'Upgrade the simple word "good" to a more descriptive workplace word.',
    contextPrompt: 'Sentence: "The presentation plan was very [good / useful] for our group."',
    initialState: 'good',
    solution: 'useful',
    explanation: '"Useful" tells the reader that the plan helped them get real work done.',
    targetVocabWord: 'useful'
  },
  {
    id: 'wact-a2-4',
    type: 'linking-words',
    title: 'Reason Linker ("because")',
    instruction: 'Choose the word that introduces the reason for the message.',
    contextPrompt: 'I am writing _______ I want to confirm our meeting time.',
    initialState: '',
    solution: 'because',
    explanation: '"Because" introduces the reason why you are writing the email.',
    targetVocabWord: 'message'
  },
  {
    id: 'wact-a2-5',
    type: 'formal-informal',
    title: 'Polite Email Closing',
    instruction: 'Select the standard polite closing for your email.',
    contextPrompt: 'Ending an email to a group teammate.',
    initialState: 'Options',
    solution: 'Best regards,',
    explanation: '"Best regards," is universally accepted and polite in academic and workplace emails.',
    targetVocabWord: 'email'
  }
];

// ==========================================
// A2 ELEMENTARY TYPING SPRINT (LESSON 1)
// ==========================================
export const A2_TYPING_SPRINT_L1 = {
  title: 'Clear Team Message Sprint (A2)',
  text: 'Good communication helps our team work well. When messages are clear and simple, everyone finishes their tasks on time. Please send your project notes today.',
  timeLimitSeconds: 60
};

// ==========================================
// A2 ELEMENTARY MINI WRITING PROMPT (LESSON 1)
// ==========================================
export const A2_MINI_WRITING_L1 = {
  title: '5-Minute Mini Writing: Asking a Teammate for Help',
  prompt: 'Write a short 3-sentence message (30–45 words) to your classmate asking for their lecture notes. Example: "Hello [Name]. Could you please send me your notes from today\'s class? Thank you for your help!"',
  timeLimitMinutes: 5,
  targetWords: 35
};

// ==========================================
// A2 ELEMENTARY FINAL WRITING TASK (LESSON 1)
// ==========================================
export const A2_FINAL_WRITING_L1: WritingTask = {
  id: 'task-a2-1',
  title: 'Team Update Email: Scheduling Our Meeting',
  contextScenario: 'You are working on a university group project with a partner. You need to send a short email to agree on a meeting time and what to bring.',
  prompt: 'Write a short, polite email (50–80 words) to your teammate. Include: 1) A friendly greeting, 2) The proposed meeting day and time, 3) What materials to bring, 4) A polite closing. Use at least 3 target words: support, plan, meet, clear, help, email.',
  targetMinWords: 50,
  targetMaxWords: 85,
  timeLimitMinutes: 10,
  recommendedStructure: [
    { step: '1. Greeting', guideline: 'Start with: "Dear [Name]," or "Hello [Name],"' },
    { step: '2. Meeting Proposal', guideline: 'Suggest time: "Can we meet tomorrow at 2 PM to discuss our project plan?"' },
    { step: '3. What to Bring', guideline: 'Add details: "Please bring your notes so we can check everything."' },
    { step: '4. Polite Closing', guideline: 'End with: "Thank you for your support. Best regards, [Your Name]"' }
  ],
  targetVocabulary: ['support', 'plan', 'meet', 'clear', 'help', 'email', 'check', 'useful']
};
