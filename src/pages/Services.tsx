import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { services } from '../data';
import CTASection from '../components/sections/CTASection';
import { Link } from 'react-router-dom';

function ServiceDetail({ service, index }: { service: typeof services[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`glass rounded-2xl border transition-all duration-500 overflow-hidden ${
        open ? 'border-gold-500/40' : 'border-white/5 hover:border-gold-500/20'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-5 p-6 text-left"
      >
        <div className={`text-4xl shrink-0 transition-transform duration-300 ${open ? 'scale-110' : ''}`}>
          {service.icon}
        </div>
        <div className="flex-1">
          <h3 className={`font-serif text-xl font-semibold transition-colors duration-300 ${open ? 'text-gold-300' : 'text-white'}`}>
            {service.title}
          </h3>
          <p className="text-white/50 text-sm mt-1 leading-relaxed">{service.description}</p>
        </div>
        <div className={`shrink-0 w-8 h-8 rounded-lg transition-all duration-300 flex items-center justify-center ${
          open ? 'bg-gold-500/20 text-gold-400' : 'bg-white/5 text-white/40'
        }`}>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-6 pb-6 border-t border-gold-500/15">
              <div className="pt-5 grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
                    What We Handle
                  </h4>
                  <ul className="space-y-2.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                        <div className="w-5 h-5 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
                    Our Approach
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    We combine deep domain expertise with strategic thinking to deliver outcomes that protect your rights and advance your interests across all forums.
                  </p>
                  <Link to="/contact">
                    <button className="btn-primary text-xs px-5 py-2.5">
                      <span>Consult Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  useEffect(() => {
    document.title = 'Legal Services – Sudhir Garg & Namita Garg Law Firm';
  }, []);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden hero-bg">
        <div className="orb orb-gold w-[500px] h-[500px] top-0 -right-40 opacity-15" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tag mb-6 justify-center inline-flex"
          >
            Practice Areas
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Legal Services
            <br />
            <span className="gold-text">Built for Victory</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center text-white/60 max-w-2xl"
          >
            Eight practice areas. One uncompromising commitment — to deliver the best possible legal outcome for every client.
          </motion.p>
        </div>
      </section>

      {/* Services Accordion */}
      <section className="section-padding relative overflow-hidden bg-navy-900">
        <div className="gold-divider absolute top-0 left-0 right-0" />
        <div className="container-custom relative z-10 max-w-4xl mx-auto">
          <div className="space-y-4">
            {services.map((service, i) => (
              <ServiceDetail key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
