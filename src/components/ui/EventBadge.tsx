import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';

interface EventBadgeProps {
  eventName: string;
  eventDate?: string;
  compact?: boolean;
}

export function EventBadge({ eventName, eventDate, compact = false }: EventBadgeProps) {
  if (compact) {
    return (
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B1B1F]/80 backdrop-blur-sm border border-[#7B61FF]/50 rounded-full shadow-[0_0_20px_rgba(123,97,255,0.2)]"
        whileHover={{ scale: 1.05 }}
      >
        <Calendar className="w-4 h-4 text-[#D9F24D]" />
        <span
          className="text-white text-sm"
          style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
        >
          {eventName}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="inline-flex items-center gap-3 px-6 py-4 bg-[#1B1B1F]/80 backdrop-blur-xl border-2 border-[#7B61FF]/50 rounded-full shadow-[0_0_32px_rgba(123,97,255,0.3)]"
      whileHover={{ scale: 1.05 }}
      animate={{
        boxShadow: [
          '0 0 32px rgba(123,97,255,0.3)',
          '0 0 48px rgba(123,97,255,0.4)',
          '0 0 32px rgba(123,97,255,0.3)',
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
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
    </motion.div>
  );
}
