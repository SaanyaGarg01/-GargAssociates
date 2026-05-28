import { motion } from 'framer-motion';
import { timeline } from '../../data';

export default function TimelineSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="orb orb-blue w-[500px] h-[500px] top-0 left-0 opacity-10" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="tag mb-5 justify-center inline-flex">Our Journey</div>
          <h2 className="section-title">
            <span className="gold-text">25 Years</span> of Legal Excellence
          </h2>
          <p className="section-subtitle mx-auto mt-4 text-center">
            From humble beginnings to one of Delhi's most trusted law practices — our story.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-600/50 to-transparent -translate-x-1/2" />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-none`}
                >
                  {/* Content */}
                  <div className={`md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass rounded-2xl p-6 border border-white/5 hover:border-gold-500/20 transition-all duration-500 card-hover">
                      <div className="font-serif text-3xl font-bold gold-text mb-2">{item.year}</div>
                      <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-gold-500 glow-gold" />
                      <div className="absolute inset-0 rounded-full bg-gold-400 animate-ping opacity-20" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
