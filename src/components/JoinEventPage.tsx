import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { GlowButton } from './ui/GlowButton';
import { SkillTag } from './ui/SkillTag';

interface JoinEventPageProps {
  eventCode: string;
  onComplete: () => void;
  onBack: () => void;
}

const skillCategories = {
  design: ['UI/UX', 'Figma', 'Graphic Design', 'Branding'],
  frontend: ['React', 'Vue', 'TypeScript', 'CSS/Tailwind'],
  backend: ['Node.js', 'Python', 'Django', 'APIs'],
  mobile: ['React Native', 'Swift', 'Flutter', 'iOS'],
  data: ['ML/AI', 'Data Science', 'Analytics', 'Database'],
  other: ['Project Mgmt', 'Business', 'Marketing', 'Hardware'],
};

export function JoinEventPage({ eventCode, onComplete, onBack }: JoinEventPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skillsIHave, setSkillsIHave] = useState<string[]>([]);
  const [skillsINeed, setSkillsINeed] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSkillHave = (skill: string) => {
    setSkillsIHave(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleSkillNeed = (skill: string) => {
    setSkillsINeed(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = () => {
    // TESTING MODE: Accept any input and proceed to Waiting Room
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete();
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 via-[#0E0E10] to-[#FF7B00]/5" />

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-[#D1D1D6] hover:text-[#D9F24D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50 rounded-lg px-3 py-2"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
          <div className="px-5 py-3 bg-[#1B1B1F] border border-[#7B61FF]/50 rounded-full">
            <span className="text-[#D1D1D6] text-sm">Event: </span>
            <span className="text-[#D9F24D] tracking-wider" style={{ fontFamily: 'monospace', fontWeight: 700 }}>{eventCode}</span>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl mb-4 bg-gradient-to-r from-[#7B61FF] to-[#D9F24D] bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
            Set Up Your Player Card
          </h1>
          <p className="text-[#D1D1D6] text-xl">
            We'll match you instantly with teammates who have what you need
          </p>
        </motion.div>

        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div>
            <label className="block text-[#D1D1D6] mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>YOUR NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-6 py-5 bg-[#1B1B1F] border-2 border-[#7B61FF]/30 rounded-2xl text-white placeholder-[#D1D1D6]/40 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 text-lg"
            />
          </div>
          <div>
            <label className="block text-[#D1D1D6] mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-6 py-5 bg-[#1B1B1F] border-2 border-[#7B61FF]/30 rounded-2xl text-white placeholder-[#D1D1D6]/40 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 text-lg"
            />
          </div>
        </motion.div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Skills I Have */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#7B61FF]/10 to-[#7B61FF]/5 border-2 border-[#7B61FF]/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#7B61FF] rounded-full animate-pulse" />
              <h2 className="text-2xl text-[#7B61FF]" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                Skills I Have
              </h2>
            </div>
            <p className="text-[#D1D1D6] text-sm mb-6">
              Select all skills you can contribute to a team
            </p>
            <div className="space-y-4">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <div key={category}>
                  <div className="text-[#D1D1D6]/60 text-xs uppercase tracking-wide mb-2">
                    {category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <SkillTag
                        key={skill}
                        skill={skill}
                        selected={skillsIHave.includes(skill)}
                        onClick={() => toggleSkillHave(skill)}
                        variant="violet"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills I Need */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#FF7B00]/10 to-[#FF7B00]/5 border-2 border-[#FF7B00]/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#FF7B00] rounded-full animate-pulse" />
              <h2 className="text-2xl text-[#FF7B00]" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                Skills I Need
              </h2>
            </div>
            <p className="text-[#D1D1D6] text-sm mb-6">
              Select skills you're looking for in teammates
            </p>
            <div className="space-y-4">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <div key={category}>
                  <div className="text-[#D1D1D6]/60 text-xs uppercase tracking-wide mb-2">
                    {category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <SkillTag
                        key={skill}
                        skill={skill}
                        selected={skillsINeed.includes(skill)}
                        onClick={() => toggleSkillNeed(skill)}
                        variant="orange"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-lg mx-auto"
        >
          <GlowButton
            onClick={handleSubmit}
            variant="primary"
            size="large"
            className="w-full"
            disabled={!name || !email || skillsIHave.length === 0 || skillsINeed.length === 0 || isSubmitting}
          >
            <Sparkles className="w-6 h-6" />
            Find My Team
          </GlowButton>
        </motion.div>
      </div>
    </div>
  );
}