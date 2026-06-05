/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { DesignCandidate as Candidate, BadgeVariant } from '@/types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import {
  TypographySection,
  ColorsSection,
  ButtonsSection,
  FormSection,
  BadgesSection,
  DataDisplaySection,
} from './components/DesignSystemSections';

export default function App() {
  const [activeSection, setActiveSection] = useState('typography');
  const [selectedFilter, setSelectedFilter] = useState<BadgeVariant | 'all'>('all');

  // Populate actual candidates from Image 1 representation
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Elena Rodriguez',
      role: 'Lead Frontend Engineer',
      experience: '8 years exp',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCq27DZ1kf0VxQp4b7AjPLLD6RrxK_ZtfSJyXy4t1H59YbGmTHu2DLidS5BdeuBljw4XlrqNrOA-wjUk786uLp8lOOGBpW5hyNfESi68dKamSkQ08pFozIprYuutDLz27ratushwNI53nj3m8KEEAsrJgYt7GOnagWNZhJSb9sqcDvLDHTRFP_DqYoGNyq2x5BU_DRugOFglM6yNy03FFdOfLv-mUJr8svpNewCVTxxKwLPa9XD4cGmgPbvWehOhIsB25lLKYr_R2A',
      score: 9.4,
      status: 'New',
      stage: 'applied',
      source: 'Ref',
    },
    {
      id: '2',
      name: 'Marcus Kinsley',
      role: 'Product Manager',
      experience: '5 years exp',
      score: 8.9,
      status: 'Tech Interview',
      stage: 'interview',
      source: 'Job Board',
    },
    {
      id: '3',
      name: 'Julia Tan',
      role: 'Backend Dev',
      experience: '4 years exp',
      score: 9.1,
      status: 'Offer Extended',
      stage: 'hired',
      source: 'Direct',
    },
  ]);

  // Handle active navigation scrolling trigger
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Run IntersectionObserver on sections to sync Sidebar highlights
  useEffect(() => {
    const sections = ['typography', 'colors', 'buttons', 'forms', 'badges', 'data'];
    const observers = sections.map((secId) => {
      const element = document.getElementById(secId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(secId);
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px', // Trigger when section is in active sweet spot
          threshold: 0,
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  // Action to add candidate
  const handleAddCandidate = (newCandidateData: Omit<Candidate, 'id'>) => {
    const newCandidate: Candidate = {
      ...newCandidateData,
      id: String(Date.now()),
    };
    setCandidates((prev) => [newCandidate, ...prev]);
  };

  // Action to delete candidate
  const handleDeleteCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((item) => item.id !== id));
  };

  // Computed filter candidates
  const filteredCandidates = candidates.filter((cand) => {
    if (selectedFilter === 'all') return true;
    return cand.stage === selectedFilter;
  });

  return (
    <div id="hireflow-root" className="min-h-screen bg-[#f9f9ff] text-[#111c2d] font-sans antialiased selection:bg-[#0058bc]/10 selection:text-[#0058bc]">
      {/* Dynamic Top Header */}
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Navigation Drawer */}
        <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Content Explorer wrapper */}
        <main className="flex-1 px-4 sm:px-6 md:px-12 py-6 md:py-10 overflow-x-hidden w-full">
          {/* Main system header */}
          <header className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-2 bg-[#e7eeff] text-[#0058bc] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full w-max shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hireflow Specs v1.0.3</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.1, duration: 0.4 }}
              className="font-sans font-bold text-4xl sm:text-5xl text-[#111c2d] mb-1.5 tracking-tight"
            >
              Design System
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-sm sm:text-base text-[#414755] max-w-2xl font-medium leading-relaxed"
            >
              A premium, intelligent, and calm recruitment interface. Built with precision and cognitive ease at its core. Feel free to interact with any element!
            </motion.p>
          </header>

          {/* Interactive display components */}
          <div className="space-y-4">
            <TypographySection />
            <ColorsSection />
            <ButtonsSection />
            <FormSection onAddCandidate={handleAddCandidate} />
            
            <BadgesSection 
              selectedFilter={selectedFilter} 
              onFilterChange={(filter) => setSelectedFilter(filter)} 
            />

            <DataDisplaySection 
              candidates={filteredCandidates} 
              onDeleteCandidate={handleDeleteCandidate}
              onFilterChange={(filter) => setSelectedFilter(filter)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
