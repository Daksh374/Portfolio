import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { site, navLinks } from '../data/site';
import { scrollToTarget, scrollToTop } from '../lib/scroll';
import { PrimaryButton, ResumeButton } from './ui';
import { FadeIn, RevealText } from './AnimatedText';
import { Magnetic } from './Magnetic';

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.15]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.85]);

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* ---------------------------------------------------- closing CTA */}
      <section className="relative border-t border-line py-24 md:py-32">
        <motion.div
          aria-hidden="true"
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(228,91,50,0.16),rgba(58,110,165,0.08)_45%,transparent_70%)] blur-[60px]"
        />

        <div className="shell relative text-center">
          <FadeIn y={14}>
            <span className="eyebrow">Next step</span>
          </FadeIn>

          <RevealText
            as="h2"
            text="Let's build something that solves a real problem."
            className="mx-auto mt-6 max-w-4xl text-[clamp(2.1rem,5.6vw,4.4rem)] leading-[1.02]"
            stagger={0.04}
          />

          <FadeIn delay={0.2} className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-graphite/65">
            Whether it's a full-stack product, an AI feature that has to actually work, or a role on
            your team — I'd like to hear about it.
          </FadeIn>

          <FadeIn delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton
              as="a"
              href={`mailto:${site.email}`}
              size="lg"
              icon={Mail}
              aria-label={`Email ${site.email}`}
            >
              Get in touch
            </PrimaryButton>
            <ResumeButton variant="ghost" size="lg" />
          </FadeIn>

          <FadeIn delay={0.4} className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 font-mono text-[11.5px] text-graphite/65">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-graphite"
            >
              <Mail className="h-3.5 w-3.5" /> {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-graphite"
            >
              <Phone className="h-3.5 w-3.5" /> {site.phone}
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 transition-colors hover:text-graphite"
            >
              <GithubIcon className="h-3.5 w-3.5" /> {site.githubHandle}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 transition-colors hover:text-graphite"
            >
              <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ---------------------------------------------- oversized wordmark */}
      <div className="relative border-t border-line">
        <div className="shell pt-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-[0.82] tracking-ultra-tight text-graphite/[0.07]">
                DAKSH
                <br />
                YADAV
              </div>
            </div>

            <div className="flex flex-col gap-8 sm:flex-row sm:gap-14 lg:pb-4">
              <div>
                <div className="eyebrow mb-4">Navigate</div>
                <ul className="space-y-2.5">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <button
                        type="button"
                        onClick={() => scrollToTarget(link.href, { offset: -10 })}
                        className="group inline-flex items-center gap-2 text-[13.5px] text-graphite/60 transition-colors hover:text-graphite"
                      >
                        <span className="h-px w-0 bg-accent transition-all duration-400 group-hover:w-4" />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="eyebrow mb-4">Elsewhere</div>
                <ul className="space-y-2.5">
                  <li>
                    <a
                      href={site.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[13.5px] text-graphite/60 transition-colors hover:text-graphite"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[13.5px] text-graphite/60 transition-colors hover:text-graphite"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.resume}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[13.5px] text-graphite/60 transition-colors hover:text-graphite"
                    >
                      Resume
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-[13.5px] text-graphite/60 transition-colors hover:text-graphite"
                    >
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-line py-7 sm:flex-row sm:items-center">
            <p className="font-mono text-[11px] text-graphite/60">
              © {new Date().getFullYear()} {site.name} · {site.location}
            </p>

            <div className="flex items-center gap-5">
              <Magnetic strength={0.3}>
                <button
                  type="button"
                  onClick={() => scrollToTop()}
                  aria-label="Back to top"
                  className="group grid h-10 w-10 place-items-center rounded-full border border-line bg-cream transition-colors duration-400 hover:border-accent/50"
                >
                  <ArrowUp className="h-4 w-4 text-graphite/70 transition-all duration-400 group-hover:-translate-y-0.5 group-hover:text-accent-deep" />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
