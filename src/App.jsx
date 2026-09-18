import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { destroySmoothScroll, initSmoothScroll, setScrollLock } from './lib/scroll';
import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Stack from './components/Stack';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    initSmoothScroll();
    setScrollLock(true);
    return () => destroySmoothScroll();
  }, []);

  const handleIntroDone = useCallback(() => {
    setScrollLock(false);
    setReady(true);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <ScrollProgress />
      <Preloader onDone={handleIntroDone} />

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-accent-deep focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to projects
      </a>

      <Navbar ready={ready} />

      <main className="relative">
        <Hero ready={ready} />
        <About />
        <Projects />
        <Stack />
        <Education />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
