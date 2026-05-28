import { motion } from 'framer-motion';
import { whyChooseUs } from '../../data';

export default function WhyChooseUsSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-navy-900">
      <div className="gold-divider absolute top-0 left-0 right-0" />
      <div className="orb orb-gold w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="tag mb-6"
            >
              Why Garg Associates
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title mb-6"
            >
              The Standard
              <br />
              <span className="gold-text">Others Measure Against</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mb-8"
            >
              When you choose Garg Associates, you're not just hiring lawyers — you're gaining a team of strategists, negotiators, and advocates who treat your case as if it were their own.
            </motion.p>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="border-l-2 border-gold-500 pl-5 font-serif italic text-white/70 text-lg"
            >
              "We don't just practice law — we engineer outcomes."
              <footer className="mt-2 text-sm text-gold-500 not-italic font-sans font-medium">
                — Adv. Sudhir Garg
              </footer>
            </motion.blockquote>
          </div>

          {/* Right cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="glass rounded-2xl p-5 border border-white/5 hover:border-gold-500/25 group card-hover"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2 text-sm group-hover:text-gold-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
