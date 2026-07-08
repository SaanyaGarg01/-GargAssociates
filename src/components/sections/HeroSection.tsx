import { useEffect, useRef, Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const ScalesScene = lazy(() => import('../3d/ScalesScene'));
const ParticleField = lazy(() => import('../3d/ParticleField'));

// ─── Cinematic Legal Video Playlist ──────────────────────────────────────────
// Local files: real legal/court/judge videos served by Vite (zero latency).
// CDN fallbacks: confirmed 200 OK from Pexels "gavel","courtroom","lawyer","judge" search.
// All CDN IDs are verified legal content — gavels, judges, courtroom scenes, lawyers.
const BG_PLAYLIST = [
  { local: '/videos/courtroom.mp4',    cdn: 'https://videos.pexels.com/video-files/4480390/4480390-uhd_3840_2160_25fps.mp4', label: 'Courtroom Scene' },
  { local: '/videos/courthouse.mp4',   cdn: 'https://videos.pexels.com/video-files/6101325/6101325-uhd_4096_2160_30fps.mp4', label: 'Judge and Courtroom' },
  { local: '/videos/office.mp4',       cdn: 'https://videos.pexels.com/video-files/8061654/8061654-uhd_3840_2160_25fps.mp4', label: 'Lawyers discussing case' },
  { local: '/videos/consultation.mp4', cdn: 'https://videos.pexels.com/video-files/8135064/8135064-uhd_4096_2160_25fps.mp4', label: 'Client Consultation' },
  { local: '/videos/handshake.mp4',    cdn: 'https://videos.pexels.com/video-files/7714096/7714096-uhd_3840_2160_30fps.mp4', label: 'Strategy Discussion' },
  { local: '/videos/library.mp4',      cdn: 'https://videos.pexels.com/video-files/8061611/8061611-uhd_3840_2160_25fps.mp4', label: 'Gavel Closeup in Courtroom' },
  { local: '/videos/justice.mp4',      cdn: 'https://videos.pexels.com/video-files/8428504/8428504-uhd_2160_3840_25fps.mp4', label: 'Judge Gavel strike' },
  { local: '/videos/headquarters.mp4', cdn: 'https://videos.pexels.com/video-files/8061747/8061747-uhd_2160_3840_25fps.mp4', label: 'Courtroom Trial' },
  { local: '/videos/strategy.mp4',     cdn: 'https://videos.pexels.com/video-files/8731580/8731580-hd_1920_1080_25fps.mp4', label: 'Courtroom Hearing' },
  { local: '/videos/meeting.mp4',      cdn: 'https://videos.pexels.com/video-files/7841710/7841710-hd_1920_1080_30fps.mp4', label: 'Advocates in corridor' },
];


export default function HeroSection() {
  // ─── Full-screen bg video state (double-buffered) ──────────────────────
  const [bgSlot, setBgSlot] = useState<1 | 2>(1);
  const [bgIdx1, setBgIdx1] = useState(0);
  const [bgIdx2, setBgIdx2] = useState(1);
  // Track which slots have had local fail → switch to CDN
  const [failedLocal, setFailedLocal] = useState<Set<number>>(() => new Set());
  const [failedCdn, setFailedCdn] = useState<Set<number>>(() => new Set());

  const getSrc = (idx: number) => {
    if (!failedLocal.has(idx)) return BG_PLAYLIST[idx].local;
    if (!failedCdn.has(idx))   return BG_PLAYLIST[idx].cdn;
    return BG_PLAYLIST[0].cdn; // last resort: repeat first known good
  };

  const handleLocalError = (idx: number) => {
    setFailedLocal(prev => { const n = new Set(prev); n.add(idx); return n; });
  };
  const handleCdnError = (idx: number) => {
    setFailedCdn(prev => { const n = new Set(prev); n.add(idx); return n; });
  };
  const handleError = (idx: number) => {
    if (!failedLocal.has(idx)) { handleLocalError(idx); }
    else { handleCdnError(idx); }
  };

  const getNextBgIdx = (curr: number) => (curr + 1) % BG_PLAYLIST.length;

  useEffect(() => {
    const interval = setInterval(() => {
      if (bgSlot === 1) {
        setBgSlot(2);
        setTimeout(() => setBgIdx1(getNextBgIdx(bgIdx2)), 1500);
      } else {
        setBgSlot(1);
        setTimeout(() => setBgIdx2(getNextBgIdx(bgIdx1)), 1500);
      }
    }, 9000);
    return () => clearInterval(interval);
  }, [bgSlot, bgIdx1, bgIdx2]);

  // ─── GSAP title animation ──────────────────────────────────────────────
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current.querySelectorAll('.word'), {
        y: 80, opacity: 0, stagger: 0.12, duration: 1, ease: 'power4.out', delay: 1.5,
      });
    }
  }, []);

  // ─── Video slot renderer ───────────────────────────────────────────────
  const renderVideo = (slot: 1 | 2, idx: number) => (
    <motion.video
      key={`bg-${slot}-${idx}-${failedLocal.has(idx) ? 'cdn' : 'local'}`}
      src={getSrc(idx)}
      autoPlay
      muted
      playsInline
      loop
      preload="auto"
      crossOrigin="anonymous"
      onError={() => handleError(idx)}
      onCanPlay={(e) => { e.currentTarget.muted = true; e.currentTarget.play().catch(() => {}); }}
      animate={{ opacity: bgSlot === slot ? 1 : 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ zIndex: bgSlot === slot ? 2 : 1 }}
    />
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">

      {/* ── Full-Screen Cinematic Background (Double-Buffered) ─────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {renderVideo(1, bgIdx1)}
        {renderVideo(2, bgIdx2)}

        {/* 60% dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 3 }} />
        {/* Gradient vignette top + bottom */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 3,
            background:
              'linear-gradient(to bottom, rgba(3,6,21,0.75) 0%, transparent 28%, transparent 68%, rgba(3,6,21,0.90) 100%)',
          }}
        />
      </div>

      {/* Particles on top of video */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Subtle gold light beam */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold-500/15 to-transparent" />
      </div>

      {/* ── Main Grid ─────────────────────────────────────────────────── */}
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

        {/* Right — Lady Justice image card */}
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
            className="absolute -bottom-4 -left-4 glass-gold rounded-2xl p-4 border border-gold-500/20 z-20"
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
            className="absolute -top-4 -right-4 glass rounded-2xl p-3 border border-white/10 z-20"
          >
            <div className="text-center">
              <div className="text-gold-400 text-lg mb-0.5">🏛️</div>
              <div className="text-white/80 text-xs font-semibold">Supreme Court</div>
              <div className="text-white/40 text-[10px]">Registered</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 pointer-events-none hidden md:flex z-10"
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
