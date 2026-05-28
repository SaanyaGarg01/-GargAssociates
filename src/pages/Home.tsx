import { useEffect } from 'react';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import TimelineSection from '../components/sections/TimelineSection';
import CTASection from '../components/sections/CTASection';

export default function Home() {
  useEffect(() => {
    document.title = 'Sudhir Garg & Namita Garg – Law Firm | Justice. Integrity. Results.';
  }, []);

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <TimelineSection />
      <CTASection />
    </main>
  );
}
