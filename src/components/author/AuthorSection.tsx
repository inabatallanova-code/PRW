import React, { useState } from 'react';
import { AuthorProfile, InterfaceLang, UserRole } from '../../types/lesson';
import { storage } from '../../services/storage';
import { sound } from '../../services/sound';
import { getTranslation } from '../../i18n/translations';
import { 
  Award, 
  BookOpen, 
  Mail, 
  GraduationCap, 
  HeartHandshake, 
  Sparkles, 
  Edit3, 
  Save, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Clock, 
  Building2,
  Lock,
  ExternalLink
} from 'lucide-react';

interface AuthorSectionProps {
  interfaceLang: InterfaceLang;
  userRole: UserRole;
  onOpenAuthorStudio: () => void;
  onNavigateToLessons: () => void;
}

export const AuthorSection: React.FC<AuthorSectionProps> = ({
  interfaceLang,
  userRole,
  onOpenAuthorStudio,
  onNavigateToLessons
}) => {
  const t = getTranslation(interfaceLang);
  const [author, setAuthor] = useState<AuthorProfile>(() => storage.getAuthorProfile());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formState, setFormState] = useState<AuthorProfile>(author);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const isAuthor = userRole === 'author';

  const handleStartEdit = () => {
    sound.playClick();
    if (!isAuthor) {
      setIsPasswordModalOpen(true);
      return;
    }
    setFormState(author);
    setIsEditing(true);
  };

  const handleVerifyPasswordToEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (storage.verifyAuthorPassword(passwordInput)) {
      sound.playSuccess();
      const authorAcc = storage.getCurrentUser();
      authorAcc.role = 'author';
      storage.setCurrentUser(authorAcc);
      setIsPasswordModalOpen(false);
      setPasswordInput('');
      setPasswordError(false);
      setFormState(author);
      setIsEditing(true);
      window.location.reload(); // Refresh to set author context across app
    } else {
      sound.playError();
      setPasswordError(true);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    storage.saveAuthorProfile(formState);
    setAuthor(formState);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Success Notification */}
      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-between text-xs font-medium shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {interfaceLang === 'uz' 
                ? 'Muallif profili muvaffaqiyatli saqlandi va yangilandi!' 
                : 'Author profile successfully saved and updated!'}
            </span>
          </div>
          <button onClick={() => setSaveSuccess(false)} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hero Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-100/50 via-slate-50/20 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            {/* Author Avatar / Monogram */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-md border-2 border-indigo-200 shrink-0">
              IA
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-indigo-600" />
                  Course Author & Master Methodologist
                </span>
                {isAuthor && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    All Dominations Active
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {author.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
                {author.title}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {author.institution}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${author.email}`} className="text-indigo-600 hover:underline">
                    {author.email}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons for Author or Learner */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
            {isAuthor ? (
              <>
                <button
                  onClick={handleStartEdit}
                  className="flex-1 md:flex-initial px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{interfaceLang === 'uz' ? 'Profilni tahrirlash' : 'Edit Author Profile'}</span>
                </button>
                <button
                  onClick={onOpenAuthorStudio}
                  className="flex-1 md:flex-initial px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{interfaceLang === 'uz' ? 'Mualliflik studiyasi' : 'Author Studio'}</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleStartEdit}
                className="flex-1 md:flex-initial px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold transition-all shadow-2xs flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>{interfaceLang === 'uz' ? 'Tahrirlash (Muallif sifatida)' : 'Edit Bio (As Author)'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Academic Bio & Message to Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Academic Biography */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {interfaceLang === 'uz' ? 'Akademik faoliyat va biografiya' : 'Academic Background & Research'}
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                {interfaceLang === 'uz' ? 'Kasbiy tajriba va tadqiqot yo\'nalishlari' : 'Tertiary Pedagogy & Discourse Studies'}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed space-y-3 font-normal">
            <p>
              {interfaceLang === 'uz' ? author.bioUz : author.bioEn}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
              #ESP (English for Specific Purposes)
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
              #AcademicDiscourse
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
              #AdaptiveCEFR
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
              #UniversityWriting
            </span>
          </div>
        </div>

        {/* Card 2: Personal Message to Students */}
        <div className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 rounded-2xl border border-indigo-100 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-indigo-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-2xs">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {interfaceLang === 'uz' ? 'Talabalarga mualliflik murojaati' : 'Author\'s Message to University Students'}
              </h2>
              <span className="text-[11px] text-indigo-600 font-medium">
                {interfaceLang === 'uz' ? 'O\'rganish va yuksalish uchun yo\'l-yo\'riq' : 'Guidance for Autonomous Academic Growth'}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed space-y-3 italic bg-white/80 p-4 rounded-xl border border-indigo-100/80">
            <p className="not-italic font-medium text-slate-800">
              "{interfaceLang === 'uz' 
                ? 'Hurmatli talabalar! Universitet ta\'limi davomida ingliz tilida o\'qish va yozish ko\'nikmasi sizning kelajakdagi xalqaro faoliyatingiz, ilmiy tadqiqotlaringiz va kasbiy yuksalishingizning eng muhim kalitidir.' 
                : 'Dear university students! Developing professional English reading and writing competence is the single most transformative asset for your future career, graduate research, and global communication.'}"
            </p>
            <p className="not-italic text-slate-600">
              {interfaceLang === 'uz'
                ? 'Ushbu platforma har bir talabaning haqiqiy bilim darajasiga (A2 dan C1 gacha) mos ravishda tuzilgan. Hech qachon o\'z darajangizdan cho\'chimang — muhimi, har kuni kichik qadamlar bilan so\'zlarni amaliyotda qo\'llash va o\'z fikringizni aniq bayon qilishdir. Sizga muvaffaqiyat tilayman!'
                : 'This platform was specifically engineered to support you at your genuine CEFR level (from A2 support to C1 academic leadership). Never be intimidated by complex texts — deliberate daily practice with target collocations and structured writing will systematically build your confidence.'}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-bold text-indigo-900">
              — {author.name}
            </span>
            <button
              onClick={onNavigateToLessons}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
            >
              <span>{interfaceLang === 'uz' ? 'Darslarni boshlash' : 'Explore Course Lessons'}</span>
              <span>→</span>
            </button>
          </div>
        </div>

      </div>

      {/* Grid: Course Manual / Textbook Details & Teaching Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Textbook & Manual Overview (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {interfaceLang === 'uz' ? 'O\'quv qo\'llanma va laboratoriya darsligi' : 'Laboratory Manual & Coursebook'}
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                {author.manualEdition} · {author.manualSubtitle}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-indigo-700 block">
              {author.manualTitle}
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {interfaceLang === 'uz' ? author.manualDescriptionUz : author.manualDescriptionEn}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Target Cohort</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">3rd & 4th Year Undergraduates</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Curriculum Span</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">5 Core Units + A2–C1 Adaptive</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Methodology</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">Lexical Reading-Writing Synergy</span>
            </div>
          </div>
        </div>

        {/* Consultation & Office Hours (1 Col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {interfaceLang === 'uz' ? 'Maslahat soatlari' : 'Office Hours & Inquiries'}
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                {interfaceLang === 'uz' ? 'Talabalar bilan maslahatlashuv' : 'Student Academic Consultations'}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">
                {interfaceLang === 'uz' ? 'Universitetdagi maslahat vaqti:' : 'Campus Consultation Schedule:'}
              </span>
              <p className="text-slate-600">
                {interfaceLang === 'uz' 
                  ? 'Seshanba va Payshanba kunlari: 14:00 – 16:30' 
                  : 'Tuesdays & Thursdays: 14:00 – 16:30'}
              </p>
              <p className="text-[11px] text-slate-500">
                {interfaceLang === 'uz' ? 'Xorijiy tillar kafedrasi, 312-xona' : 'Foreign Languages Dept, Room 312'}
              </p>
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-semibold text-slate-500 block">Direct Contact:</span>
              <a
                href={`mailto:${author.email}`}
                className="font-mono text-xs font-bold text-indigo-600 hover:underline block break-all"
              >
                {author.email}
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* EDIT AUTHOR PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {interfaceLang === 'uz' ? 'Muallif profilini tahrirlash' : 'Edit Author Profile'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author Name / Ism-familiya</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-900 focus:bg-white focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email / Aloqa pochtasi</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Academic Title / Lavozim va ilmiy daraja</label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">University & Faculty / Universitet va kafedra</label>
                <input
                  type="text"
                  value={formState.institution}
                  onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Biography (English)</label>
                <textarea
                  value={formState.bioEn}
                  onChange={(e) => setFormState({ ...formState, bioEn: e.target.value })}
                  rows={3}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-indigo-500 resize-y"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Biografiya va ma'lumot (O'zbekcha)</label>
                <textarea
                  value={formState.bioUz}
                  onChange={(e) => setFormState({ ...formState, bioUz: e.target.value })}
                  rows={3}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-indigo-500 resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Coursebook Title</label>
                  <input
                    type="text"
                    value={formState.manualTitle}
                    onChange={(e) => setFormState({ ...formState, manualTitle: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Edition / Nashr yili</label>
                  <input
                    type="text"
                    value={formState.manualEdition}
                    onChange={(e) => setFormState({ ...formState, manualEdition: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Author Password Verification Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>{interfaceLang === 'uz' ? 'Muallif paroli' : 'Author Authentication'}</span>
              </div>
              <button
                onClick={() => {
                  setIsPasswordModalOpen(false);
                  setPasswordInput('');
                  setPasswordError(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {interfaceLang === 'uz'
                ? 'Muallif profilini o\'zgartirish uchun muallif parolini kiriting. Talabalar ushbu ma\'lumotlarni tahrirlay olmaydi.'
                : 'Please enter your author password to edit this profile. Learners do not have permission to modify author credentials.'}
            </p>

            <form onSubmit={handleVerifyPasswordToEdit} className="space-y-3">
              <input
                type="password"
                placeholder="Author Password (Default: author2025)"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono focus:bg-white focus:border-indigo-500"
              />

              {passwordError && (
                <div className="text-[11px] text-rose-600 font-medium">
                  {interfaceLang === 'uz' ? 'Parol noto\'g\'ri! Faqat muallif tahrirlashi mumkin.' : 'Incorrect author password! Access denied.'}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setPasswordInput('');
                    setPasswordError(false);
                  }}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold"
                >
                  {interfaceLang === 'uz' ? 'Tasdiqlash' : 'Verify & Edit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
