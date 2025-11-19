import { motion } from 'motion/react';

export function Confetti() {
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: ['#D9F24D', '#7B61FF', '#FF7B00'][i % 3],
    delay: Math.random() * 0.5,
    x: Math.random() * 100,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
            top: '-10%',
          }}
          initial={{
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 100,
            opacity: 0,
            rotate: piece.rotation + 720,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}
