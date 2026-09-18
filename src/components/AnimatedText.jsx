import { motion } from 'framer-motion';

const EASE = [0.19, 1, 0.22, 1];

/**
 * Word-by-word masked reveal. Each word rides up out of its own clipping box,
 * which reads much cleaner than a plain fade for large display type.
 */
export function RevealText({
  text,
  as = 'span',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
  once = true,
  amount = 0.4,
}) {
  const Tag = motion[as] ?? motion.span;
  const words = String(text).split(' ');

  return (
    <Tag
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: '110%', opacity: 0, rotate: 2 },
              visible: { y: '0%', opacity: 1, rotate: 0 },
            }}
            transition={{ duration, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Character-level reveal — used for the hero name only, where it earns the cost.
 *
 * `active` gates the reveal instead of a long delay: framer-motion only
 * restarts an animation when the *target* changes, so deferring the start with
 * a large `delay` would leave the original schedule running.
 */
export function CharReveal({ text, className = '', delay = 0, stagger = 0.034, active = true }) {
  const chars = String(text).split('');
  return (
    <span className={`inline-flex ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <span key={`${char}-${i}`} className="inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '115%', opacity: 0 }}
            animate={active ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
            transition={{ duration: 1.05, ease: EASE, delay: active ? delay + i * stagger : 0 }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Fade + lift for blocks of body copy and cards. */
export function FadeIn({
  children,
  className = '',
  delay = 0,
  y = 26,
  duration = 0.8,
  once = true,
  amount = 0.3,
  as = 'div',
}) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Parent/child pair for staggered lists. */
export const staggerParent = (stagger = 0.08, delay = 0) => ({
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.25 },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  },
});

export const staggerChild = {
  variants: {
    hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  transition: { duration: 0.72, ease: EASE },
};

export { EASE };
