import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Check, Clock, Sparkles } from 'lucide-react';
import { Sidebar } from './ui/Sidebar';

interface MyConnectionsPageProps {
  onNavigate: (page: string) => void;
}

const mockConnections = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: 'AC',
    role: 'Full-Stack Developer',
    compatibility: 92,
    skills: ['React', 'Node.js', 'TypeScript'],
    email: 'alex.chen@university.edu',
    linkedin: 'linkedin.com/in/alexchen',
    status: 'matched',
    matchedAt: '2 hours ago',
  },
  {
    id: 2,
    name: 'Sarah Martinez',
    avatar: 'SM',
    role: 'UI/UX Designer',
    compatibility: 88,
    skills: ['Figma', 'UI/UX', 'Branding'],
    email: 'sarah.m@university.edu',
    linkedin: 'linkedin.com/in/sarahmartinez',
    status: 'matched',
    matchedAt: '3 hours ago',
  },
];

const mockPending = [
  {
    id: 3,
    name: 'Jordan Kim',
    avatar: 'JK',
    role: 'ML Engineer',
    compatibility: 85,
    skills: ['Python', 'ML/AI', 'Data Science'],
    status: 'pending',
  },
  {
    id: 4,
    name: 'Taylor Brooks',
    avatar: 'TB',
    role: 'Product Manager',
    compatibility: 81,
    skills: ['Project Mgmt', 'Business', 'Marketing'],
    status: 'pending',
  },
];

export function MyConnectionsPage({ onNavigate }: MyConnectionsPageProps) {
  const [activeTab, setActiveTab] = useState<'matches' | 'pending'>('matches');
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage="connections" onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 800 }}>
            Your Connections
          </h1>
          <p className="text-[#D1D1D6]">
            Manage your matches and pending connections
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#1B1B1F]">
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-6 py-3 relative transition-colors duration-300 ${
              activeTab === 'matches' ? 'text-[#D9F24D]' : 'text-[#D1D1D6] hover:text-white'
            }`}
          >
            Matches ({mockConnections.length})
            {activeTab === 'matches' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9F24D]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 relative transition-colors duration-300 ${
              activeTab === 'pending' ? 'text-[#D9F24D]' : 'text-[#D1D1D6] hover:text-white'
            }`}
          >
            Pending ({mockPending.length})
            {activeTab === 'pending' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9F24D]"
              />
            )}
          </button>
        </div>

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <div className="grid md:grid-cols-2 gap-6">
            {mockConnections.map((connection, index) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1B1B1F] border-2 border-[#D9F24D]/30 rounded-2xl p-6 relative overflow-hidden group hover:border-[#D9F24D] transition-all duration-300"
              >
                {/* Success Indicator Animation */}
                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                  <div className="w-8 h-8 bg-[#D9F24D] rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#0E0E10]" />
                  </div>
                </motion.div>

                {/* Confetti Effect */}
                {showConfetti && index === 0 && (
                  <>
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: ['#D9F24D', '#7B61FF', '#FF7B00'][i % 3],
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{
                          opacity: 0,
                          scale: 1,
                          x: Math.cos(i * 18) * 100,
                          y: Math.sin(i * 18) * 100,
                        }}
                        transition={{ duration: 0.8 }}
                      />
                    ))}
                  </>
                )}

                {/* Avatar & Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7B61FF] to-[#FF7B00] rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                    {connection.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                      {connection.name}
                    </h3>
                    <p className="text-[#D1D1D6] text-sm mb-2">{connection.role}</p>
                    <div className="flex items-center gap-2 text-xs text-[#D1D1D6]/60">
                      <Sparkles className="w-3 h-3 text-[#D9F24D]" />
                      Matched {connection.matchedAt}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {connection.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#7B61FF]/20 border border-[#7B61FF]/30 rounded-full text-[#7B61FF] text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Contact Info - Revealed Section */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-[#7B61FF]/20 pt-4 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#D1D1D6]" />
                    <a
                      href={`mailto:${connection.email}`}
                      className="text-[#D9F24D] hover:underline text-sm"
                    >
                      {connection.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-[#D1D1D6]" />
                    <a
                      href={`https://${connection.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D9F24D] hover:underline text-sm"
                    >
                      {connection.linkedin}
                    </a>
                  </div>
                </motion.div>

                {/* Compatibility Badge */}
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-[#D9F24D]/20 border border-[#D9F24D] rounded-full text-[#D9F24D] text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
                    {connection.compatibility}% Match
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pending Tab */}
        {activeTab === 'pending' && (
          <div className="grid md:grid-cols-2 gap-6">
            {mockPending.map((connection, index) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1B1B1F] border-2 border-[#7B61FF]/20 rounded-2xl p-6 relative overflow-hidden"
              >
                {/* Pending Indicator */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    className="w-8 h-8 bg-[#FF7B00]/20 border border-[#FF7B00] rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Clock className="w-4 h-4 text-[#FF7B00]" />
                  </motion.div>
                </div>

                {/* Avatar & Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7B61FF]/50 to-[#FF7B00]/50 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                    {connection.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                      {connection.name}
                    </h3>
                    <p className="text-[#D1D1D6] text-sm">{connection.role}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {connection.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#7B61FF]/10 border border-[#7B61FF]/20 rounded-full text-[#D1D1D6] text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Pending Message */}
                <div className="text-[#D1D1D6]/60 text-sm text-center py-3 border-t border-[#7B61FF]/10">
                  Waiting for response...
                </div>

                {/* Compatibility Badge */}
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-[#7B61FF]/10 border border-[#7B61FF]/30 rounded-full text-[#7B61FF] text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
                    {connection.compatibility}% Match
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {activeTab === 'matches' && mockConnections.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-[#7B61FF]/20 to-[#D9F24D]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-16 h-16 text-[#D1D1D6]" />
            </div>
            <h2 className="text-2xl mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
              No Matches Yet
            </h2>
            <p className="text-[#D1D1D6] mb-6">
              Start swiping to find your dream team
            </p>
            <button
              onClick={() => onNavigate('matches')}
              className="text-[#D9F24D] hover:underline"
            >
              Find Matches →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
