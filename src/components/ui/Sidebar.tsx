import { motion } from 'motion/react';
import { Users, Heart, User, Settings, Zap } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogoClick?: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogoClick }: SidebarProps) {
  const menuItems = [
    { id: 'matches', icon: Users, label: 'Matches' },
    { id: 'connections', icon: Heart, label: 'Connections' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="hidden lg:flex w-80 bg-[#1B1B1F]/80 backdrop-blur-sm border-r border-[#7B61FF]/20 p-8 flex-col fixed left-0 top-0 bottom-0 z-20">
      {/* Logo */}
      <motion.div
        className="flex items-center gap-3 mb-16 cursor-pointer group"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onLogoClick}
        role="button"
        aria-label="Return to Home Page"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onLogoClick?.();
          }
        }}
      >
        <div className="relative">
          <Zap className="w-9 h-9 text-[#D9F24D] drop-shadow-[0_0_12px_rgba(217,242,77,0.7)]" strokeWidth={2.5} />
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Zap className="w-9 h-9 text-[#D9F24D]" strokeWidth={2.5} />
          </motion.div>
        </div>
        <h2 className="text-3xl group-hover:text-[#D9F24D] transition-colors duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
          Dream Team
        </h2>
      </motion.div>

      {/* Navigation */}
      <nav className="space-y-3 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50
                ${isActive 
                  ? 'text-[#0E0E10]' 
                  : 'text-[#D1D1D6] hover:text-[#D9F24D] hover:bg-[#7B61FF]/10'
                }
              `}
              whileHover={{ x: 5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-[#D9F24D] rounded-2xl shadow-[0_4px_24px_rgba(217,242,77,0.3)]"
                  layoutId="activeNavItem"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-6 h-6 relative z-10" />
              <span className="text-lg relative z-10" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-[#7B61FF]/20 pt-6">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#7B61FF] to-[#FF7B00] rounded-xl flex items-center justify-center text-white shadow-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
            YO
          </div>
          <div>
            <div className="text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
              You
            </div>
            <div className="text-sm text-[#D1D1D6]/70">
              Full-Stack Dev
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}