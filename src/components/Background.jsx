import { useEffect } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { usePointerFine } from '../hooks/useMediaQuery';

/**
 * Fixed atmosphere behind the whole page: drifting gradient orbs with pointer
 * parallax, a grid, film grain and a vignette.
 *
 * Performance notes: every scroll-driven value here animates `transform` only.
 * Filters (hue-rotate), background-position and blend modes were deliberately
 * avoided — they force a full-viewport repaint on every scroll frame.
 */
export default function Background() {
  const fine = usePointerFine();
  const { scrollYProgress } = useScroll();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 40, damping: 22 });
  const smy = useSpring(my, { stiffness: 40, damping: 22 });

  useEffect(() => {
    if (!fine) return;
    let frame = null;
    const onMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        mx.set(event.clientX / window.innerWidth);
        my.set(event.clientY / window.innerHeight);
        frame = null;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, [fine, mx, my]);

  const orbAX = useTransform(smx, [0, 1], [-54, 54]);
  const orbAY = useTransform(smy, [0, 1], [-38, 38]);
  const orbBX = useTransform(smx, [0, 1], [44, -44]);
  const orbBY = useTransform(smy, [0, 1], [30, -30]);

  const driftY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      {/* base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_-10%,#FBF9F3_0%,#F5F2EA_45%,#EFEAE0_100%)]" />

      {/* drifting colour orbs — own compositor layers, transform-only motion */}
      <motion.div style={{ y: driftY }} className="absolute inset-0">
        <motion.div
          style={{ x: orbAX, y: orbAY, willChange: 'transform' }}
          className="absolute -left-[12%] -top-[14%] h-[46vw] w-[46vw] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(228,91,50,0.13),transparent_62%)] blur-[48px]"
        />
        <motion.div
          style={{ x: orbBX, y: orbBY, willChange: 'transform' }}
          className="absolute -right-[14%] top-[6%] h-[42vw] w-[42vw] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(58,110,165,0.10),transparent_62%)] blur-[52px] [animation-delay:-5s]"
        />
        <div className="absolute bottom-[-18%] left-[22%] h-[40vw] w-[40vw] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(201,74,39,0.08),transparent_64%)] blur-[56px] [animation-delay:-9s]" />
      </motion.div>

      {/* grid — translated, never repainted */}
      <motion.div
        style={{ y: gridY, willChange: 'transform' }}
        className="grid-layer absolute inset-x-0 -top-[10vh] h-[210vh] opacity-50 [mask-image:linear-gradient(to_bottom,#000_0%,transparent_78%)]"
      />

      {/* horizon glow line */}
      <div className="absolute left-1/2 top-[86vh] h-px w-[140vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

      {/* film grain */}
      <div className="noise-layer absolute inset-0 opacity-[0.045]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_45%,transparent_40%,rgba(211,203,186,0.5)_100%)]" />
    </div>
  );
}
