import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProjects from '../MyProjects/MyProjects';
import Card from '../Card/Card';
import Skills from '../../Skills/Skills';
import HeroSection from './HeroSection';
import EducationSection from './EducationSection';
import ContactSection from './ContactSection';
import ScrollToTopButton from './ScrollToTopButton';
const Banner = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  // Effects
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
          <div className="h-200 bg-gray-800 animate-pulse rounded"></div>
          <div className="h-200 bg-gray-800 animate-pulse rounded"></div>
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