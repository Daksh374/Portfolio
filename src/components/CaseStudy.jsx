import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, ListChecks, Workflow, X } from 'lucide-react';
import { GithubIcon } from './icons';
import ProjectMockup from './ProjectMockup';
import { EASE } from './AnimatedText';
import { PrimaryButton, GhostButton, Chip } from './ui';
import { setScrollLock } from '../lib/scroll';

const block = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export default function CaseStudy({ project, onClose }) {
  useEffect(() => {
    setScrollLock(true);
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      setScrollLock(false);
    };
  }, [onClose]);

  const { theme } = project;

  return (
    <motion.div
      className="fixed inset-0 z-[150]"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-graphite/25 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ y: '4%', opacity: 0, scale: 0.985 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: '3%', opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="absolute inset-x-0 bottom-0 top-[4vh] flex flex-col overflow-hidden rounded-t-[28px] border-t border-line bg-paper-soft sm:inset-x-[3vw] sm:rounded-[28px] sm:border lg:inset-x-[6vw]"
      >
        {/* accent wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[280px]"
          style={{
            background: `radial-gradient(80% 100% at 20% 0%, ${theme.glowA}, transparent 70%), radial-gradient(70% 100% at 90% 0%, ${theme.glowB}, transparent 70%)`,
          }}
        />
        <div className="noise-layer pointer-events-none absolute inset-0 opacity-[0.05]" />

        {/* sticky bar */}
        <div className="z-20 flex shrink-0 items-center justify-between gap-4 border-b border-line bg-paper-soft/90 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="font-mono text-[11px] font-semibold"
              style={{ color: theme.text }}
            >
              {project.number}
            </span>
            <span className="h-4 w-px bg-line" />
            <span className="truncate font-display text-[15px] font-semibold tracking-tight text-graphite">
              {project.name}
            </span>
            <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.18em] text-graphite/65 sm:inline">
              {project.identity}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-cream text-graphite/75 transition-colors duration-300 hover:border-line-strong hover:text-graphite"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* scrollable content */}
        <div
          data-lenis-prevent
          className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-20 pt-8 sm:px-8 lg:px-12"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.12 }}
            className="mx-auto max-w-5xl"
          >
            {/* title block */}
            <motion.div variants={block} transition={{ duration: 0.7, ease: EASE }}>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ borderColor: theme.glowA, background: theme.tint, color: theme.text }}
              >
                {project.identity}
              </span>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.05] tracking-tighter text-graphite">
                {project.tagline}
              </h2>
              <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-graphite/70">
                {project.summary}
              </p>
            </motion.div>

            {/* meta */}
            <motion.dl
              variants={block}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line sm:grid-cols-4"
            >
              {[
                ['Year', project.year],
                ['Role', project.role],
                ['Focus', project.identity],
                ['Status', project.links.demo ? 'Live demo' : 'Source available'],
              ].map(([label, value]) => (
                <div key={label} className="bg-cream/70 p-4">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-graphite/60">
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-[13px] font-medium text-graphite/90">{value}</dd>
                </div>
              ))}
            </motion.dl>

            {/* visual */}
            <motion.div
              variants={block}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-10 w-full sm:aspect-[16/9]"
            >
              <ProjectMockup project={project} />
            </motion.div>

            {/* overview */}
            <motion.section variants={block} transition={{ duration: 0.7, ease: EASE }} className="mt-14">
              <SectionLabel icon={Layers} text="Overview" theme={theme} />
              <p className="mt-5 max-w-3xl text-[15px] leading-[1.75] text-graphite/70">
                {project.description}
              </p>
            </motion.section>

            {/* features */}
            <motion.section variants={block} transition={{ duration: 0.7, ease: EASE }} className="mt-14">
              <SectionLabel icon={ListChecks} text="Key features" theme={theme} />
              <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line sm:grid-cols-2">
                {project.features.map((feature, i) => (
                  <div key={feature.title} className="group bg-cream/70 p-5 transition-colors duration-500 hover:bg-cream-deep">
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 font-mono text-[10px] tabular-nums"
                        style={{ color: theme.text }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-display text-[14.5px] font-semibold leading-snug tracking-tight text-graphite">
                          {feature.title}
                        </h4>
                        <p className="mt-2 text-[13px] leading-relaxed text-graphite/65">{feature.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* architecture */}
            <motion.section variants={block} transition={{ duration: 0.7, ease: EASE }} className="mt-14">
              <SectionLabel icon={Workflow} text="How it's built" theme={theme} />
              <ul className="mt-6 space-y-3">
                {project.architecture.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-line bg-cream/70 px-4 py-3 font-mono text-[12px] leading-relaxed text-graphite/70"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: theme.from }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* stack */}
            <motion.section variants={block} transition={{ duration: 0.7, ease: EASE }} className="mt-14">
              <SectionLabel icon={Layers} text="Technology stack" theme={theme} />
              <div className="mt-6 space-y-6">
                {project.stack.map((group) => (
                  <div key={group.group}>
                    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite/60">
                      {group.group}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Chip key={item}>{item}</Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* links */}
            <motion.div
              variants={block}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-14 flex flex-wrap items-center gap-3 border-t border-line pt-8"
            >
              <PrimaryButton
                as="a"
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                icon={GithubIcon}
                size="lg"
              >
                View source
              </PrimaryButton>
              {project.links.demo && (
                <GhostButton
                  as="a"
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  icon={ExternalLink}
                  size="lg"
                >
                  Open live demo
                </GhostButton>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionLabel({ icon: Icon, text, theme }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid h-8 w-8 place-items-center rounded-lg border"
        style={{ borderColor: theme.glowA, background: theme.tint, color: theme.text }}
      >
        <Icon className="h-4 w-4" strokeWidth={1.9} />
      </span>
      <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-graphite/85">
        {text}
      </h3>
      <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
    </div>
  );
}
