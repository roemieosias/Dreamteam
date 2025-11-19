import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
}

export function GlowButton({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  isSubmitting = false,
}: GlowButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#D9F24D] via-[#7B61FF] to-[#00D4FF] text-[#0E0E10] shadow-[0_8px_32px_rgba(217,242,77,0.4)] hover:shadow-[0_8px_48px_rgba(217,242,77,0.6)]',
    secondary: 'bg-[#1B1B1F] border-2 border-[#7B61FF] text-[#D9F24D] shadow-[0_4px_24px_rgba(123,97,255,0.2)] hover:shadow-[0_4px_32px_rgba(123,97,255,0.4)]',
    danger: 'bg-gradient-to-r from-[#FF7B00] to-[#FF4500] text-white shadow-[0_8px_32px_rgba(255,123,0,0.4)] hover:shadow-[0_8px_48px_rgba(255,123,0,0.6)]',
  };

  const sizes = {
    small: 'px-5 py-2.5 text-sm',
    medium: 'px-8 py-4',
    large: 'px-10 py-6 text-xl',
  };

  return (
    <div className="relative inline-block w-full">
      {/* Glow effect background - softer and more refined */}
      {variant === 'primary' && !disabled && (
        <>
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-40 blur-3xl"
            style={{
              background: 'linear-gradient(135deg, #D9F24D, #7B61FF)',
            }}
            animate={
              isSubmitting
                ? { 
                    scale: [1, 1.3, 1], 
                    opacity: [0.4, 0.7, 0.4],
                  }
                : { 
                    scale: [1, 1.1, 1], 
                    opacity: [0.25, 0.4, 0.25] 
                  }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-30 blur-2xl"
            style={{
              background: 'radial-gradient(circle, #D9F24D, transparent)',
            }}
            animate={{ 
              scale: [1.1, 1.3, 1.1],
              opacity: [0.2, 0.35, 0.2]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <motion.button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${variants[variant]}
          ${sizes[size]}
          ${className}
          rounded-2xl
          flex items-center justify-center gap-3
          transition-all duration-300
          disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
          relative
          w-full
          overflow-hidden
        `}
        style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '0.02em' }}
        whileHover={disabled ? {} : { scale: 1.03 }}
        whileTap={disabled ? {} : { scale: 0.97 }}
        animate={
          isSubmitting
            ? {
                boxShadow: [
                  '0 8px 40px rgba(217,242,77,0.3)',
                  '0 8px 50px rgba(123,97,255,0.5)',
                  '0 8px 40px rgba(217,242,77,0.3)',
                ],
              }
            : {}
        }
        transition={isSubmitting ? { duration: 1, repeat: Infinity } : {}}
      >
        {/* Inner glow effect - animated gradient overlay */}
        {variant === 'primary' && (
          <>
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3), transparent 60%)',
              }}
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
              }}
            />
          </>
        )}
        <span className="relative z-10 flex items-center justify-center gap-3">
          {children}
        </span>
      </motion.button>
    </div>
  );
}