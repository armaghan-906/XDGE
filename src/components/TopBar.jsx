import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';

const primaryLinks = [
  { label: 'Home', href: '#' },
  { label: 'Programmes', href: '#' },
  { label: 'Outcomes', href: '#' },
  { label: 'Insights', href: '#' },
];

const secondaryLinks = [
  { label: 'Blog', href: '#' },
  { label: 'Join Us', href: '#' },
  { label: 'Contact Us', href: '#' },
];

const socialLinks = ['LinkedIn', 'Instagram', 'Facebook', 'Behance'];

const overlayEase = [0.76, 0, 0.24, 1];
const fadeEase = [0.2, 0.7, 0.2, 1];

const linkContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const linkVariants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.85, ease: fadeEase } },
  exit: { y: '110%', transition: { duration: 0.4, ease: [0.6, 0, 0.4, 1] } },
};

const secondaryContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.55 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const GREY = '#7d7e7c';
const GREY_SUBTLE = '#9a9b97';

export function TopBar() {
  const [open, setOpen] = useState(false);
  const [sectionTheme, setSectionTheme] = useState('dark');

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Detect which section's bg is currently behind the header band, switch colors accordingly
  useEffect(() => {
    const update = () => {
      const probeY = 32;
      const sections = document.querySelectorAll('[data-section-theme]');
      let current = 'dark';
      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          current = sec.getAttribute('data-section-theme') || 'dark';
        }
      }
      setSectionTheme(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const overCream = open || sectionTheme === 'light';
  const fg = overCream ? GREY : theme.base;
  const fgSubtle = overCream ? GREY_SUBTLE : theme.subtitle;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100,
        }}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: 'clamp(16px, 3vw, 24px) clamp(20px, 4vw, 40px)',
          gap: 16,
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <motion.a
              href="#"
              animate={{ color: fg, borderColor: fg }}
              transition={{ duration: 0.3 }}
              style={{
                width: 28, height: 28,
                borderWidth: 1.5, borderStyle: 'solid',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'serif', fontSize: 14, flexShrink: 0,
                lineHeight: 1, textDecoration: 'none',
              }}
            >X</motion.a>
            <motion.a
              href="#"
              className="xg-hide-sm"
              animate={{ color: fg }}
              transition={{ duration: 0.3 }}
              whileHover={{ x: 2 }}
              style={{
                fontSize: 12, letterSpacing: '0.04em',
                paddingTop: 6, fontWeight: 500,
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}
            >Xdge Program</motion.a>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor="grow"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              background: 'transparent', border: 'none', padding: 0,
              width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 5,
              cursor: 'pointer',
            }}
          >
            <motion.span
              animate={{
                rotate: open ? 45 : 0,
                y: open ? 3.5 : 0,
                x: open ? 0 : -3,
                backgroundColor: fg,
              }}
              transition={{ duration: 0.4, ease: overlayEase }}
              style={{ width: 22, height: 1.5, transformOrigin: 'center', display: 'block' }}
            />
            <motion.span
              animate={{
                rotate: open ? -45 : 0,
                y: open ? -3.5 : 0,
                x: open ? 0 : 4,
                backgroundColor: fg,
              }}
              transition={{ duration: 0.4, ease: overlayEase }}
              style={{ width: 18, height: 1.5, transformOrigin: 'center', display: 'block' }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-overlay"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: overlayEase }}
            style={{
              position: 'fixed', inset: 0,
              background: theme.base,
              color: theme.ink,
              zIndex: 1000,
              display: 'flex', flexDirection: 'column',
              padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 48px) clamp(40px, 5vw, 56px)',
              overflowY: 'auto',
            }}
          >
            <div className="xg-menu-grid">
              <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', gap: 32,
              }}>
                <motion.div
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.85, delay: 0.4, ease: fadeEase }}
                >
                  <div style={{
                    fontFamily: theme.display, fontWeight: 900,
                    fontSize: 'clamp(48px, 7vw, 110px)',
                    lineHeight: 0.95, letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color: theme.ink,
                  }}>
                    XDGE<span style={{ marginLeft: '0.05em' }}>.</span>
                  </div>
                  <div style={{
                    marginTop: 4, fontSize: 12,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    fontWeight: 600, color: theme.ink,
                  }}>
                    Creative Lab
                  </div>
                </motion.div>

                <motion.div
                  className="xg-menu-image"
                  initial={{ y: 28, opacity: 0, scale: 1.05 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 1.0, delay: 0.85, ease: fadeEase }}
                  style={{
                    width: '100%', maxWidth: 340,
                    aspectRatio: '1/1', overflow: 'hidden',
                    background: '#d8d6cf',
                  }}
                >
                  <img
                    src="/assets/hero-team.png"
                    alt="XDGE workspace"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </motion.div>
              </div>

              <motion.nav
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end',
                  gap: 'clamp(2px, 0.5vw, 6px)',
                }}
              >
                {primaryLinks.map(({ label, href }) => (
                  <span key={label} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
                    <motion.a
                      variants={linkVariants}
                      onClick={() => setOpen(false)}
                      href={href}
                      data-cursor="grow"
                      whileHover={{ x: 14 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: 'block',
                        fontFamily: theme.display,
                        fontSize: 'clamp(48px, 9vw, 130px)',
                        lineHeight: 0.95, letterSpacing: '-0.02em',
                        color: theme.ink, textDecoration: 'none',
                        textTransform: 'uppercase',
                        fontWeight: 900,
                      }}
                    >{label}</motion.a>
                  </span>
                ))}
              </motion.nav>

              <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', gap: 32,
                textAlign: 'right',
              }}>
                <motion.nav
                  variants={secondaryContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    display: 'flex', flexDirection: 'column',
                    gap: 'clamp(2px, 0.4vw, 4px)',
                  }}
                >
                  {secondaryLinks.map(({ label, href }) => (
                    <span key={label} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
                      <motion.a
                        variants={linkVariants}
                        onClick={() => setOpen(false)}
                        href={href}
                        data-cursor="grow"
                        whileHover={{ x: -10 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          display: 'block',
                          fontFamily: theme.display,
                          fontSize: 'clamp(20px, 2.6vw, 38px)',
                          lineHeight: 1.05, letterSpacing: '-0.005em',
                          color: theme.ink, textDecoration: 'none',
                          textTransform: 'uppercase',
                          fontWeight: 900,
                        }}
                      >{label}</motion.a>
                    </span>
                  ))}
                </motion.nav>

                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.7, delay: 0.85, ease: fadeEase }}
                >
                  <div style={{
                    fontSize: 11, letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: '#7d7e7c',
                    marginBottom: 12, fontWeight: 600,
                  }}>Follow Us</div>
                  <div style={{
                    display: 'flex', gap: 14,
                    justifyContent: 'flex-end', flexWrap: 'wrap',
                  }}>
                    {socialLinks.map((s) => (
                      <motion.a
                        key={s}
                        href="#"
                        data-cursor="grow"
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          width: 36, height: 36, borderRadius: '50%',
                          border: `1px solid ${theme.borderLight}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                          color: theme.ink, textDecoration: 'none',
                          textTransform: 'uppercase',
                        }}
                      >{s.slice(0, 2)}</motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
