import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

const MotionLink = motion(Link);

const primaryLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/the-experience' },
  { label: 'Programmes', to: '/programmes' },
];

const secondaryLinks = [
  { label: 'Apply', to: '/apply' },
  { label: 'Contact', to: '/contact' },
  { label: 'Insights', href: '#' },
];

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/>
      </svg>
    ),
  },
];

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

  // Detect which section's bg is currently behind the header band, switch colors accordingly.
  // Throttled with rAF to avoid React re-renders on every scroll tick (was a major
  // source of scroll jank — every setState during scroll forces a reconciliation pass).
  const currentThemeRef = useRef(sectionTheme);
  useEffect(() => {
    let rafId = 0;
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
      // Only trigger a React re-render if the theme actually changed
      if (current !== currentThemeRef.current) {
        currentThemeRef.current = current;
        setSectionTheme(current);
      }
    };
    update();
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  const overCream = open || sectionTheme === 'light';
  const fg = overCream ? GREY : theme.base;
  const fgSubtle = overCream ? GREY_SUBTLE : theme.subtitle;

  return (
    <>
      <header
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
            <Link
              to="/"
              animate={{ color: fg, borderColor: fg }}
              transition={{ duration: 0.3 }}
              style={{
                width: 28, height: 28,
                borderWidth: 1.5, borderStyle: 'solid',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'serif', fontSize: 14, flexShrink: 0,
                lineHeight: 1, textDecoration: 'none',
              }}
            >X</Link>
            <Link
              to="/"
              className="xg-hide-sm"
              animate={{ color: fg }}
              transition={{ duration: 0.3 }}
              whileHover={{ x: 2 }}
              style={{
                fontSize: 12, letterSpacing: '0.04em',
                paddingTop: 6, fontWeight: 500,
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}
            >Our Programs</Link>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor="grow"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              background: 'transparent', border: 'none', padding: 0,
              width: 60, height: 60,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 8,
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: 34, height: 2, display: 'block',
                background: fg,
                transformOrigin: 'center',
                transform: open
                  ? 'translate(0px, 5px) rotate(45deg)'
                  : 'translate(-4px, 0) rotate(0)',
              }}
            />
            <span
              style={{
                width: 28, height: 2, display: 'block',
                background: fg,
                transformOrigin: 'center',
                transform: open
                  ? 'translate(0px, -5px) rotate(-45deg)'
                  : 'translate(5px, 0) rotate(0)',
              }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div key="menu-overlay"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
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
                <div>
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
                    marginTop: 8,
                    fontFamily: theme.body,
                    fontSize: 13, letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 600, color: theme.ink,
                  }}>
                    Career &middot; University &middot; School
                  </div>
                </div>

                <div
                  className="xg-menu-image"
                  style={{
                    width: '100%', maxWidth: 420,
                    aspectRatio: '16/9', overflow: 'hidden',
                    background: '#d8d6cf',
                  }}
                >
                  <img
                    src="/assets/who-we-are.webp"
                    alt="XDGE workspace"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>

              <nav
                
                
                style={{
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end',
                  gap: 'clamp(2px, 0.5vw, 6px)',
                }}
              >
                {primaryLinks.map((item) => {
                  const parentStyle = {
                    display: 'block',
                    fontFamily: theme.display,
                    fontSize: 'clamp(40px, 7.5vw, 110px)',
                    lineHeight: 0.95, letterSpacing: '-0.02em',
                    color: theme.ink, textDecoration: 'none',
                    textTransform: 'uppercase',
                    fontWeight: 900,
                    whiteSpace: 'nowrap',
                  };
                  const childStyle = {
                    display: 'block',
                    fontFamily: theme.display,
                    fontSize: 'clamp(18px, 2.4vw, 30px)',
                    lineHeight: 1.1, letterSpacing: '-0.005em',
                    color: theme.ink, textDecoration: 'none',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  };

                  const sharedProps = {
                    variants: linkVariants,
                    onClick: () => setOpen(false),
                    'data-cursor': 'grow',
                    whileHover: { x: 14 },
                    transition: { duration: 0.3 },
                  };

                  // Linked top-level item (Home, About)
                  if (item.to) {
                    return (
                      <span key={item.label} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
                        <Link to={item.to} {...sharedProps} style={parentStyle}>{item.label}</Link>
                      </span>
                    );
                  }

                  // Parent header with children (How It Works) or placeholder (Programmes)
                  return (
                    <div key={item.label} style={{ display: 'block' }}>
                      <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
                        <span
                          variants={linkVariants}
                          style={parentStyle}
                        >{item.label}</span>
                      </span>
                      {item.children && (
                        <div style={{
                          marginTop: 'clamp(4px, 0.6vw, 8px)',
                          marginBottom: 'clamp(8px, 1vw, 12px)',
                          paddingLeft: 'clamp(20px, 3vw, 40px)',
                          display: 'flex', flexDirection: 'column',
                          gap: 'clamp(2px, 0.3vw, 4px)',
                        }}>
                          {item.children.map((child) => (
                            <span key={child.label} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
                              <Link
                                to={child.to}
                                {...sharedProps}
                                style={childStyle}
                              >{child.label}</Link>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', gap: 32,
                textAlign: 'right',
              }}>
                <nav
                  
                  
                  style={{
                    display: 'flex', flexDirection: 'column',
                    gap: 'clamp(2px, 0.4vw, 4px)',
                  }}
                >
                  {secondaryLinks.map(({ label, href, to }) => {
                    const linkStyle = {
                      display: 'block',
                      fontFamily: theme.display,
                      fontSize: 'clamp(20px, 2.6vw, 38px)',
                      lineHeight: 1.05, letterSpacing: '-0.005em',
                      color: theme.ink, textDecoration: 'none',
                      textTransform: 'uppercase',
                      fontWeight: 900,
                    };
                    const motionProps = {
                      variants: linkVariants,
                      onClick: () => setOpen(false),
                      'data-cursor': 'grow',
                      whileHover: { x: -10 },
                      transition: { duration: 0.3 },
                      style: linkStyle,
                    };
                    return (
                      <span key={label} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
                        {to ? (
                          <Link to={to} {...motionProps}>{label}</Link>
                        ) : (
                          <a href={href} {...motionProps}>{label}</a>
                        )}
                      </span>
                    );
                  })}
                </nav>

                <div>
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
                      <a
                        key={s.name}
                        href={s.href}
                        aria-label={s.name}
                        data-cursor="grow"
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          width: 36, height: 36, borderRadius: '50%',
                          border: `1px solid ${theme.borderLight}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: theme.ink, textDecoration: 'none',
                        }}
                      >{s.icon}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
