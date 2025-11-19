import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronDown, Check } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date?: string;
  hasProfile: boolean;
}

interface EventSwitcherProps {
  events: Event[];
  currentEventId: string;
  onSelectEvent: (eventId: string) => void;
}

export function EventSwitcher({ events, currentEventId, onSelectEvent }: EventSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentEvent = events.find((e) => e.id === currentEventId);

  if (events.length <= 1) {
    return null;
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#1B1B1F]/80 backdrop-blur-sm border border-[#7B61FF]/50 rounded-full hover:border-[#D9F24D]/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Calendar className="w-4 h-4 text-[#D9F24D]" />
        <span
          className="text-white text-sm"
          style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
        >
          {currentEvent?.name || 'My Events'}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#D1D1D6] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 min-w-[280px] bg-[#1B1B1F]/95 backdrop-blur-xl border border-[#7B61FF]/50 rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              <div className="p-2">
                <div
                  className="px-4 py-2 text-xs text-[#D1D1D6]/70 uppercase tracking-wider"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}
                >
                  My Events
                </div>
                {events.map((event) => {
                  const isSelected = event.id === currentEventId;

                  return (
                    <motion.button
                      key={event.id}
                      onClick={() => {
                        onSelectEvent(event.id);
                        setIsOpen(false);
                      }}
                      className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-colors duration-200 focus:outline-none ${
                        isSelected
                          ? 'bg-[#7B61FF]/20 text-white'
                          : 'hover:bg-[#7B61FF]/10 text-[#D1D1D6]'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-[#D9F24D]" />
                        <div className="text-left">
                          <div
                            className="text-sm"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}
                          >
                            {event.name}
                          </div>
                          {event.date && (
                            <div
                              className="text-xs text-[#D1D1D6]/60"
                              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            >
                              {event.date}
                            </div>
                          )}
                          {!event.hasProfile && (
                            <div
                              className="text-xs text-[#FF7B00] mt-1"
                              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                            >
                              Profile needed
                            </div>
                          )}
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#D9F24D]" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
