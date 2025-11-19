import { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, ArrowRight, Zap, AlertCircle } from 'lucide-react';
import { GlowButton } from './ui/GlowButton';
import { signIn } from '../lib/supabase-auth';

interface LoginPageSupabaseProps {
  onLoginSuccess: () => void;
  onSignUp?: () => void;
  onBack?: () => void;
}

export function LoginPageSupabase({ onLoginSuccess, onSignUp, onBack }: LoginPageSupabaseProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const { user, error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError);
      setIsSubmitting(false);
    } else if (user) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 via-[#0E0E10] to-[#FF7B00]/5" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Zap className="w-8 h-8 sm:w-9 sm:h-9 text-[#D9F24D]" strokeWidth={2.5} />
          <h1
            className="text-2xl sm:text-3xl bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900 }}
          >
            Dream Team
          </h1>
        </motion.div>

        {/* Login Card */}
        <motion.div
          className="bg-[#1B1B1F]/80 backdrop-blur-xl border-2 border-[#7B61FF]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#D9F24D] to-[#7B61FF] rounded-xl flex items-center justify-center">
              <LogIn className="w-5 h-5 sm:w-6 sm:h-6 text-[#0E0E10]" />
            </div>
            <div>
              <h2
                className="text-2xl sm:text-3xl text-white"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 800 }}
              >
                Welcome Back
              </h2>
              <p className="text-[#D1D1D6] text-sm sm:text-base">Sign in to continue</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          <div className="space-y-5 sm:space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[#D1D1D6] mb-2 text-sm sm:text-base"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D1D1D6]/50" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white placeholder-[#D1D1D6]/50 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 text-sm sm:text-base"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[#D1D1D6] mb-2 text-sm sm:text-base"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D1D1D6]/50" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white placeholder-[#D1D1D6]/50 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 text-sm sm:text-base"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <GlowButton
              onClick={handleLogin}
              variant="primary"
              size="large"
              className="w-full"
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
            >
              <LogIn className="w-5 h-5" />
              <span className="text-sm sm:text-base">{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-5 h-5" />
            </GlowButton>
          </div>

          {/* Footer Links */}
          <div className="mt-6 sm:mt-8 text-center space-y-3">
            <button
              onClick={onSignUp}
              className="text-[#D1D1D6] hover:text-[#D9F24D] transition-colors duration-300 text-sm sm:text-base"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
            >
              Don't have an account? <span className="text-[#D9F24D]">Sign Up</span>
            </button>

            {onBack && (
              <div>
                <button
                  onClick={onBack}
                  className="text-[#D1D1D6]/70 hover:text-[#D1D1D6] transition-colors duration-300 text-sm"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                >
                  ← Back to Home
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
