import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Copy, QrCode, Sparkles, Check } from 'lucide-react';
import { GlowButton } from './ui/GlowButton';
import { Confetti } from './ui/Confetti';
import { NavBar } from './ui/NavBar';

interface CreateEventPageProps {
  onEventCreated: (code: string, name: string) => void;
  onBack: () => void;
  onLogin?: () => void;
  onSignUp?: () => void;
}

export function CreateEventPage({ onEventCreated, onBack, onLogin, onSignUp }: CreateEventPageProps) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateEventCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
    setShowModal(true);
    onEventCreated(code, eventName || 'Untitled Event');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-24">
      {/* Navigation Bar */}
      <NavBar 
        onLogin={onLogin} 
        onSignUp={onSignUp}
        onLogoClick={onBack}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/10 via-[#0E0E10] to-[#FF7B00]/10" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-8 py-24">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-[#D1D1D6] hover:text-[#D9F24D] transition-colors mb-16 focus:outline-none focus:ring-2 focus:ring-[#D9F24D]/50 rounded-lg px-3 py-2"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl mb-4 bg-gradient-to-r from-[#D9F24D] to-[#7B61FF] bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
            Create Your Event Arena
          </h1>
          <p className="text-[#D1D1D6] text-xl">
            Set up your hackathon or project event in seconds
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Event Name */}
          <div>
            <label className="block text-[#D1D1D6] mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>EVENT NAME</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., HackMIT 2025, CS101 Final Project"
              className="w-full px-6 py-5 bg-[#1B1B1F] border-2 border-[#7B61FF]/30 rounded-2xl text-white placeholder-[#D1D1D6]/40 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 text-lg"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-[#D1D1D6] mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>EVENT DATE</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-6 py-5 bg-[#1B1B1F] border-2 border-[#7B61FF]/30 rounded-2xl text-white focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 text-lg"
            />
          </div>

          {/* Event Description */}
          <div>
            <label className="block text-[#D1D1D6] mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600 }}>DESCRIPTION (OPTIONAL)</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Tell participants what to expect..."
              rows={4}
              className="w-full px-6 py-5 bg-[#1B1B1F] border-2 border-[#7B61FF]/30 rounded-2xl text-white placeholder-[#D1D1D6]/40 focus:border-[#D9F24D] focus:outline-none focus:ring-4 focus:ring-[#D9F24D]/20 transition-all duration-300 resize-none text-lg"
            />
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <GlowButton
              onClick={generateEventCode}
              variant="primary"
              size="large"
              className="w-full"
              disabled={!eventName || !eventDate}
            >
              <Sparkles className="w-6 h-6" />
              Generate Event Code
            </GlowButton>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <Confetti />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-[#1B1B1F] border-2 border-[#D9F24D] rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Animated glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#D9F24D]/20 via-[#7B61FF]/20 to-[#FF7B00]/20"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative z-10 text-center">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-[#D9F24D] to-[#7B61FF] rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-10 h-10 text-[#0E0E10]" />
                  </motion.div>

                  <h2 className="text-3xl mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700 }}>
                    Your Event is Ready!
                  </h2>
                  <p className="text-[#D1D1D6] mb-8">
                    Share this code with your participants
                  </p>

                  {/* Event Code Display */}
                  <div className="bg-[#0E0E10] border-2 border-[#7B61FF] rounded-xl p-6 mb-6">
                    <div className="text-6xl tracking-widest mb-4" style={{ fontFamily: 'monospace', fontWeight: 700 }}>
                      {generatedCode}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center justify-center gap-2 mx-auto text-[#D9F24D] hover:text-[#D9F24D]/80 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>

                  {/* QR Code Placeholder */}
                  <div className="bg-white rounded-xl p-6 mb-6 inline-block">
                    <div className="w-32 h-32 bg-[#0E0E10] rounded flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-[#D9F24D]" />
                    </div>
                  </div>

                  <GlowButton
                    onClick={() => setShowModal(false)}
                    variant="secondary"
                    size="medium"
                    className="w-full"
                  >
                    Close
                  </GlowButton>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}