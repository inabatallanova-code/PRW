import React from 'react';
import { StudentLevel, InterfaceLang } from '../types/lesson';
import { LEVEL_DESCRIPTORS, getTranslation } from '../i18n/translations';
import { sound } from '../services/sound';
import { Check, X, Sparkles, BookOpen, Layers, ShieldCheck } from 'lucide-react';

interface LevelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: StudentLevel;
  onSelectLevel: (level: StudentLevel) => void;
  interfaceLang: InterfaceLang;
}

export const LevelSelectorModal: React.FC<LevelSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  onSelectLevel,
  interfaceLang
}) => {
  if (!isOpen) return null;

  const t = getTranslation(interfaceLang);
  const levels: StudentLevel[] = ['A2', 'B1', 'B1+', 'B2', 'B2+', 'C1'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{interfaceLang === 'uz' ? 'O\'QUV DARAJASINI TANLASH' : 'ACADEMIC LEVEL SELECTION'}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {t.chooseLevelTitle}
            </h3>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          {interfaceLang === 'uz' 
            ? 'Tanlangan daraja darsdagi so\'zlar qiyinligi, mutolaa matni, savollar va yozuv vazifalarini to\'g\'ridan-to\'g\'ri moslashtiradi. Istalgan vaqtda o\'zgartirishingiz mumkin.'
            : 'Select the English proficiency tier that matches your current goal. Vocabulary, reading passages, and writing missions will adapt automatically.'}
        </p>

        {/* Level List */}
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          {levels.map((lvl) => {
            const info = LEVEL_DESCRIPTORS[lvl];
            const isSelected = currentLevel === lvl;

            return (
              <button
                key={lvl}
                onClick={() => {
                  sound.playSuccess();
                  onSelectLevel(lvl);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-200 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-indigo-700 px-2 py-0.5 rounded-md bg-indigo-100/60">
                      {lvl}
                    </span>
                    <span className="font-bold text-slate-900">
                      {interfaceLang === 'uz' ? info.nameUz : info.nameEn}
                    </span>
                  </div>

                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    {interfaceLang === 'uz' ? info.descriptionUz : info.descriptionEn}
                  </p>

                  <div className="flex items-center gap-3 text-[10.5px] text-slate-400 pt-1">
                    <span>Reading: {info.readingWordTarget}</span>
                    <span>·</span>
                    <span>Writing: {info.writingWordTarget}</span>
                    <span>·</span>
                    <span>Scaffolding: {info.scaffoldingLevel}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>*Historical progress is preserved.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
