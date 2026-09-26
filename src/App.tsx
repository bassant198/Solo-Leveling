/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SystemStatus } from './components/SystemStatus';
import { CharacterGallery } from './components/CharacterGallery';
import { ShadowArmy } from './components/ShadowArmy';
import { GateSystem } from './components/GateSystem';
import { QuestSystem } from './components/QuestSystem';
import { EpisodeSection } from './components/EpisodeSection';
import { HunterProfile } from './components/HunterProfile';
import { Footer } from './components/Footer';
import { SystemArchiveModal } from './components/SystemArchiveModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [archiveOpen, setArchiveOpen] = useState(false);

  // Hard failsafe: if loading screen is still visible after 5 seconds, force it to disappear
  useEffect(() => {
    const failsafeTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(failsafeTimer);
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03040A] text-[#F4F7FF] selection:bg-[#5B4BFF]/40 selection:text-white">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Cinematic System Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Top Bar Navigation */}
      <Navbar
        onAriseClick={() => scrollToSection('hunter-profile')}
        onOpenArchive={() => setArchiveOpen(true)}
      />

      {/* Global System Archive Modal with Canon Search & Filter */}
      <SystemArchiveModal
        isOpen={archiveOpen}
        onClose={() => setArchiveOpen(false)}
      />

      {/* Global Cinematic System Sections */}
      <main className="relative w-full">
        {/* Hero Section */}
        <Hero
          onEnterSystem={() => scrollToSection('status')}
          onExploreShadows={() => scrollToSection('shadow-army')}
        />

        {/* Player Status Section */}
        <SystemStatus />

        {/* Character Database */}
        <CharacterGallery />

        {/* Shadow Army Summoning Experience */}
        <ShadowArmy />

        {/* Gate Anomalies & S-Rank Red Gate */}
        <GateSystem />

        {/* Daily Quests Conditioning */}
        <QuestSystem />

        {/* Hunter Profile Awakening Generator */}
        <HunterProfile />

        {/* Animated Chronicles / Episode Section */}
        <EpisodeSection />
      </main>

      {/* System Offline / Footer */}
      <Footer />
    </div>
  );
}
