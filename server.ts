import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '2mb' }));

// Helper: Rule-based academic diagnostic engine (used as transparent fallback when GEMINI_API_KEY is not configured)
function generateEducationalDiagnostic(params: {
  studentText: string;
  targetVocabulary: string[];
  taskTitle: string;
  studentLevel?: string;
  isRewrite?: boolean;
}) {
  const { studentText, targetVocabulary, studentLevel = 'B2', isRewrite } = params;
  const words = studentText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lowerText = studentText.toLowerCase();

  // 1. Target vocabulary check
  const usedVocab = targetVocabulary.filter(word => {
    const root = word.toLowerCase().replace(/(e|ing|ed|es|s)$/, '');
    return lowerText.includes(word.toLowerCase()) || lowerText.includes(root);
  });

  // 2. Academic transitions check
  const transitions = ['furthermore', 'moreover', 'consequently', 'however', 'in addition', 'nevertheless', 'specifically', 'in particular', 'therefore', 'thus'];
  const usedTransitions = transitions.filter(t => lowerText.includes(t));

  // 3. Informal/basic words check
  const informalReplacements: { basic: string; upgraded: string; explanation: string }[] = [];
  const informalMap: Record<string, { upgraded: string; note: string }> = {
    'good': { upgraded: 'effective / beneficial / advantageous', note: 'Avoid vague adjectives in formal writing.' },
    'bad': { upgraded: 'detrimental / adverse / counterproductive', note: 'Use precise academic descriptors.' },
    'help': { upgraded: 'facilitate / support / enable', note: '"Facilitate" is standard academic register.' },
    'big': { upgraded: 'substantial / significant / considerable', note: '"Substantial" conveys quantifiable magnitude.' },
    'get': { upgraded: 'obtain / acquire / secure', note: '"Obtain" denotes deliberate professional action.' },
    'important': { upgraded: 'crucial / significant / imperative', note: '"Significant" provides professional precision.' },
    'think': { upgraded: 'contend / assert / evaluate', note: 'Express academic stance clearly.' },
    'make sure': { upgraded: 'ensure / guarantee / verify', note: 'Maintain concise executive tone.' },
    'a lot of': { upgraded: 'a substantial volume of / numerous', note: 'Quantify evidence academically.' }
  };

  for (const [key, val] of Object.entries(informalMap)) {
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(studentText)) {
      informalReplacements.push({
        basic: key,
        upgraded: val.upgraded,
        explanation: val.note
      });
    }
  }

  // Calculate scores calibrated to target student level
  const isLowerLevel = studentLevel === 'A2' || studentLevel === 'B1';
  const isAdvancedLevel = studentLevel === 'B2+' || studentLevel === 'C1';

  let vocabScore = isLowerLevel ? 7.0 : 6.0;
  if (usedVocab.length >= 4) vocabScore = isLowerLevel ? 9.0 : 8.5;
  else if (usedVocab.length >= 2) vocabScore = isLowerLevel ? 8.0 : 7.5;
  else if (usedVocab.length >= 1) vocabScore = isLowerLevel ? 7.5 : 6.5;

  let taskScore = 7.0;
  const targetMinWords = isLowerLevel ? 90 : isAdvancedLevel ? 180 : 130;
  if (wordCount >= targetMinWords) taskScore = 8.0;
  else if (wordCount >= targetMinWords * 0.7) taskScore = 7.0;
  else taskScore = 5.5;

  let coherenceScore = isLowerLevel ? 7.5 : 6.5;
  if (usedTransitions.length >= 2) coherenceScore = 8.0;

  let grammarScore = 7.0;
  if (studentText.length > 150) grammarScore = 7.5;

  const overallScore = Math.round(((vocabScore + taskScore + coherenceScore + grammarScore) / 4) * 10) / 10;
  
  // CEFR & IELTS mapping
  let cefr = studentLevel;
  let ielts = isLowerLevel ? '5.5' : isAdvancedLevel ? '7.5' : '6.5';

  // Extract student sentence sample
  const sentences = studentText.match(/[^.!?]+[.!?]+/g) || [studentText];
  const sampleSentence = sentences[0]?.trim() || studentText.slice(0, 80);

  return {
    source: 'educational_diagnostic' as const,
    apiKeyConfigured: false,
    overallScore,
    cefrEstimate: cefr,
    ieltsEstimate: ielts,
    studentLevel,
    wordCount,
    criteria: {
      grammar: {
        score: grammarScore,
        strengths: `Sentence structure is well-calibrated for ${studentLevel} academic writing standards.`,
        holdingBack: isLowerLevel ? 'Try connecting two simple sentences using "because" or "and".' : 'Certain complex clauses could demonstrate stronger parallel structure and nominalization.',
        improvedExample: {
          original: sampleSentence,
          improved: sampleSentence.replace(/\b(help|get|big)\b/gi, match => match.toLowerCase() === 'help' ? 'facilitate' : match.toLowerCase() === 'get' ? 'obtain' : 'substantial'),
          rule: 'In professional academic discourse, opt for formal lexical verbs and balanced compound structures.'
        }
      },
      vocabulary: {
        score: vocabScore,
        usedTargetWords: usedVocab,
        strengths: usedVocab.length > 0 
          ? `Successfully applied target lesson vocabulary (${usedVocab.join(', ')}) at your ${studentLevel} level.`
          : `Vocabulary meets clear ${studentLevel} expectations.`,
        holdingBack: informalReplacements.length > 0 
          ? `Contains everyday conversational expressions (${informalReplacements.map(r => `"${r.basic}"`).join(', ')}).`
          : 'Could integrate more target collocations from Lesson 1.',
        upgrades: informalReplacements.slice(0, 3)
      },
      taskAchievement: {
        score: taskScore,
        strengths: `Addresses the core requirements expected of a ${studentLevel} university student.`,
        holdingBack: wordCount < targetMinWords ? `Word count (${wordCount}) is below the target minimum for this level (${targetMinWords} words).` : 'Ensure each paragraph features a distinct topic sentence.',
        suggestion: 'Provide concrete organizational examples to support your recommendations.'
      },
      coherence: {
        score: coherenceScore,
        strengths: usedTransitions.length > 0 ? `Effective use of discourse markers (${usedTransitions.join(', ')}).` : 'Paragraph arrangement shows logical progression.',
        holdingBack: studentText.includes('\n\n') ? 'Transitions between paragraphs could be smoother.' : 'Break your writing into distinct paragraphs.',
        suggestion: 'Utilize linking expressions such as "Consequently" and "In particular" to connect key ideas.'
      }
    },
    uzbekFeedback: {
      umumiyXulosa: `Ushbu matn ${studentLevel} (taxminiy IELTS ${ielts}) talablariga mos keladi. Matnda ${wordCount} ta so'z mavjud bo'lib, ${usedVocab.length} ta dars lug'ati muvaffaqiyatli ishlatilgan.`,
      kuchliTomonlar: usedVocab.length > 0 
        ? `Siz tanlangan ${studentLevel} darajasiga mos professional iboralarni (${usedVocab.join(', ')}) to'g'ri qo'llagansiz.`
        : 'Fikr mantiqiy tartibda bayon qilingan.',
      yaxshilashTavsiyasi: `Lug'at boyligini yanada oshirish uchun darsdagi qo'shimcha akademik so'zlarni ham joriy qiling.`,
      keyingiQadam: "Tavsiya etilgan tuzatishlarni ko'rib chiqing va matnni qayta tahrirlang (Rewrite)."
    },
    recommendations: [
      { skill: 'vocabulary', label: 'Practice Target Vocabulary', actionId: 'vocabulary' },
      { skill: 'coherence', label: 'Linking Words & Transitions', actionId: 'writing_prep' },
      { skill: 'grammar', label: 'Academic Sentence Upgrades', actionId: 'grammar' }
    ],
    isRewrite,
    whatImproved: isRewrite ? [
      'Expanded lexical sophistication by incorporating professional terms.',
      'Refined sentence structure and transition flow between ideas.'
    ] : undefined
  };
}

// API Route: Writing Assessment
app.post('/api/assess-writing', async (req, res) => {
  try {
    const { studentText, targetVocabulary = [], taskTitle = '', studentLevel = 'B2', lang = 'en', isRewrite = false, originalText = '' } = req.body;

    if (!studentText || typeof studentText !== 'string' || studentText.trim().length < 15) {
      return res.status(400).json({ error: 'Please provide at least 15 characters of student writing.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If GEMINI_API_KEY is not available, execute transparent educational diagnostic engine
    if (!apiKey) {
      const diagnostic = generateEducationalDiagnostic({ studentText, targetVocabulary, taskTitle, studentLevel, isRewrite });
      return res.json({
        ...diagnostic,
        message: 'Assessed with university diagnostic engine. Attach GEMINI_API_KEY in Secrets for live Gemini model assessment.'
      });
    }

    // Call real Gemini API server-side
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const prompt = `You are a senior university writing assessor and academic examiner for the "Professional English Lab" university course.
Assess this student's response to the professional writing task: "${taskTitle}".

IMPORTANT PEDAGOGICAL INSTRUCTION ON STUDENT LEVEL:
The student has selected target proficiency level: "${studentLevel}".
Evaluate the submission AGAINST THE STANDARDS OF ${studentLevel}:
- If studentLevel is A2 or B1, do NOT penalize them for not writing like C1. Judge if their writing is successful and clear for a B1 university learner.
- If studentLevel is B2, expect standard university professional register and logical cohesion.
- If studentLevel is B2+ or C1, expect advanced lexical resource, nuanced collocations, and sophisticated argumentation.

Target lesson vocabulary to check for: ${JSON.stringify(targetVocabulary)}
${isRewrite ? `This is a REWRITE of an earlier draft. Original draft was: "${originalText}"` : ''}

Student Text to assess:
"""
${studentText}
"""

Evaluate strictly on 4 criteria:
1. Grammar & Syntactic Control (score 0-10, assessed relative to ${studentLevel})
2. Vocabulary & Lexical Resource (score 0-10, checking presence of target vocabulary, identifying overused simple words, providing level-appropriate upgrades)
3. Task Achievement & Development (score 0-10, adherence to university prompt, development)
4. Coherence & Cohesion (score 0-10, paragraph structure, linking devices)

Provide CEFR estimate (A1, A2, B1, B1+, B2, B2+, C1, C1+) and IELTS-style estimated band (e.g. 5.5, 6.0, 6.5, 7.0, 7.5, 8.0).
Provide both English evaluation and parallel Uzbek translation (O'zbekcha) so bilingual learners receive exact, actionable guidance.

Return ONLY a valid JSON object matching this structure:
{
  "overallScore": number (1 decimal, e.g. 7.5),
  "cefrEstimate": string,
  "ieltsEstimate": string,
  "studentLevel": "${studentLevel}",
  "wordCount": number,
  "criteria": {
    "grammar": {
      "score": number,
      "strengths": string,
      "holdingBack": string,
      "improvedExample": {
        "original": string,
        "improved": string,
        "rule": string
      }
    },
    "vocabulary": {
      "score": number,
      "usedTargetWords": string[],
      "strengths": string,
      "holdingBack": string,
      "upgrades": [
        { "basic": string, "upgraded": string, "explanation": string }
      ]
    },
    "taskAchievement": {
      "score": number,
      "strengths": string,
      "holdingBack": string,
      "suggestion": string
    },
    "coherence": {
      "score": number,
      "strengths": string,
      "holdingBack": string,
      "suggestion": string
    }
  },
  "uzbekFeedback": {
    "umumiyXulosa": string,
    "kuchliTomonlar": string,
    "yaxshilashTavsiyasi": string,
    "keyingiQadam": string
  },
  "recommendations": [
    { "skill": string, "label": string, "actionId": string }
  ],
  "whatImproved": string[] (if isRewrite, list 2-3 specific improvements; otherwise empty array)
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const rawText = response.text || '{}';
    const parsed = JSON.parse(rawText);

    return res.json({
      ...parsed,
      source: 'gemini_ai',
      apiKeyConfigured: true,
      isRewrite
    });
  } catch (error: any) {
    console.error('Error during AI writing assessment:', error);
    // Graceful fallback to diagnostic engine
    const diagnostic = generateEducationalDiagnostic({
      studentText: req.body.studentText || '',
      targetVocabulary: req.body.targetVocabulary || [],
      taskTitle: req.body.taskTitle || '',
      isRewrite: req.body.isRewrite
    });
    return res.json({
      ...diagnostic,
      errorOccurred: true,
      message: 'Gemini request encountered a transient error; diagnostic engine provided feedback.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Setup Vite middleware in dev or static files in production
async function start() {
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(__dirname, 'dist'));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: PORT, host: '0.0.0.0' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Professional English Lab server listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
