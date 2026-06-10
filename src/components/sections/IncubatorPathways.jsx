import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';

const items = [
  {
    name: 'Business Incubator',
    desc: 'Develop and launch ventures with expert mentorship.',
  },
  {
    name: 'Research Incubator',
    desc: 'Build academic and applied research portfolios that impress universities.',
  },
  {
    name: 'Tech & Bio Incubator',
    desc: 'Innovate in emerging technologies and life sciences.',
  },
  {
    name: 'Leadership Incubator',
    desc: 'Tackle real leadership challenges and deliver measurable impact.',
  },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

export function IncubatorPathways() {
  return (
    <section
      data-screen-label="Incubator Pathways"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(72px, 11vw, 140px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(40px, 6vw, 88px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.4vw, 18px)' }}>
            <h2
              variants={fadeUp}
              style={{
                fontFamily: theme.displayTight,
                fontWeight: 600,
                fontSize: 'clamp(36px, 5.5vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0,
                color: theme.base,
              }}
            >
              Entrepreneur &amp; Incubator Pathways
            </h2>
            <div
              variants={fadeUp}
              style={{
                fontFamily: theme.body,
                fontSize: 'clamp(14px, 1.4vw, 16px)',
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: theme.base,
              }}
            >
              12-16 weeks &middot; 24 sessions
            </div>
          </div>

          <div
            variants={fadeUp}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 2.4vw, 28px)',
              maxWidth: 560,
            }}
          >
            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              fontWeight: 700,
              lineHeight: 1.45,
              margin: 0,
              color: theme.base,
            }}>
              Real-world programmes where students turn ideas into tangible results and apply skills with purpose:
            </p>

            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(16px, 2vw, 22px)',
            }}>
              {items.map((it) => (
                <li
                  key={it.name}
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: fadeEase }}
                  style={{
                    fontFamily: theme.body,
                    fontSize: 'clamp(15px, 1.55vw, 17px)',
                    lineHeight: 1.55,
                    color: theme.base,
                  }}
                >
                  <strong style={{ fontWeight: 700 }}>{it.name}</strong>
                  <span style={{ color: theme.subtitle }}> &mdash; {it.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </Group>
      </div>
    </section>
  );
}
