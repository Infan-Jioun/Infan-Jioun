'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import 'react-toastify/dist/ReactToastify.css';
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
        console.log(data)
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
    <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-14">
      <HeroSection
        loading={loading}
        onScrollToForm={scrollToForm}
      />
      <div id="myProjects" className="mt-16">
        <MyProjects projects={projects} loading={loading} />
      </div>
      <div id="skills" className="mt-16">
        <Skills />
      </div>
      <EducationSection loading={loading} />
      <ContactSection formRef={formRef} loading={loading} />
    </div>
  );
};

export default Banner;