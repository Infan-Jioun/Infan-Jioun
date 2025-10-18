'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Card as UICard, CardContent } from '@/components/ui/card';
import HeroSection from '../Components/HeroSection';
import Skeleton from '../Components/Skeleton';
import Card from '../Components/Card';
import MyProjects from '../Components/MyProjects';
import EducationSection from '../Components/EducationSection';
import ContactSection from '../Components/ContactSection';
import ScrollToTopButton from '../Components/ScrollToTopButton';
import Skills from '../Components/Skills';

const Banner = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Event handlers
  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-14">
      {/* Hero Section */}
      <HeroSection
        loading={loading}
        onScrollToForm={scrollToForm}
      />

      {loading ? (
        <div className="mt-12 space-y-8">
          <UICard className="w-full h-48 bg-gray-800 border-none">
            <CardContent className="p-0">
              <Skeleton className="h-full w-full bg-gray-700" />
            </CardContent>
          </UICard>
          <UICard className="w-full h-48 bg-gray-800 border-none">
            <CardContent className="p-0">
              <Skeleton className="h-full w-full bg-gray-700" />
            </CardContent>
          </UICard>
        </div>
      ) : (
        <>
          <Card />
          <div id='myProjects' className="mt-16">
            <MyProjects />
          </div>
        </>
      )}

      <div id="skills" className="mt-16">
        <Skills />
      </div>

      <EducationSection loading={loading} />
      <ContactSection formRef={formRef} loading={loading} />
      <ScrollToTopButton showScroll={showScroll} onScrollToTop={scrollToTop} />
    </div>
  );
};

export default Banner;