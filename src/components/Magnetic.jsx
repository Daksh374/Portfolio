import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePointerFine } from '../hooks/useMediaQuery';

/**
 * Magnetic wrapper: the child drifts toward the pointer while it is inside
 * the element, then springs back on leave. Disabled for touch pointers.
 */
export function Magnetic({ children, strength = 0.35, className = '', as = 'div' }) {
  const ref = useRef(null);
  const fine = usePointerFine();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 210, damping: 18, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 210, damping: 18, mass: 0.45 });

  const handleMove = (event) => {
    if (!fine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Subtle pointer-follow tilt for large cards / mockups. */
export function Tilt({ children, className = '', max = 7 }) {
  const ref = useRef(null);
  const fine = usePointerFine();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 140, damping: 20 });
  const spy = useSpring(py, { stiffness: 140, damping: 20 });

  const rotateY = useTransform(spx, [0, 1], [-max, max]);
  const rotateX = useTransform(spy, [0, 1], [max, -max]);
  const handleMove = (event) => {
    if (!fine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1400 }}
      className={`group relative preserve-3d ${className}`}
    >
      {children}
    </motion.div>
  );
}
