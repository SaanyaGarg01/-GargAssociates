import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative glass-gold rounded-3xl p-12 md:p-20 text-center overflow-hidden border border-gold-500/20"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,168,76,0.1)_0%,transparent_70%)]" />
          <div className="orb orb-gold w-80 h-80 -top-20 -left-20 opacity-20" />
          <div className="orb orb-gold w-80 h-80 -bottom-20 -right-20 opacity-20" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="tag mb-6 justify-center inline-flex"
            >
              Begin Your Legal Journey
            </motion.div>

            <h2
              className="font-serif text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700 }}
            >
              Your Case Deserves
              <br />
              <span className="gold-text-shimmer">Expert Representation</span>
            </h2>

            <p className="section-subtitle mx-auto mb-10 text-center text-white/60">
              Don't face legal challenges alone. Our team is ready to assess your situation and craft the winning strategy you deserve.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <button className="btn-primary text-sm px-8 py-4">
                  <Calendar className="w-4 h-4" />
                  <span>Book a Free Consultation</span>
                </button>
              </Link>
              <Link to="/services">
                <button className="btn-outline text-sm px-8 py-4">
                  <span>Explore Practice Areas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-gold-500/15">
              {['Free Initial Consultation', 'Confidential & Secure', '24-Hr Response Guarantee', 'Supreme Court Registered'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-white/50 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
