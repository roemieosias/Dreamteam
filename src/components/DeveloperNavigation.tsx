import { motion } from 'motion/react';
import {
  LogIn,
  UserPlus,
  Home,
  Settings,
  Wrench,
  LayoutDashboard,
  Key,
  Clock,
  Puzzle,
  Users,
  Heart,
  Zap,
  ArrowLeft,
} from 'lucide-react';

interface DeveloperNavigationProps {
  onNavigate: (page: string) => void;
}

interface NavLink {
  icon: any;
  label: string;
  page: string;
  description?: string;
}

const sections = [
  {
    title: 'Global Pages',
    links: [
      { icon: Home, label: 'Landing Page', page: 'landing', description: 'Main entry point' },
      { icon: LogIn, label: 'Login Page', page: 'login', description: 'User authentication' },
      { icon: UserPlus, label: 'Sign Up Page', page: 'signup', description: 'Account creation' },
      { icon: Settings, label: 'Profile Settings', page: 'settings', description: 'Global user settings' },
    ],
  },
  {
    title: 'Event Flow',
    links: [
      { icon: Wrench, label: 'Create Event Page', page: 'create', description: 'Host creates new event' },
      { icon: LayoutDashboard, label: 'Event Dashboard', page: 'eventDashboard', description: 'Host control panel' },
      { icon: Key, label: 'Join Event Page', page: 'landing', description: 'Participant enters code' },
    ],
  },
  {
    title: 'Matching Flow',
    links: [
      {
        icon: Puzzle,
        label: 'Event Profile Setup',
        page: 'eventProfileSetup',
        description: 'Event-specific profile form',
      },
      { icon: Users, label: 'Match List Page', page: 'matches', description: 'View potential teammates' },
      { icon: Heart, label: 'Connections Page', page: 'connections', description: 'Manage team connections' },
    ],
  },
];

export function DeveloperNavigation({ onNavigate }: DeveloperNavigationProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E10] via-[#1B1B1F] to-[#0E0E10]" />

      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-[#7B61FF]/20"
            style={{
              width: `${40 + i * 8}px`,
              height: `${40 + i * 8}px`,
              left: `${5 + (i % 10) * 10}%`,
              top: `${5 + Math.floor(i / 10) * 45}%`,
              borderRadius: '8px',
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[960px] mx-auto px-8 py-16">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 px-6 py-3 bg-[#FF7B00]/10 border border-[#FF7B00]/30 rounded-xl text-center"
        >
          <p
            className="text-[#FF7B00] text-sm"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
          >
            Development Mode: Quick Navigation
          </p>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-10 h-10 text-[#D9F24D]" />
            <h1
              className="text-6xl bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}
            >
              Dream Team
            </h1>
          </div>
          <h2
            className="text-3xl text-[#7B61FF] mb-3"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
          >
            Developer Navigation Panel
          </h2>
          <p className="text-[#D1D1D6]/70 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Quickly jump between screens during development and testing.
          </p>
        </motion.div>

        {/* Navigation Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              {/* Section Title */}
              <h3
                className="text-2xl text-[#7B61FF] mb-6 flex items-center gap-3"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
              >
                <div className="w-2 h-2 rounded-full bg-[#D9F24D]" />
                {section.title}
              </h3>

              {/* Links Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {section.links.map((link, linkIndex) => {
                  const Icon = link.icon;

                  return (
                    <motion.button
                      key={link.page}
                      onClick={() => onNavigate(link.page)}
                      className="group relative bg-[#1B1B1F] border border-[#7B61FF]/40 rounded-xl p-6 text-left transition-all duration-300 hover:border-[#D9F24D]/60 hover:shadow-[0_0_24px_rgba(217,242,77,0.2)] focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Gradient Border on Hover */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D9F24D]/0 via-[#7B61FF]/0 to-[#D9F24D]/0 group-hover:from-[#D9F24D]/20 group-hover:via-[#7B61FF]/20 group-hover:to-[#D9F24D]/20 transition-all duration-500 pointer-events-none" />

                      <div className="relative flex items-start gap-4">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-lg bg-[#7B61FF]/10 border border-[#7B61FF]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D9F24D]/10 group-hover:border-[#D9F24D]/50 transition-all duration-300">
                          <Icon className="w-6 h-6 text-[#7B61FF] group-hover:text-[#D9F24D] transition-colors duration-300" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h4
                            className="text-lg text-[#D9F24D] mb-1 group-hover:text-[#7B61FF] transition-colors duration-300"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
                          >
                            {link.label}
                          </h4>
                          {link.description && (
                            <p
                              className="text-sm text-[#D1D1D6]/60"
                              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}
                            >
                              {link.description}
                            </p>
                          )}
                        </div>

                        {/* Arrow */}
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] flex items-center justify-center">
                            <ArrowLeft className="w-4 h-4 text-[#0E0E10] rotate-180" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center space-y-6"
        >
          {/* Back to App Button */}
          <motion.button
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] rounded-xl text-[#0E0E10] shadow-[0_8px_32px_rgba(217,242,77,0.3)] hover:shadow-[0_12px_48px_rgba(217,242,77,0.4)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-5 h-5" />
            Back to App
          </motion.button>

          {/* Footer Text */}
          <p className="text-[#6B7280] text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            For internal development use only — Dream Team Prototype Build
          </p>
        </motion.div>
      </div>
    </div>
  );
}