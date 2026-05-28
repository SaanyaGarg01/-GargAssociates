import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale } from 'lucide-react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
      setProgress(Math.min(current, 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Background gradient orbs */}
          <div className="orb orb-gold w-96 h-96 opacity-30 top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="orb orb-blue w-96 h-96 opacity-20 bottom-1/4 right-1/4" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="w-20 h-20 glass-gold rounded-2xl flex items-center justify-center glow-gold"
            >
              <Scale className="w-10 h-10 text-gold-400 animate-float" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-serif text-2xl font-bold text-white mb-1 tracking-wide">
                Sudhir Garg & Namita Garg
              </h1>
              <p className="text-gold-500 text-xs tracking-[0.4em] uppercase font-sans">
                Law Firm
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '200px' }}
              transition={{ delay: 0.5 }}
              className="relative"
              style={{ width: '200px' }}
            >
              <div className="h-px bg-white/10 w-full">
                <motion.div
                  className="h-full bg-gold-gradient"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-center text-white/30 text-xs mt-2 font-sans tracking-widest">
                {Math.floor(progress)}%
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-serif italic text-white/40 text-base"
            >
              "Justice. Integrity. Results."
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
