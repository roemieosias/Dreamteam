import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Briefcase, Plus, Save, Users, Settings } from 'lucide-react';
import { Sidebar } from './ui/Sidebar';
import { GlowButton } from './ui/GlowButton';
import { SkillTag } from './ui/SkillTag';

interface ProfileSettingsPageProps {
  profile: {
    name: string;
    email: string;
    major: string;
    year: string;
    role: string;
    skillsIHave: string[];
    skillsINeed: string[];
    bio: string;
  };
  onSave: (profile: any) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const AVAILABLE_SKILLS = [
  'React', 'Python', 'UI/UX Design', 'Machine Learning', 'Backend', 'Frontend',
  'Data Science', 'Mobile Dev', 'DevOps', 'Product Management', 'Figma',
  'Node.js', 'Database Design', 'APIs', 'TypeScript', 'Research', 'Testing'
];

export function ProfileSettingsPage({ profile, onSave, onNavigate, currentPage }: ProfileSettingsPageProps) {
  const [name, setName] = useState(profile.name);
  const [major, setMajor] = useState(profile.major);
  const [year, setYear] = useState(profile.year);
  const [role, setRole] = useState(profile.role);
  const [skillsIHave, setSkillsIHave] = useState<string[]>(profile.skillsIHave);
  const [skillsINeed, setSkillsINeed] = useState<string[]>(profile.skillsINeed);
  const [bio, setBio] = useState(profile.bio);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSave({
        ...profile,
        name,
        major,
        year,
        role,
        skillsIHave,
        skillsINeed,
        bio
      });
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 via-[#0E0E10] to-[#FF7B00]/5" />

      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={onNavigate}
        onLogoClick={() => onNavigate('landing')}
      />

      {/* Main Content */}
      <div className="flex-1 relative z-10 pl-80">
        <div className="max-w-4xl mx-auto px-8 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-6xl mb-4 bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Profile Settings
            </h1>
            <p className="text-[#D1D1D6] text-xl">
              Update your information and preferences
            </p>
          </motion.div>

          {/* Profile Card Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-[#7B61FF]/10 to-[#FF7B00]/10 backdrop-blur-sm border-2 border-[#7B61FF]/30 rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7B61FF] to-[#FF7B00] flex items-center justify-center border-2 border-[#D9F24D]/40 shadow-lg">
                <Users className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-3xl text-white mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                  {name}
                </h3>
                <p className="text-[#D1D1D6] text-lg">
                  {role}
                </p>
                <p className="text-[#D1D1D6]/70">
                  {profile.email}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Sections */}
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
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                  />
                </div>
                <div>
                  <label className="block text-[#D1D1D6] mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>MAJOR / FIELD</label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full px-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300"
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
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                  />
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
                Skills I Need
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
                <Settings className="w-6 h-6" />
                Bio
              </h3>
              
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a bit about yourself..."
                rows={4}
                className="w-full px-6 py-4 bg-[#0E0E10]/50 border-2 border-[#7B61FF]/30 rounded-xl text-white placeholder-[#D1D1D6]/40 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 resize-none"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
              />
            </div>

            {/* Save Button */}
            <div className="pt-8 max-w-lg mx-auto">
              <GlowButton
                onClick={handleSave}
                variant="primary"
                size="large"
                className="w-full"
                isSubmitting={isSaving}
              >
                <Save className="w-6 h-6" />
                {isSaving ? 'Saving Changes...' : 'Save Changes'}
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}