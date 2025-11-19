import { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Sparkles, ArrowRight, Users } from 'lucide-react';
import { GlowButton } from './ui/GlowButton';
import { NavBar } from './ui/NavBar';
import { MobileNav } from './ui/MobileNav';

interface LandingPageProps {
  onJoinEvent: (code: string) => void;
  onCreateEvent: () => void;
  onLogin?: () => void;
  onSignUp?: () => void;
}

export function LandingPage({ onJoinEvent, onCreateEvent, onLogin, onSignUp }: LandingPageProps) {
  const [eventCode, setEventCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJoin = () => {
    // TESTING MODE: Accept any input and proceed to Waiting Room
    setIsSubmitting(true);
    setTimeout(() => {
      onJoinEvent(eventCode.trim() || 'TEST-EVENT');
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center pt-20 sm:pt-24">
      {/* Navigation Bar - Desktop only */}
      <div className="hidden lg:block">
        <NavBar 
          onLogin={onLogin} 
          onSignUp={onSignUp}
          onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>
      
      {/* Mobile Nav */}
      <MobileNav 
        onLogin={onLogin} 
        onSignUp={onSignUp}
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Animated Background - Softer with radial focus */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Central radial glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 45%, rgba(123,97,255,0.15) 0%, rgba(14,14,16,0.8) 40%, #0E0E10 70%)',
          }}
        />
        
        {/* Ambient color gradients */}
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
        
        {/* Floating geometric shapes - more subtle */}
        {[...Array(12)].map((_, i) => (
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
        
        {/* Blurred particle effects */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
              left: `${20 + i * 15}%`,
              top: `${15 + (i % 3) * 30}%`,
              background: i % 3 === 0 ? '#7B61FF' : i % 3 === 1 ? '#D9F24D' : '#FF7B00',
              opacity: 0.04,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content - Perfectly centered with breathing space */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center"
        >
          {/* Logo/Brand - Responsive sizing */}
          <motion.div
            className="flex items-center justify-center gap-2 sm:gap-2.5 mb-12 sm:mb-16 lg:mb-24"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 text-[#D9F24D] drop-shadow-[0_0_12px_rgba(217,242,77,0.7)]" strokeWidth={2.5} />
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 text-[#D9F24D]" strokeWidth={2.5} />
              </motion.div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Dream Team
            </h1>
          </motion.div>

          {/* Hero Tagline - Responsive typography */}
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-5 lg:mb-6 leading-tight px-4"
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif', 
              fontWeight: 900,
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #D9F24D 0%, #7B61FF 45%, #5B8FFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 50px rgba(217,242,77,0.25))',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Skip the awkward stage
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg lg:text-2xl text-[#D1D1D6] mb-16 sm:mb-20 lg:mb-32 max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}
          >
            Real-time team matching for hackathons and class projects. Connect instantly based on skills, build amazing things together.
          </motion.p>

          {/* Connected Avatars Illustration - Responsive sizing */}
          <motion.div
            className="flex items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 lg:mb-24"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="relative"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.1, y: -15 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#FF7B00] flex items-center justify-center border-2 border-[#D9F24D]/40 shadow-lg shadow-[#7B61FF]/20">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                {i < 4 && (
                  <motion.div
                    className="absolute top-1/2 -right-2 sm:-right-3 w-2 sm:w-3 h-0.5 bg-gradient-to-r from-[#D9F24D] to-transparent"
                    animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Event Code Input - Responsive sizing */}
          <motion.div
            className="max-w-lg mx-auto mb-2 sm:mb-3 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Event Code"
                value={eventCode}
                onChange={(e) => setEventCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
                className="w-full px-5 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-[#1B1B1F]/90 backdrop-blur-md border-2 border-[#7B61FF]/50 rounded-xl sm:rounded-2xl text-white placeholder-[#D1D1D6]/70 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/30 transition-all duration-300 text-base sm:text-lg tracking-widest text-center shadow-2xl shadow-[#7B61FF]/10"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#7B61FF]/10 via-[#D9F24D]/10 to-[#7B61FF]/10 -z-10 blur-2xl"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Testing Mode Helper Text */}
          <motion.p
            className="text-xs sm:text-sm text-[#D1D1D6]/50 mb-8 sm:mb-10 max-w-lg mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}
          >
            Testing mode: any code proceeds to the event lobby
          </motion.p>

          {/* Primary CTA - Responsive sizing */}
          <motion.div
            className="mb-8 sm:mb-10 w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <GlowButton
              onClick={handleJoin}
              variant="primary"
              size="large"
              className="w-full max-w-lg mx-auto"
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base">{isSubmitting ? 'Joining...' : 'Join Event'}</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </GlowButton>
          </motion.div>

          {/* Secondary CTA - Responsive text */}
          <motion.button
            onClick={onCreateEvent}
            className="text-[#D1D1D6] hover:text-[#D9F24D] transition-all duration-500 ease-out text-base sm:text-lg group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
          >
            <span className="relative z-10 transition-colors duration-500">or Create Your Own Event</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#7B61FF]/0 via-[#7B61FF]/10 to-[#7B61FF]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500"
            />
          </motion.button>
        </motion.div>

        {/* Feature Pills - Responsive layout */}
        <motion.div
          className="flex gap-2 sm:gap-3 lg:gap-4 flex-wrap justify-center mt-16 sm:mt-20 lg:mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {['⚡ Instant Matching', '🎯 Skill-Based', '🚀 Real-Time', '🤝 Collaborative'].map((feature, i) => (
            <motion.div
              key={feature}
              className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-[#1B1B1F]/70 backdrop-blur-md border border-[#7B61FF]/30 rounded-full text-[#D1D1D6] shadow-lg shadow-[#7B61FF]/5 cursor-default text-xs sm:text-sm"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ 
                scale: 1.08, 
                borderColor: 'rgba(217, 242, 77, 0.6)',
                backgroundColor: 'rgba(27, 27, 31, 0.9)',
                y: -6
              }}
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}