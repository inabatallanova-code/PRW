import React, { useState } from 'react';
import { StudentLevel, InterfaceLang } from '../types/lesson';
import { LEVEL_DESCRIPTORS, getTranslation } from '../i18n/translations';
import { sound } from '../services/sound';
import { Sparkles, ArrowRight, Check, Globe, BookOpen } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (level: StudentLevel, lang: InterfaceLang) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedLang, setSelectedLang] = useState<InterfaceLang>('en');
  const [selectedLevel, setSelectedLevel] = useState<StudentLevel>('B1');

  if (!isOpen) return null;

  const t = getTranslation(selectedLang);
  const levels: StudentLevel[] = ['A2', 'B1', 'B1+', 'B2', 'B2+', 'C1'];

  const handleNextStep = () => {
    sound.playClick();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      sound.playSuccess();
      onComplete(selectedLevel, selectedLang);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Progress Tracker (3 steps) */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2 font-bold text-indigo-600">
            <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs">
              {step}
            </span>
            <span>Step {step} of 3</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className={`w-8 h-1.5 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className={`w-8 h-1.5 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className={`w-8 h-1.5 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          </div>
        </div>

        {/* STEP 1: CHOOSE INTERFACE LANGUAGE */}
        {step === 1 && (
          <div className="space-y-5 text-center sm:text-left">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto sm:mx-0 mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Choose Interface Language / Interfeys tilini tanlang
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your preferred language for buttons and navigation. Learning materials remain in English.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => { sound.playClick(); setSelectedLang('en'); }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedLang === 'en'
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-sm font-bold text-slate-900">English</div>
                <div className="text-xs text-slate-500 mt-0.5">Global Academic Interface</div>
                {selectedLang === 'en' && <div className="text-indigo-600 text-xs font-bold mt-2">✓ Selected</div>}
              </button>

              <button
                onClick={() => { sound.playClick(); setSelectedLang('uz'); }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedLang === 'uz'
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-sm font-bold text-slate-900">O'zbekcha</div>
                <div className="text-xs text-slate-500 mt-0.5">O'zbek tilidagi qulay interfeys</div>
                {selectedLang === 'uz' && <div className="text-indigo-600 text-xs font-bold mt-2">✓ Tanlandi</div>}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE ENGLISH LEVEL */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {t.onboardingStep1Title}
              </h3>
              <p className="text-xs text-slate-500">
                {t.onboardingStep1Desc}
              </p>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {levels.map(lvl => {
                const info = LEVEL_DESCRIPTORS[lvl];
                const isSelected = selectedLevel === lvl;

                return (
                  <button
                    key={lvl}
                    onClick={() => { sound.playClick(); setSelectedLevel(lvl); }}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-200'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md">
                          {lvl}
                        </span>
                        <span className="font-bold text-slate-900">
                          {selectedLang === 'uz' ? info.nameUz : info.nameEn}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {selectedLang === 'uz' ? info.descriptionUz : info.descriptionEn}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: READY CONFIRMATION */}
        {step === 3 && (
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {t.onboardingStep3Title}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                {t.onboardingStep3Desc}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto text-xs space-y-1 text-slate-700">
              <div><strong>{t.myLevel}:</strong> <span className="font-mono text-indigo-700 font-bold">{selectedLevel}</span></div>
              <div><strong>{t.interfaceLanguage}:</strong> {selectedLang === 'uz' ? 'O\'zbekcha' : 'English'}</div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleNextStep}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>{step === 3 ? t.onboardingStartBtn : t.continue}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
