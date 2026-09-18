import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { site, metrics } from '../data/site';
import { scrollToTarget } from '../lib/scroll';
import { CharReveal, EASE, FadeIn } from './AnimatedText';
import { PrimaryButton, GhostButton, ResumeButton } from './ui';
import { Magnetic } from './Magnetic';

/* Rotating role line under the name. */
function RoleRotator({ roles, delay = 1.5 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      className="relative block h-[1.6em] w-full max-w-[26rem] overflow-hidden"
    >
      {roles.map((role, i) => (
        <motion.span
          key={role}
          className="absolute left-0 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink sm:text-xs"
          animate={
            index === i
              ? { y: '0%', opacity: 1 }
              : { y: index > i ? '-120%' : '120%', opacity: 0 }
          }
          transition={{ duration: 0.6, ease: EASE }}
        >
          {role}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero({ ready }) {
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.18], ['0%', '26%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const auraY = useTransform(scrollYProgress, [0, 0.25], [0, 120]);

  const base = 0.1; // each child gates on `ready`, so no sentinel delay is needed

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* local hero atmosphere */}
      <motion.div
        style={{ y: auraY, willChange: 'transform' }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[1]"
      >
        <div className="dot-layer absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(75%_60%_at_50%_40%,#000,transparent)]" />
        <div className="absolute left-1/2 top-1/2 h-[64vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(228,91,50,0.10),rgba(58,110,165,0.08),rgba(228,91,50,0.10))] blur-[44px] animate-spin-slow [will-change:transform]" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="shell relative">
        {/* status row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: base }}
          className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <span className="ring-gradient glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-success animate-pulse-ring" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-graphite/70">
              Open to opportunities
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-graphite/65">
            <MapPin className="h-3 w-3" /> {site.location}
          </span>
        </motion.div>

        {/* name */}
        <h1 className="font-display text-[clamp(2.9rem,10.5vw,9.5rem)] font-semibold leading-[0.9] tracking-ultra-tight text-graphite">
          <span className="block">
            <CharReveal text="Daksh" active={ready} delay={base} />
          </span>
          <span className="block">
            <span className="relative inline-block">
              <span
                className="inline-block overflow-hidden align-bottom"
                style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
              >
                <motion.span
                  className="text-gradient inline-block"
                  initial={{ y: '115%' }}
                  animate={ready ? { y: '0%' } : {}}
                  transition={{ duration: 1.1, ease: EASE, delay: base + 0.14 }}
                >
                  Yadav
                </motion.span>
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={ready ? { scaleX: 1 } : {}}
                transition={{ duration: 1.1, ease: EASE, delay: base + 0.34 }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-accent via-accent-deep to-transparent"
              />
            </span>
          </span>
        </h1>

        {/* role + tagline */}
        <div className="mt-7 flex flex-col gap-8 lg:mt-9 xl:flex-row xl:items-end xl:justify-between xl:gap-14">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              <RoleRotator roles={site.roles} delay={base + 0.6} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: base + 0.34 }}
              className="font-display text-[clamp(1.25rem,2.6vw,2rem)] font-light leading-[1.25] tracking-tight text-graphite/90"
            >
              Building digital products that{' '}
              <span className="relative text-graphite">
                solve real problems
                <span className="absolute inset-x-0 -bottom-0.5 h-[6px] -z-10 bg-accent/25 blur-[3px]" />
              </span>
              .
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: base + 0.44 }}
              className="mt-5 max-w-lg text-[15px] leading-relaxed text-graphite/65"
            >
              {site.intro}
            </motion.p>

            {/* actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: base + 0.54 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <PrimaryButton
                as="a"
                href="#work"
                size="lg"
                icon={ArrowUpRight}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget('#work', { offset: -10 });
                }}
              >
                View Projects
              </PrimaryButton>
              <ResumeButton variant="ghost" size="lg" />
              <GhostButton
                as="a"
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                size="lg"
                icon={GithubIcon}
                aria-label="GitHub profile (opens in a new tab)"
                className="!px-4"
              >
                <span className="sr-only">GitHub</span>
              </GhostButton>
              <GhostButton
                as="a"
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                size="lg"
                icon={LinkedinIcon}
                aria-label="LinkedIn profile (opens in a new tab)"
                className="!px-4"
              >
                <span className="sr-only">LinkedIn</span>
              </GhostButton>
            </motion.div>
          </div>

          {/* metric stack */}
          <motion.ul
            initial="hidden"
            animate={ready ? 'visible' : 'hidden'}
            transition={{ staggerChildren: 0.1, delayChildren: base + 0.62 }}
            className="grid w-full max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-cream/70 sm:max-w-lg xl:max-w-[340px]"
          >
            {metrics.map((metric) => (
              <motion.li
                key={metric.label}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: EASE }}
                className="group relative bg-paper/40 p-4 transition-colors duration-400 hover:bg-cream"
              >
                <div className="font-display text-xl font-semibold tracking-tight text-graphite">
                  {metric.value}
                </div>
                <div className="mt-1 text-[11.5px] leading-snug text-graphite/65">{metric.label}</div>
                <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* scroll cue */}
        <FadeIn delay={base + 0.78} className="mt-14 flex items-center justify-between gap-6">
          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={() => scrollToTarget('#about', { offset: -10 })}
              className="group flex items-center gap-3 text-left"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors duration-400 group-hover:border-accent/60">
                <ArrowDown className="h-4 w-4 text-graphite/75 transition-transform duration-500 group-hover:translate-y-0.5 group-hover:text-accent-deep" />
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-graphite/65 transition-colors group-hover:text-graphite/75">
                Scroll to explore
              </span>
            </button>
          </Magnetic>

          <span className="hidden items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-graphite/60 sm:inline-flex">
            <Sparkles className="h-3 w-3 text-accent-ink" />
            4 shipped products
          </span>
        </FadeIn>
      </motion.div>
    </section>
  );
}
