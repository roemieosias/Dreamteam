import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Menu, X } from 'lucide-react';

interface NavBarProps {
  onLogin?: () => void;
  onSignUp?: () => void;
  onLogoClick?: () => void;
  showAuthButtons?: boolean;
  currentPage?: string;
}

export function NavBar({ onLogin, onSignUp, onLogoClick, showAuthButtons = true, currentPage }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'bg-[#0E0E10]/80 backdrop-blur-xl border-b border-[#7B61FF]/20 shadow-[0_4px_24px_rgba(0,0,0,0.15)]' : 'bg-transparent'
        }`}
        style={{ height: '96px', paddingTop: '32px' }}
      >
        <div className="max-w-[1440px] mx-auto px-20 h-full flex items-center justify-between">
          {/* Logo - Left Section */}
          <motion.div
            onClick={onLogoClick}
            className="flex items-center gap-2.5 cursor-pointer group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            role="button"
            aria-label="Return to Home Page"
            tabIndex={0}
            onKeyPress={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && onLogoClick) {
                onLogoClick();
              }
            }}
          >
            <div className="relative">
              <Zap className="w-7 h-7 text-[#D9F24D] drop-shadow-[0_0_12px_rgba(217,242,77,0.7)]" strokeWidth={2.5} />
              <motion.div
                className="absolute inset-0 blur-md"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Zap className="w-7 h-7 text-[#7B61FF]" strokeWidth={2.5} />
              </motion.div>
            </div>
            <h1 
              className="text-2xl text-white tracking-tight group-hover:text-[#D9F24D] transition-colors duration-300" 
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}
            >
              Dream Team
            </h1>
          </motion.div>

          {/* Desktop Auth Buttons - Right Section */}
          {showAuthButtons && (
            <div className="hidden md:flex items-center gap-6">
              {/* Login Button */}
              <motion.button
                onClick={onLogin}
                className="relative px-7 py-3 border border-white/70 rounded-xl text-white overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
              >
                <span className="relative z-10 group-hover:text-[#D9F24D] transition-colors duration-300">
                  Login
                </span>
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-[#7B61FF]/0 group-hover:bg-[#7B61FF]/10 transition-all duration-300 rounded-xl"
                />
                {/* Underline animation */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7B61FF] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </motion.button>

              {/* Sign Up Button */}
              <motion.button
                onClick={onSignUp}
                className="relative px-7 py-3 rounded-xl text-[#0E0E10] overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50"
                style={{ 
                  fontFamily: 'Inter, system-ui, sans-serif', 
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #D9F24D 0%, #7B61FF 100%)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="relative z-10">Sign Up</span>
                {/* Pulse glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(circle, rgba(123,97,255,0.25) 0%, transparent 70%)',
                  }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </motion.button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {showAuthButtons && (
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/70 text-white hover:bg-[#7B61FF]/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-20 right-0 bottom-0 w-full md:hidden z-40 bg-[#0E0E10]/95 backdrop-blur-2xl border-l border-[#7B61FF]/20"
          >
            <div className="flex flex-col items-stretch p-8 gap-6">
              {/* Mobile Login Button */}
              <motion.button
                onClick={() => {
                  onLogin?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-7 py-4 border border-white/70 rounded-xl text-white hover:bg-[#7B61FF]/10 hover:text-[#D9F24D] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
              >
                Login
              </motion.button>

              {/* Mobile Sign Up Button */}
              <motion.button
                onClick={() => {
                  onSignUp?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-7 py-4 rounded-xl text-[#0E0E10] relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50"
                style={{ 
                  fontFamily: 'Inter, system-ui, sans-serif', 
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #D9F24D 0%, #7B61FF 100%)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Sign Up</span>
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(123,97,255,0.25) 0%, transparent 70%)',
                  }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under fixed nav */}
      <div style={{ height: '80px' }} />
    </>
  );
}