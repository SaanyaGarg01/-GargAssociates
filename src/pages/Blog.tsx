import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { blogPosts } from '../data';
import { useScrollProgress } from '../hooks/useScrollProgress';
import CTASection from '../components/sections/CTASection';
import VideoBackground from '../components/ui/VideoBackground';

const categories = ['All', 'Corporate Law', 'Cyber Law', 'Family Law', 'Property Law', 'Criminal Law'];

export default function Blog() {
  const [filter, setFilter] = useState('All');
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const progress = useScrollProgress();

  useEffect(() => {
    document.title = 'Legal Blog – Sudhir Garg & Namita Garg Law Firm';
  }, []);

  const filtered = filter === 'All' ? blogPosts : blogPosts.filter((p) => p.category === filter);
  const featured = blogPosts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || filter !== 'All');

  return (
    <main className="pt-24">
      {/* Reading progress bar */}
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
      />

      {/* Hero */}
      <section className="section-padding relative overflow-hidden hero-bg">
        <VideoBackground
          localSrc="/videos/library.mp4"
          fallbackSrc="https://images.pexels.com/video-files/3760070/3760070-hd_1920_1080_24fps.mp4"
          overlayOpacity={0.6}
        />
        <div className="orb orb-blue w-[400px] h-[400px] -top-20 -left-20 opacity-15" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tag mb-6 justify-center inline-flex"
          >
            Legal Insights
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            The <span className="gold-text">Legal Brief</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto text-center text-white/60 max-w-2xl"
          >
            Expert legal commentary, landmark case analyses, and regulatory updates from the partners at Garg Associates.
          </motion.p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && filter === 'All' && (
        <section className="relative overflow-hidden bg-navy-900 px-6 md:px-12 lg:px-24 pt-16 pb-0">
          <div className="gold-divider absolute top-0 left-0 right-0" />
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative glass-gold rounded-3xl p-8 md:p-12 border border-gold-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_50%,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <div className="tag">Featured</div>
                  <span className="text-gold-500 text-xs">{featured.category}</span>
                  <span className="text-white/30 text-xs">{featured.date}</span>
                  <span className="flex items-center gap-1 text-white/30 text-xs">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-5 leading-tight max-w-3xl">
                  {featured.title}
                </h2>
                <p className="text-white/60 leading-relaxed max-w-2xl mb-8">{featured.excerpt}</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-serif font-bold text-navy-950 text-sm">
                      SG
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{featured.author}</div>
                      <div className="text-white/30 text-xs">Founding Partner</div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedPost(featured)} className="btn-outline text-xs px-5 py-2.5">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter Tabs */}
      <section className="pt-12 pb-0 bg-navy-900">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gold-gradient text-navy-950'
                    : 'glass border border-white/10 text-white/50 hover:border-gold-500/30 hover:text-white/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-navy-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                onClick={() => setSelectedPost(post)}
                className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/25 group card-hover cursor-pointer"
              >
                {/* Color bar */}
                <div className={`h-1 bg-gold-gradient`} />

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="tag text-[10px] px-2 py-0.5">{post.category}</span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-white leading-snug mb-3 group-hover:text-gold-300 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed mb-5">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gold-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-gold rounded-3xl p-8 border border-gold-500/25 z-10 flex flex-col"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                ✕
              </button>
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
                <span className="tag">{selectedPost.category}</span>
                <span className="text-gold-400">{selectedPost.date}</span>
                <span className="text-white/40">{selectedPost.readTime}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6 leading-snug pr-8">
                {selectedPost.title}
              </h2>
              <div className="text-white/70 text-sm md:text-base leading-relaxed space-y-5 pr-2 mb-8">
                {selectedPost.content?.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-serif font-bold text-navy-950 text-sm">
                  {selectedPost.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{selectedPost.author}</div>
                  <div className="text-white/30 text-xs">Author & Partner</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CTASection />
    </main>
  );
}
