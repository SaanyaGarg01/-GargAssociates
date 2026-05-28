import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Phone, Mail, MapPin, Link2, MessageSquare, Globe, ArrowRight } from 'lucide-react';

const quickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const practiceAreas = [
  { label: 'Civil Law', path: '/services' },
  { label: 'Criminal Law', path: '/services' },
  { label: 'Family Law', path: '/services' },
  { label: 'Property Law', path: '/services' },
  { label: 'Corporate Law', path: '/services' },
  { label: 'Cyber Law', path: '/services' },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 overflow-hidden pt-20 pb-8">
      {/* Gold Divider */}
      <div className="gold-divider mb-16" />

      {/* Background Orbs */}
      <div className="orb orb-gold w-[400px] h-[400px] -bottom-40 -left-40 opacity-20" />
      <div className="orb orb-blue w-[300px] h-[300px] -bottom-20 right-10 opacity-15" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-lg glass-gold flex items-center justify-center">
                <Scale className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <div className="font-serif text-white text-sm font-semibold">Garg Associates</div>
                <div className="text-[10px] text-gold-500 tracking-widest uppercase">Law Firm</div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Over two decades of delivering justice with integrity, strategy, and unwavering commitment to our clients.
            </p>
            <div className="flex gap-3">
              {[Link2, MessageSquare, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/50 text-sm hover:text-gold-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-5 text-sm uppercase tracking-widest">Practice Areas</h4>
            <ul className="space-y-3">
              {practiceAreas.map((area) => (
                <li key={area.label}>
                  <Link
                    to={area.path}
                    className="text-white/50 text-sm hover:text-gold-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-5 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed">
                  Chambers No. XXX, Delhi High Court Complex,<br />New Delhi – 110003
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="tel:+91XXXXXXXXXX" className="text-white/50 text-sm hover:text-gold-400 transition-colors">
                  +91-XXXXXXXXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="mailto:info@gargassociates.in" className="text-white/50 text-sm hover:text-gold-400 transition-colors">
                  info@gargassociates.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="gold-divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Sudhir Garg & Namita Garg – Law Firm. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Bar Council Reg. No. XXXXXXXXXX | Delhi High Court
          </p>
        </div>
      </div>
    </footer>
  );
}
