import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { education } from '../data/site';
import { SectionHeading } from './ui';
import { EASE, FadeIn, staggerChild, staggerParent } from './AnimatedText';

/* CGPA as an arc that draws in on scroll. `pathLength` lets Framer Motion own
   the dash maths, so the fill is exactly value/scale at any radius. */
function CgpaGauge({ value, scale }) {
  const ratio = Number(value) / Number(scale);

  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 120 120" className="h-[148px] w-[148px] -rotate-90">
        <circle cx="60" cy="60" r="46" fill="none" stroke="#E3DED2" strokeWidth="7" />
        <motion.circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="#C94A27"
          strokeWidth="7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: ratio }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <span className="flex items-baseline gap-1">
          <span className="font-display text-[34px] font-semibold leading-none tracking-tighter text-graphite">
            {value}
          </span>
          <span className="font-mono text-[13px] leading-none text-graphite/65">/ {scale}</span>
        </span>
        <span className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.22em] text-graphite/65">
          CGPA
        </span>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Education"
          title="Where the fundamentals came from."
          description="A computer science degree with a data science specialisation — the grounding behind the full-stack and AI work on this page."
        />

        <motion.div
          {...staggerParent(0.12)}
          className="mt-14 grid gap-4 lg:grid-cols-[1.45fr_0.55fr]"
        >
          {/* degree */}
          <motion.article
            {...staggerChild}
            className="group ring-gradient relative overflow-hidden rounded-2xl border border-line bg-cream/70 p-6 transition-colors duration-500 hover:bg-cream-deep sm:p-8"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-600 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-cream text-accent-deep transition-transform duration-500 group-hover:-translate-y-0.5">
                <GraduationCap className="h-[20px] w-[20px]" strokeWidth={1.8} />
              </span>
              <span className="rounded-full border border-accent/25 bg-accent-wash px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-ink">
                {education.specialisation}
              </span>
            </div>

            <h3 className="relative mt-6 font-display text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold leading-tight tracking-tight text-graphite">
              {education.degree}
            </h3>

            <div className="relative mt-5 space-y-2.5 border-t border-line pt-5">
              <div className="text-[15px] font-medium leading-snug text-graphite/85">
                {education.institution}
              </div>
              <div className="flex items-center gap-2 font-mono text-[11.5px] text-graphite/65">
                <MapPin className="h-3.5 w-3.5 text-accent-deep" />
                {education.location}
              </div>
            </div>

            <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-deep to-transparent transition-transform duration-600 group-hover:scale-x-100" />
          </motion.article>

          {/* cgpa */}
          <motion.aside
            {...staggerChild}
            className="ring-gradient flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-cream/70 p-6"
          >
            <CgpaGauge value={education.cgpa} scale={education.cgpaScale} />
            <FadeIn delay={0.25} className="text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/65">
                {education.shortDegree}
              </div>
            </FadeIn>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
