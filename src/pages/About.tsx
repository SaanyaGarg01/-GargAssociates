import { useEffect, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Scale, Star } from 'lucide-react';
import { team, timeline, awards } from '../data';
import TimelineSection from '../components/sections/TimelineSection';
import CTASection from '../components/sections/CTASection';

const ScalesScene = lazy(() => import('../components/3d/ScalesScene'));

function LawyerCard({ lawyer, index }: { lawyer: typeof team[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="perspective"
    >
      <div
        className="relative h-[520px] cursor-pointer preserve-3d transition-all duration-700"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden glass rounded-3xl overflow-hidden border border-white/5 hover:border-gold-500/25 transition-colors duration-500">
          {/* Avatar placeholder */}
          <div className="h-64 bg-gradient-to-br from-navy-700 to-navy-800 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gold-gradient flex items-center justify-center shadow-2xl">
                <span className="font-serif text-5xl font-bold text-navy-950">
                  {lawyer.name.split(' ')[1][0]}
                </span>
              </div>
            </div>
            {/* Gold geometric decoration */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border border-gold-500/20" />
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full border border-gold-500/10" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy-900 to-transparent" />
          </div>

          <div className="p-6">
            <div className="tag mb-3 inline-flex">{lawyer.specialization}</div>
            <h3 className="font-serif text-2xl font-bold text-white mb-1">{lawyer.name}</h3>
            <p className="text-gold-400 text-sm mb-4 font-sans">{lawyer.title}</p>
            <p className="text-white/50 text-sm leading-relaxed mb-4">{lawyer.bio.slice(0, 140)}…</p>

            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40">{lawyer.experience} Experience</span>
              <span className="text-gold-500 font-medium">Tap to flip →</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden glass-gold rounded-3xl p-6 border border-gold-500/25 overflow-y-auto"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <h3 className="font-serif text-xl font-bold text-white mb-1">{lawyer.name}</h3>
          <p className="text-gold-400 text-xs mb-6 font-sans tracking-wide">{lawyer.title}</p>

          <div className="mb-5">
            <div className="flex items-center gap-2 text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              <BookOpen className="w-3 h-3" />
              Education
            </div>
            <ul className="space-y-1.5">
              {lawyer.education.map((e) => (
                <li key={e} className="text-white/60 text-xs flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              <Scale className="w-3 h-3" />
              Expertise
            </div>
            <div className="flex flex-wrap gap-2">
              {lawyer.expertise.map((e) => (
                <span key={e} className="text-[10px] text-gold-300 bg-gold-500/10 border border-gold-500/20 rounded-full px-2 py-0.5">
                  {e}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              <Award className="w-3 h-3" />
              Achievements
            </div>
            <ul className="space-y-1.5">
              {lawyer.achievements.map((a) => (
                <li key={a} className="text-white/60 text-xs flex items-start gap-2">
                  <Star className="w-2.5 h-2.5 text-gold-400 mt-0.5 shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-center text-xs text-white/30">Tap to flip back ←</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  useEffect(() => {
    document.title = 'About Us – Sudhir Garg & Namita Garg Law Firm';
  }, []);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden hero-bg">
        <div className="orb orb-gold w-[500px] h-[500px] -top-40 -right-20 opacity-20" />
        <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="tag mb-6"
            >
              About the Firm
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-title mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              Built on Trust.
              <br />
              <span className="gold-text">Proven in Court.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mb-8"
            >
              Sudhir Garg & Namita Garg have built one of Delhi's most respected law practices through a simple principle: exceptional legal work, delivered with integrity, every single time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { val: '25+', label: 'Years' },
                { val: '2500+', label: 'Cases Won' },
                { val: '3200+', label: 'Clients' },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 text-center border border-white/5">
                  <div className="font-serif text-2xl font-bold gold-text mb-1">{s.val}</div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="h-96 glass rounded-3xl overflow-hidden border border-gold-500/10"
          >
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gold-400 text-4xl">⚖️</div>}>
              <ScalesScene compact />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding relative overflow-hidden bg-navy-900">
        <div className="gold-divider absolute top-0 left-0 right-0" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="tag mb-5 justify-center inline-flex">Meet the Partners</div>
            <h2 className="section-title">
              Legal Minds.
              <br />
              <span className="gold-text">Formidable Advocates.</span>
            </h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              Click any card to learn more about their background and expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((lawyer, i) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="tag mb-5 justify-center inline-flex">Recognition</div>
            <h2 className="section-title">Awards & <span className="gold-text">Achievements</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {awards.map((award, i) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-5 border border-white/5 hover:border-gold-500/25 group card-hover flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <Award className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1 group-hover:text-gold-300 transition-colors">{award.title}</div>
                  <div className="text-white/40 text-xs">{award.org}</div>
                  <div className="text-gold-600 text-xs mt-1">{award.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TimelineSection />
      <CTASection />
    </main>
  );
}
