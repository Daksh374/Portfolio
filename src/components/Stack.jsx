import { motion } from 'framer-motion';
import { stack } from '../data/site';
import { SectionHeading } from './ui';
import { FadeIn, staggerChild, staggerParent } from './AnimatedText';

const MARQUEE = [
  'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Redux Toolkit', 'Framer Motion',
  'FastAPI', 'Python', 'LangGraph', 'ChromaDB', 'Groq', 'JWT', 'Recharts', 'Vite', 'Mongoose',
  'SQLAlchemy', 'Cloudinary', 'RAG',
];

export default function Stack() {
  return (
    <section id="stack" className="relative scroll-mt-24 py-24 md:py-32">
      {/* marquee band */}
      <div className="marquee-mask relative mb-20 overflow-hidden border-y border-line py-5">
        <div className="flex w-max animate-marquee items-center gap-10 will-change-transform">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-display text-[clamp(1rem,2vw,1.6rem)] font-light tracking-tight text-graphite/60 transition-colors duration-500 hover:text-graphite/75">
                {item}
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-accent/40" />
            </span>
          ))}
        </div>
      </div>

      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Toolkit"
          title="The stack I reach for."
          description="Grouped by where it sits in the product — everything here is something I've shipped with, not just read about."
        />

        <motion.div {...staggerParent(0.1)} className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line md:grid-cols-2 xl:grid-cols-4">
          {stack.map((group, index) => (
            <motion.div
              key={group.group}
              {...staggerChild}
              className="group relative overflow-hidden bg-cream/70 p-6 transition-colors duration-500 hover:bg-cream-deep"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-600 group-hover:opacity-100" />

              <div className="relative flex items-baseline justify-between">
                <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-graphite/90">
                  {group.group}
                </h3>
                <span className="font-mono text-[10px] text-graphite/60">0{index + 1}</span>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-line bg-cream/70 px-2.5 py-1.5 font-mono text-[11px] tracking-tight text-graphite/70 transition-all duration-400 hover:-translate-y-0.5 hover:border-accent/40 hover:text-graphite"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <FadeIn delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] text-graphite/65">
          <span>Also comfortable with: REST design, auth flows, file uploads, deployment on Vercel.</span>
        </FadeIn>
      </div>
    </section>
  );
}
