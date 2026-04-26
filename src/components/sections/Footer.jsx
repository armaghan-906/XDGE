import { motion } from 'framer-motion';
import { theme } from '../../theme';

const companyLinks = ['Home', 'Programmes', "Who It's For", 'Contact'];
const resourceLinks = ['Insights', 'Outcomes', 'Apply', 'FAQ'];

export function Footer() {
  return (
    <footer
      data-screen-label="09 Footer"
      style={{
        background: theme.dark, color: theme.base, paddingTop: 0,
        overflow: 'hidden', borderTop: `1px solid ${theme.borderDark}`,
      }}
    >
      <motion.div
        initial={{ x: '5%' }}
        whileInView={{ x: '-15%' }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        style={{
          fontFamily: theme.display, fontWeight: 900,
          fontSize: 'clamp(120px, 22vw, 360px)',
          lineHeight: 0.95, letterSpacing: '-0.01em',
          whiteSpace: 'nowrap', padding: '64px 0 32px',
        }}
      >XDGE · LEADERSHIP ·</motion.div>
      <div style={{ height: 1, background: theme.borderDark }} />
      <div
        style={{
          maxWidth: 1280, margin: '0 auto', padding: '48px 40px 0',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: theme.subtitle, marginBottom: 12, letterSpacing: '0.08em' }}>HEAD OFFICE</div>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            6F Harbourside View Building,<br />
            3-2-4 Anchor Road, Bristol,<br />
            BS1 5UH, United Kingdom
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: theme.subtitle, marginBottom: 12, letterSpacing: '0.08em' }}>COMPANY</div>
          {companyLinks.map((l) => (
            <div key={l} style={{ fontSize: 13, lineHeight: 1.9 }}>
              <a href="#" style={{ color: theme.base, textDecoration: 'none', opacity: 0.85 }}>{l}</a>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 11, color: theme.subtitle, marginBottom: 12, letterSpacing: '0.08em' }}>RESOURCES</div>
          {resourceLinks.map((l) => (
            <div key={l} style={{ fontSize: 13, lineHeight: 1.9 }}>
              <a href="#" style={{ color: theme.base, textDecoration: 'none', opacity: 0.85 }}>{l}</a>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 11, color: theme.subtitle, marginBottom: 12, letterSpacing: '0.08em' }}>NEWSLETTER</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: theme.subtitle, marginBottom: 14 }}>
            Subscribe for thinking on leadership, mindset and performance.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              placeholder="Enter your email"
              style={{
                flex: 1, padding: '11px 14px',
                background: 'transparent', border: `1px solid ${theme.borderDark}`,
                color: theme.base, fontSize: 13, outline: 'none', borderRadius: 4,
              }}
            />
            <motion.button
              whileHover={{ background: '#84a5d3' }}
              style={{
                padding: '11px 18px', background: theme.accent, border: 'none',
                color: theme.base, fontSize: 13, cursor: 'pointer', fontWeight: 500,
                borderRadius: 4,
              }}
            >Subscribe</motion.button>
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1280, margin: '0 auto', padding: '48px 40px 32px',
          display: 'flex', justifyContent: 'space-between', fontSize: 11, color: theme.subtitle,
        }}
      >
        <div>©2026 XDGE — All rights reserved</div>
        <div>Crafted with React + Framer Motion</div>
      </div>
    </footer>
  );
}
