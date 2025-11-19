import { motion } from 'motion/react';
import { Heart, X, Sparkles, Users, Lightbulb } from 'lucide-react';

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

interface MatchCardProps {
  match: Match;
  onInterested: () => void;
  onPass: () => void;
  currentUserSkills?: string[];
  currentUserNeeds?: string[];
}

// Generate human-centered matching reasons
function generateMatchingReasons(
  match: Match,
  currentUserSkills: string[] = [],
  currentUserNeeds: string[] = []
): string[] {
  const reasons: string[] = [];

  // Find shared skills
  const sharedSkills = match.skillsIHave.filter((skill) =>
    currentUserSkills.some((userSkill) => userSkill.toLowerCase() === skill.toLowerCase())
  );

  if (sharedSkills.length > 0) {
    const skill = sharedSkills[0];
    reasons.push(`You both know ${skill}`);
  }

  // Find complementary skills (what I have that they need)
  const canHelp = match.skillsINeed.filter((skill) =>
    currentUserSkills.some((userSkill) => userSkill.toLowerCase() === skill.toLowerCase())
  );

  if (canHelp.length > 0 && reasons.length < 3) {
    const skill = canHelp[0];
    reasons.push(`You can offer ${skill} — they need it`);
  }

  // Find complementary skills (what they have that I need)
  const canHelpMe = match.skillsIHave.filter((skill) =>
    currentUserNeeds.some((userNeed) => userNeed.toLowerCase() === skill.toLowerCase())
  );

  if (canHelpMe.length > 0 && reasons.length < 3) {
    const skill = canHelpMe[0];
    reasons.push(`They can help you with ${skill}`);
  }

  // Role diversity
  if (match.role && reasons.length < 3 && !match.role.toLowerCase().includes('developer')) {
    reasons.push(`Complementary roles: Developer + ${match.role}`);
  }

  // Fallback reasons if none were generated
  if (reasons.length === 0) {
    reasons.push('Open to collaboration');
    reasons.push('Diverse skill set');
  }

  return reasons.slice(0, 3); // Max 3 reasons
}

export function MatchCard({ match, onInterested, onPass, currentUserSkills = [], currentUserNeeds = [] }: MatchCardProps) {
  const matchingReasons = generateMatchingReasons(match, currentUserSkills, currentUserNeeds);

  return (
    <motion.div
      layout
      className="bg-[#1B1B1F]/60 backdrop-blur-sm border-2 border-[#7B61FF]/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 hover:border-[#D9F24D]/50 transition-all duration-300 relative overflow-hidden group"
      whileHover={{ y: -4, boxShadow: '0 0 24px rgba(123, 97, 255, 0.15)' }}
    >
      {/* Animated glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/0 to-[#D9F24D]/0 group-hover:from-[#7B61FF]/5 group-hover:to-[#D9F24D]/5 transition-all duration-500"
      />

      <div className="relative z-10">
        {/* Header with Avatar and Why Match */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-0 mb-5 sm:mb-6">
          <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
            {/* Avatar */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#7B61FF] to-[#FF7B00] rounded-xl sm:rounded-2xl flex items-center justify-center text-white flex-shrink-0 border-2 border-[#D9F24D]/40 shadow-lg">
              <Users className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            {/* Name & Role */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl mb-1 text-white truncate" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                {match.name}
              </h3>
              <p className="text-[#D1D1D6] mb-1 text-sm sm:text-base">{match.role}</p>
              <p className="text-[#D1D1D6]/70 text-xs sm:text-sm">{match.major} • {match.year}</p>
            </div>
          </div>

          {/* Why You Might Work Well Together */}
          <div className="w-full sm:w-auto sm:ml-4 sm:text-right sm:flex-shrink-0 sm:max-w-[220px]">
            <div className="flex items-center gap-2 mb-2 sm:mb-3 sm:justify-end">
              <Lightbulb className="w-4 h-4 text-[#D9F24D]" />
              <div
                className="text-[#D9F24D] text-xs tracking-wide"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
              >
                WHY YOU MIGHT CLICK
              </div>
            </div>
            <div className="flex flex-wrap sm:flex-col gap-2 sm:items-end">
              {matchingReasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-2.5 sm:px-3 py-1.5 bg-transparent border border-[#7B61FF] rounded-lg text-[#D9F24D] text-xs inline-block"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                >
                  {reason}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        {match.bio && (
          <p className="text-[#D1D1D6] mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">
            "{match.bio}"
          </p>
        )}

        {/* Skills They Have */}
        <div className="mb-4">
          <div className="text-[#D9F24D] text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            SKILLS THEY HAVE
          </div>
          <div className="flex flex-wrap gap-2">
            {match.skillsIHave.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#7B61FF]/20 border border-[#7B61FF]/40 rounded-full text-[#D1D1D6] text-xs sm:text-sm"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
              >
                {skill}
              </span>
            ))}
            {match.skillsIHave.length > 6 && (
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[#D1D1D6]/60 text-xs sm:text-sm">
                +{match.skillsIHave.length - 6}
              </span>
            )}
          </div>
        </div>

        {/* Skills They Need */}
        {match.skillsINeed.length > 0 && (
          <div className="mb-5 sm:mb-6">
            <div className="text-[#FF7B00] text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
              LOOKING FOR
            </div>
            <div className="flex flex-wrap gap-2">
              {match.skillsINeed.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#FF7B00]/10 border border-[#FF7B00]/30 rounded-full text-[#FF7B00] text-xs sm:text-sm"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <motion.button
            onClick={onPass}
            className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#0E0E10]/50 border-2 border-[#D1D1D6]/30 rounded-xl text-[#D1D1D6] hover:border-[#D1D1D6] hover:text-white hover:bg-[#0E0E10] transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D1D1D6]/50 min-h-[48px] sm:min-h-[52px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
          >
            <X className="w-5 h-5" />
            <span className="text-sm sm:text-base">Pass</span>
          </motion.button>
          <motion.button
            onClick={onInterested}
            className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] rounded-xl text-[#0E0E10] hover:shadow-[0_8px_32px_rgba(217,242,77,0.4)] transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50 relative overflow-hidden group min-h-[48px] sm:min-h-[52px]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#D9F24D]"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
              <Sparkles className="w-5 h-5" />
              <span className="hidden sm:inline">Explore Collaboration</span>
              <span className="sm:hidden">Explore</span>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}