import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Braces, Cpu, MapPin, Terminal } from 'lucide-react';
import { capabilities, site } from '../data/site';
import { FadeIn, RevealText, staggerChild, staggerParent } from './AnimatedText';
import { SectionHeading, TextLink } from './ui';
import { Tilt } from './Magnetic';

const ICONS = [Braces, Cpu, Terminal];

function Terminalcard() {
  const lines = [
    { prompt: '~', cmd: 'whoami', out: 'daksh-yadav · full-stack + ai/ml' },
    { prompt: '~', cmd: 'cat focus.txt', out: 'MERN products · RAG pipelines · LLM agents' },
    { prompt: '~', cmd: 'ls ./shipped', out: 'travelease  joblio  propfind  expense-tracker' },
    { prompt: '~', cmd: 'echo $LOCATION', out: 'Gurgaon / Delhi NCR, India' },
  ];

  return (
    <Tilt max={5} className="w-full">
      <div className="ring-gradient overflow-hidden rounded-2xl border border-line bg-cream/80">
        {/* chrome */}
        <div className="flex items-center gap-2 border-b border-line bg-cream/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          <span className="ml-2 font-mono text-[10.5px] tracking-tight text-graphite/65">
            daksh@portfolio — zsh
          </span>
        </div>

        <motion.div
          {...staggerParent(0.13)}
          className="space-y-3.5 p-5 font-mono text-[12px] leading-relaxed sm:text-[12.5px]"
        >
          {lines.map((line) => (
            <motion.div key={line.cmd} {...staggerChild}>
              <div className="flex items-center gap-2 text-graphite/85">
                <span className="text-accent-deep">{line.prompt}</span>
                <span className="text-accent-blue">$</span>
                <span>{line.cmd}</span>
              </div>
              <div className="mt-1 pl-6 text-graphite/65">{line.out}</div>
            </motion.div>
          ))}
          <motion.div {...staggerChild} className="flex items-center gap-2 pt-1 text-graphite/85">
            <span className="text-accent-deep">~</span>
            <span className="text-accent-blue">$</span>
            <span className="inline-block h-[14px] w-[7px] animate-caret-blink bg-accent/80 align-middle" />
          </motion.div>
        </motion.div>
      </div>
    </Tilt>
  );
}

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ['6%', '-8%']);

  return (
    <section id="about" ref={ref} className="relative scroll-mt-24 py-24 md:py-36">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="I build the whole product — interface, API and the AI layer."
          description={`${site.intro} Most of my work starts with a real workflow someone is stuck on, then ends as something they can actually use.`}
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* narrative */}
          <div className="order-2 space-y-6 text-[15px] leading-[1.75] text-graphite/70 lg:order-1">
            <FadeIn>
              <p>
                I'm a full-stack developer from{' '}
                <span className="text-graphite/90">Gurgaon, Delhi NCR</span>, working mainly across the
                MERN stack with a strong pull toward applied AI. I like problems where the interface
                and the intelligence have to be designed together — a search that has to feel
                instant, a booking flow that can't lose state, an assistant that has to be right
                before it's allowed to act.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p>
                On the product side I've built a travel booking platform with three separate
                inventories and an AI itinerary planner, a two-sided job portal with a full recruiter
                workspace, and a finance tracker that turns raw transactions into readable analytics.
              </p>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p>
                On the AI side I've gone deeper than prompt calls: PropFind runs a real RAG pipeline
                — CSV ingestion, natural-language chunking, embeddings in ChromaDB, SQL pre-filtered
                vector search — behind a LangGraph agent with seven tools and a human confirmation
                step before anything is committed.
              </p>
            </FadeIn>

            <FadeIn delay={0.22} className="pt-2">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11.5px] text-graphite/65">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-accent-ink" />
                  {site.location}
                </span>
                <TextLink href={site.github}>{site.githubHandle}</TextLink>
              </div>
            </FadeIn>
          </div>

          {/* terminal visual */}
          <motion.div style={{ y: visualY }} className="order-1 lg:order-2">
            <FadeIn y={40} duration={0.95}>
              <Terminalcard />
            </FadeIn>
          </motion.div>
        </div>

        {/* capabilities */}
        <div className="mt-20 md:mt-28">
          <FadeIn className="mb-8 flex items-end justify-between gap-6">
            <RevealText
              as="h3"
              text="What I actually do"
              className="font-display text-[clamp(1.35rem,2.6vw,2rem)] leading-tight"
            />
            <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.2em] text-graphite/60 sm:inline">
              03 areas
            </span>
          </FadeIn>

          <motion.div {...staggerParent(0.12)} className="grid gap-4 md:grid-cols-3">
            {capabilities.map((capability, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <motion.article
                  key={capability.title}
                  {...staggerChild}
                  className="group ring-gradient relative overflow-hidden rounded-2xl border border-line bg-cream/70 p-6 transition-colors duration-500 hover:bg-cream-deep"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-600 group-hover:opacity-100" />

                  <div className="relative flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-cream text-accent-deep transition-transform duration-500 group-hover:-translate-y-0.5">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-[10.5px] text-graphite/60">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="relative mt-5 font-display text-[17px] font-semibold leading-snug tracking-tight">
                    {capability.title}
                  </h4>
                  <p className="relative mt-3 text-[13.5px] leading-relaxed text-graphite/65">
                    {capability.body}
                  </p>

                  <ul className="relative mt-5 space-y-2 border-t border-line pt-4">
                    {capability.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 font-mono text-[11.5px] text-graphite/65">
                        <span className="h-1 w-1 rounded-full bg-accent/70" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
