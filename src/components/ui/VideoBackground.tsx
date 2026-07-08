import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface VideoBackgroundProps {
  localSrc: string;      // E.g., "/videos/office.mp4"
  fallbackSrc: string;   // E.g., a direct Pexels CDN link
  overlayOpacity?: number; // E.g., 0.55 - 0.65
  parallaxSpeed?: number;  // E.g., 0.2
  className?: string;
}

export default function VideoBackground({
  localSrc,
  fallbackSrc,
  overlayOpacity = 0.6,
  parallaxSpeed = 0.15,
  className = ''
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState(localSrc);
  const [hasFailed, setHasFailed] = useState(false);

  // Fallback to online CDN if local video fails to load
  const handleVideoError = () => {
    if (!hasFailed && fallbackSrc) {
      console.warn(`Local video failed to load: ${localSrc}. Falling back to CDN: ${fallbackSrc}`);
      setSource(fallbackSrc);
      setHasFailed(true);
    }
  };

  // Intersection Observer to play/pause video when scrolling in/out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset failure state and source if localSrc changes
    setSource(localSrc);
    setHasFailed(false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log('Autoplay blocked or paused:', err);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 } // Trigger early for smoother transition
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [localSrc]);

  // Framer Motion Parallax Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const yTranslateRange = parallaxSpeed * 100; // E.g., 15% range
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${yTranslateRange / 2}%`, `${yTranslateRange / 2}%`]
  );

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Motion wrapper to translate the video vertically for parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {/* Inner motion wrapper to handle the Ken Burns scale animation */}
        <motion.video
          ref={videoRef}
          src={source}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={handleVideoError}
          animate={{ scale: [1, 1.06] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          className="w-full h-full object-cover origin-center"
        />
      </motion.div>

      {/* Dark Overlay Layer for Text Contrast */}
      <div
        className="absolute inset-0 bg-navy-950 mix-blend-multiply"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/30 via-transparent to-navy-950 opacity-80" />
    </div>
  );
}
