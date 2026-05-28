import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/layout/LoadingScreen';
import CursorEffect from './components/layout/CursorEffect';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ChatWidget from './components/ai/ChatWidget';
import { useLenis } from './hooks/useLenis';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-navy-950">
      <CursorEffect />
      <LoadingScreen />
      <Navbar />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 glass-gold rounded-2xl animate-float flex items-center justify-center">
              <span className="text-gold-400 text-2xl">⚖️</span>
            </div>
          </div>
        }
      >
        <AnimatedRoutes />
      </Suspense>
      <Footer />

      {/* Floating widgets */}
      <WhatsAppButton />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
