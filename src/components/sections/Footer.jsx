import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme } from '../../theme';

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'How It Works', to: '/the-experience' },
];
const resourceLinks = [
  { label: 'FAQ', href: '#' },
  { label: 'Contact', to: '/contact' },
  { label: 'Apply', to: '/apply' },
];

const socials = [
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

const phoneIcon = (
  <svg
    width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export function Footer() {
  return (
    <footer
      data-screen-label="09 Footer"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base, paddingTop: 0,
        overflow: 'hidden', borderTop: `1px solid ${theme.borderDark}`,
      }}
    >
      {/* Marquee wordmark — CSS keyframe animation runs on the compositor
          thread (independent of main-thread JS). Removed background-clip:text
          since it forced re-rasterization of every glyph on every frame the
          element moved, which combined with JS animation caused the tearing
          / "behind" effect. Solid white text now translates on the GPU. */}
      <div style={{
        overflow: 'hidden',
        padding: 'clamp(40px, 6vw, 64px) 0 clamp(24px, 4vw, 40px)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        maskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
      }}>
        <div
          className="xdge-footer-marquee"
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(72px, 15vw, 220px)',
            lineHeight: 0.95, letterSpacing: '-0.01em',
            color: theme.base,
          }}
        >
          <span style={{ paddingRight: '0.35em' }}>CAREER · UNIVERSITY · SCHOOL ·</span>
          <span style={{ paddingRight: '0.35em' }}>CAREER · UNIVERSITY · SCHOOL ·</span>
        </div>
      </div>

      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(20px, 4vw, 40px)',
      }}>
        {/* Row 1: HEAD OFFICE  ·  FOLLOW US */}
        <div className="xg-2" style={{
          gap: 'clamp(32px, 6vw, 80px)',
          paddingBottom: 'clamp(48px, 8vw, 88px)',
        }}>
          <div>
            <div style={{
              fontSize: 11, color: theme.subtitle, marginBottom: 14,
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>Head Office</div>
            <div style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.6, color: theme.base, marginBottom: 24 }}>
              71-75 Shelton Street,<br />
              Covent Garden,<br />
              London. WC2H 9JQ
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                border: `1px solid ${theme.borderDark}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: theme.base, flexShrink: 0,
              }}>{phoneIcon}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: theme.base }}>
                <div>UK: 07309 423777</div>
                <div>USA: 619 983 8853</div>
              </div>
            </div>
          </div>

          <div className="xg-footer-right">
            <div style={{
              fontSize: 11, color: theme.subtitle, marginBottom: 14,
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>Follow Us</div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  data-cursor="grow"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: `1px solid ${theme.borderDark}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: theme.base, textDecoration: 'none',
                  }}
                >{s.icon}</motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: COMPANY · RESOURCES (left side) ·  NEWSLETTER (right) */}
        <div className="xg-2" style={{
          gap: 'clamp(32px, 6vw, 80px)',
          paddingBottom: 'clamp(48px, 6vw, 64px)',
          alignItems: 'flex-start',
        }}>
          <div className="xg-2" style={{ gap: 'clamp(32px, 5vw, 64px)' }}>
            <div>
              <div style={{
                fontSize: 11, color: theme.subtitle, marginBottom: 16,
                letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>Company</div>
              {companyLinks.map((l) => (
                <div key={l.label} style={{ fontSize: 14, lineHeight: 2.1 }}>
                  {l.to ? (
                    <Link to={l.to} style={{ color: theme.base, textDecoration: 'none' }}>{l.label}</Link>
                  ) : (
                    <a href={l.href} style={{ color: theme.base, textDecoration: 'none' }}>{l.label}</a>
                  )}
                </div>
              ))}
            </div>
            <div>
              <div style={{
                fontSize: 11, color: theme.subtitle, marginBottom: 16,
                letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>Resources</div>
              {resourceLinks.map((l) => (
                <div key={l.label} style={{ fontSize: 14, lineHeight: 2.1 }}>
                  {l.to ? (
                    <Link to={l.to} style={{ color: theme.base, textDecoration: 'none' }}>{l.label}</Link>
                  ) : (
                    <a href={l.href} style={{ color: theme.base, textDecoration: 'none' }}>{l.label}</a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="xg-footer-right" style={{ maxWidth: 380 }}>
            <div style={{
              fontSize: 11, color: theme.subtitle, marginBottom: 16,
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>Insights</div>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: theme.base, marginBottom: 18 }}>
              Stay ahead with leadership insights<br />
              that drive performance.
            </div>
            <div style={{ marginBottom: 14 }}>
              <input
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '12px 0',
                  background: 'transparent', border: 'none',
                  borderBottom: `1px solid ${theme.borderDark}`,
                  color: theme.base, fontSize: 14, outline: 'none', borderRadius: 0,
                }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: '#3a3c40', border: 'none',
                color: theme.base, fontSize: 14, cursor: 'pointer', fontWeight: 500,
                borderRadius: 4,
              }}
            >Subscribe</motion.button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: theme.borderDark }} />

        {/* Bottom row */}
        <div style={{
          padding: 'clamp(20px, 3vw, 28px) 0 clamp(20px, 3vw, 28px)',
          display: 'flex', justifyContent: 'space-between',
          fontSize: 12, color: theme.subtitle,
          gap: 12, flexWrap: 'wrap',
        }}>
          <div>©2026 XDGE — All rights reserved</div>
          <div>Crafted with React + Framer Motion</div>
        </div>
      </div>
    </footer>
  );
}
