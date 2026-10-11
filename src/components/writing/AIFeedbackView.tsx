import React, { useState } from 'react';
import { AIAssessmentResponse } from '../../types/lesson';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw, 
  Globe, 
  Sparkles, 
  Layers, 
  BookOpen, 
  PenTool, 
  TrendingUp,
  FileText
} from 'lucide-react';

interface AIFeedbackViewProps {
  assessment: AIAssessmentResponse;
  studentDraft: string;
  onInitiateRewrite: () => void;
  onNavigateToPractice?: (actionId: string) => void;
}

export const AIFeedbackView: React.FC<AIFeedbackViewProps> = ({
  assessment,
  studentDraft,
  onInitiateRewrite,
  onNavigateToPractice
}) => {
  const [lang, setLang] = useState<'en' | 'uz'>(() => storage.getFeedbackLang());

  const handleToggleLang = (newLang: 'en' | 'uz') => {
    sound.playClick();
    setLang(newLang);
    storage.setFeedbackLang(newLang);
  };

  const { criteria, uzbekFeedback } = assessment;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-4xl mx-auto space-y-6">
      
      {/* Top Header & Language Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
            <span>UNIVERSITY AI WRITING ASSESSMENT</span>
            <span>·</span>
            <span>EVALUATION REPORT</span>
            {(assessment as any).studentLevel && (
              <>
                <span>·</span>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-sm font-mono">
                  Assessed for {(assessment as any).studentLevel} Standards
                </span>
              </>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Academic Performance Analysis
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Four-pillar rubric evaluation with actionable sentence improvements.
          </p>
        </div>

        {/* Language Toggle: English / O'zbekcha */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => handleToggleLang('en')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              lang === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleToggleLang('uz')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              lang === 'uz' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            O'zbekcha
          </button>
        </div>
      </div>

      {/* Official AI Estimate Disclaimer (Required by Section 19 & 25) */}
      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>AI-Generated Estimate:</strong> For learning and diagnostic purposes only. Not an official IELTS score or CEFR certification.
          {assessment.source === 'educational_diagnostic' && (
            <span className="block mt-0.5 text-amber-800">
              Evaluated with local university pedagogical diagnostic engine. Connect GEMINI_API_KEY to activate live Gemini neural assessment.
            </span>
          )}
        </div>
      </div>

      {/* Hero Score Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Overall Score
          </span>
          <div className="text-2xl font-black text-indigo-700 font-mono tabular-nums mt-0.5">
            {assessment.overallScore} <span className="text-xs text-slate-400 font-normal">/ 10</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            CEFR Level
          </span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
            {assessment.cefrEstimate}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            IELTS Estimate
          </span>
          <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums mt-0.5">
            Band {assessment.ieltsEstimate}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Word Count
          </span>
          <div className="text-2xl font-black text-slate-800 font-mono tabular-nums mt-0.5">
            {assessment.wordCount}
          </div>
        </div>
      </div>

      {/* If Rewrite: What Improved Showcase */}
      {assessment.isRewrite && assessment.whatImproved && assessment.whatImproved.length > 0 && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Revision Gains: What Improved in This Draft</span>
          </div>
          <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
            {assessment.whatImproved.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Uzbek Summary View (When O'zbekcha is selected) */}
      {lang === 'uz' && uzbekFeedback && (
        <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-3 text-xs text-slate-800">
          <div className="flex items-center gap-2 font-bold text-indigo-900">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>O'zbek tilidagi tahliliy xulosa:</span>
          </div>
          <div><strong>Umumiy xulosa:</strong> {uzbekFeedback.umumiyXulosa}</div>
          <div><strong>Kuchli tomonlar:</strong> {uzbekFeedback.kuchliTomonlar}</div>
          <div><strong>Yaxshilash tavsiyasi:</strong> {uzbekFeedback.yaxshilashTavsiyasi}</div>
          <div><strong>Keyingi qadam:</strong> {uzbekFeedback.keyingiQadam}</div>
        </div>
      )}

      {/* Four Assessment Criteria Breakdown */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Criterion-by-Criterion Evaluation
        </h3>

        {/* 1. VOCABULARY & LEXICAL RESOURCE */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">1. Vocabulary / Lexical Resource</span>
              {criteria.vocabulary.usedTargetWords && criteria.vocabulary.usedTargetWords.length > 0 && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                  {criteria.vocabulary.usedTargetWords.length} target words applied
                </span>
              )}
            </div>
            <span className="text-sm font-mono font-bold text-indigo-700">{criteria.vocabulary.score}/10</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-emerald-800 block mb-1">✓ Strengths:</strong>
              <p className="text-slate-700">{criteria.vocabulary.strengths}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-amber-800 block mb-1">⚠ What's Holding You Back:</strong>
              <p className="text-slate-700">{criteria.vocabulary.holdingBack}</p>
            </div>
          </div>

          {/* Lexical Upgrades */}
          {criteria.vocabulary.upgrades && criteria.vocabulary.upgrades.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-600 block">Recommended Academic Upgrades:</span>
              <div className="space-y-1.5">
                {criteria.vocabulary.upgrades.map((up, i) => (
                  <div key={i} className="text-xs p-2 bg-indigo-50/50 rounded-lg border border-indigo-100 flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 line-through mr-2">"{up.basic}"</span>
                      <span className="font-bold text-indigo-800">→ "{up.upgraded}"</span>
                    </div>
                    <span className="text-[11px] text-slate-500 italic">{up.explanation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. GRAMMAR & SYNTACTIC ACCURACY */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">2. Grammar & Syntactic Control</span>
            <span className="text-sm font-mono font-bold text-indigo-700">{criteria.grammar.score}/10</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-emerald-800 block mb-1">✓ Strengths:</strong>
              <p className="text-slate-700">{criteria.grammar.strengths}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-amber-800 block mb-1">⚠ What's Holding You Back:</strong>
              <p className="text-slate-700">{criteria.grammar.holdingBack}</p>
            </div>
          </div>

          {/* Quoted Sentence & Upgraded Academic Version */}
          {criteria.grammar.improvedExample && (
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
              <span className="text-[11px] font-bold text-slate-600 block">Sentence-Level Transformation:</span>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 font-serif">
                <div className="text-slate-600">
                  <span className="font-sans font-bold text-[11px] text-slate-400 mr-2">Original:</span>
                  "{criteria.grammar.improvedExample.original}"
                </div>
                <div className="text-indigo-900 font-semibold">
                  <span className="font-sans font-bold text-[11px] text-emerald-600 mr-2">Academic:</span>
                  "{criteria.grammar.improvedExample.improved}"
                </div>
                <div className="text-[11px] font-sans text-slate-500 pt-1 border-t border-slate-200 mt-1">
                  <strong>Rule:</strong> {criteria.grammar.improvedExample.rule}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. TASK ACHIEVEMENT */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">3. Task Achievement & Development</span>
            <span className="text-sm font-mono font-bold text-indigo-700">{criteria.taskAchievement.score}/10</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-emerald-800 block mb-1">✓ Strengths:</strong>
              <p className="text-slate-700">{criteria.taskAchievement.strengths}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-amber-800 block mb-1">⚠ Opportunities:</strong>
              <p className="text-slate-700">{criteria.taskAchievement.holdingBack}</p>
            </div>
          </div>
        </div>

        {/* 4. COHERENCE & COHESION */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">4. Coherence & Cohesion</span>
            <span className="text-sm font-mono font-bold text-indigo-700">{criteria.coherence.score}/10</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-emerald-800 block mb-1">✓ Strengths:</strong>
              <p className="text-slate-700">{criteria.coherence.strengths}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <strong className="text-amber-800 block mb-1">⚠ Opportunities:</strong>
              <p className="text-slate-700">{criteria.coherence.holdingBack}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Loop CTAs (Feedback -> Practice -> Rewrite) */}
      <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Recommended Learning Actions
        </h4>

        <div className="flex flex-wrap items-center gap-2">
          {assessment.recommendations.map((rec, i) => (
            <button
              key={i}
              onClick={() => {
                sound.playClick();
                if (onNavigateToPractice) onNavigateToPractice(rec.actionId);
              }}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>{rec.label}</span>
            </button>
          ))}

          {/* Primary CTA: Improve My Writing (Rewrite) */}
          <button
            onClick={() => {
              sound.playClick();
              onInitiateRewrite();
            }}
            className="ml-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Improve My Writing (Rewrite & Reassess)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
