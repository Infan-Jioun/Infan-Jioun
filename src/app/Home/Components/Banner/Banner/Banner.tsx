'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowUp } from 'lucide-react';
import HeroSection from '../Components/HeroSection';
import MyProjects from '../Components/MyProjects';
import Skills from '../Components/Skills';
import EducationSection from '../Components/EducationSection';
import ContactSection from '../Components/ContactSection';
import { Project } from '@/app/types/project';

const Banner = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Container with Flex Column and strict gap spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col gap-20 sm:gap-28 relative z-10">

        {/* Hero Section */}
        <section className="relative w-full z-10">
          <HeroSection
            loading={loading}
            onScrollToForm={scrollToForm}
          />
        </section>

        {/* My Projects Section */}
        <section id="myProjects" className="relative w-full z-10 block clear-both">
          <MyProjects projects={projects} loading={loading} />
        </section>

        {/* Skills Section */}
        <section id="skills" className="relative w-full z-10 block clear-both">
          <Skills />
        </section>

        {/* Education Section */}
        <section className="relative w-full z-10 block clear-both">
          <EducationSection loading={loading} />
        </section>

        {/* Contact Section */}
        <section className="relative w-full z-10 block clear-both">
          <ContactSection formRef={formRef} loading={loading} />
        </section>

      </div>

      {/* Floating Scroll To Top Button */}
      {/* {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 active:scale-95 border border-white/20"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )} */}
    </main>
  );
};

export default Banner;