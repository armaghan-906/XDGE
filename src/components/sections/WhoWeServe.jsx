import { useState } from 'react';
import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const cards = [
  { year: '2024', t: 'University Incubator Programme', d: 'Distinctive Profile, Core Project, Capstone Presentation, Evidence Portfolio' },
  { year: '2024', t: 'University Preparation', d: 'Visual Identity, Brand Strategy, Web design' },
  { year: '2024', t: 'School Entry', d: 'Visual Identity' },
  { year: '2024', t: 'Junior MBA', d: 'Distinctive Profile, Capstone Presentation, Evidence Portfolio' },
];

export function WhoWeServe() {
  const [hovered, setHovered] = useState(null);

  return (
    <section data-screen-label="05 Who We Serve" style={{
      background: theme.dark, color: theme.base,
      padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px) clamp(56px, 8vw, 100px)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-end', marginBottom: 'clamp(32px, 6vw, 56px)' }}>
          <div>
            <motion.div
              variants={fadeUp}
              style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.subtitle, marginBottom: 28 }}
            >(WHO WE SERVE)</motion.div>
            <SplitHeading
              lines={['WHO WE', 'SERVE']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(56px, 14vw, 220px)',
                lineHeight: 0.95, letterSpacing: '-0.01em',
              }}
            />
          </div>
          <motion.div variants={fadeUp} style={{ paddingBottom: 24 }}>
            <div style={{ fontSize: 12, letterSpacing: '0.06em', color: theme.subtitle, marginBottom: 12 }}>
              Corporate-Style Leadership Development
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 24px', color: theme.subtitle, maxWidth: 480 }}>
              XDGE prepares graduates and young students for their next competitive step:
              professional careers, elite internships, top universities, and selective schools.
              Participants develop the confidence, character, tools, and skills required to
              perform at the leadership standard expected at the next level.
            </p>
            <motion.a
              whileHover={{ x: 4 }}
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px',
                border: `1px solid ${theme.base}`, borderRadius: 999, color: theme.base,
                textDecoration: 'none', fontSize: 13, fontWeight: 500,
              }}
            >View All Programmes <span style={{ fontSize: 16 }}>→</span></motion.a>
          </motion.div>
        </Group>

        <Group style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {cards.map((c, i) => (
            <motion.a
              key={i}
              href="#"
              variants={fadeUp}
              data-cursor="grow"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="xg-serve-row"
              style={{
                textDecoration: 'none',
                color: theme.base,
                border: `1px solid ${theme.borderDark}`,
                overflow: 'hidden',
                background: theme.dark,
              }}
            >
              <div style={{
                padding: 'clamp(28px, 4vw, 40px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                gap: 'clamp(20px, 3vw, 32px)',
                minHeight: 320,
              }}>
                <div style={{ fontSize: 12, color: theme.subtitle, letterSpacing: '0.04em' }}>
                  {c.year}
                </div>
                <h3 style={{
                  fontFamily: theme.display,
                  fontSize: 'clamp(32px, 5vw, 72px)',
                  lineHeight: 1.0,
                  margin: 0,
                  letterSpacing: '-0.01em',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                }}>
                  {c.t}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
                  <p style={{ fontSize: 13, color: theme.subtitle, lineHeight: 1.55, margin: 0, maxWidth: 280 }}>
                    {c.d}
                  </p>
                  <motion.div
                    animate={{ scale: hovered === i ? 1.1 : 1, borderColor: hovered === i ? theme.base : theme.borderDark }}
                    transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                    style={{
                      width: 44, height: 44, borderRadius: '50%',
                      borderWidth: 1, borderStyle: 'solid', borderColor: theme.borderDark,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, color: theme.base, flexShrink: 0,
                    }}
                  >↗</motion.div>
                </div>
              </div>

              <div className="xg-serve-img" style={{ position: 'relative', overflow: 'hidden', background: '#0e0e0e' }}>
                <motion.img
                  src="/assets/program-01.png"
                  alt={c.t}
                  animate={{ scale: hovered === i ? 1.06 : 1 }}
                  transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  pointerEvents: 'none',
                }}>
                  <motion.div
                    animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 8 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                    style={{
                      padding: '10px 18px',
                      background: theme.base,
                      color: theme.ink,
                      borderRadius: 4,
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: '0.02em',
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}
                  >View Project →</motion.div>
                </div>
              </div>
            </motion.a>
          ))}
        </Group>
      </div>
    </section>
  );
}
