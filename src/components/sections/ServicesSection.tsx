import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../../data';

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className="perspective"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
        }}
        className={`relative glass rounded-2xl p-6 h-full border border-white/5 hover:border-gold-500/30 overflow-hidden group cursor-pointer transition-shadow duration-500 ${
          hovered ? 'shadow-2xl shadow-black/50' : ''
        }`}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Glow dot */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            animate={{ rotate: hovered ? [0, -10, 10, 0] : 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl mb-4 block"
          >
            {service.icon}
          </motion.div>

          <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-gold-300 transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-white/50 text-sm leading-relaxed mb-5 group-hover:text-white/70 transition-colors duration-300">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-1.5 mb-6">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300">
                <div className="w-1 h-1 rounded-full bg-gold-500" />
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2 text-gold-500 text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span>Learn More</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="orb orb-gold w-[500px] h-[500px] top-20 -right-40 opacity-15" />
      <div className="orb orb-blue w-[400px] h-[400px] bottom-20 -left-40 opacity-10" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="tag mb-5"
            >
              Practice Areas
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              Legal Expertise
              <br />
              <span className="gold-text">Across All Domains</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/services">
              <button className="btn-outline text-sm">
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
