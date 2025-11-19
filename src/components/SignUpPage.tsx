import { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { GlowButton } from './ui/GlowButton';

interface SignUpPageProps {
  onSignUp: (data: { name: string; email: string; password: string }) => void;
  onNavigateToLogin: () => void;
  onNavigateToHome?: () => void;
}

export function SignUpPage({ onSignUp, onNavigateToLogin, onNavigateToHome }: SignUpPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (name && email && password && password === confirmPassword) {
      setIsSubmitting(true);
      setTimeout(() => {
        onSignUp({ name, email, password });
        setIsSubmitting(false);
        if (onNavigateToHome) {
          onNavigateToHome();
        }
      }, 800);
    }
  };

  const passwordsMatch = !confirmPassword || password === confirmPassword;

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Animated Background - matching landing page */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 45%, rgba(123,97,255,0.15) 0%, rgba(14,14,16,0.8) 40%, #0E0E10 70%)',
          }}
        />
        
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(circle at 30% 40%, #7B61FF 0%, transparent 45%), radial-gradient(circle at 70% 60%, #FF7B00 0%, transparent 45%), radial-gradient(circle at 50% 70%, #D9F24D 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 60, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-[#7B61FF]/8 rounded-lg"
            style={{
              width: `${60 + i * 15}px`,
              height: `${60 + i * 15}px`,
              left: `${10 + i * 8}%`,
              top: `${8 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            className="flex items-center justify-center gap-2.5 mb-12 cursor-pointer group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNavigateToHome}
            role="button"
            aria-label="Return to Home Page"
            tabIndex={0}
            onKeyPress={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && onNavigateToHome) {
                onNavigateToHome();
              }
            }}
          >
            <Zap className="w-10 h-10 text-[#D9F24D] drop-shadow-[0_0_12px_rgba(217,242,77,0.7)]" strokeWidth={2.5} />
            <h1 className="text-4xl tracking-tight group-hover:text-[#D9F24D] transition-colors duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Dream Team
            </h1>
          </motion.div>

          {/* Header */}
          <motion.h2
            className="text-5xl mb-3 leading-tight"
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif', 
              fontWeight: 900,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #D9F24D 0%, #7B61FF 50%, #5B8FFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join the Arena
          </motion.h2>

          <motion.p
            className="text-[#D1D1D6] mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}
          >
            Create your account and start building dream teams
          </motion.p>

          {/* Form Container */}
          <motion.div
            className="relative bg-[#1B1B1F]/80 backdrop-blur-xl border-2 border-[#7B61FF]/30 rounded-3xl p-10 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#7B61FF]/5 to-transparent -z-10"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7B61FF]" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white placeholder-[#D1D1D6]/50 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7B61FF]" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white placeholder-[#D1D1D6]/50 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7B61FF]" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white placeholder-[#D1D1D6]/50 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7B61FF]" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-12 pr-6 py-4 bg-[#0E0E10]/50 border-2 ${
                    !passwordsMatch ? 'border-[#FF7B00]/70' : 'border-[#7B61FF]/30'
                  } rounded-xl text-white placeholder-[#D1D1D6]/50 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300`}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                />
                {!passwordsMatch && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#FF7B00] text-sm mt-2"
                  >
                    Passwords don't match
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <GlowButton
                  onClick={handleSubmit}
                  variant="primary"
                  size="large"
                  disabled={!name || !email || !password || !passwordsMatch || isSubmitting}
                  isSubmitting={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </GlowButton>
              </div>
            </div>
          </motion.div>

          {/* Login Link */}
          <motion.button
            onClick={onNavigateToLogin}
            className="text-[#D1D1D6] hover:text-[#D9F24D] transition-all duration-500 mt-8 group focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50 rounded-lg px-4 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
          >
            Already have an account? <span className="text-[#D9F24D] group-hover:underline">Sign In</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}