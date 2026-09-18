import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-gradient-to-r from-accent via-accent-deep to-accent-blue shadow-[0_0_10px_rgba(201,74,39,0.3)]"
    />
  );
}
