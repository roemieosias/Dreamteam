import { motion } from 'motion/react';

interface SkillTagProps {
  skill: string;
  isSelected: boolean;
  onClick: () => void;
  variant?: 'have' | 'need';
}

export function SkillTag({ skill, isSelected, onClick, variant = 'have' }: SkillTagProps) {
  const colors = {
    have: {
      selected: 'bg-[#7B61FF] border-[#7B61FF] text-white shadow-[0_0_20px_rgba(123,97,255,0.4)]',
      unselected: 'bg-[#7B61FF]/10 border-[#7B61FF]/30 text-[#7B61FF] hover:bg-[#7B61FF]/20 hover:border-[#7B61FF]/50',
    },
    need: {
      selected: 'bg-[#FF7B00] border-[#FF7B00] text-white shadow-[0_0_20px_rgba(255,123,0,0.4)]',
      unselected: 'bg-[#FF7B00]/10 border-[#FF7B00]/30 text-[#FF7B00] hover:bg-[#FF7B00]/20 hover:border-[#FF7B00]/50',
    },
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full border-2 text-sm transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          variant === 'have' ? 'focus:ring-[#7B61FF]/50' : 'focus:ring-[#FF7B00]/50'
        }
        ${isSelected ? colors[variant].selected : colors[variant].unselected}
      `}
      style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {skill}
    </motion.button>
  );
}