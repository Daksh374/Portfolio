import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectPanel from './ProjectPanel';
import CaseStudy from './CaseStudy';
import { SectionHeading } from './ui';
import { EASE, FadeIn } from './AnimatedText';
import { scrollToTarget } from '../lib/scroll';

/**
 * Fixed rail on the right edge: where you are in the showcase.
 * Kept to a narrow dot column so it stays inside the page gutter — the project
 * name only expands on hover, over its own backdrop.
 */
function ProjectRail({ active, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Project navigation"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed right-[clamp(0.5rem,1.6vw,1.75rem)] top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-end gap-1 lg:flex"
        >
          {projects.map((project, index) => {
            const isActive = active === index;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => scrollToTarget(`#project-${project.id}`, { offset: -80 })}
                aria-label={`Go to ${project.name}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center justify-end gap-2 py-1.5"
              >
                {/* name reveals on hover, on its own plate so it never fights the content */}
                <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-full opacity-0 transition-all duration-500 ease-expo group-hover:max-w-[190px] group-hover:opacity-100">
                  <span
                    className="block rounded-full border border-line bg-paper/90 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em]"
                    style={{ color: project.theme.text }}
                  >
                    {project.name}
                  </span>
                </span>

                <span
                  className="w-[18px] text-right font-mono text-[9px] tabular-nums transition-colors duration-500"
                  style={{ color: isActive ? project.theme.text : 'rgba(17,24,39,0.25)' }}
                >
                  {project.number}
                </span>

                <span className="relative grid h-4 w-4 place-items-center">
                  <span
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: isActive ? 7 : 5,
                      height: isActive ? 7 : 5,
                      background: isActive ? project.theme.from : 'rgba(17,24,39,0.25)',
                      boxShadow: isActive ? `0 0 12px ${project.theme.from}` : 'none',
                    }}
                  />
                </span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const railVisible = useInView(sectionRef, { margin: '-15% 0px -20% 0px' });
  const [active, setActive] = useState(0);
  const [openProject, setOpenProject] = useState(null);

  const handleActive = useCallback((index) => setActive(index), []);
  const handleOpen = useCallback((project) => setOpenProject(project), []);
  const handleClose = useCallback(() => setOpenProject(null), []);

  return (
    <section id="work" ref={sectionRef} className="relative scroll-mt-20 py-24 md:py-32">
      {/* heading */}
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            eyebrow="Selected work"
            title="Four products, built end to end."
            description="Each one started as a real workflow — booking a trip, hiring for a role, finding a flat, keeping track of money — and ended as a working application. Scroll through, or open any case study for the full build."
          />

          <FadeIn delay={0.2} className="shrink-0">
            <div className="flex items-end gap-6 lg:flex-col lg:items-end lg:gap-2">
              <div className="font-display text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none tracking-ultra-tight text-graphite/[0.10]">
                0{projects.length}
              </div>
              <div className="pb-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-graphite/65 lg:pb-0 lg:text-right">
                projects
                <br />
                in focus
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* showcase */}
      <div className="mt-16 md:mt-20">
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            onOpen={handleOpen}
            onActive={handleActive}
          />
        ))}
      </div>

      <ProjectRail active={active} visible={railVisible && !openProject} />

      {/* more on github */}
      <div className="shell mt-16">
        <FadeIn className="ring-gradient glass flex flex-col items-start justify-between gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight text-graphite">
              There's more in the repositories.
            </h3>
            <p className="mt-1.5 text-[13.5px] text-graphite/60">
              Every project above is open source — architecture, commits and all.
            </p>
          </div>
          <a
            href="https://github.com/Daksh374"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-[13px] font-medium text-graphite transition-colors duration-400 hover:border-accent/50 hover:bg-accent/[0.08]"
          >
            Browse GitHub
            <span className="transition-transform duration-400 group-hover:translate-x-1">→</span>
          </a>
        </FadeIn>
      </div>

      <AnimatePresence>
        {openProject && <CaseStudy project={openProject} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
}
