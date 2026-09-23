import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  Mail,
  Lock,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginUser,
    registerUser,
    users
  } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (authModalMode === 'REGISTER') {
      if (!agreeTerms) {
        setErrorMessage('Please agree to terms and conditions to register.');
        return;
      }
      const res = registerUser({ name, email, phone, password });
      if (res.success) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          setIsAuthModalOpen(false);
        }, 1000);
      } else {
        setErrorMessage(res.message);
      }
    } else {
      const res = loginUser(email, password);
      if (res.success) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          setIsAuthModalOpen(false);
        }, 1000);
      } else {
        setErrorMessage(res.message);
      }
    }
  };

  const handleQuickDemoLogin = (demoEmail: string) => {
    setErrorMessage('');
    const res = loginUser(demoEmail);
    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        setIsAuthModalOpen(false);
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 sm:p-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
              {authModalMode === 'LOGIN' ? 'Welcome Back' : 'Get Started'}
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
              {authModalMode === 'LOGIN' ? 'Sign In to NovaCart' : 'Create an Account'}
            </h2>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl my-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('LOGIN');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              authModalMode === 'LOGIN'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('REGISTER');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              authModalMode === 'REGISTER'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Registration
          </button>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authModalMode === 'REGISTER' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Angad Sahani"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 focus:bg-white font-mono"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password *
              </label>
              {authModalMode === 'LOGIN' && (
                <span className="text-[11px] text-blue-600 hover:text-blue-800 cursor-pointer">
                  Forgot?
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 focus:bg-white font-mono"
              />
            </div>
          </div>

          {authModalMode === 'REGISTER' && (
            <label className="flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>I agree to NovaCart Terms of Use and Privacy Policy.</span>
            </label>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-blue-600/20"
          >
            <span>{authModalMode === 'LOGIN' ? 'Sign In Securely' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Accounts for Easy Evaluation / Testing */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>1-Click Test Accounts</span>
          </div>

          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('angadsahani0090@gmail.com')}
              className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors flex items-center justify-between text-xs cursor-pointer"
            >
              <div>
                <p className="font-semibold text-slate-900">Angad Sahani</p>
                <p className="text-[10px] text-slate-400">angadsahani0090@gmail.com</p>
              </div>
              <span className="text-[10px] font-bold text-blue-600">Quick Log In ›</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('priya.sharma@example.com')}
              className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors flex items-center justify-between text-xs cursor-pointer"
            >
              <div>
                <p className="font-semibold text-slate-900">Priya Sharma</p>
                <p className="text-[10px] text-slate-400">priya.sharma@example.com</p>
              </div>
              <span className="text-[10px] font-bold text-blue-600">Quick Log In ›</span>
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Encrypted Authentication Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
