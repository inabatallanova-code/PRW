import React, { useState, useMemo, useEffect } from 'react';
import { VocabularyWord } from '../../types/lesson';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { 
  Volume2, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Check, 
  HelpCircle,
  Zap,
  BookOpen,
  Filter,
  Brain,
  Shuffle,
  Puzzle,
  Link2,
  Trophy,
  Flame,
  Undo2,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface VocabularyExperienceProps {
  vocabulary: VocabularyWord[];
  onWordMasteryChange?: () => void;
  onLaunchWriting?: () => void;
  onLaunchReading?: () => void;
}

type VocabGameMode = 
  | 'flashcard'    // 1. Flashcards & Flip
  | 'scramble'     // 2. Word Scramble / Anagram Builder
  | 'match-pairs'  // 3. Connect 2 Columns (Word <-> Uzbek)
  | 'fill-blank'   // 4. Everyday Sentence Fill-in
  | 'memory'       // 5. 12-Card Grid Flip
  | 'speed'        // 6. 30-Second Rapid Sprint
  | 'difficult';   // Filter for words needing review

export const VocabularyExperience: React.FC<VocabularyExperienceProps> = ({
  vocabulary,
  onWordMasteryChange,
  onLaunchWriting,
  onLaunchReading
}) => {
  const [mode, setMode] = useState<VocabGameMode>('flashcard');
  const [showUzbek, setShowUzbek] = useState(true);

  // 1. FLASHCARD STATE
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // 2. WORD SCRAMBLE STATE
  const [scrambleIndex, setScrambleIndex] = useState(0);
  const [pickedLetters, setPickedLetters] = useState<{ id: number; char: string }[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: number; char: string }[]>([]);
  const [scrambleSolved, setScrambleSolved] = useState(false);
  const [scrambleError, setScrambleError] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  // 3. MATCH PAIRS (CONNECT 2 COLUMNS) STATE
  const [matchSetIndex, setMatchSetIndex] = useState(0);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchCombo, setMatchCombo] = useState(0);

  // 4. FILL-IN-THE-BLANK PUZZLE STATE
  const [blankIndex, setBlankIndex] = useState(0);
  const [blankFeedback, setBlankFeedback] = useState<{ isCorrect: boolean; selected: string } | null>(null);

  // 5. MEMORY GRID STATE
  const [memoryCards, setMemoryCards] = useState<{ id: string; text: string; matchId: string; type: 'word' | 'uzbek'; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMatchesFound, setMemoryMatchesFound] = useState(0);

  // 6. SPEED SPRINT STATE
  const [speedActive, setSpeedActive] = useState(false);
  const [speedSecondsLeft, setSpeedSecondsLeft] = useState(30);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedStreak, setSpeedStreak] = useState(0);
  const [speedQuestionIndex, setSpeedQuestionIndex] = useState(0);

  // Difficult words filter
  const difficultWords = useMemo(() => {
    return vocabulary.filter(w => w.masteryState !== 'Mastered');
  }, [vocabulary]);

  const activeWordList = useMemo(() => {
    if (mode === 'difficult') {
      return difficultWords.length > 0 ? difficultWords : vocabulary;
    }
    return vocabulary.length > 0 ? vocabulary : [];
  }, [mode, difficultWords, vocabulary]);

  const currentFlashcard = activeWordList[cardIndex % Math.max(1, activeWordList.length)] || vocabulary[0];

  // Helper to format/simplify example sentences so students are not overwhelmed
  const getSimpleExample = (word: VocabularyWord) => {
    if (!word) return '';
    // If the example sentence is short, use it. Otherwise, clean or provide a friendly natural sentence
    const ex = word.exampleSentence || '';
    if (ex.length > 0 && ex.length < 90) return ex;
    // Friendly fallback based on word
    return `We need to ${word.word.toLowerCase()} this task carefully before our meeting.`;
  };

  // --------------------------------------------------------------------------
  // GAME 2: WORD SCRAMBLE SETUP
  // --------------------------------------------------------------------------
  const currentScrambleWord = activeWordList[scrambleIndex % Math.max(1, activeWordList.length)] || vocabulary[0];

  const initScramble = (targetWord: VocabularyWord) => {
    if (!targetWord) return;
    const cleanWord = targetWord.word.trim().toUpperCase();
    const letters = cleanWord.split('').map((char, index) => ({ id: index, char }));
    // Shuffle
    const shuffled = [...letters].sort(() => 0.5 - Math.random());
    setAvailableLetters(shuffled);
    setPickedLetters([]);
    setScrambleSolved(false);
    setScrambleError(false);
    setHintShown(false);
  };

  useEffect(() => {
    if (mode === 'scramble' && currentScrambleWord) {
      initScramble(currentScrambleWord);
    }
  }, [mode, scrambleIndex, currentScrambleWord]);

  const handlePickLetter = (item: { id: number; char: string }) => {
    if (scrambleSolved) return;
    sound.playClick();
    setScrambleError(false);
    setPickedLetters(prev => [...prev, item]);
    setAvailableLetters(prev => prev.filter(l => l.id !== item.id));

    const newPicked = [...pickedLetters, item];
    const target = currentScrambleWord.word.trim().toUpperCase();
    if (newPicked.length === target.length) {
      const spelled = newPicked.map(p => p.char).join('');
      if (spelled === target) {
        sound.playSuccess();
        storage.addXP(20);
        storage.updateWordMastery(currentScrambleWord.id, true);
        setScrambleSolved(true);
        if (onWordMasteryChange) onWordMasteryChange();
      } else {
        sound.playError();
        setScrambleError(true);
      }
    }
  };

  const handleUndoLetter = () => {
    if (pickedLetters.length === 0 || scrambleSolved) return;
    sound.playClick();
    const last = pickedLetters[pickedLetters.length - 1];
    setPickedLetters(prev => prev.slice(0, -1));
    setAvailableLetters(prev => [...prev, last]);
    setScrambleError(false);
  };

  const handleResetScramble = () => {
    sound.playClick();
    initScramble(currentScrambleWord);
  };

  const handleScrambleNext = () => {
    sound.playClick();
    setScrambleIndex(prev => (prev + 1) % activeWordList.length);
  };

  // --------------------------------------------------------------------------
  // GAME 3: MATCH PAIRS (CONNECT 2 COLUMNS)
  // --------------------------------------------------------------------------
  const matchBatch = useMemo(() => {
    const start = (matchSetIndex * 5) % Math.max(1, vocabulary.length);
    const slice = vocabulary.slice(start, start + 5);
    if (slice.length < 5) {
      return [...slice, ...vocabulary.slice(0, 5 - slice.length)];
    }
    return slice;
  }, [matchSetIndex, vocabulary]);

  const shuffledMatchRights = useMemo(() => {
    return [...matchBatch].sort(() => 0.5 - Math.random());
  }, [matchBatch]);

  useEffect(() => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs([]);
  }, [matchSetIndex]);

  const handleMatchSelectLeft = (wordId: string) => {
    if (matchedPairs.includes(wordId)) return;
    sound.playClick();
    setSelectedLeft(wordId);
    if (selectedRight) {
      checkMatch(wordId, selectedRight);
    }
  };

  const handleMatchSelectRight = (wordId: string) => {
    if (matchedPairs.includes(wordId)) return;
    sound.playClick();
    setSelectedRight(wordId);
    if (selectedLeft) {
      checkMatch(selectedLeft, wordId);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Correct match!
      sound.playSuccess();
      const newCombo = matchCombo + 1;
      setMatchCombo(newCombo);
      const bonusXP = 15 + Math.min(10, newCombo * 2);
      storage.addXP(bonusXP);
      storage.updateWordMastery(leftId, true);
      const updated = [...matchedPairs, leftId];
      setMatchedPairs(updated);
      setSelectedLeft(null);
      setSelectedRight(null);
      if (onWordMasteryChange) onWordMasteryChange();
    } else {
      sound.playError();
      setMatchCombo(0);
      storage.updateWordMastery(leftId, false);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  };

  // --------------------------------------------------------------------------
  // GAME 4: FILL-IN-THE-BLANK PUZZLE SETUP
  // --------------------------------------------------------------------------
  const currentBlankWord = activeWordList[blankIndex % Math.max(1, activeWordList.length)] || vocabulary[0];

  const blankQuiz = useMemo(() => {
    const target = currentBlankWord;
    const others = vocabulary.filter(w => w.id !== target.id).sort(() => 0.5 - Math.random()).slice(0, 2);
    const options = [target, ...others].sort(() => 0.5 - Math.random());

    // Clean, natural sentence with a blank
    const baseSentence = target.exampleSentence && target.exampleSentence.length < 80 
      ? target.exampleSentence 
      : `We should always ${target.word.toLowerCase()} our team members during this task.`;

    const regex = new RegExp(`\\b${target.word}\\b`, 'gi');
    const promptSentence = baseSentence.replace(regex, '_______');

    return {
      target,
      sentence: promptSentence.includes('_______') ? promptSentence : `Please _______ the plan for tomorrow.`,
      options
    };
  }, [currentBlankWord, vocabulary]);

  const handleBlankAnswer = (optId: string) => {
    if (blankFeedback !== null) return;
    if (optId === blankQuiz.target.id) {
      sound.playSuccess();
      storage.addXP(15);
      storage.updateWordMastery(blankQuiz.target.id, true);
      setBlankFeedback({ isCorrect: true, selected: optId });
    } else {
      sound.playError();
      storage.updateWordMastery(blankQuiz.target.id, false);
      setBlankFeedback({ isCorrect: false, selected: optId });
    }
    if (onWordMasteryChange) onWordMasteryChange();
  };

  const handleNextBlank = () => {
    sound.playClick();
    setBlankFeedback(null);
    setBlankIndex(prev => (prev + 1) % activeWordList.length);
  };

  // --------------------------------------------------------------------------
  // GAME 5: MEMORY GRID (12 CARDS)
  // --------------------------------------------------------------------------
  const startMemoryGrid = () => {
    const selected = [...vocabulary].sort(() => 0.5 - Math.random()).slice(0, 6);
    const cards: { id: string; text: string; matchId: string; type: 'word' | 'uzbek'; isFlipped: boolean; isMatched: boolean }[] = [];
    selected.forEach((w, idx) => {
      cards.push({
        id: `word-${idx}`,
        text: w.word,
        matchId: w.id,
        type: 'word',
        isFlipped: false,
        isMatched: false
      });
      cards.push({
        id: `uzbek-${idx}`,
        text: w.uzbekTranslation,
        matchId: w.id,
        type: 'uzbek',
        isFlipped: false,
        isMatched: false
      });
    });
    setMemoryCards(cards.sort(() => 0.5 - Math.random()));
    setFlippedIndices([]);
    setMemoryMatchesFound(0);
  };

  useEffect(() => {
    if (mode === 'memory') {
      startMemoryGrid();
    }
  }, [mode]);

  const handleMemoryCardClick = (index: number) => {
    if (flippedIndices.length >= 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    sound.playClick();
    const newCards = [...memoryCards];
    newCards[index].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const first = newCards[newFlipped[0]];
      const second = newCards[newFlipped[1]];
      if (first.matchId === second.matchId) {
        sound.playSuccess();
        storage.addXP(25);
        storage.updateWordMastery(first.matchId, true);
        setTimeout(() => {
          first.isMatched = true;
          second.isMatched = true;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);
          setMemoryMatchesFound(prev => prev + 1);
        }, 400);
      } else {
        sound.playError();
        setTimeout(() => {
          first.isFlipped = false;
          second.isFlipped = false;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  // --------------------------------------------------------------------------
  // GAME 6: 30-SECOND RAPID SPEED SPRINT
  // --------------------------------------------------------------------------
  const speedTarget = vocabulary[speedQuestionIndex % Math.max(1, vocabulary.length)] || vocabulary[0];
  const speedOptions = useMemo(() => {
    const distractors = vocabulary.filter(w => w.id !== speedTarget.id).sort(() => 0.5 - Math.random()).slice(0, 2);
    return [speedTarget, ...distractors].sort(() => 0.5 - Math.random());
  }, [speedTarget, vocabulary]);

  const startSpeedSprint = () => {
    setSpeedActive(true);
    setSpeedSecondsLeft(30);
    setSpeedScore(0);
    setSpeedStreak(0);
    setSpeedQuestionIndex(0);
    sound.playSuccess();
  };

  useEffect(() => {
    let timer: any = null;
    if (speedActive && speedSecondsLeft > 0) {
      timer = setInterval(() => {
        setSpeedSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setSpeedActive(false);
            sound.playComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [speedActive, speedSecondsLeft]);

  const handleSpeedAnswer = (optId: string) => {
    if (optId === speedTarget.id) {
      sound.playSuccess();
      const nextScore = speedScore + 1;
      const nextStreak = speedStreak + 1;
      setSpeedScore(nextScore);
      setSpeedStreak(nextStreak);
      const earned = 15 + (nextStreak >= 3 ? 10 : 0);
      storage.addXP(earned);
      storage.updateWordMastery(speedTarget.id, true);
    } else {
      sound.playError();
      setSpeedStreak(0);
      storage.updateWordMastery(speedTarget.id, false);
    }
    setSpeedQuestionIndex(prev => prev + 1);
    if (onWordMasteryChange) onWordMasteryChange();
  };

  // Mastery summary
  const masteredCount = vocabulary.filter(w => w.masteryState === 'Mastered').length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header & Gamification Mode Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-0.5">
              <span>VOCABULARY GAMIFICATION HUB</span>
              <span>·</span>
              <span>{vocabulary.length} TARGET WORDS</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Interactive Vocabulary Games
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Play fun games, spell words from memory, match Uzbek translations, and learn words by heart!
            </p>
          </div>

          {/* Mastery Progress Badge & Difficult Filter */}
          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 font-medium block">Mastered</span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                <span className="text-emerald-600">{masteredCount}</span> / {vocabulary.length}
              </span>
            </div>

            {difficultWords.length > 0 && (
              <button
                onClick={() => {
                  sound.playClick();
                  setMode(mode === 'difficult' ? 'flashcard' : 'difficult');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  mode === 'difficult'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Review {difficultWords.length} Words</span>
              </button>
            )}
          </div>
        </div>

        {/* 6 Gamification Mode Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {/* Game 1: Flashcards & Flip */}
          <button
            onClick={() => { sound.playClick(); setMode('flashcard'); setIsFlipped(false); }}
            className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              mode === 'flashcard' 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Flashcards & Flip</span>
          </button>

          {/* Game 2: Word Scramble */}
          <button
            onClick={() => { sound.playClick(); setMode('scramble'); }}
            className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              mode === 'scramble' 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Puzzle className="w-3.5 h-3.5 text-amber-500" />
            <span>2. Word Scramble (Harflar)</span>
          </button>

          {/* Game 3: Match Pairs */}
          <button
            onClick={() => { sound.playClick(); setMode('match-pairs'); }}
            className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              mode === 'match-pairs' 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Link2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>3. Match Pairs (Tutashtirish)</span>
          </button>

          {/* Game 4: Fill the Blank */}
          <button
            onClick={() => { sound.playClick(); setMode('fill-blank'); setBlankFeedback(null); }}
            className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              mode === 'fill-blank' 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
            <span>4. Fill in the Blank</span>
          </button>

          {/* Game 5: Memory Grid */}
          <button
            onClick={() => { sound.playClick(); setMode('memory'); }}
            className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              mode === 'memory' 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-500" />
            <span>5. Memory Match (12 Cards)</span>
          </button>

          {/* Game 6: Speed Sprint */}
          <button
            onClick={() => { sound.playClick(); setMode('speed'); }}
            className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              mode === 'speed' 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>6. Speed Sprint (30s)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. FLASHCARDS & FLIP MODE */}
      {/* ========================================================================= */}
      {mode === 'flashcard' && currentFlashcard && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span className="font-semibold">
              Card {(cardIndex % activeWordList.length) + 1} of {activeWordList.length}
            </span>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                currentFlashcard.masteryState === 'Mastered' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {currentFlashcard.masteryState}
              </span>
              <button
                onClick={() => setShowUzbek(!showUzbek)}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                {showUzbek ? "Hide O'zbekcha" : "Show O'zbekcha"}
              </button>
            </div>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => { sound.playClick(); setIsFlipped(!isFlipped); }}
            className="cursor-pointer bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 rounded-2xl border-2 border-indigo-200/80 p-8 min-h-[220px] flex flex-col items-center justify-center text-center shadow-xs hover:border-indigo-400 transition-all select-none group relative"
          >
            <span className="absolute top-3 right-3 text-[10px] font-bold text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md">
              {isFlipped ? 'Back (Meaning)' : 'Front (Click to Flip)'}
            </span>

            {!isFlipped ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {currentFlashcard.word}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick();
                      sound.speak(currentFlashcard.word);
                    }}
                    title="Pronounce"
                    className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-medium italic">
                  Part of Speech: <span className="font-semibold text-slate-700">{currentFlashcard.pos}</span>
                </div>

                {showUzbek && (
                  <div className="pt-2">
                    <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-xs">
                      {currentFlashcard.uzbekTranslation}
                    </span>
                  </div>
                )}

                <p className="text-[11px] text-slate-400 pt-2">
                  (Tap card to view simple definition and everyday example)
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-w-md animate-in fade-in duration-150">
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Simple Definition
                </div>
                <p className="text-base font-semibold text-slate-800">
                  "{currentFlashcard.simpleDefinition}"
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 font-medium text-left">
                  <span className="font-bold text-slate-900 block text-[10px] uppercase text-indigo-600 mb-0.5">Simple Example:</span>
                  "{getSimpleExample(currentFlashcard)}"
                </div>
              </div>
            )}
          </div>

          {/* Action rating buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => {
                sound.playClick();
                storage.updateWordMastery(currentFlashcard.id, false);
                setCardIndex(prev => (prev + 1) % activeWordList.length);
                setIsFlipped(false);
                if (onWordMasteryChange) onWordMasteryChange();
              }}
              className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>Still Learning 🤔</span>
            </button>

            <button
              onClick={() => {
                sound.playSuccess();
                storage.updateWordMastery(currentFlashcard.id, true);
                storage.addXP(10);
                setCardIndex(prev => (prev + 1) % activeWordList.length);
                setIsFlipped(false);
                if (onWordMasteryChange) onWordMasteryChange();
              }}
              className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>I Know This! (+10 XP)</span>
            </button>
          </div>

          {/* Quick Deck Navigator */}
          <div className="flex items-center justify-center gap-1 pt-1">
            {activeWordList.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => { sound.playClick(); setCardIndex(idx); setIsFlipped(false); }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === (cardIndex % activeWordList.length) ? 'w-6 bg-indigo-600' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                }`}
                title={w.word}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. WORD SCRAMBLE / ANAGRAM BUILDER */}
      {/* ========================================================================= */}
      {mode === 'scramble' && currentScrambleWord && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span className="font-semibold">
              Word {(scrambleIndex % activeWordList.length) + 1} of {activeWordList.length} · Anagram
            </span>
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+20 XP for spelling</span>
            </div>
          </div>

          {/* Clue Area */}
          <div className="text-center space-y-2">
            <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-bold text-amber-900">
              O'zbekcha: <span className="text-indigo-700 text-sm font-black">{currentScrambleWord.uzbekTranslation}</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">
              "{currentScrambleWord.simpleDefinition}"
            </p>
            <div className="text-xs text-slate-500 italic">
              Example: "{getSimpleExample(currentScrambleWord)}"
            </div>
          </div>

          {/* Spelled Word Slots */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-2 min-h-[56px] p-3 bg-slate-50 rounded-2xl border border-slate-200">
              {pickedLetters.length === 0 ? (
                <span className="text-xs text-slate-400 font-medium italic">
                  Tap the letters below in the correct order to spell the word
                </span>
              ) : (
                pickedLetters.map((item, idx) => (
                  <span
                    key={`picked-${item.id}-${idx}`}
                    className={`w-10 h-11 rounded-xl flex items-center justify-center text-lg font-black font-mono shadow-xs transition-all ${
                      scrambleSolved
                        ? 'bg-emerald-600 text-white'
                        : scrambleError
                        ? 'bg-rose-500 text-white animate-shake'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {item.char}
                  </span>
                ))
              )}
            </div>

            {scrambleError && (
              <p className="text-center text-xs font-bold text-rose-600">
                Not quite! Tap "Undo" or try another letter order.
              </p>
            )}
          </div>

          {/* Available Letter Tiles */}
          {!scrambleSolved ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {availableLetters.map((item) => (
                  <button
                    key={`avail-${item.id}`}
                    onClick={() => handlePickLetter(item)}
                    className="w-11 h-12 rounded-xl bg-white border-2 border-slate-300 hover:border-indigo-500 hover:bg-indigo-50 text-slate-800 text-lg font-black font-mono transition-all shadow-xs active:scale-95 flex items-center justify-center"
                  >
                    {item.char}
                  </button>
                ))}
              </div>

              {/* Utility actions: Undo, Clear, Hint */}
              <div className="flex items-center justify-center gap-2 pt-2 text-xs">
                <button
                  onClick={handleUndoLetter}
                  disabled={pickedLetters.length === 0}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold disabled:opacity-40 flex items-center gap-1"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>Undo</span>
                </button>
                <button
                  onClick={handleResetScramble}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setHintShown(!hintShown);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold flex items-center gap-1"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{hintShown ? `Starts with "${currentScrambleWord.word[0]}"` : 'Hint'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Solved celebration */
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-extrabold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Excellent! Spelled correctly: "{currentScrambleWord.word}"</span>
              </div>
              <p className="text-xs text-emerald-700">
                +20 XP added. You are learning this word by heart!
              </p>
              <button
                onClick={handleScrambleNext}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5"
              >
                <span>Next Word</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MATCH PAIRS (CONNECT 2 COLUMNS: WORD <-> UZBEK) */}
      {/* ========================================================================= */}
      {mode === 'match-pairs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <div>
              <span className="font-bold text-slate-900">Connect Pairs Challenge</span>
              <span className="mx-2 text-slate-300">·</span>
              <span>Tap an English word, then tap its Uzbek translation</span>
            </div>
            <div className="flex items-center gap-2">
              {matchCombo > 1 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                  <span>{matchCombo}x Combo</span>
                </span>
              )}
              <span className="font-mono font-bold text-emerald-600">
                {matchedPairs.length} / 5 Pairs
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column: English Words */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                English Words
              </span>
              {matchBatch.map((w) => {
                const isMatched = matchedPairs.includes(w.id);
                const isSelected = selectedLeft === w.id;

                return (
                  <button
                    key={`match-left-${w.id}`}
                    disabled={isMatched}
                    onClick={() => handleMatchSelectLeft(w.id)}
                    className={`w-full p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                        : isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-300'
                        : 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{w.word}</span>
                    {isMatched && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Uzbek Translations */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                O'zbekcha Tarjimasi
              </span>
              {shuffledMatchRights.map((w) => {
                const isMatched = matchedPairs.includes(w.id);
                const isSelected = selectedRight === w.id;

                return (
                  <button
                    key={`match-right-${w.id}`}
                    disabled={isMatched}
                    onClick={() => handleMatchSelectRight(w.id)}
                    className={`w-full p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                        : isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-300'
                        : 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{w.uzbekTranslation}</span>
                    {isMatched && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Set completion banner */}
          {matchedPairs.length === 5 && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <h4 className="text-sm font-bold text-emerald-900">🎉 All 5 pairs connected!</h4>
              <p className="text-xs text-emerald-700">Great job! Rapid recall helps retain target vocabulary.</p>
              <button
                onClick={() => {
                  sound.playSuccess();
                  setMatchSetIndex(prev => prev + 1);
                }}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Next 5 Words</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. FILL IN THE BLANK PUZZLE */}
      {/* ========================================================================= */}
      {mode === 'fill-blank' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span className="font-semibold">
              Puzzle {(blankIndex % activeWordList.length) + 1} of {activeWordList.length}
            </span>
            <div className="text-amber-600 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+15 XP per correct choice</span>
            </div>
          </div>

          {/* Uzbek clue */}
          <div className="text-center">
            <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-lg text-xs font-bold text-indigo-700">
              Clue (O'zbekcha): {blankQuiz.target.uzbekTranslation}
            </span>
          </div>

          {/* Sentence with blank */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800 text-center leading-relaxed">
            "{blankQuiz.sentence}"
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {blankQuiz.options.map((opt) => {
              const isSelected = blankFeedback?.selected === opt.id;
              let style = 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800';

              if (blankFeedback) {
                if (opt.id === blankQuiz.target.id) {
                  style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected) {
                  style = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                } else {
                  style = 'bg-slate-50 border-slate-200 opacity-50';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={blankFeedback !== null}
                  onClick={() => handleBlankAnswer(opt.id)}
                  className={`w-full p-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt.word}</span>
                  {blankFeedback && opt.id === blankQuiz.target.id && (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  )}
                  {blankFeedback && isSelected && opt.id !== blankQuiz.target.id && (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {blankFeedback && (
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              blankFeedback.isCorrect 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="text-xs">
                <div className="font-bold">
                  {blankFeedback.isCorrect ? '✓ Correct word choice!' : '✗ Try to remember:'}
                </div>
                <div className="mt-0.5 text-slate-700">
                  "{blankQuiz.target.word}" means {blankQuiz.target.uzbekTranslation} ({blankQuiz.target.simpleDefinition})
                </div>
              </div>

              <button
                onClick={handleNextBlank}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MEMORY GRID (12 CARDS FLIP) */}
      {/* ========================================================================= */}
      {mode === 'memory' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
            <div>
              <span className="font-bold text-slate-900">12-Card Memory Grid</span>
              <span className="text-slate-300 mx-2">·</span>
              <span className="text-slate-500">Pair each English word with its Uzbek translation</span>
            </div>
            <div className="font-bold text-emerald-600">
              Matched: <span className="tabular-nums font-mono">{memoryMatchesFound}</span> / 6 pairs
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {memoryCards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleMemoryCardClick(idx)}
                disabled={card.isMatched || card.isFlipped}
                className={`h-24 p-2.5 rounded-xl border text-xs text-center flex items-center justify-center transition-all ${
                  card.isMatched 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold opacity-60' 
                    : card.isFlipped 
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-950 font-bold shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <span className={card.type === 'word' ? 'font-extrabold text-sm text-indigo-700' : 'text-xs text-slate-800 font-semibold'}>
                    {card.text}
                  </span>
                ) : (
                  <Brain className="w-5 h-5 opacity-40 text-slate-400" />
                )}
              </button>
            ))}
          </div>

          {memoryMatchesFound === 6 && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <h4 className="text-sm font-bold text-emerald-900">🎉 Memory Grid Completed!</h4>
              <p className="text-xs text-emerald-700">All 6 pairs matched! +150 XP added to your total.</p>
              <button
                onClick={startMemoryGrid}
                className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors inline-flex items-center gap-1.5"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Play Another Round</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SPEED SPRINT (30-SECOND TIMER) */}
      {/* ========================================================================= */}
      {mode === 'speed' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-xl mx-auto space-y-6 text-center">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">30-Second Rapid Sprint</h3>
            <p className="text-xs text-slate-500 mt-1">
              Rapid recall drill: quickly recognize word meanings under timed pressure.
            </p>
          </div>

          {!speedActive ? (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 text-left space-y-1.5">
                <div className="font-bold text-slate-800">Sprint Rules:</div>
                <div>• You have 30 seconds to answer as many simple vocabulary questions as possible.</div>
                <div>• +15 XP for every correct answer, plus combo bonus!</div>
                <div>• Trains rapid cognitive retrieval essential for university exams.</div>
              </div>

              <button
                onClick={startSpeedSprint}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Start 30-Second Sprint
              </button>
            </div>
          ) : (
            <div className="space-y-5 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-amber-600">
                  ⏱️ {speedSecondsLeft}s remaining
                </span>
                <div className="flex items-center gap-2">
                  {speedStreak >= 2 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {speedStreak}x Streak 🔥
                    </span>
                  )}
                  <span className="text-xs font-mono font-bold text-indigo-600">
                    Score: {speedScore} correct
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-bold text-slate-900">
                  Choose the Uzbek translation for "{speedTarget.word}":
                </div>
                <div className="space-y-2">
                  {speedOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleSpeedAnswer(opt.id)}
                      className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 text-xs font-bold text-slate-800 transition-colors"
                    >
                      {opt.uzbekTranslation}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Journey Navigation */}
      <div className="bg-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div>
          <span className="font-bold text-slate-900">Ready for next steps?</span>{' '}
          Explore these target words in our reading passage or complete your writing mission.
        </div>
        <div className="flex items-center gap-2">
          {onLaunchReading && (
            <button
              onClick={onLaunchReading}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold rounded-xl transition-colors flex items-center gap-1 shadow-2xs"
            >
              <span>Reading Passage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          {onLaunchWriting && (
            <button
              onClick={onLaunchWriting}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>Writing Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
