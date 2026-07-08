import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Target, Trophy } from 'lucide-react';
import { caseStudies } from '../data';
import CTASection from '../components/sections/CTASection';
import { Link } from 'react-router-dom';
import VideoBackground from '../components/ui/VideoBackground';

export default function CaseStudies() {
  useEffect(() => {
    document.title = 'Case Studies – Sudhir Garg & Namita Garg Law Firm';
  }, []);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden hero-bg">
        <VideoBackground
          localSrc="/videos/courtroom.mp4"
          fallbackSrc="https://images.pexels.com/video-files/5607873/5607873-hd_1920_1080_24fps.mp4"
          overlayOpacity={0.6}
        />
        <div className="orb orb-gold w-[400px] h-[400px] -top-20 left-1/4 opacity-15" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tag mb-6 justify-center inline-flex"
          >
            Case Studies
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Victories That
            <br />
            <span className="gold-text">Define Excellence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center text-white/60 max-w-2xl"
          >
            Real cases. Real clients. Real results. Here's how we've made a difference.
          </motion.p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding relative overflow-hidden bg-navy-900">
        <div className="gold-divider absolute top-0 left-0 right-0" />
        <div className="container-custom relative z-10">
          <div className="space-y-16">
            {caseStudies.map((cs, i) => (
              <motion.article
                key={cs.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="glass rounded-3xl overflow-hidden border border-white/5 hover:border-gold-500/20 transition-all duration-500"
              >
                {/* Header */}
                <div className={`p-8 md:p-10 bg-gradient-to-br ${cs.color} to-navy-800/80 border-b border-white/5`}>
                  <div className="flex flex-wrap items-start gap-4 justify-between">
                    <div>
                      <div className="tag mb-4">{cs.category}</div>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">{cs.title}</h2>
                      <p className="text-white/60 text-sm">{cs.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-gold-400 font-serif text-5xl font-bold opacity-20">{String(i + 1).padStart(2, '0')}</div>
                      <div className="text-white/30 text-xs">{cs.year}</div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-4 mt-8">
                    {Object.entries(cs.metrics).map(([key, val]) => (
                      <div key={key} className="glass rounded-xl px-4 py-2 border border-white/5">
                        <div className="text-gold-300 font-semibold text-sm">{val}</div>
                        <div className="text-white/40 text-xs capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body — Problem/Strategy/Result */}
                <div className="p-8 md:p-10">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Problem */}
                    <div>
                      <div className="flex items-center gap-2 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
                        <div className="w-6 h-6 rounded-lg bg-red-400/10 flex items-center justify-center">
                          <Target className="w-3 h-3" />
                        </div>
                        The Problem
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{cs.problem}</p>
                    </div>

                    {/* Strategy */}
                    <div>
                      <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
                        <div className="w-6 h-6 rounded-lg bg-blue-400/10 flex items-center justify-center">
                          <Clock className="w-3 h-3" />
                        </div>
                        Our Strategy
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{cs.strategy}</p>
                    </div>

                    {/* Result */}
                    <div>
                      <div className="flex items-center gap-2 text-green-400 text-xs font-semibold uppercase tracking-widest mb-4">
                        <div className="w-6 h-6 rounded-lg bg-green-400/10 flex items-center justify-center">
                          <Trophy className="w-3 h-3" />
                        </div>
                        The Result
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{cs.result}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-white/30 text-xs max-w-2xl mx-auto"
          >
            * All cases are presented with client permission. Confidential client identities have been anonymized where required by professional ethics.
          </motion.div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
