import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Mail, MessageSquare, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Sidebar } from './ui/Sidebar';
import { GlowButton } from './ui/GlowButton';
import { EventBadge } from './ui/EventBadge';
import { EventSwitcher } from './ui/EventSwitcher';

interface Connection {
  id: string;
  name: string;
  role: string;
  major: string;
  year: string;
  skillsIHave: string[];
  email?: string;
  compatibility: number;
  status: 'pending' | 'matched';
  matchedAt?: string;
}

interface ConnectionsPageProps {
  connections: Connection[];
  onViewContact: (connectionId: string) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  eventName?: string;
  events?: Array<{ id: string; name: string; date?: string; hasProfile: boolean }>;
  currentEventId?: string;
  onSelectEvent?: (eventId: string) => void;
}

export function ConnectionsPage({
  connections,
  onViewContact,
  onNavigate,
  currentPage,
  eventName,
  events = [],
  currentEventId = '',
  onSelectEvent = () => {},
}: ConnectionsPageProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'matched'>('matched');

  const filteredConnections = connections.filter((c) => c.status === activeTab);

  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 via-[#0E0E10] to-[#FF7B00]/5" />

      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} onLogoClick={() => onNavigate('landing')} />

      {/* Main Content */}
      <div className="flex-1 relative z-10 pl-80">
        <div className="max-w-6xl mx-auto px-8 py-16">
          {/* Event Badge and Switcher */}
          {eventName && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <EventBadge eventName={eventName} eventDate="" compact />
              {events.length > 1 && (
                <EventSwitcher events={events} currentEventId={currentEventId} onSelectEvent={onSelectEvent} />
              )}
            </motion.div>
          )}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-6xl mb-4 bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
              My Connections
            </h1>
            <p className="text-[#D1D1D6] text-xl">
              Your matched teammates and pending connections
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="flex gap-2 mb-12 bg-[#1B1B1F]/60 backdrop-blur-sm border border-[#7B61FF]/30 rounded-2xl p-2 inline-flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {[
              { key: 'matched', label: 'Matches', icon: CheckCircle2 },
              { key: 'pending', label: 'Pending', icon: Clock },
            ].map(({ key, label, icon: Icon }) => (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 focus:outline-none relative ${
                  activeTab === key
                    ? 'text-[#0E0E10]'
                    : 'text-[#D1D1D6] hover:text-[#D9F24D]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              >
                {activeTab === key && (
                  <motion.div
                    className="absolute inset-0 bg-[#D9F24D] rounded-xl shadow-[0_4px_24px_rgba(217,242,77,0.3)]"
                    layoutId="activeTab"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{label}</span>
                <span className="relative z-10 text-sm bg-[#0E0E10]/20 px-2 py-0.5 rounded-full">
                  {connections.filter(c => c.status === key).length}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Connection Cards */}
          <AnimatePresence mode="wait">
            {filteredConnections.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-24"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1B1B1F]/60 border-2 border-[#7B61FF]/30 flex items-center justify-center">
                  {activeTab === 'matched' ? (
                    <CheckCircle2 className="w-12 h-12 text-[#7B61FF]/50" />
                  ) : (
                    <Clock className="w-12 h-12 text-[#7B61FF]/50" />
                  )}
                </div>
                <h3 className="text-2xl text-[#D1D1D6] mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                  {activeTab === 'matched' ? 'No matches yet' : 'No pending connections'}
                </h3>
                <p className="text-[#D1D1D6]/60">
                  {activeTab === 'matched' ? 'Start swiping to find your dream team' : 'Pending connections will appear here'}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {filteredConnections.map((connection, index) => (
                  <motion.div
                    key={connection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative bg-[#1B1B1F]/60 backdrop-blur-sm border-2 border-[#7B61FF]/30 rounded-3xl p-8 hover:border-[#D9F24D]/50 transition-all duration-300"
                  >
                    {/* Mutual match glow */}
                    {connection.status === 'matched' && (
                      <motion.div
                        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#D9F24D]/5 to-[#7B61FF]/5 -z-10"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    )}

                    <div className="flex items-start gap-6">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7B61FF] to-[#FF7B00] flex items-center justify-center border-2 border-[#D9F24D]/40 shadow-lg">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                        {connection.status === 'matched' && (
                          <motion.div
                            className="absolute -top-2 -right-2 w-8 h-8 bg-[#D9F24D] rounded-full flex items-center justify-center shadow-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring' }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-[#0E0E10]" />
                          </motion.div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl text-white mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                              {connection.name}
                            </h3>
                            <p className="text-[#D1D1D6]/80">
                              {connection.role} • {connection.major} • {connection.year}
                            </p>
                          </div>

                          {/* Compatibility Score */}
                          <div className="flex flex-col items-center">
                            <div className="relative w-16 h-16">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  fill="none"
                                  stroke="rgba(123, 97, 255, 0.2)"
                                  strokeWidth="6"
                                />
                                <motion.circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  fill="none"
                                  stroke="#D9F24D"
                                  strokeWidth="6"
                                  strokeLinecap="round"
                                  strokeDasharray={`${2 * Math.PI * 28}`}
                                  initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                                  animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - connection.compatibility / 100) }}
                                  transition={{ duration: 1, delay: index * 0.1 }}
                                  style={{ filter: 'drop-shadow(0 0 6px rgba(217, 242, 77, 0.6))' }}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[#D9F24D]" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                                  {connection.compatibility}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {connection.skillsIHave.slice(0, 5).map(skill => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-[#7B61FF]/20 border border-[#7B61FF]/40 rounded-full text-[#D1D1D6] text-sm"
                              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                            >
                              {skill}
                            </span>
                          ))}
                          {connection.skillsIHave.length > 5 && (
                            <span className="px-3 py-1 text-[#D1D1D6]/60 text-sm">
                              +{connection.skillsIHave.length - 5} more
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        {connection.status === 'matched' && (
                          <div className="flex gap-4">
                            <GlowButton
                              onClick={() => onViewContact(connection.id)}
                              variant="primary"
                              size="small"
                            >
                              <Mail className="w-4 h-4" />
                              View Contact Info
                            </GlowButton>
                            <button className="px-5 py-2.5 bg-[#1B1B1F] border-2 border-[#7B61FF] text-[#D9F24D] rounded-xl hover:bg-[#7B61FF]/10 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50">
                              <MessageSquare className="w-4 h-4" />
                              Message
                            </button>
                          </div>
                        )}

                        {connection.status === 'pending' && (
                          <div className="flex items-center gap-2 text-[#D1D1D6]/60">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Waiting for response...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}