import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, LogIn, UserPlus, Key, Wrench, Users, Heart, Zap } from 'lucide-react';

interface MobileNavProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
  isAuthenticated?: boolean;
  onLogoClick?: () => void;
  onLogin?: () => void;
  onSignUp?: () => void;
}

export function MobileNav({ onNavigate, currentPage = '', isAuthenticated = false, onLogoClick, onLogin, onSignUp }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = isAuthenticated
    ? [
        { icon: Home, label: 'Home', page: 'landing', action: () => onNavigate?.('landing') },
        { icon: Users, label: 'Matches', page: 'matches', action: () => onNavigate?.('matches') },
        { icon: Heart, label: 'Connections', page: 'connections', action: () => onNavigate?.('connections') },
        { icon: Wrench, label: 'Create Event', page: 'create', action: () => onNavigate?.('create') },
      ]
    : [
        { icon: Home, label: 'Home', page: 'landing', action: () => onNavigate?.('landing') },
        { icon: LogIn, label: 'Login', page: 'login', action: onLogin },
        { icon: UserPlus, label: 'Sign Up', page: 'signup', action: onSignUp },
        { icon: Key, label: 'Join Event', page: 'landing', action: () => onNavigate?.('landing') },
      ];

  const handleNavigate = (link: any) => {
    if (link.action) {
      link.action();
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      onNavigate?.('landing');
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar - Only visible on mobile/tablet */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0E0E10]/95 backdrop-blur-xl border-b border-[#7B61FF]/30">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50 rounded-lg"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#D9F24D] to-[#7B61FF] rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#0E0E10]" />
            </div>
            <span
              className="text-xl bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 800 }}
            >
              Dream Team
            </span>
          </button>

          {/* Hamburger Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-11 h-11 rounded-xl bg-[#1B1B1F] border border-[#7B61FF]/40 flex items-center justify-center text-[#D9F24D] hover:border-[#D9F24D]/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-[#0E0E10]/80 backdrop-blur-sm z-40"
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-gradient-to-b from-[#1B1B1F] to-[#0E0E10] border-l border-[#7B61FF]/30 z-50 overflow-y-auto"
            >
              <div className="p-6 pt-20">
                {/* Close Button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-[#0E0E10] border border-[#7B61FF]/40 flex items-center justify-center text-[#D9F24D] hover:border-[#D9F24D]/60 transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = currentPage === link.page;

                    return (
                      <motion.button
                        key={link.page}
                        onClick={() => handleNavigate(link)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50 ${
                          isActive
                            ? 'bg-[#D9F24D]/10 border border-[#D9F24D]/50 text-[#D9F24D]'
                            : 'bg-[#0E0E10]/50 border border-[#7B61FF]/20 text-[#D1D1D6] hover:border-[#7B61FF]/50 hover:text-white'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
                          {link.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-[#7B61FF]/20"
                >
                  <p
                    className="text-xs text-[#D1D1D6]/60 text-center"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Dream Team v1.0
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}