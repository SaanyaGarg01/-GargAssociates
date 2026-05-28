import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../../data';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setDirection(1);
    setActive((a) => (a + 1) % testimonials.length);
  };

  const t = testimonials[active];

  return (
    <section className="section-padding relative overflow-hidden bg-navy-900">
      <div className="gold-divider absolute top-0 left-0 right-0" />
      <div className="gold-divider absolute bottom-0 left-0 right-0" />

      <div className="orb orb-gold w-[400px] h-[400px] -top-20 left-1/2 -translate-x-1/2 opacity-15" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="tag mb-5 justify-center inline-flex">Testimonials</div>
          <h2 className="section-title">
            Words From
            <br />
            <span className="gold-text">Our Clients</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="glass-gold rounded-3xl p-8 md:p-12 relative overflow-hidden"
              >
                {/* Decorative quote mark */}
                <Quote className="absolute top-6 right-8 w-24 h-24 text-gold-500/8" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed mb-8 italic">
                  "{t.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center font-serif font-bold text-navy-950 text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold font-sans">{t.name}</div>
                    <div className="text-white/40 text-sm">{t.designation}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-gold-400' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
