import React, { useState } from 'react';
import { Lesson, VocabularyWord, ReadingParagraph, ReadingQuestion } from '../../types/lesson';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { 
  UserCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  Save, 
  CheckCircle, 
  BookOpen, 
  Layers, 
  PenTool, 
  BarChart3, 
  ShieldAlert,
  X,
  Lock,
  Unlock
} from 'lucide-react';

interface TeacherAdminPanelProps {
  lessons: Lesson[];
  onLessonsChange: () => void;
  onSelectLessonToPreview?: (lesson: Lesson) => void;
}

export const TeacherAdminPanel: React.FC<TeacherAdminPanelProps> = ({
  lessons,
  onLessonsChange,
  onSelectLessonToPreview
}) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(lessons[0] || null);
  const [activeTab, setActiveTab] = useState<'lessons' | 'editor' | 'analytics'>('lessons');
  const [editorSubTab, setEditorSubTab] = useState<'metadata' | 'vocabulary' | 'reading' | 'writing'>('vocabulary');
  const [isSavedBanner, setIsSavedBanner] = useState<boolean>(false);

  // Editable state
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const handleEditLesson = (lesson: Lesson) => {
    sound.playClick();
    setEditingLesson(JSON.parse(JSON.stringify(lesson)));
    setActiveTab('editor');
  };

  const handleCreateNewLesson = () => {
    sound.playSuccess();
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      number: lessons.length + 1,
      title: 'Academic Research & Methodology',
      subtitle: 'Formulating Hypotheses and Synthesizing Literature',
      level: 'Upper-Intermediate / B2',
      estimatedMinutes: 50,
      xpReward: 350,
      isPublished: true,
      vocabulary: JSON.parse(JSON.stringify(lessons[0].vocabulary)).slice(0, 20),
      reading: {
        id: `read-${Date.now()}`,
        title: 'Empirical Inquiry in Higher Education',
        topic: 'Research Methodology',
        wordCount: 550,
        timeLimitMinutes: 20,
        paragraphs: [
          {
            id: 'np-1',
            number: 1,
            heading: 'Foundations of Scholarly Inquiry',
            text: 'Systematic research requires rigorous formulation of hypotheses and objective evaluation of evidence...'
          }
        ]
      },
      readingQuestions: JSON.parse(JSON.stringify(lessons[0].readingQuestions)).slice(0, 5),
      writingActivities: JSON.parse(JSON.stringify(lessons[0].writingActivities)),
      typingSprintPassage: {
        title: 'Scholarly Abstract Protocol',
        text: 'Academic inquiry demands rigorous empirical verification and concise articulation of hypotheses.',
        timeLimitSeconds: 60
      },
      miniWritingPrompt: {
        title: '5-Minute Mini Writing: Research Justification',
        prompt: 'Formulate a 3-sentence statement explaining why your proposed study is feasible.',
        timeLimitMinutes: 5,
        targetWords: 70
      },
      finalWritingTask: {
        id: `task-${Date.now()}`,
        title: 'Academic Research Proposal: Methodological Outline',
        contextScenario: 'You are applying for a university postgraduate research grant.',
        prompt: 'Write an executive research prospectus (150–220 words) outlining your methodology.',
        targetMinWords: 150,
        targetMaxWords: 220,
        timeLimitMinutes: 15,
        recommendedStructure: [
          { step: '1. Problem Statement', guideline: 'Identify the empirical research gap.' },
          { step: '2. Proposed Methodology', guideline: 'Explain the data collection procedures.' }
        ],
        targetVocabulary: ['facilitate', 'obtain', 'significant', 'coherent', 'implement', 'evaluate']
      },
      grammarActivities: JSON.parse(JSON.stringify(lessons[0].grammarActivities)),
    };

    storage.saveLesson(newLesson);
    onLessonsChange();
    setEditingLesson(newLesson);
    setActiveTab('editor');
  };

  const handleDuplicateLesson = (lesson: Lesson) => {
    sound.playClick();
    const cloned: Lesson = JSON.parse(JSON.stringify(lesson));
    cloned.id = `lesson-${Date.now()}`;
    cloned.number = lessons.length + 1;
    cloned.title = `${cloned.title} (Copy)`;
    storage.saveLesson(cloned);
    onLessonsChange();
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (lessonId === 'lesson-1') {
      alert('Lesson 1 is the core foundational lesson and cannot be deleted.');
      return;
    }
    if (confirm('Are you sure you want to delete this lesson?')) {
      sound.playClick();
      storage.deleteLesson(lessonId);
      onLessonsChange();
      setActiveTab('lessons');
    }
  };

  const handleSaveEditor = () => {
    if (!editingLesson) return;
    sound.playSuccess();
    storage.saveLesson(editingLesson);
    onLessonsChange();
    setIsSavedBanner(true);
    setTimeout(() => setIsSavedBanner(false), 3000);
  };

  // Vocabulary inline edit helper
  const handleUpdateWord = (index: number, field: keyof VocabularyWord, value: string) => {
    if (!editingLesson) return;
    const updatedVocab = [...editingLesson.vocabulary];
    updatedVocab[index] = {
      ...updatedVocab[index],
      [field]: value
    };
    setEditingLesson({ ...editingLesson, vocabulary: updatedVocab });
  };

  // Mock cohort analytics
  const analytics = {
    totalStudents: 48,
    activeThisWeek: 42,
    completionRate: 88,
    avgReadingScore: 84,
    avgWritingBand: '6.5 (B2)',
    mostDifficultWords: ['articulate', 'consensus', 'subsequent'],
    integrityAlerts: 4
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
              <UserCheck className="w-4 h-4" />
              <span>TEACHER & INSTRUCTOR MANAGEMENT CONSOLE</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Curriculum & Assessment Engine
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Add new lessons, edit the 20 target vocabulary words, customize readings, and monitor student integrity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { sound.playClick(); setActiveTab('lessons'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'lessons' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Lessons ({lessons.length})
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveTab('analytics'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                activeTab === 'analytics' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Cohort Analytics</span>
            </button>
            <button
              onClick={handleCreateNewLesson}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Lesson</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                const json = storage.exportPlatformData();
                navigator.clipboard?.writeText(json);
                alert('Curriculum backup copied to clipboard as JSON!');
              }}
              title="Copy platform curriculum JSON backup"
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Backup JSON
            </button>
            <button
              onClick={() => {
                if (confirm('Reset custom curriculum changes to original 5 course units?')) {
                  sound.playClick();
                  storage.resetCurriculum();
                  onLessonsChange();
                }
              }}
              title="Reset to official 5 course units"
              className="px-2.5 py-1.5 border border-slate-300 hover:bg-rose-50 hover:text-rose-700 text-slate-600 text-xs font-semibold rounded-lg transition-colors"
            >
              Reset Defaults
            </button>
          </div>
        </div>

        {/* Centralized Content Update Notice */}
        <div className="pt-3 text-[11px] text-slate-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span>
            <strong>Centralized Content Guarantee:</strong> When you modify a vocabulary word, reading question, or prompt here, every student interactive activity updates automatically.
          </span>
        </div>
      </div>

      {isSavedBanner && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Lesson updates successfully saved to persistent curriculum database!</span>
        </div>
      )}

      {/* VIEW 1: LESSONS LIST */}
      {activeTab === 'lessons' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map(lesson => (
              <div 
                key={lesson.id} 
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-bold text-indigo-600 uppercase">Lesson {lesson.number}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {lesson.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {lesson.subtitle}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-600 pt-3 border-t border-slate-100 mt-3">
                    <span>{lesson.vocabulary.length} Vocab Words</span>
                    <span>·</span>
                    <span>{lesson.reading.wordCount} Words Reading</span>
                    <span>·</span>
                    <span>{lesson.readingQuestions.length} Questions</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    {/* Author Lesson Unlock Toggle */}
                    {lesson.id !== 'lesson-1' && (
                      <button
                        onClick={() => {
                          sound.playClick();
                          storage.toggleLessonUnlock(lesson.id);
                          onLessonsChange();
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors ${
                          storage.isLessonUnlocked(lesson.id)
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                        title="Toggle student access permission"
                      >
                        {storage.isLessonUnlocked(lesson.id) ? (
                          <>
                            <Unlock className="w-3 h-3 text-emerald-600" />
                            <span>Unlocked</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 text-amber-600" />
                            <span>Locked</span>
                          </>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => handleEditLesson(lesson)}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDuplicateLesson(lesson)}
                      title="Duplicate Lesson"
                      className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {lesson.id !== 'lesson-1' && (
                      <button
                        onClick={() => handleDeleteLesson(lesson.id)}
                        title="Delete Lesson"
                        className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {onSelectLessonToPreview && (
                    <button
                      onClick={() => onSelectLessonToPreview(lesson)}
                      className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: RICH LESSON CONTENT EDITOR */}
      {activeTab === 'editor' && editingLesson && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="text-xs text-indigo-600 font-bold uppercase">
                Editing Lesson {editingLesson.number}
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {editingLesson.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('lessons')}
                className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditor}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>

          {/* Level Variant Selector */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-700">Adaptive Difficulty Variant:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['A2', 'B1', 'B1+', 'B2', 'B2+', 'C1'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => {
                    sound.playClick();
                    const adapted = storage.getLessons(lvl).find(l => l.number === editingLesson.number) || editingLesson;
                    setEditingLesson(JSON.parse(JSON.stringify(adapted)));
                  }}
                  className={`px-2.5 py-1 rounded-md font-mono text-xs font-bold transition-colors ${
                    editingLesson.level.includes(lvl)
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Subtabs: Metadata | 20 Vocabulary Words | Reading | Writing */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <button
              onClick={() => setEditorSubTab('vocabulary')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                editorSubTab === 'vocabulary' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Target Vocabulary ({editingLesson.vocabulary.length})
            </button>
            <button
              onClick={() => setEditorSubTab('reading')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                editorSubTab === 'reading' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Reading Passage & Questions
            </button>
            <button
              onClick={() => setEditorSubTab('writing')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                editorSubTab === 'writing' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Writing Tasks & Rubrics
            </button>
          </div>

          {/* SUBTAB 1: VOCABULARY EDITING (All 20 words with collocations and Uzbek translations) */}
          {editorSubTab === 'vocabulary' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Edit any of the 20 target vocabulary items. Updates will propagate instantly across all quizzes, sentence builders, and AI checkers.
              </p>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {editingLesson.vocabulary.map((word, idx) => (
                  <div key={word.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-700">
                      <span>Word #{idx + 1}</span>
                      <span className="font-mono text-indigo-600">{word.word}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-0.5">English Word</label>
                        <input
                          type="text"
                          value={word.word}
                          onChange={(e) => handleUpdateWord(idx, 'word', e.target.value)}
                          className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-500 block mb-0.5">Part of Speech</label>
                        <select
                          value={word.pos}
                          onChange={(e) => handleUpdateWord(idx, 'pos', e.target.value as any)}
                          className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs"
                        >
                          <option value="verb">verb</option>
                          <option value="noun">noun</option>
                          <option value="adjective">adjective</option>
                          <option value="adverb">adverb</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-500 block mb-0.5">Uzbek Translation</label>
                        <input
                          type="text"
                          value={word.uzbekTranslation}
                          onChange={(e) => handleUpdateWord(idx, 'uzbekTranslation', e.target.value)}
                          className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-medium text-indigo-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-0.5">Simple Definition</label>
                        <input
                          type="text"
                          value={word.simpleDefinition}
                          onChange={(e) => handleUpdateWord(idx, 'simpleDefinition', e.target.value)}
                          className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-500 block mb-0.5">Academic Collocation</label>
                        <input
                          type="text"
                          value={word.collocation}
                          onChange={(e) => handleUpdateWord(idx, 'collocation', e.target.value)}
                          className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-500 block mb-0.5">Example Sentence</label>
                      <input
                        type="text"
                        value={word.exampleSentence}
                        onChange={(e) => handleUpdateWord(idx, 'exampleSentence', e.target.value)}
                        className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-serif"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 2: READING PASSAGE & QUESTIONS */}
          {editorSubTab === 'reading' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Passage Title</label>
                <input
                  type="text"
                  value={editingLesson.reading.title}
                  onChange={(e) => setEditingLesson({
                    ...editingLesson,
                    reading: { ...editingLesson.reading, title: e.target.value }
                  })}
                  className="w-full p-2.5 bg-white rounded-lg border border-slate-300 text-xs font-semibold"
                />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 block">Paragraphs (1 to {editingLesson.reading.paragraphs.length}):</span>
                {editingLesson.reading.paragraphs.map((p, idx) => (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-bold text-indigo-700">Paragraph {p.number}: {p.heading}</span>
                    <textarea
                      value={p.text}
                      onChange={(e) => {
                        const paras = [...editingLesson.reading.paragraphs];
                        paras[idx].text = e.target.value;
                        setEditingLesson({
                          ...editingLesson,
                          reading: { ...editingLesson.reading, paragraphs: paras }
                        });
                      }}
                      className="w-full h-24 p-2 bg-white rounded-lg border border-slate-300 text-xs font-sans resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 3: WRITING TASK & RUBRICS */}
          {editorSubTab === 'writing' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Final Writing Mission Title</label>
                <input
                  type="text"
                  value={editingLesson.finalWritingTask.title}
                  onChange={(e) => setEditingLesson({
                    ...editingLesson,
                    finalWritingTask: { ...editingLesson.finalWritingTask, title: e.target.value }
                  })}
                  className="w-full p-2.5 bg-white rounded-lg border border-slate-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Prompt Instructions</label>
                <textarea
                  value={editingLesson.finalWritingTask.prompt}
                  onChange={(e) => setEditingLesson({
                    ...editingLesson,
                    finalWritingTask: { ...editingLesson.finalWritingTask, prompt: e.target.value }
                  })}
                  className="w-full h-20 p-2.5 bg-white rounded-lg border border-slate-300 text-xs resize-y"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-500 block mb-0.5">Min Words</label>
                  <input
                    type="number"
                    value={editingLesson.finalWritingTask.targetMinWords}
                    onChange={(e) => setEditingLesson({
                      ...editingLesson,
                      finalWritingTask: { ...editingLesson.finalWritingTask, targetMinWords: parseInt(e.target.value, 10) }
                    })}
                    className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-0.5">Max Words</label>
                  <input
                    type="number"
                    value={editingLesson.finalWritingTask.targetMaxWords}
                    onChange={(e) => setEditingLesson({
                      ...editingLesson,
                      finalWritingTask: { ...editingLesson.finalWritingTask, targetMaxWords: parseInt(e.target.value, 10) }
                    })}
                    className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-0.5">Time Limit (Mins)</label>
                  <input
                    type="number"
                    value={editingLesson.finalWritingTask.timeLimitMinutes}
                    onChange={(e) => setEditingLesson({
                      ...editingLesson,
                      finalWritingTask: { ...editingLesson.finalWritingTask, timeLimitMinutes: parseInt(e.target.value, 10) }
                    })}
                    className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: COHORT ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Total Enrolled</span>
              <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">{analytics.totalStudents}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Weekly Active</span>
              <span className="text-2xl font-black text-emerald-700 font-mono tabular-nums">{analytics.activeThisWeek}</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Avg Reading Score</span>
              <span className="text-2xl font-black text-indigo-700 font-mono tabular-nums">{analytics.avgReadingScore}%</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Integrity Violations</span>
              <span className="text-2xl font-black text-amber-700 font-mono tabular-nums">{analytics.integrityAlerts}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Vocabulary Items Requiring Review Across Cohort</h4>
            <div className="flex gap-2">
              {analytics.mostDifficultWords.map(w => (
                <span key={w} className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs font-semibold">
                  {w} (42% error rate)
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
