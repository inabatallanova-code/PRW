import React, { useState } from 'react';
import { UserAccount, UserRole, InterfaceLang, StudentLevel } from '../../types/lesson';
import { storage, DEFAULT_STUDENT_ACCOUNT, DEFAULT_AUTHOR_ACCOUNT } from '../../services/storage';
import { sound } from '../../services/sound';
import { getTranslation } from '../../i18n/translations';
import { 
  User, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  X, 
  CheckCircle2, 
  LogOut, 
  Key, 
  GraduationCap, 
  Save,
  ArrowRight
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onUserChange: (user: UserAccount) => void;
  interfaceLang: InterfaceLang;
  studentLevel: StudentLevel;
  onOpenTeacherPanel: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  interfaceLang,
  studentLevel,
  onOpenTeacherPanel
}) => {
  const t = getTranslation(interfaceLang);
  const isAuthor = currentUser.role === 'author';

  // Student editable fields
  const [studentName, setStudentName] = useState(currentUser.name);
  const [studentId, setStudentId] = useState(currentUser.studentId || '2024-ESP-304');
  
  // Author passcode field
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    const updated: UserAccount = {
      ...currentUser,
      name: studentName,
      studentId: studentId
    };
    storage.setCurrentUser(updated);
    onUserChange(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleLoginAsAuthor = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!passcode.trim()) {
      sound.playError();
      setPasscodeError(true);
      return;
    }

    if (storage.verifyAuthorPassword(passcode)) {
      sound.playSuccess();
      const authorAcc = DEFAULT_AUTHOR_ACCOUNT;
      storage.setCurrentUser(authorAcc);
      onUserChange(authorAcc);
      setPasscode('');
      setPasscodeError(false);
    } else {
      sound.playError();
      setPasscodeError(true);
    }
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length >= 4) {
      storage.setAuthorPassword(newPassword.trim());
      sound.playSuccess();
      setPasswordChangeSuccess(true);
      setNewPassword('');
      setIsChangingPassword(false);
      setTimeout(() => setPasswordChangeSuccess(false), 3000);
    }
  };

  const handleSwitchToStudent = () => {
    sound.playClick();
    const studentAcc = DEFAULT_STUDENT_ACCOUNT;
    storage.setCurrentUser(studentAcc);
    onUserChange(studentAcc);
    setStudentName(studentAcc.name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isAuthor ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {isAuthor ? <ShieldCheck className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isAuthor 
                  ? (interfaceLang === 'uz' ? 'Mualliflik kabineti' : 'Author Master Account') 
                  : (interfaceLang === 'uz' ? 'Talaba hisobi' : 'Learner Account')}
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                {isAuthor ? 'Inabat Allanova · Master Dominations' : 'University Student Profile'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success toast */}
        {saveSuccess && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile successfully updated!</span>
          </div>
        )}

        {/* CURRENT ROLE DETAILS */}
        {isAuthor ? (
          /* AUTHOR LOGGED IN VIEW */
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-indigo-50 via-white to-indigo-50/50 rounded-xl border border-indigo-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Master Dominations Active
                </span>
                <span className="text-xs text-indigo-700 font-mono font-bold">inabatallanova@gmail.com</span>
              </div>
              <h4 className="text-sm font-black text-slate-900">Inabat Allanova</h4>
              <p className="text-xs text-slate-600">
                {interfaceLang === 'uz'
                  ? 'Siz muallif sifatida to\'liq nazoratga egasiz: darslarni tahrirlash, 2, 3, 4, 5-darslarni talabalarga ochish yoki yopish, va o\'quv dasturini boshqarish.'
                  : 'You are authenticated with full author dominations over the entire platform. You can unlock/lock lessons 2-5 for students, edit syllabus materials, and calibrate difficulty.'}
              </p>
            </div>

            {/* Author Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenTeacherPanel();
                }}
                className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>{interfaceLang === 'uz' ? 'Mualliflik studiyasini ochish' : 'Open Author Studio'}</span>
              </button>

              <button
                onClick={handleSwitchToStudent}
                className="py-2 px-3 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span>{interfaceLang === 'uz' ? 'Talaba sifatida ko\'rish' : 'View as Student'}</span>
              </button>
            </div>

            {/* Author Password Change Section */}
            <div className="pt-3 border-t border-slate-200">
              {!isChangingPassword ? (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {interfaceLang === 'uz' ? 'Muallif paroli himoyalangan' : 'Author password active'}
                  </span>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline flex items-center gap-1"
                  >
                    <Key className="w-3 h-3" />
                    <span>{interfaceLang === 'uz' ? 'Parolni o\'zgartirish' : 'Change Password'}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveNewPassword} className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800">
                    {interfaceLang === 'uz' ? 'Yangi muallif parolini kiriting:' : 'Set New Author Password:'}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      placeholder="Min 4 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={4}
                      className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold"
                    >
                      {interfaceLang === 'uz' ? 'Saqlash' : 'Update'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChangingPassword(false)}
                      className="px-2 py-2 text-slate-500 hover:text-slate-700"
                    >
                      {interfaceLang === 'uz' ? 'Bekor' : 'Cancel'}
                    </button>
                  </div>
                </form>
              )}

              {passwordChangeSuccess && (
                <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Password updated successfully!</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* STUDENT LOGGED IN VIEW */
          <div className="space-y-5">
            <form onSubmit={handleSaveStudent} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {interfaceLang === 'uz' ? 'Talaba ismi-familiyasi:' : 'Student Full Name:'}
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-900 focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Student ID:</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900 focus:bg-white focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current CEFR Level:</label>
                  <div className="p-2.5 bg-slate-100 rounded-lg font-mono font-bold text-indigo-700 border border-slate-200">
                    {studentLevel}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{interfaceLang === 'uz' ? 'Ma\'lumotlarni saqlash' : 'Save Student Profile'}</span>
              </button>
            </form>

            {/* SWITCH TO AUTHOR ACCESS SECTION WITH STRICT PASSWORD */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-slate-900">
                  {interfaceLang === 'uz' ? 'Muallif sifatida kirish (Inabat Allanova):' : 'Author Access (Inabat Allanova):'}
                </h4>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                {interfaceLang === 'uz'
                  ? 'Talabalar platformani faqat o\'rganish uchun ishlatishadi. Muallif sifatida darslarni ochish/yopish va platformani boshqarish uchun maxsus parolni kiriting.'
                  : 'Students use this platform to study and practice. Only the author (Inabat Allanova) can log in with a password to manage syllabus and unlock lessons.'}
              </p>

              <form onSubmit={handleLoginAsAuthor} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    placeholder="Enter author password"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setPasscodeError(false);
                    }}
                    required
                    className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono focus:bg-white focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shrink-0 flex items-center gap-1 shadow-xs"
                  >
                    <Key className="w-3 h-3 text-indigo-400" />
                    <span>{interfaceLang === 'uz' ? 'Kirish' : 'Log in as Author'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Authorized role: Course Author & Instructor</span>
                  <span className="font-mono text-indigo-600/70">(Default: author2025)</span>
                </div>

                {passcodeError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-700 font-medium">
                    {interfaceLang === 'uz' 
                      ? 'Parol noto\'g\'ri! Faqat muallif (Inabat Allanova) darslarni boshqara oladi.' 
                      : 'Incorrect password! Only author Inabat Allanova has permission to access this mode.'}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
