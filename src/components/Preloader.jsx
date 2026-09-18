import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../data/site';
import { EASE } from './AnimatedText';

/**
 * Short intro curtain: a counter runs to 100 while the name sets, then the
 * panel lifts away. Capped so it never becomes a wall in front of the content.
 */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);
  const [removed, setRemoved] = useState(false);
  const settled = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCount(100);
      setOpen(false);
      setRemoved(true);
      onDone?.();
      return;
    }

    const total = 1150;
    const start = performance.now();
    let frame = null;
    const timers = [];

    /* Runs once, whether the rAF loop got there or the backstop did. */
    const settle = () => {
      if (settled.current) return;
      settled.current = true;
      setCount(100);
      timers.push(setTimeout(() => setOpen(false), 170));
      // hand off early so the hero reveals *while* the curtain lifts
      timers.push(setTimeout(() => onDone?.(), 620));
      // hard removal: the exit transition also needs frames, so don't let a
      // suspended tab leave the curtain mounted over the page
      timers.push(setTimeout(() => setRemoved(true), 1400));
    };

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / total);
      setCount(Math.round((1 - Math.pow(1 - progress, 2.1)) * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else settle();
    };

    frame = requestAnimationFrame(tick);

    /* Browsers suspend requestAnimationFrame in background tabs, so the
       curtain must never depend on frames alone to get out of the way. */
    timers.push(setTimeout(settle, total + 220));

    return () => {
      if (frame) cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [onDone]);

  if (removed) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-paper px-[var(--shell-x)] py-10"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_120%,rgba(228,91,50,0.12),transparent_70%)]" />
          <div className="noise-layer absolute inset-0 opacity-[0.06]" />

          <motion.div
            className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-graphite/65"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <span>{site.initials} — Portfolio</span>
            <span className="hidden sm:inline">{site.location}</span>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.h1
                className="text-[clamp(2.4rem,9vw,7rem)] font-semibold leading-[0.95] tracking-ultra-tight text-graphite"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.15, ease: EASE, delay: 0.16 }}
              >
                {site.name}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.p
                className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-ink sm:text-xs"
                initial={{ y: '120%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: EASE, delay: 0.38 }}
              >
                Full Stack Developer · AI/ML
              </motion.p>
            </div>
          </div>

          <div className="relative flex items-end justify-between gap-6">
            <motion.div
              className="h-[2px] flex-1 origin-left bg-gradient-to-r from-accent via-accent-deep to-accent-blue"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
            <span className="font-display text-[clamp(1.6rem,5vw,3rem)] font-light tabular-nums leading-none text-graphite/90">
              {String(count).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
