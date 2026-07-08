import { motion } from 'framer-motion';

export default function ScalesScene({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 md:p-8 overflow-hidden select-none">
      {/* Background glow orbs for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gold-500/8 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      
      {/* Lady Justice Image with premium floating animation */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <img
          src="/lady_justice.png"
          alt="Lady of Justice holding the scales of justice"
          className={`w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(201,168,76,0.18)] transition-all duration-500 ${
            compact ? 'max-h-[280px]' : 'max-h-[480px] lg:max-h-[560px]'
          }`}
        />
        
        {/* Subtle decorative blend gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/10 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
