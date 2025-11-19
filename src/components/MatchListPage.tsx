import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Heart, X, Sparkles, Target, Lightbulb } from 'lucide-react';
import { Sidebar } from './ui/Sidebar';
import { MobileNav } from './ui/MobileNav';
import { MatchCard } from './ui/MatchCard';
import { EventBadge } from './ui/EventBadge';
import { EventSwitcher } from './ui/EventSwitcher';

interface Match {
  id: string;
  name: string;
  role: string;
  major: string;
  year: string;
  skillsIHave: string[];
  skillsINeed: string[];
  bio: string;
  compatibility: number;
}

interface MatchListPageProps {
  matches: Match[];
  onInterested: (matchId: string) => void;
  onPass: (matchId: string) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  eventName?: string;
  eventDate?: string;
  events?: Array<{ id: string; name: string; date?: string; hasProfile: boolean }>;
  currentEventId?: string;
  onSelectEvent?: (eventId: string) => void;
  currentUserSkills?: string[];
  currentUserNeeds?: string[];
}

export function MatchListPage({
  matches,
  onInterested,
  onPass,
  onNavigate,
  currentPage,
  eventName,
  eventDate,
  events = [],
  currentEventId = '',
  onSelectEvent = () => {},
  currentUserSkills = [],
  currentUserNeeds = [],
}: MatchListPageProps) {
  const [filter, setFilter] = useState<'all' | 'complement' | 'shared'>('all');

  // Helper function to check if there's skill complementarity
  const hasComplement = (match: Match) => {
    const canHelp = match.skillsINeed.some((skill) =>
      currentUserSkills.some((userSkill) => userSkill.toLowerCase() === skill.toLowerCase())
    );
    const canHelpMe = match.skillsIHave.some((skill) =>
      currentUserNeeds.some((userNeed) => userNeed.toLowerCase() === skill.toLowerCase())
    );
    return canHelp || canHelpMe;
  };

  // Helper function to check if there are shared interests
  const hasSharedInterests = (match: Match) => {
    return match.skillsIHave.some((skill) =>
      currentUserSkills.some((userSkill) => userSkill.toLowerCase() === skill.toLowerCase())
    );
  };

  const filteredMatches = matches.filter((match) => {
    if (filter === 'complement') return hasComplement(match);
    if (filter === 'shared') return hasSharedInterests(match);
    return true;
  });

  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 via-[#0E0E10] to-[#FF7B00]/5" />

      {/* Mobile Navigation */}
      <MobileNav onNavigate={onNavigate} currentPage={currentPage} isAuthenticated={true} onLogoClick={() => onNavigate('landing')} />

      {/* Sidebar - Desktop only */}
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} onLogoClick={() => onNavigate('landing')} />

      {/* Main Content */}
      <div className="flex-1 relative z-10 lg:pl-80 pt-20 lg:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Event Badge and Switcher */}
          {eventName && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8"
            >
              <EventBadge eventName={eventName} eventDate={eventDate} compact />
              {events.length > 1 && (
                <EventSwitcher events={events} currentEventId={currentEventId} onSelectEvent={onSelectEvent} />
              )}
            </motion.div>
          )}

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-10 lg:mb-12">
            <h1
              className="text-3xl sm:text-4xl lg:text-6xl mb-3 sm:mb-4 bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent leading-tight"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}
            >
              People You Might Click With
            </h1>
            <p className="text-[#D1D1D6] text-base sm:text-lg lg:text-xl">
              {filteredMatches.length} potential teammate{filteredMatches.length !== 1 ? 's' : ''} waiting for you
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {[
              { key: 'all', label: 'Explore All', icon: Users },
              { key: 'complement', label: 'Strong Complement', icon: Sparkles },
              { key: 'shared', label: 'Shared Interests', icon: Lightbulb },
            ].map(({ key, label, icon: Icon }) => (
              <motion.button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl flex items-center justify-center sm:justify-start gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50 min-h-[44px] ${
                  filter === key
                    ? 'bg-[#D9F24D] text-[#0E0E10] shadow-[0_4px_24px_rgba(217,242,77,0.3)]'
                    : 'bg-[#1B1B1F]/60 border border-[#7B61FF]/30 text-[#D1D1D6] hover:border-[#D9F24D]/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm sm:text-base">{label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Match Cards Grid */}
          <AnimatePresence mode="popLayout">
            {filteredMatches.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16 sm:py-20 lg:py-24"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#D9F24D]/20 to-[#7B61FF]/20 border-2 border-[#7B61FF]/30 flex items-center justify-center">
                  <Lightbulb className="w-10 h-10 sm:w-12 sm:h-12 text-[#D9F24D]" />
                </div>
                <h3
                  className="text-xl sm:text-2xl mb-2 sm:mb-3 bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent px-4"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
                >
                  No potential teammates yet
                </h3>
                <p className="text-sm sm:text-base text-[#D1D1D6]/70 max-w-md mx-auto px-4">
                  Try adding more skills or interests, or check back later as more people join!
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                {filteredMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MatchCard
                      match={match}
                      onInterested={() => onInterested(match.id)}
                      onPass={() => onPass(match.id)}
                      currentUserSkills={currentUserSkills}
                      currentUserNeeds={currentUserNeeds}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}