import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { stats } from '../../data';

function StatCounter({ value, suffix, label, description, delay = 0 }: {
  value: number;
  suffix: string;
  label: string;
  description: string;
  delay?: number;
}) {
  const countRef = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView || !countRef.current) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = value / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      if (countRef.current) {
        countRef.current.textContent = Math.floor(start).toLocaleString();
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      className="relative group"
    >
      <div className="glass rounded-2xl p-8 text-center card-hover border border-white/5 hover:border-gold-500/30 transition-all duration-500">
        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="font-serif text-5xl font-bold mb-2 flex items-end justify-center gap-1">
            <span ref={countRef} className="gold-text-shimmer">0</span>
            <span className="gold-text text-3xl mb-1">{suffix}</span>
          </div>
          <div className="text-white font-semibold text-lg mb-1 font-serif">{label}</div>
          <div className="text-white/40 text-sm font-sans">{description}</div>
        </div>

        {/* Bottom gold accent */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-navy-900">
      {/* Decorative */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
      <div className="gold-divider absolute top-0 left-0 right-0" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="tag mb-5 justify-center inline-flex">Track Record</div>
          <h2 className="section-title">Numbers That Speak</h2>
          <p className="section-subtitle mx-auto mt-4 text-center">
            Two decades of excellence, measured in victories won and lives transformed.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
