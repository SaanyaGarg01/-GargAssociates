import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp, Send, Calendar, Check, Globe } from 'lucide-react';
import { faqs } from '../data';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIMES = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

type Lang = 'en' | 'hi';

const copy: Record<Lang, { title: string; subtitle: string; name: string; email: string; phone: string; message: string; send: string; }> = {
  en: {
    title: 'Book a Consultation',
    subtitle: "Tell us about your legal matter and we'll get back to you within 2 business hours.",
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    message: 'Describe your legal matter briefly...',
    send: 'Send Message',
  },
  hi: {
    title: 'परामर्श बुक करें',
    subtitle: 'अपना कानूनी मामला बताएं और हम 2 व्यावसायिक घंटों में संपर्क करेंगे।',
    name: 'पूरा नाम',
    email: 'ईमेल पता',
    phone: 'फोन नंबर',
    message: 'अपने कानूनी मामले का संक्षिप्त विवरण दें...',
    send: 'संदेश भेजें',
  },
};

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={`glass rounded-2xl border transition-all duration-300 ${
        open ? 'border-gold-500/30' : 'border-white/5 hover:border-gold-500/15'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className={`font-sans text-sm font-medium transition-colors duration-300 ${open ? 'text-gold-300' : 'text-white'}`}>
          {faq.question}
        </span>
        <div className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${open ? 'bg-gold-500/20 text-gold-400' : 'bg-white/5 text-white/40'}`}>
          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-white/55 text-sm leading-relaxed border-t border-gold-500/10 pt-4">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const [lang, setLang] = useState<Lang>('en');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  useEffect(() => {
    document.title = 'Contact Us – Sudhir Garg & Namita Garg Law Firm';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const t = copy[lang];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden hero-bg">
        <div className="orb orb-gold w-[400px] h-[400px] -top-20 right-10 opacity-15" />
        <div className="container-custom relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-12">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="tag mb-5">
                Get In Touch
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="section-title"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                Begin Your
                <br />
                <span className="gold-text">Legal Journey</span>
              </motion.h1>
            </div>
            {/* Language toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 glass rounded-full px-4 py-2 border border-white/10"
            >
              <Globe className="w-4 h-4 text-white/40" />
              <button
                onClick={() => setLang('en')}
                className={`text-sm px-2 py-0.5 rounded-full transition-all ${lang === 'en' ? 'text-gold-400 font-semibold' : 'text-white/40'}`}
              >
                EN
              </button>
              <div className="w-px h-4 bg-white/20" />
              <button
                onClick={() => setLang('hi')}
                className={`text-sm px-2 py-0.5 rounded-full transition-all ${lang === 'hi' ? 'text-gold-400 font-semibold' : 'text-white/40'}`}
              >
                हिंदी
              </button>
            </motion.div>
          </div>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Phone, label: 'Call Us', value: '+91-XXXXXXXXXX', sub: 'Mon–Sat, 10AM–6PM' },
              { icon: Mail, label: 'Email Us', value: 'info@gargassociates.in', sub: 'Reply within 2 hours' },
              { icon: MapPin, label: 'Visit Us', value: 'Delhi High Court Complex', sub: 'New Delhi – 110003' },
            ].map(({ icon: Icon, label, value, sub }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-gold rounded-2xl p-5 border border-gold-500/20 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-0.5">{label}</div>
                  <div className="text-white font-semibold text-sm">{value}</div>
                  <div className="text-white/40 text-xs">{sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Calendar + FAQ */}
      <section className="section-padding relative overflow-hidden bg-navy-900">
        <div className="gold-divider absolute top-0 left-0 right-0" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-2xl font-bold text-white mb-2">{t.title}</h2>
              <p className="text-white/50 text-sm mb-8">{t.subtitle}</p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-gold rounded-2xl p-10 text-center border border-green-400/30"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-400/15 border border-green-400/30 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm">We'll get back to you within 2 business hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {[
                      { key: 'name', label: t.name, type: 'text', placeholder: t.name },
                      { key: 'email', label: t.email, type: 'email', placeholder: t.email },
                      { key: 'phone', label: t.phone, type: 'tel', placeholder: t.phone },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">{label}</label>
                        <input
                          type={type}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                          placeholder={placeholder}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-gold-500/50 focus:bg-gold-500/5 transition-all duration-300"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">Practice Area</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 outline-none focus:border-gold-500/50 transition-all duration-300"
                        style={{ backgroundColor: 'rgba(10,15,30,0.9)' }}
                      >
                        <option value="">Select a practice area</option>
                        {['Civil Law', 'Criminal Law', 'Family Law', 'Property Law', 'Corporate Law', 'Cyber Law', 'Consumer Cases', 'Arbitration'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">{t.message.slice(0, 7)}</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder={t.message}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-gold-500/50 focus:bg-gold-500/5 transition-all duration-300 resize-none"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center">
                      <Send className="w-4 h-4" />
                      <span>{t.send}</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Calendar + Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Calendar */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-5">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <h3 className="text-white font-semibold text-sm">Select Appointment Slot</h3>
                </div>

                {/* Day selector */}
                <div className="mb-4">
                  <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Day (This Week)</p>
                  <div className="grid grid-cols-6 gap-2">
                    {DAYS.map((d) => (
                      <button
                        key={d}
                        onClick={() => setSelectedDay(d)}
                        className={`py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                          selectedDay === d
                            ? 'bg-gold-gradient text-navy-950 font-bold'
                            : 'glass border border-white/10 text-white/50 hover:border-gold-500/30 hover:text-white/80'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time selector */}
                <div>
                  <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Time</p>
                  <div className="grid grid-cols-3 gap-2">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                          selectedTime === t
                            ? 'bg-gold-gradient text-navy-950 font-bold'
                            : 'glass border border-white/10 text-white/50 hover:border-gold-500/30 hover:text-white/80'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDay && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 glass-gold rounded-xl p-3 border border-gold-500/25 text-sm text-gold-300 text-center"
                  >
                    ✓ Slot selected: <strong>{selectedDay}</strong> at <strong>{selectedTime}</strong>
                  </motion.div>
                )}
              </div>

              {/* Map */}
              <div className="glass rounded-2xl overflow-hidden border border-white/5 h-56">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9!2d77.2401!3d28.6328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sDelhi%20High%20Court!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(0.85) hue-rotate(200deg) saturate(0.4) brightness(0.7)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Office hours */}
              <div className="glass rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-gold-400" />
                  <h3 className="text-white font-semibold text-sm">Office Hours</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { day: 'Monday – Friday', time: '10:00 AM – 6:00 PM' },
                    { day: 'Saturday', time: '10:00 AM – 2:00 PM' },
                    { day: 'Sunday', time: 'Closed' },
                  ].map(({ day, time }) => (
                    <div key={day} className="flex justify-between items-center text-sm">
                      <span className="text-white/50">{day}</span>
                      <span className={time === 'Closed' ? 'text-red-400/70' : 'text-gold-400'}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="tag mb-5 justify-center inline-flex">FAQ</div>
              <h2 className="section-title">Common <span className="gold-text">Questions</span></h2>
            </motion.div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={faq.question} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
