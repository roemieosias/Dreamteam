import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { GlowButton } from './GlowButton';

interface ProfileGuardModalProps {
  isOpen: boolean;
  eventName: string;
  onComplete: () => void;
  onClose: () => void;
}

export function ProfileGuardModal({ isOpen, eventName, onComplete, onClose }: ProfileGuardModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-[#1B1B1F] border-2 border-[#FF7B00]/50 rounded-3xl p-10 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FF7B00]/20 border-2 border-[#FF7B00]/50 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255,123,0,0.3)',
                    '0 0 40px rgba(255,123,0,0.5)',
                    '0 0 20px rgba(255,123,0,0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="w-10 h-10 text-[#FF7B00]" />
              </motion.div>

              {/* Content */}
              <h2
                className="text-3xl text-center mb-4 text-white"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 800 }}
              >
                Profile Required
              </h2>
              <p
                className="text-[#D1D1D6] text-center mb-8 text-lg"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}
              >
                Create your <span className="text-[#D9F24D]">{eventName}</span> profile to see matches and start building
                your dream team.
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <GlowButton onClick={onComplete} className="w-full">
                  Complete Event Profile
                  <ArrowRight className="w-5 h-5" />
                </GlowButton>
                <button
                  onClick={onClose}
                  className="w-full px-6 py-4 text-[#D1D1D6] hover:text-white transition-colors duration-300 focus:outline-none"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
