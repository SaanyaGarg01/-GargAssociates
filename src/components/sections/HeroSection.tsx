import { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

import { CINEMATIC_LIBRARY } from '../../constants/videoLibrary';

const ScalesScene = lazy(() => import('../3d/ScalesScene'));
const ParticleField = lazy(() => import('../3d/ParticleField'));

export default function HeroSection() {
  const [videoIndex, setVideoIndex] = useState(() => Math.floor(Math.random() * CINEMATIC_LIBRARY.length));
  const [nextVideoIndex, setNextVideoIndex] = useState(() => {
    const startIdx = Math.floor(Math.random() * CINEMATIC_LIBRARY.length);
    // Find a different starting index if possible
    if (CINEMATIC_LIBRARY.length > 1) {
      let idx = Math.floor(Math.random() * CINEMATIC_LIBRARY.length);
      while (idx === startIdx) {
        idx = Math.floor(Math.random() * CINEMATIC_LIBRARY.length);
      }
      return idx;
    }
    return startIdx;
  });
  const [failedIndices, setFailedIndices] = useState<Set<number>>(() => new Set());

  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  // Helper to resolve source URL (checks if local path has failed)
  const getVideoSrc = (idx: number) => {
    const scene = CINEMATIC_LIBRARY[idx];
    return failedIndices.has(idx) ? scene.fallbackUrl : scene.localUrl;
  };

  const handleVideoError = (idx: number) => {
    console.warn(`Local video failed for index ${idx}. Falling back to CDN.`);
    setFailedIndices((prev) => {
      const updated = new Set(prev);
      updated.add(idx);
      return updated;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex(nextVideoIndex);
      // Select the subsequent video index to preload next
      setNextVideoIndex((currentNext) => {
        if (CINEMATIC_LIBRARY.length <= 1) return currentNext;
        let newNext = Math.floor(Math.random() * CINEMATIC_LIBRARY.length);
        while (newNext === currentNext) {
          newNext = Math.floor(Math.random() * CINEMATIC_LIBRARY.length);
        }
        return newNext;
      });
    }, 10000); // Transition every 10 seconds

    return () => clearInterval(interval);
  }, [nextVideoIndex]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current.querySelectorAll('.word'), {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power4.out',
        delay: 1.5,
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
      {/* Background Videos with Cross-fade Transition */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence initial={false}>
          <motion.video
            key={videoIndex}
            src={getVideoSrc(videoIndex)}
            autoPlay
            muted
            playsInline
            onError={() => handleVideoError(videoIndex)}
            initial={{ opacity: 0, scale: 1.0, zIndex: 0 }}
            animate={{ opacity: 0.35, scale: 1.06, zIndex: 0 }} // Smooth Ken Burns zoom to 1.06
            exit={{ opacity: 0, zIndex: 10 }} // Exiting video fades out ON TOP of the pre-playing next video
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 10, ease: 'linear' } // Zoom is slow and linear over the clip duration
            }}
            className="absolute inset-0 w-full h-full object-cover origin-center"
          />
        </AnimatePresence>

        {/* Background Preloader for Next Video (Hidden) */}
        <video
          key={`preload-${nextVideoIndex}`}
          src={getVideoSrc(nextVideoIndex)}
          preload="auto"
          muted
          playsInline
          onError={() => handleVideoError(nextVideoIndex)}
          className="hidden"
        />

        {/* Premium Dark Overlay (60% opacity) for outstanding text legibility */}
        <div className="absolute inset-0 bg-navy-950/60 mix-blend-multiply" style={{ zIndex: 11 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 opacity-90" style={{ zIndex: 11 }} />
      </div>
      {/* Particle system */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Gradient orbs */}
      <div className="orb orb-gold w-[600px] h-[600px] -top-40 -left-40 opacity-30" />
      <div className="orb orb-blue w-[500px] h-[500px] -bottom-20 -right-20 opacity-20" />
      <div className="orb orb-gold w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      {/* Light beam streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent" />
      </div>

      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-24 lg:pt-0">
        {/* Left content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="tag mb-8"
          >
            <span>Established 1999 · Delhi High Court</span>
          </motion.div>

          <h1
            ref={titleRef}
            className="section-title mb-6 overflow-hidden"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05 }}
          >
            <span className="block overflow-hidden">
              <span className="word inline-block">Justice.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="word inline-block gold-text-shimmer">Integrity.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="word inline-block">Results.</span>
            </span>
          </h1>

          <motion.p
            ref={taglineRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="section-subtitle mb-10 text-white/60"
          >
            Sudhir Garg & Namita Garg bring over 45 combined years of unmatched legal expertise. From the Supreme Court to District Tribunals — we deliver outcomes that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/contact">
              <button className="btn-primary">
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/services">
              <button className="btn-outline">
                <span>Explore Services</span>
              </button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="flex items-center gap-6 mt-12"
          >
            {[
              { val: '2500+', label: 'Cases Won' },
              { val: '96%', label: 'Success Rate' },
              { val: '25+', label: 'Years' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-2xl font-bold gold-text">{stat.val}</div>
                <div className="text-xs text-white/40 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-[500px] lg:h-[680px]"
        >
          <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
            <div className="absolute inset-0 border border-gold-500/15 rounded-3xl" />
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 glass-gold rounded-2xl animate-float flex items-center justify-center">
                    <span className="text-gold-400 text-2xl">⚖️</span>
                  </div>
                </div>
              }
            >
              <ScalesScene />
            </Suspense>
          </div>

          {/* Floating info card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="absolute -bottom-4 -left-4 glass-gold rounded-2xl p-4 border border-gold-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Available Now</div>
                <div className="text-white/50 text-xs">Free initial consultation</div>
              </div>
            </div>
          </motion.div>

          {/* Court badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="absolute -top-4 -right-4 glass rounded-2xl p-3 border border-white/10"
          >
            <div className="text-center">
              <div className="text-gold-400 text-lg mb-0.5">🏛️</div>
              <div className="text-white/80 text-xs font-semibold">Supreme Court</div>
              <div className="text-white/40 text-[10px]">Registered</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic Scene Indicator & Controls */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto z-20 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 glass-gold rounded-2xl md:rounded-full px-5 py-3 border border-gold-500/20 text-xs max-w-sm sm:max-w-none">
        <span className="text-gold-400 font-serif tracking-wider font-semibold whitespace-nowrap">
          Scene {String(videoIndex + 1).padStart(2, '0')} / 15
        </span>
        <div className="hidden sm:block w-px h-3 bg-white/20" />
        <div className="flex flex-col">
          <span className="text-white font-medium font-serif leading-tight">
            {CINEMATIC_LIBRARY[videoIndex].title}
          </span>
          <span className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">
            Category: {CINEMATIC_LIBRARY[videoIndex].category}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-0 sm:ml-4">
          {CINEMATIC_LIBRARY.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setVideoIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === videoIndex ? 'bg-gold-400 scale-125 glow-gold' : 'bg-white/20 hover:bg-white/50'
              }`}
              title={scene.title}
              aria-label={`Go to scene ${scene.id}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 pointer-events-none hidden md:flex"
      >
        <span className="text-xs tracking-widest uppercase font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
