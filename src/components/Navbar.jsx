import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, site } from '../data/site';
import { scrollToTarget, setScrollLock } from '../lib/scroll';
import { ResumeButton } from './ui';
import { Magnetic } from './Magnetic';
import { EASE } from './AnimatedText';

export default function Navbar({ ready }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 40));

  /* Track the section currently owning the viewport. */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) setScrollLock(true);
    else setScrollLock(false);
  }, [menuOpen]);

  const go = (event, href) => {
    event.preventDefault();
    setMenuOpen(false);
    // let the lock release before scrolling
    requestAnimationFrame(() => scrollToTarget(href, { offset: -10 }));
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -90, opacity: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[90]"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'border-b border-line bg-paper/80 backdrop-blur-md'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav className="shell flex h-[72px] items-center justify-between gap-6">
            {/* wordmark */}
            <a
              href="#home"
              onClick={(event) => go(event, '#home')}
              className="group flex items-center gap-3"
              aria-label="Daksh Yadav — back to top"
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-line bg-cream font-display text-[13px] font-semibold text-graphite">
                <span className="absolute inset-0 rounded-xl bg-accent-gradient opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {site.initials}
                </span>
              </span>
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="font-display text-[13px] font-semibold tracking-tight text-graphite">
                  {site.name}
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-graphite/65">
                  Full Stack · AI/ML
                </span>
              </span>
            </a>

            {/* desktop links */}
            <div className="hidden items-center gap-1 rounded-full border border-line bg-cream/70 p-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(event) => go(event, link.href)}
                    className="relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-line bg-cream-deep"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-graphite' : 'text-graphite/65 hover:text-graphite/90'}`}>
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* actions */}
            <div className="flex items-center gap-3">
              <ResumeButton size="sm" className="hidden md:inline-flex" />
              <Magnetic strength={0.2} className="lg:hidden">
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-cream text-graphite"
                >
                  {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
                </button>
              </Magnetic>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[85] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-paper/80 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              data-lenis-prevent
              className="absolute inset-x-4 top-[86px] max-h-[calc(100vh-110px)] overflow-y-auto overscroll-contain rounded-3xl border border-line bg-cream/95 p-3 shadow-2xl"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(event) => go(event, link.href)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: EASE }}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-graphite/85 transition-colors hover:bg-cream-deep hover:text-graphite"
                >
                  {link.label}
                  <span className="font-mono text-[10px] text-graphite/60">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
              <div className="mt-2 border-t border-line p-2 pt-4">
                <ResumeButton size="md" magnetic={false} className="w-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
