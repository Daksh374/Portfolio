import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { RevealText, FadeIn } from './AnimatedText';
import { site } from '../data/site';

/* ------------------------------------------------------------------ buttons */

const base =
  'group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-colors duration-300 disabled:opacity-50';

const sizes = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-[15px]',
};

/** Solid gradient CTA with a sweeping sheen on hover. */
export function PrimaryButton({
  children,
  as = 'button',
  className = '',
  size = 'md',
  icon: Icon,
  magnetic = true,
  ...rest
}) {
  const Tag = as;
  const content = (
    <Tag
      className={`${base} ${sizes[size]} overflow-hidden bg-accent-gradient text-white shadow-[0_12px_30px_-14px_rgba(201,74,39,0.45)] hover:shadow-[0_16px_38px_-14px_rgba(184,66,31,0.55)] ${className}`}
      {...rest}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.55)_50%,transparent_75%)] transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
      <span className="relative z-10 font-semibold">{children}</span>
      {Icon && <Icon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />}
    </Tag>
  );
  return magnetic ? <Magnetic strength={0.24}>{content}</Magnetic> : content;
}

/** Glass / outline button. */
export function GhostButton({
  children,
  as = 'button',
  className = '',
  size = 'md',
  icon: Icon,
  magnetic = true,
  ...rest
}) {
  const Tag = as;
  const content = (
    <Tag
      className={`${base} ${sizes[size]} ring-gradient glass text-graphite/90 hover:text-graphite ${className}`}
      {...rest}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-accent/0 transition-colors duration-400 group-hover:bg-accent/[0.07]" />
      <span className="relative z-10">{children}</span>
      {Icon && <Icon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />}
    </Tag>
  );
  return magnetic ? <Magnetic strength={0.2}>{content}</Magnetic> : content;
}

/** The resume CTA, reused in the navbar, hero and closing section. */
export function ResumeButton({
  variant = 'primary',
  size = 'md',
  className = '',
  label = 'Download Resume',
  magnetic = true,
}) {
  const props = {
    as: 'a',
    href: site.resume,
    target: '_blank',
    rel: 'noreferrer noopener',
    size,
    className,
    icon: Download,
    magnetic,
    'aria-label': `${label} (opens in a new tab)`,
  };
  return variant === 'primary' ? (
    <PrimaryButton {...props}>{label}</PrimaryButton>
  ) : (
    <GhostButton {...props}>{label}</GhostButton>
  );
}

/** Small inline link with an animated underline. */
export function TextLink({ href, children, external = true, className = '' }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={`group relative inline-flex items-center gap-1 text-graphite/85 transition-colors hover:text-graphite ${className}`}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-blue transition-transform duration-400 group-hover:scale-x-100" />
    </a>
  );
}

/* ----------------------------------------------------------------- headings */

export function SectionHeading({ index, eyebrow, title, description, align = 'left', className = '' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'} ${className}`}>
      <FadeIn className="mb-5 flex items-center gap-3" y={12} duration={0.6}>
        {index && (
          <span className="font-mono text-[11px] tracking-[0.2em] text-accent-ink">{index}</span>
        )}
        <span className="eyebrow">{eyebrow}</span>
        <span className={`h-px flex-1 bg-gradient-to-r from-line to-transparent ${align === 'center' ? 'hidden' : ''}`} />
      </FadeIn>

      <RevealText
        as="h2"
        text={title}
        className="text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.03]"
        stagger={0.045}
      />

      {description && (
        <FadeIn delay={0.16} className="mt-6 max-w-2xl text-[15px] leading-relaxed text-graphite/65 md:text-base">
          {description}
        </FadeIn>
      )}
    </div>
  );
}

/** Thin label chip used for tech stacks and tags. */
export function Chip({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'border-line bg-cream text-graphite/70',
    accent: 'border-accent/25 bg-accent/[0.08] text-accent-ink',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-tight transition-colors duration-300 hover:border-line-strong hover:text-graphite ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Animated section divider. */
export function Divider({ className = '' }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
      className={`hairline origin-center ${className}`}
    />
  );
}
