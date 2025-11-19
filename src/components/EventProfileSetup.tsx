import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Briefcase, Code, Palette, TrendingUp, Database, Calendar, ArrowRight } from 'lucide-react';
import { GlowButton } from './ui/GlowButton';
import { SkillTag } from './ui/SkillTag';

interface EventProfileSetupProps {
  eventName: string;
  eventDate?: string;
  userName: string;
  onComplete: (profile: EventProfile) => void;
}

export interface EventProfile {
  role: string;
  skillsIHave: string[];
  skillsINeed: string[];
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  bio: string;
}

const roles = [
  { value: 'developer', label: 'Developer', icon: Code },
  { value: 'designer', label: 'Designer', icon: Palette },
  { value: 'product', label: 'Product Manager', icon: Briefcase },
  { value: 'marketing', label: 'Marketer', icon: TrendingUp },
  { value: 'data', label: 'Data Scientist', icon: Database },
  { value: 'other', label: 'Other', icon: User },
];

const skillCategories = {
  design: ['UI/UX', 'Figma', 'Graphic Design', 'Branding', 'Prototyping'],
  frontend: ['React', 'Vue', 'TypeScript', 'CSS/Tailwind', 'Next.js'],
  backend: ['Node.js', 'Python', 'Django', 'APIs', 'PostgreSQL'],
  mobile: ['React Native', 'Swift', 'Flutter', 'iOS', 'Android'],
  data: ['ML/AI', 'Data Science', 'Analytics', 'TensorFlow', 'SQL'],
  other: ['Project Mgmt', 'Business', 'Marketing', 'Content', 'Hardware'],
};

export function EventProfileSetup({ eventName, eventDate, userName, onComplete }: EventProfileSetupProps) {
  const [role, setRole] = useState('');
  const [skillsIHave, setSkillsIHave] = useState<string[]>([]);
  const [skillsINeed, setSkillsINeed] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [bio, setBio] = useState('');

  const toggleSkillHave = (skill: string) => {
    setSkillsIHave((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const toggleSkillNeed = (skill: string) => {
    setSkillsINeed((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const handleSubmit = () => {
    if (role && skillsIHave.length > 0) {
      onComplete({
        role,
        skillsIHave,
        skillsINeed,
        experienceLevel,
        bio,
      });
    }
  };

  const handleSkip = () => {
    // Skip with minimal profile - will reduce match quality
    onComplete({
      role: role || 'other',
      skillsIHave: skillsIHave.length > 0 ? skillsIHave : ['General'],
      skillsINeed,
      experienceLevel,
      bio,
    });
  };

  const canSubmit = role && skillsIHave.length > 0;

  return (
    <div className="min-h-screen relative overflow-hidden pt-24 pb-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 via-[#0E0E10] to-[#FF7B00]/5" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-[#7B61FF]/8 rounded-lg"
            style={{
              width: `${60 + i * 15}px`,
              height: `${60 + i * 15}px`,
              left: `${10 + i * 10}%`,
              top: `${8 + (i % 5) * 16}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-16">
        {/* Event Badge Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#1B1B1F]/80 backdrop-blur-xl border-2 border-[#7B61FF]/50 rounded-full shadow-[0_0_32px_rgba(123,97,255,0.3)]">
            <Calendar className="w-5 h-5 text-[#D9F24D]" />
            <div>
              <div
                className="text-white"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '1.125rem' }}
              >
                {eventName}
              </div>
              {eventDate && (
                <div className="text-sm text-[#D1D1D6]/70" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {eventDate}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h1
            className="text-6xl mb-4 bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent leading-tight"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            Profile for: {eventName}
          </h1>
          <p className="text-[#D1D1D6] text-xl mb-3">
            Tell us about your skills so we can find your perfect teammates
          </p>
          <motion.p
            className="text-sm text-[#D9F24D]/80 inline-block px-4 py-2 bg-[#D9F24D]/10 border border-[#D9F24D]/30 rounded-full"
            animate={{
              boxShadow: [
                '0 0 20px rgba(217,242,77,0.2)',
                '0 0 30px rgba(217,242,77,0.3)',
                '0 0 20px rgba(217,242,77,0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            This profile is unique to {eventName}
          </motion.p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          className="bg-[#1B1B1F]/80 backdrop-blur-xl border-2 border-[#7B61FF]/30 rounded-3xl p-12 shadow-2xl mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-10">
            {/* Role Selection */}
            <div>
              <label
                className="block text-white text-lg mb-4"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              >
                Role for this Event
                <span className="text-sm text-[#D1D1D6]/60 ml-2">(Required)</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {roles.map((roleOption) => {
                  const Icon = roleOption.icon;
                  const isSelected = role === roleOption.value;

                  return (
                    <motion.button
                      key={roleOption.value}
                      onClick={() => setRole(roleOption.value)}
                      className={`p-5 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50 ${
                        isSelected
                          ? 'bg-[#D9F24D]/10 border-[#D9F24D] text-[#D9F24D]'
                          : 'bg-[#0E0E10]/50 border-[#7B61FF]/30 text-[#D1D1D6] hover:border-[#7B61FF]/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-3" />
                      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>
                        {roleOption.label}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Skills I Have */}
            <div>
              <label
                className="block text-white text-lg mb-4"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              >
                Skills You Have
                <span className="text-sm text-[#D1D1D6]/60 ml-2">(Select at least 1)</span>
              </label>
              <div className="space-y-6">
                {Object.entries(skillCategories).map(([category, skills]) => (
                  <div key={category}>
                    <div
                      className="text-sm text-[#7B61FF] mb-3 uppercase tracking-wider"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
                    >
                      {category}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <SkillTag
                          key={skill}
                          skill={skill}
                          selected={skillsIHave.includes(skill)}
                          onClick={() => toggleSkillHave(skill)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills I Need */}
            <div>
              <label
                className="block text-white text-lg mb-4"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              >
                Skills You Need
                <span className="text-sm text-[#D1D1D6]/60 ml-2">(Optional)</span>
              </label>
              <div className="space-y-6">
                {Object.entries(skillCategories).map(([category, skills]) => (
                  <div key={category}>
                    <div
                      className="text-sm text-[#FF7B00] mb-3 uppercase tracking-wider"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
                    >
                      {category}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <SkillTag
                          key={skill}
                          skill={skill}
                          selected={skillsINeed.includes(skill)}
                          onClick={() => toggleSkillNeed(skill)}
                          variant="need"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label
                className="block text-white text-lg mb-4"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              >
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => {
                  const isSelected = experienceLevel === level;

                  return (
                    <motion.button
                      key={level}
                      onClick={() => setExperienceLevel(level as any)}
                      className={`p-5 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50 ${
                        isSelected
                          ? 'bg-[#7B61FF]/20 border-[#7B61FF] text-white'
                          : 'bg-[#0E0E10]/50 border-[#7B61FF]/30 text-[#D1D1D6] hover:border-[#7B61FF]/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
                    >
                      {level}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label
                className="block text-white text-lg mb-3"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
              >
                Short Bio
                <span className="text-sm text-[#D1D1D6]/60 ml-2">(Optional, for this event)</span>
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell your teammates a bit about yourself..."
                rows={4}
                className="w-full bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-2xl px-5 py-4 text-white placeholder-[#D1D1D6]/40 focus:outline-none focus:border-[#D9F24D]/50 transition-colors duration-300 resize-none"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Submit Button */}
            <motion.div className="pt-8 space-y-4">
              <motion.div whileHover={{ scale: canSubmit ? 1.02 : 1 }}>
                <GlowButton onClick={handleSubmit} disabled={!canSubmit} className="w-full">
                  <span>Save & See Matches</span>
                  <ArrowRight className="w-5 h-5" />
                </GlowButton>
              </motion.div>

              {/* Skip for now link */}
              <div className="text-center">
                <button
                  onClick={handleSkip}
                  className="text-[#D1D1D6]/60 hover:text-[#D9F24D] transition-colors duration-300 text-sm underline"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                >
                  Skip for now (reduced match quality)
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}