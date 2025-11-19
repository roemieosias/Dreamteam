import { useState } from 'react';
import { motion } from 'motion/react';
import { User, GraduationCap, Briefcase, ArrowRight, Plus, X } from 'lucide-react';
import { GlowButton } from './ui/GlowButton';
import { SkillTag } from './ui/SkillTag';

interface ProfileSetupPageProps {
  name: string;
  onComplete: (profile: {
    name: string;
    major: string;
    year: string;
    role: string;
    skillsIHave: string[];
    skillsINeed: string[];
    bio: string;
  }) => void;
}

const AVAILABLE_SKILLS = [
  'React', 'Python', 'UI/UX Design', 'Machine Learning', 'Backend', 'Frontend',
  'Data Science', 'Mobile Dev', 'DevOps', 'Product Management', 'Figma',
  'Node.js', 'Database Design', 'APIs', 'TypeScript', 'Research', 'Testing'
];

const ROLES = [
  'Full-Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'UI/UX Designer',
  'Product Manager',
  'Data Scientist',
  'ML Engineer',
  'Mobile Developer',
  'DevOps Engineer',
  'QA Engineer',
  'Researcher',
  'Other'
];

export function ProfileSetupPage({ name, onComplete }: ProfileSetupPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');
  const [skillsIHave, setSkillsIHave] = useState<string[]>([]);
  const [skillsINeed, setSkillsINeed] = useState<string[]>([]);
  const [bio, setBio] = useState('');

  const toggleSkillIHave = (skill: string) => {
    setSkillsIHave(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleSkillINeed = (skill: string) => {
    setSkillsINeed(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleComplete = () => {
    onComplete({
      name,
      major,
      year,
      role,
      skillsIHave,
      skillsINeed,
      bio
    });
  };

  const canProceed = major && year && role && skillsIHave.length > 0;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/10 via-[#0E0E10] to-[#FF7B00]/10" />

      <div className="relative z-10 max-w-3xl mx-auto px-8 py-16">
        {/* Step Indicator */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step === currentStep
                    ? 'border-[#D9F24D] bg-[#D9F24D]/20 text-[#D9F24D]'
                    : step < currentStep
                    ? 'border-[#7B61FF] bg-[#7B61FF]/20 text-[#7B61FF]'
                    : 'border-[#7B61FF]/30 bg-transparent text-[#7B61FF]/50'
                }`}
                whileHover={{ scale: 1.1 }}
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
              >
                {step}
              </motion.div>
              {step < 3 && (
                <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                  step < currentStep ? 'bg-[#7B61FF]' : 'bg-[#7B61FF]/30'
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl mb-4 bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
            Build Your Player Card
          </h1>
          <p className="text-[#D1D1D6] text-xl">
            Tell us who you are and what you bring to your team
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Basic Info */}
          <div className="bg-[#1B1B1F]/60 backdrop-blur-sm border-2 border-[#7B61FF]/30 rounded-3xl p-8">
            <h3 className="text-[#D9F24D] mb-6 flex items-center gap-3 text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
              <User className="w-6 h-6" />
              Basic Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#D1D1D6] mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>NAME</label>
                <input
                  type="text"
                  value={name}
                  disabled
                  className="w-full px-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/20 rounded-xl text-[#D1D1D6]/60 cursor-not-allowed"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                />
              </div>
              <div>
                <label className="block text-[#D1D1D6] mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>MAJOR / FIELD</label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="e.g., Computer Science"
                  className="w-full px-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white placeholder-[#D1D1D6]/40 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#D1D1D6] mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>YEAR</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 cursor-pointer"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                >
                  <option value="">Select Year</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
              <div>
                <label className="block text-[#D1D1D6] mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>ROLE</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 cursor-pointer"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                >
                  <option value="">Select Role</option>
                  {ROLES.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Skills I Have */}
          <div className="bg-[#1B1B1F]/60 backdrop-blur-sm border-2 border-[#7B61FF]/30 rounded-3xl p-8">
            <h3 className="text-[#D9F24D] mb-6 flex items-center gap-3 text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
              <Briefcase className="w-6 h-6" />
              Skills I Have
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_SKILLS.map(skill => (
                <SkillTag
                  key={skill}
                  skill={skill}
                  isSelected={skillsIHave.includes(skill)}
                  onClick={() => toggleSkillIHave(skill)}
                />
              ))}
            </div>
          </div>

          {/* Skills I Need */}
          <div className="bg-[#1B1B1F]/60 backdrop-blur-sm border-2 border-[#7B61FF]/30 rounded-3xl p-8">
            <h3 className="text-[#FF7B00] mb-6 flex items-center gap-3 text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
              <Plus className="w-6 h-6" />
              Skills I Need (Optional)
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {AVAILABLE_SKILLS.map(skill => (
                <SkillTag
                  key={skill}
                  skill={skill}
                  isSelected={skillsINeed.includes(skill)}
                  onClick={() => toggleSkillINeed(skill)}
                  variant="need"
                />
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="bg-[#1B1B1F]/60 backdrop-blur-sm border-2 border-[#7B61FF]/30 rounded-3xl p-8">
            <h3 className="text-[#D1D1D6] mb-6 flex items-center gap-3 text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
              <GraduationCap className="w-6 h-6" />
              Bio (Optional)
            </h3>
            
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a bit about yourself, your interests, or what you're hoping to build..."
              rows={4}
              className="w-full px-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white placeholder-[#D1D1D6]/40 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 resize-none"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
            />
          </div>

          {/* CTA */}
          <div className="pt-8 max-w-lg mx-auto">
            <GlowButton
              onClick={handleComplete}
              variant="primary"
              size="large"
              className="w-full"
              disabled={!canProceed}
            >
              Continue to Match Arena
              <ArrowRight className="w-6 h-6" />
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
