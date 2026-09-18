import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { site } from '../data/site';
import { SectionHeading } from './ui';
import { EASE, FadeIn, staggerChild, staggerParent } from './AnimatedText';
import { Magnetic } from './Magnetic';

/* ------------------------------------------------------------- CTA cards */

const channels = [
  {
    id: 'email',
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
    hint: 'Best for roles, projects and collaboration',
    copyable: true,
  },
  {
    id: 'phone',
    label: 'Phone',
    value: site.phone,
    href: site.phoneHref,
    icon: Phone,
    hint: 'Call or WhatsApp — Mon to Sat',
    copyable: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: site.githubHandle,
    href: site.github,
    icon: GithubIcon,
    hint: 'Source for every project on this page',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: site.linkedinHandle,
    href: site.linkedin,
    icon: LinkedinIcon,
    hint: 'Experience, education and updates',
    external: true,
  },
];

function ChannelCard({ channel, index }) {
  const [copied, setCopied] = useState(false);
  const Icon = channel.icon;

  const copy = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(channel.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.div
      {...staggerChild}
      className="group ring-gradient relative overflow-hidden rounded-2xl border border-line bg-cream/70 p-5 transition-colors duration-500 hover:bg-cream-deep"
    >
      {/* stretched primary action */}
      <a
        href={channel.href}
        {...(channel.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        aria-label={`${channel.label}: ${channel.value}`}
        className="absolute inset-0 z-10 rounded-2xl"
      />

      <span className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-accent/[0.12] opacity-0 blur-2xl transition-opacity duration-600 group-hover:opacity-100" />

      <div className="pointer-events-none relative flex items-center gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-cream text-accent-deep transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/50">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-graphite/65">
            {channel.label}
          </span>
          <span className="mt-1 block truncate text-[14.5px] font-medium text-graphite">
            {channel.value}
          </span>
          <span className="mt-0.5 block truncate text-[11.5px] text-graphite/65">{channel.hint}</span>
        </span>

        <span className="flex shrink-0 items-center gap-1">
          {channel.copyable && (
            <button
              type="button"
              onClick={copy}
              aria-label={`Copy ${channel.label.toLowerCase()}`}
              className="pointer-events-auto relative z-20 grid h-8 w-8 place-items-center rounded-lg border border-line text-graphite/65 transition-colors duration-300 hover:border-accent/50 hover:text-accent-deep"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          )}
          <ArrowUpRight className="h-4 w-4 text-graphite/60 transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-graphite" />
        </span>
      </div>

      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-deep to-transparent transition-transform duration-600 group-hover:scale-x-100" />
      <span className="pointer-events-none absolute right-4 top-4 font-mono text-[9px] text-graphite/45">
        0{index + 1}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ form */

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', placeholder: 'Ada Lovelace', required: true },
  { name: 'email', label: 'Your email', type: 'email', placeholder: 'you@company.com', required: true },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Full-stack role / project enquiry', required: false },
];

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = (name) => (event) =>
    setValues((previous) => ({ ...previous, [name]: event.target.value }));

  /* No backend here — the form hands a pre-filled draft to a mail client. */
  const draft = () => {
    const subject = values.subject?.trim() || `Portfolio enquiry from ${values.name || 'a visitor'}`;
    const body = [
      values.message?.trim(),
      '',
      '—',
      values.name ? `Name: ${values.name}` : null,
      values.email ? `Email: ${values.email}` : null,
      "Sent from Daksh Yadav's portfolio site",
    ]
      .filter((line) => line !== null)
      .join('\n');
    return { subject, body };
  };

  const mailtoHref = () => {
    const { subject, body } = draft();
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  /* Webmail fallback: a mailto: is a silent no-op for anyone with no desktop
     mail client registered, which is most people on a laptop these days. */
  const gmailHref = () => {
    const { subject, body } = draft();
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      site.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    /* Clicking a real anchor is handled more reliably by browsers than
       assigning window.location for a non-http protocol. */
    const anchor = document.createElement('a');
    anchor.href = mailtoHref();
    anchor.rel = 'noreferrer noopener';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const copyDraft = async () => {
    const { subject, body } = draft();
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\nSubject: ${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ring-gradient relative overflow-hidden rounded-3xl border border-line bg-cream/70 p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent-blue/10 blur-3xl" />

      <div className="relative flex items-center justify-between gap-4">
        <h3 className="font-display text-[17px] font-semibold tracking-tight text-graphite">
          Send a message
        </h3>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-graphite/60">
          opens your mail app
        </span>
      </div>

      <div className="relative mt-6 space-y-5">
        {FIELDS.map((field) => (
          <div key={field.name} className="relative">
            <label
              htmlFor={`contact-${field.name}`}
              className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-graphite/65"
            >
              {field.label}
              {field.required && <span className="ml-1 text-accent-ink">*</span>}
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              required={field.required}
              value={values[field.name]}
              onChange={update(field.name)}
              onFocus={() => setFocused(field.name)}
              onBlur={() => setFocused(null)}
              placeholder={field.placeholder}
              autoComplete={field.name === 'name' ? 'name' : field.name === 'email' ? 'email' : 'off'}
              className="w-full rounded-xl border border-line bg-white/80 px-4 py-3 text-[14px] text-graphite placeholder:text-graphite/60 transition-colors duration-300 focus:border-accent/60 focus:outline-none"
            />
            <motion.span
              className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent to-accent-blue"
              initial={false}
              animate={{ width: focused === field.name ? '100%' : '0%' }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </div>
        ))}

        <div className="relative">
          <label
            htmlFor="contact-message"
            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-graphite/65"
          >
            Message<span className="ml-1 text-accent-ink">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            value={values.message}
            onChange={update('message')}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            placeholder="What are you building, and where could I help?"
            className="w-full resize-none rounded-xl border border-line bg-white/80 px-4 py-3 text-[14px] leading-relaxed text-graphite placeholder:text-graphite/60 transition-colors duration-300 focus:border-accent/60 focus:outline-none"
          />
          <motion.span
            className="absolute bottom-[6px] left-0 h-px bg-gradient-to-r from-accent to-accent-blue"
            initial={false}
            animate={{ width: focused === 'message' ? '100%' : '0%' }}
            transition={{ duration: 0.45, ease: EASE }}
          />
        </div>
      </div>

      <div className="relative mt-7 flex flex-wrap items-center gap-4">
        <Magnetic strength={0.22}>
          <button
            type="submit"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-accent-gradient px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_30px_-14px_rgba(201,74,39,0.45)] transition-shadow duration-400 hover:shadow-[0_16px_38px_-14px_rgba(184,66,31,0.55)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.55)_50%,transparent_75%)] transition-transform duration-900 ease-out group-hover:translate-x-full" />
            <span className="relative z-10">{sent ? 'Draft opened' : 'Compose email'}</span>
            {sent ? (
              <Check className="relative z-10 h-4 w-4" strokeWidth={2.6} />
            ) : (
              <Send className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.2} />
            )}
          </button>
        </Magnetic>

        <div className="max-w-[20rem] space-y-1.5">
          <p className="text-[11.5px] leading-relaxed text-graphite/65">
            No backend — this opens a pre-filled draft addressed to {site.email}.
          </p>
          <p className="text-[11.5px] leading-relaxed text-graphite/65">
            Nothing opened?{' '}
            <a
              href={gmailHref()}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
            >
              Open in Gmail
            </a>{' '}
            or{' '}
            <button
              type="button"
              onClick={copyDraft}
              className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
            >
              {copied ? 'copied to clipboard' : 'copy the message'}
            </button>
            .
          </p>
        </div>
      </div>
    </form>
  );
}

/* --------------------------------------------------------------- section */

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Contact"
          title="Let's talk about what you're building."
          description="I'm open to full-stack and AI engineering roles, internships and freelance builds. The fastest way to reach me is email — everything else works too."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* channels */}
          <div>
            <motion.div {...staggerParent(0.1)} className="space-y-3">
              {channels.map((channel, index) => (
                <ChannelCard key={channel.id} channel={channel} index={index} />
              ))}
            </motion.div>

            <FadeIn delay={0.2} className="mt-6 flex items-center gap-2.5 rounded-2xl border border-line bg-cream/70 px-5 py-4">
              <MapPin className="h-4 w-4 shrink-0 text-accent-ink" />
              <div>
                <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-graphite/65">
                  Based in
                </div>
                <div className="mt-0.5 text-[14px] font-medium text-graphite/90">{site.location}</div>
              </div>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-success">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-success animate-pulse-ring" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                available
              </span>
            </FadeIn>
          </div>

          {/* form */}
          <FadeIn y={34} duration={0.9}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
