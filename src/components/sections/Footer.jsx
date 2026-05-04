import { motion } from 'framer-motion';
import { theme } from '../../theme';

const companyLinks = ['Home', 'Projects', 'Services', 'Contact Us'];
const resourceLinks = ['Blog', 'Join Us', 'Studio', 'FAQ'];
const socials = ['LinkedIn', 'Instagram', 'Facebook', 'Behance'];

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
      {/* Marquee wordmark */}
      <div style={{
        overflow: 'hidden',
        padding: 'clamp(40px, 6vw, 64px) 0 clamp(24px, 4vw, 40px)',
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
          <span style={{ paddingRight: '0.35em' }}>XDGE · LEADERSHIP ·</span>
          <span style={{ paddingRight: '0.35em' }}>XDGE · LEADERSHIP ·</span>
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
            <div style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.6, color: theme.base }}>
              6F Harbourside View Building,<br />
              3-2-4 Anchor Road, Bristol, BS1<br />
              5UH, United Kingdom
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
                  key={s}
                  href="#"
                  data-cursor="grow"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: `1px solid ${theme.borderDark}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                    color: theme.base, textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}
                >{s.slice(0, 2)}</motion.a>
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
                <div key={l} style={{ fontSize: 14, lineHeight: 2.1 }}>
                  <a href="#" style={{ color: theme.base, textDecoration: 'none' }}>{l}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{
                fontSize: 11, color: theme.subtitle, marginBottom: 16,
                letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>Resources</div>
              {resourceLinks.map((l) => (
                <div key={l} style={{ fontSize: 14, lineHeight: 2.1 }}>
                  <a href="#" style={{ color: theme.base, textDecoration: 'none' }}>{l}</a>
                </div>
              ))}
            </div>
          </div>

          <div className="xg-footer-right" style={{ maxWidth: 380 }}>
            <div style={{
              fontSize: 11, color: theme.subtitle, marginBottom: 16,
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>Newsletter</div>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: theme.base, marginBottom: 18 }}>
              Subscribe to get the latest insights<br />
              straight to your inbox.
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
