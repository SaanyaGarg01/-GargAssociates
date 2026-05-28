import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Scale, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
  time: string;
}

const quickReplies = [
  'Book a consultation',
  'What are your fees?',
  'Property law help',
  'Criminal defense',
  'Family law advice',
];

const botResponses: Record<string, string> = {
  'book': 'You can book a consultation directly on our Contact page. We offer free 30-minute initial consultations. Click here: /contact',
  'fee': 'Initial consultations: ₹2,000 (30 min) or ₹3,500 (60 min). Detailed representation fees are discussed during the consultation based on your specific matter.',
  'property': 'Our property law team handles title verification, RERA disputes, registration matters, and property litigation at all court levels. Would you like to schedule a consultation?',
  'criminal': 'Adv. Sudhir Garg has over 25 years of criminal law experience, handling bail applications, trial defense, and appeals. Every case is handled with complete confidentiality.',
  'family': 'Adv. Namita Garg specializes in divorce, custody, maintenance, and matrimonial disputes with exceptional empathy and legal precision.',
  'default': 'Thank you for reaching out to Garg Associates. For immediate assistance, please call +91-XXXXXXXXXX or book a consultation through our Contact page. One of our legal experts will be happy to help.',
};

function getBotResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('book') || lower.includes('consult') || lower.includes('appointment')) return botResponses['book'];
  if (lower.includes('fee') || lower.includes('cost') || lower.includes('charge') || lower.includes('price')) return botResponses['fee'];
  if (lower.includes('property') || lower.includes('rera') || lower.includes('land')) return botResponses['property'];
  if (lower.includes('criminal') || lower.includes('bail') || lower.includes('fir') || lower.includes('arrest')) return botResponses['criminal'];
  if (lower.includes('family') || lower.includes('divorce') || lower.includes('custody') || lower.includes('matrimon')) return botResponses['family'];
  return botResponses['default'];
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Welcome to Garg Associates! 👋 I\'m your legal AI assistant. How can I help you today?',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const response = getBotResponse(text);
      setMessages((prev) => [...prev, { role: 'bot', text: response, time: getTime() }]);
    }, 1200 + Math.random() * 600);
  };

  return (
    <div className="chat-widget">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center shadow-2xl glow-gold ml-auto"
        style={{ boxShadow: '0 8px 32px rgba(201, 168, 76, 0.5)' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-navy-950" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-navy-950" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!open && (
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-navy-950 animate-pulse" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-16 right-0 w-80 md:w-96 glass-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.1)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy-800 to-navy-700 p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 glass-gold rounded-xl flex items-center justify-center">
                  <Scale className="w-5 h-5 text-gold-400" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">Garg AI Assistant</div>
                  <div className="flex items-center gap-1.5 text-xs text-green-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online – Responds instantly
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-navy-950/80" data-lenis-prevent>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gold-gradient text-navy-950 font-medium rounded-br-sm'
                        : 'glass border border-white/5 text-white/80 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                    <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-navy-700' : 'text-white/30'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="glass border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-gold-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto">
              {quickReplies.slice(0, 3).map((r) => (
                <button
                  key={r}
                  onClick={() => sendMessage(r)}
                  className="shrink-0 text-xs text-gold-400 border border-gold-500/30 rounded-full px-3 py-1 hover:bg-gold-500/10 transition-colors"
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 flex gap-2 bg-navy-900/50">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask a legal question..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-gold-500/50 transition-colors"
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4 text-navy-950" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
