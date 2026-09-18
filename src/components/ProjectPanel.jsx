import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Maximize2 } from 'lucide-react';
import { GithubIcon } from './icons';
import ProjectMockup from './ProjectMockup';
import { Tilt } from './Magnetic';
import { FadeIn, RevealText, staggerChild, staggerParent } from './AnimatedText';
import { PrimaryButton, GhostButton, Chip } from './ui';
import { useIsDesktop } from '../hooks/useMediaQuery';

export default function ProjectPanel({ project, index, onOpen, onActive }) {
  const ref = useRef(null);
  const desktop = useIsDesktop();
  const inCentre = useInView(ref, { margin: '-45% 0px -45% 0px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const mockY = useTransform(scrollYProgress, [0, 1], ['3.5%', '-3.5%']);
  const numberY = useTransform(scrollYProgress, [0, 1], ['22%', '-22%']);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 0.9, 0.9, 0]);

  useEffect(() => {
    if (inCentre) onActive?.(index);
  }, [inCentre, index, onActive]);

  const flip = index % 2 === 1;
  const { theme } = project;

  return (
    <article
      ref={ref}
      id={`project-${project.id}`}
      className="relative scroll-mt-24 border-t border-line py-16 first:border-t-0 lg:py-0"
    >
      <div className="shell lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 xl:gap-20">
        {/* ------------------------------------------------------- visual */}
        <div
          className={`relative lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center ${
            flip ? 'lg:order-2' : ''
          }`}
        >
          {/* oversized project number behind the mockup */}
          <motion.span
            aria-hidden="true"
            style={desktop ? { y: numberY, opacity: numberOpacity } : undefined}
            className={`pointer-events-none absolute -top-6 select-none font-display text-[22vw] font-bold leading-none tracking-ultra-tight text-graphite/[0.06] lg:text-[13vw] ${
              flip ? 'right-0 lg:-right-4' : 'left-0 lg:-left-4'
            }`}
          >
            {project.number}
          </motion.span>

          <motion.div
            style={desktop ? { y: mockY, willChange: 'transform' } : undefined}
            className="relative w-full"
          >
            <Tilt max={5} className="w-full">
              <button
                type="button"
                onClick={() => onOpen(project)}
                aria-label={`Open the ${project.name} case study`}
                className="block w-full text-left"
              >
                <div className="w-full sm:aspect-[16/11]">
                  <ProjectMockup project={project} />
                </div>
              </button>
            </Tilt>

            {/* caption under the frame */}
            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/60">
                {project.identity}
              </span>
              <button
                type="button"
                onClick={() => onOpen(project)}
                className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors"
                style={{ color: theme.text }}
              >
                <Maximize2 className="h-3 w-3" />
                Case study
                <span className="block h-px w-0 bg-current transition-all duration-500 group-hover:w-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------ content */}
        <div className={`mt-12 lg:mt-0 lg:py-[20vh] ${flip ? 'lg:order-1' : ''}`}>
          {/* header */}
          <FadeIn y={18} className="flex items-center gap-4">
            <span
              className="font-mono text-[11px] font-semibold tracking-[0.1em]"
              style={{ color: theme.text }}
            >
              {project.number}
            </span>
            <span className="h-px w-10" style={{ background: theme.glowA }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/65">
              {project.identity}
            </span>
          </FadeIn>

          <div className="mt-5">
            <RevealText
              as="h3"
              text={project.name}
              className="font-display text-[clamp(2.2rem,5.6vw,4rem)] font-semibold leading-[0.98] tracking-ultra-tight"
              stagger={0.05}
            />
          </div>

          <FadeIn delay={0.08} className="mt-4">
            <p
              className="font-display text-[clamp(1rem,1.7vw,1.35rem)] font-light leading-snug"
              style={{ color: theme.text }}
            >
              {project.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.14} className="mt-6 max-w-xl">
            <p className="text-[14.5px] leading-[1.75] text-graphite/65">{project.summary}</p>
          </FadeIn>

          {/* tags */}
          <FadeIn delay={0.18} className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-tight"
                style={{ borderColor: theme.glowA, background: theme.tint, color: theme.text }}
              >
                {tag}
              </span>
            ))}
          </FadeIn>

          {/* key features */}
          <div className="mt-10">
            <FadeIn className="eyebrow mb-4">Key features</FadeIn>
            <motion.ul {...staggerParent(0.07)} className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {project.features.map((feature, i) => (
                <motion.li key={feature.title} {...staggerChild} className="group">
                  <div className="flex items-start gap-2.5">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-400 group-hover:scale-150"
                      style={{ background: theme.from }}
                    />
                    <div>
                      <h4 className="text-[13.5px] font-semibold leading-snug tracking-tight text-graphite/90">
                        {feature.title}
                      </h4>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-graphite/65">
                        {feature.body}
                      </p>
                    </div>
                  </div>
                  <span className="sr-only">{i + 1}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* stack */}
          <div className="mt-10">
            <FadeIn className="eyebrow mb-4">Technology stack</FadeIn>
            <motion.div {...staggerParent(0.05)} className="space-y-3">
              {project.stack.map((group) => (
                <motion.div key={group.group} {...staggerChild} className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 w-[72px] shrink-0 font-mono text-[9.5px] uppercase tracking-[0.14em] text-graphite/60">
                    {group.group}
                  </span>
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* actions */}
          <FadeIn delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
            <PrimaryButton
              as="a"
              href={project.links.github}
              target="_blank"
              rel="noreferrer noopener"
              icon={GithubIcon}
              aria-label={`${project.name} source on GitHub (opens in a new tab)`}
            >
              GitHub
            </PrimaryButton>

            {project.links.demo && (
              <GhostButton
                as="a"
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
                icon={ExternalLink}
                aria-label={`${project.name} live demo (opens in a new tab)`}
              >
                Live Demo
              </GhostButton>
            )}

            <GhostButton onClick={() => onOpen(project)} icon={ArrowUpRight}>
              Case study
            </GhostButton>
          </FadeIn>
        </div>
      </div>
    </article>
  );
}
