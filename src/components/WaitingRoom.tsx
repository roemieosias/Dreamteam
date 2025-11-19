import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users, Sparkles, LogOut, UserPlus } from 'lucide-react';

interface WaitingRoomProps {
  eventName: string;
  eventCode: string;
  participantCount: number;
  userName: string;
  onLeaveEvent: () => void;
  matchingStarted?: boolean;
  onFillProfile?: () => void;
  hasProfile?: boolean;
}

// Dummy participant data for testing
const dummyParticipants = [
  { id: '1', name: 'Alex Chen', role: 'Developer', avatar: 'AC' },
  { id: '2', name: 'Sarah Martinez', role: 'Designer', avatar: 'SM' },
  { id: '3', name: 'Jordan Kim', role: 'Product Manager', avatar: 'JK' },
  { id: '4', name: 'Taylor Brooks', role: 'Data Scientist', avatar: 'TB' },
  { id: '5', name: 'Casey Morgan', role: 'Marketing', avatar: 'CM' },
  { id: '6', name: 'Jamie Lee', role: 'Developer', avatar: 'JL' },
  { id: '7', name: 'Riley Parker', role: 'Designer', avatar: 'RP' },
  { id: '8', name: 'Morgan Davis', role: 'Developer', avatar: 'MD' },
  { id: '9', name: 'Quinn Adams', role: 'Business', avatar: 'QA' },
  { id: '10', name: 'Avery Wilson', role: 'Developer', avatar: 'AW' },
  { id: '11', name: 'Blake Johnson', role: 'Designer', avatar: 'BJ' },
  { id: '12', name: 'Dakota Smith', role: 'Data Scientist', avatar: 'DS' },
  { id: '13', name: 'Skyler Brown', role: 'Marketing', avatar: 'SB' },
  { id: '14', name: 'Reese Taylor', role: 'Product Manager', avatar: 'RT' },
  { id: '15', name: 'Sage Anderson', role: 'Developer', avatar: 'SA' },
];

export function WaitingRoom({
  eventName,
  eventCode,
  participantCount,
  userName,
  onLeaveEvent,
  matchingStarted = false,
  onFillProfile,
  hasProfile = false,
}: WaitingRoomProps) {
  const [participants, setParticipants] = useState(dummyParticipants.slice(0, 12));
  const [showJoinedToast, setShowJoinedToast] = useState(false);
  const [newJoinedName, setNewJoinedName] = useState('');

  // Simulate live participants joining
  useEffect(() => {
    const interval = setInterval(() => {
      if (participants.length < dummyParticipants.length) {
        const nextParticipant = dummyParticipants[participants.length];
        setParticipants((prev) => [...prev, nextParticipant]);
        setNewJoinedName(nextParticipant.name);
        setShowJoinedToast(true);
        setTimeout(() => setShowJoinedToast(false), 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [participants.length]);

  // Shuffle animation every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants((prev) => {
        const shuffled = [...prev];
        const idx1 = Math.floor(Math.random() * shuffled.length);
        const idx2 = Math.floor(Math.random() * shuffled.length);
        [shuffled[idx1], shuffled[idx2]] = [shuffled[idx2], shuffled[idx1]];
        return shuffled;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(123,97,255,0.2) 0%, rgba(14,14,16,0.8) 40%, #0E0E10 70%)',
          }}
        />

        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, #7B61FF 0%, transparent 45%), radial-gradient(circle at 70% 60%, #FF7B00 0%, transparent 45%), radial-gradient(circle at 50% 70%, #D9F24D 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#7B61FF]/30 rounded-full"
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + (i % 6) * 12}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.sin(i) * 30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        {/* Header Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-6xl mb-4 leading-tight"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #7B61FF 0%, #D9F24D 50%, #7B61FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            You're in the queue for {eventName}
          </h1>
          <p className="text-[#D1D1D6] text-xl mb-6" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}>
            We'll start matching when your host begins.
          </p>

          {/* Event Info Line */}
          <div className="flex items-center justify-center gap-6 text-[#D1D1D6]/70">
            <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}>
              Participants: <span className="text-[#D9F24D]">{participants.length}</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Center Content - Status */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Animated Status Chip */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <motion.div
                className="px-6 py-3 bg-[#1B1B1F]/80 backdrop-blur-sm border-2 border-[#D9F24D]/50 rounded-full shadow-[0_0_24px_rgba(217,242,77,0.2)]"
                animate={{
                  boxShadow: [
                    '0 0 24px rgba(217,242,77,0.2)',
                    '0 0 40px rgba(217,242,77,0.4)',
                    '0 0 24px rgba(217,242,77,0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-[#D9F24D] rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[#D9F24D]" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
                    In Queue
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Avatar with Pulsing Glow Ring */}
            <motion.div className="relative inline-block mb-12 mx-auto flex justify-center w-full">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#D9F24D] blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div
                className="relative w-32 h-32 bg-gradient-to-br from-[#7B61FF] to-[#FF7B00] rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-[#0E0E10]"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, fontSize: '2.5rem' }}
              >
                {userName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              {/* Outer pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#D9F24D]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </motion.div>

            {/* Waiting Animation */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <Clock className="w-6 h-6 text-[#7B61FF]" />
              <span className="text-[#D1D1D6]" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}>
                Hang tight...
              </span>
              <motion.div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-[#7B61FF] rounded-full"
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* CTA Button - Disabled or Active */}
            <motion.button
              disabled={!matchingStarted}
              onClick={onFillProfile}
              className={`w-full max-w-md mx-auto px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden ${
                matchingStarted
                  ? 'bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] text-[#0E0E10] shadow-[0_8px_32px_rgba(217,242,77,0.3)] hover:scale-105 cursor-pointer'
                  : 'bg-[#1B1B1F]/60 border-2 border-[#7B61FF]/20 text-[#D1D1D6]/40 cursor-not-allowed'
              }`}
              whileHover={matchingStarted ? { scale: 1.05 } : {}}
              whileTap={matchingStarted ? { scale: 0.98 } : {}}
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
            >
              {matchingStarted ? (
                <>
                  <Sparkles className="w-5 h-5" />
                  {hasProfile ? 'Find My Matches' : 'Fill Out Team Profile'}
                </>
              ) : (
                <>Matching hasn't started yet</>
              )}
            </motion.button>

            {/* Leave Event Link */}
            <motion.button
              onClick={onLeaveEvent}
              className="text-[#D1D1D6]/60 hover:text-[#FF7B00] transition-colors duration-300 flex items-center gap-2 mx-auto mt-8 focus:outline-none focus:ring-2 focus:ring-[#FF7B00]/50 rounded-lg px-4 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
            >
              <LogOut className="w-4 h-4" />
              Leave Event
            </motion.button>
          </motion.div>

          {/* Queue Panel - Right Side */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-[#1B1B1F]/70 backdrop-blur-sm border border-[#7B61FF]/30 rounded-2xl p-6 shadow-2xl">
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-2xl text-white flex items-center gap-3"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
                >
                  <Users className="w-6 h-6 text-[#7B61FF]" />
                  People in Queue
                </h3>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-[#0E0E10]/50 border border-[#7B61FF]/30 rounded-full">
                    <span className="text-[#D9F24D]" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                      {participants.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#0E0E10]/50 border border-[#D9F24D]/30 rounded-full">
                    <motion.div
                      className="w-2 h-2 bg-[#D9F24D] rounded-full"
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-[#D9F24D] text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Joined Toast */}
              <AnimatePresence>
                {showJoinedToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="mb-4 px-4 py-3 bg-[#D9F24D]/10 border border-[#D9F24D]/50 rounded-xl flex items-center gap-3"
                  >
                    <UserPlus className="w-5 h-5 text-[#D9F24D]" />
                    <span className="text-[#D9F24D]" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
                      {newJoinedName} just joined
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Participants List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {participants.map((participant, index) => (
                    <motion.div
                      key={participant.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.03 }}
                      className="bg-[#0E0E10]/50 border border-[#7B61FF]/20 rounded-xl p-4 hover:border-[#D9F24D]/40 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div
                            className="w-12 h-12 bg-gradient-to-br from-[#7B61FF] to-[#FF7B00] rounded-xl flex items-center justify-center text-white shadow-lg"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
                          >
                            {participant.avatar}
                          </div>

                          {/* Info */}
                          <div>
                            <div
                              className="text-white"
                              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
                            >
                              {participant.name}
                            </div>
                            <div className="text-sm text-[#D1D1D6]/70">{participant.role || 'Role TBD'}</div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="px-3 py-1 bg-[#7B61FF]/10 border border-[#7B61FF]/30 rounded-full flex items-center gap-2">
                          <span
                            className="text-sm text-[#7B61FF]"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
                          >
                            Waiting
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(123, 97, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(123, 97, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(123, 97, 255, 0.5);
        }
      `}</style>
    </div>
  );
}