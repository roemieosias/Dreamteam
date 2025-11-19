import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Play, Zap, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { Sidebar } from './ui/Sidebar';
import { GlowButton } from './ui/GlowButton';

interface Participant {
  id: string;
  name: string;
  status: 'Waiting' | 'Matching' | 'Matched' | 'Ready';
  joinedAt: Date;
}

interface EventDashboardProps {
  eventName: string;
  eventCode: string;
  participants: Participant[];
  onBeginMatching: () => void;
  onStartEvent: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  matchingPhase: 'not-started' | 'in-progress' | 'completed';
}

export function EventDashboard({
  eventName,
  eventCode,
  participants,
  onBeginMatching,
  onStartEvent,
  onNavigate,
  currentPage,
  matchingPhase,
}: EventDashboardProps) {
  const [justJoined, setJustJoined] = useState<string[]>([]);

  const canStartEvent = matchingPhase === 'completed';
  const matchingInProgress = matchingPhase === 'in-progress';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Waiting':
        return 'text-[#D1D1D6] bg-[#D1D1D6]/10';
      case 'Matching':
        return 'text-[#7B61FF] bg-[#7B61FF]/10';
      case 'Matched':
        return 'text-[#D9F24D] bg-[#D9F24D]/10';
      case 'Ready':
        return 'text-[#FF7B00] bg-[#FF7B00]/10';
      default:
        return 'text-[#D1D1D6] bg-[#D1D1D6]/10';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 via-[#0E0E10] to-[#FF7B00]/5" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-[#7B61FF]/8 rounded-lg"
            style={{
              width: `${80 + i * 20}px`,
              height: `${80 + i * 20}px`,
              left: `${15 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 90, 0],
              opacity: [0.03, 0.1, 0.03],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} onLogoClick={() => onNavigate('landing')} />

      {/* Main Content */}
      <div className="flex-1 relative z-10 pl-80">
        <div className="max-w-6xl mx-auto px-8 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-10 h-10 text-[#D9F24D] drop-shadow-[0_0_12px_rgba(217,242,77,0.7)]" />
              <h1
                className="text-6xl bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent leading-tight"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}
              >
                Event Dashboard
              </h1>
            </div>
            <p className="text-[#D1D1D6] text-xl mb-4">{eventName}</p>
            <div className="inline-block px-5 py-3 bg-[#1B1B1F] border border-[#7B61FF]/50 rounded-full">
              <span className="text-[#D1D1D6] text-sm">Event Code: </span>
              <span className="text-[#D9F24D] tracking-wider" style={{ fontFamily: 'monospace', fontWeight: 700 }}>
                {eventCode}
              </span>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-[#1B1B1F]/60 border border-[#7B61FF]/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-[#7B61FF]" />
                <span className="text-[#D1D1D6]" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}>
                  Participants
                </span>
              </div>
              <div className="text-4xl text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900 }}>
                {participants.length}
              </div>
            </div>

            <div className="bg-[#1B1B1F]/60 border border-[#7B61FF]/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-[#D9F24D]" />
                <span className="text-[#D1D1D6]" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}>
                  Status
                </span>
              </div>
              <div className="text-2xl text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                {matchingPhase === 'not-started' && 'Waiting to Begin'}
                {matchingPhase === 'in-progress' && 'Matching Active'}
                {matchingPhase === 'completed' && 'Ready to Start'}
              </div>
            </div>

            <div className="bg-[#1B1B1F]/60 border border-[#7B61FF]/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-[#FF7B00]" />
                <span className="text-[#D1D1D6]" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}>
                  Matched
                </span>
              </div>
              <div className="text-4xl text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900 }}>
                {participants.filter((p) => p.status === 'Matched' || p.status === 'Ready').length}
              </div>
            </div>
          </motion.div>

          {/* Helper Text - Participants can already see matches */}
          <motion.div
            className="mb-6 p-4 bg-[#D9F24D]/10 border border-[#D9F24D]/30 rounded-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-[#D9F24D] text-sm text-center" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}>
              ℹ️ Participants can already complete profiles and see draft matches
            </p>
          </motion.div>

          {/* Control Buttons */}
          <motion.div
            className="flex gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlowButton
              onClick={onBeginMatching}
              disabled={matchingInProgress || matchingPhase === 'completed'}
              className="flex-1"
            >
              <Sparkles className="w-5 h-5" />
              {matchingPhase === 'not-started' ? 'Begin Matching' : 'Matching Started'}
            </GlowButton>

            <motion.button
              onClick={onStartEvent}
              disabled={!canStartEvent}
              className={`flex-1 px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#FF7B00]/50 ${
                canStartEvent
                  ? 'bg-gradient-to-r from-[#FF7B00] to-[#D9F24D] text-[#0E0E10] shadow-[0_8px_32px_rgba(255,123,0,0.3)] hover:scale-105'
                  : 'bg-[#1B1B1F]/60 border border-[#D1D1D6]/20 text-[#D1D1D6]/40 cursor-not-allowed'
              }`}
              whileHover={canStartEvent ? { scale: 1.05 } : {}}
              whileTap={canStartEvent ? { scale: 0.98 } : {}}
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
            >
              <Play className="w-5 h-5" />
              Start Event
              {canStartEvent && (
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          </motion.div>

          {!canStartEvent && (
            <motion.p
              className="text-sm text-[#D1D1D6]/60 text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              You can only start the event after completing the matching phase.
            </motion.p>
          )}

          {/* Participant List Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2
              className="text-3xl mb-6 text-white"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 800 }}
            >
              Participants
            </h2>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {participants.map((participant, index) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#1B1B1F]/80 backdrop-blur-sm border border-[#7B61FF]/30 rounded-2xl p-6 hover:border-[#D9F24D]/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative">
                          <div
                            className="w-14 h-14 bg-gradient-to-br from-[#7B61FF] to-[#FF7B00] rounded-xl flex items-center justify-center text-white shadow-lg"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
                          >
                            {participant.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()
                              .slice(0, 2)}
                          </div>
                          {justJoined.includes(participant.id) && (
                            <motion.div
                              className="absolute inset-0 rounded-xl border-2 border-[#D9F24D]"
                              initial={{ scale: 1, opacity: 1 }}
                              animate={{ scale: 1.5, opacity: 0 }}
                              transition={{ duration: 0.8 }}
                            />
                          )}
                        </div>

                        {/* Info */}
                        <div>
                          <div
                            className="text-white text-lg"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
                          >
                            {participant.name}
                          </div>
                          <div className="text-sm text-[#D1D1D6]/70">
                            Joined {new Date(participant.joinedAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <motion.div
                        className={`px-4 py-2 rounded-full flex items-center gap-2 ${getStatusColor(
                          participant.status
                        )}`}
                        animate={
                          participant.status === 'Matching'
                            ? { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }
                            : {}
                        }
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {participant.status === 'Matched' && <CheckCircle className="w-4 h-4" />}
                        {participant.status === 'Matching' && <Sparkles className="w-4 h-4" />}
                        <span
                          className="text-sm"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
                        >
                          {participant.status}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {participants.length === 0 && (
                <motion.div
                  className="text-center py-20 text-[#D1D1D6]/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}>
                    No participants yet
                  </p>
                  <p className="text-sm mt-2">Share your event code to get started</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}