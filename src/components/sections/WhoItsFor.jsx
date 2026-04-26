import { useState } from 'react';
import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { Img } from '../primitives/Img';
import { SplitHeading } from '../primitives/SplitHeading';

const items = [
  {
    n: '(01)',
    t: 'Graduates & Early Career',
    d: 'For individuals preparing to step into competitive careers and perform at a higher level. You develop the thinking, behaviours, and execution required to stand out, deliver, and position yourself with confidence.',
  },
  {
    n: '(02)',
    t: 'University Entrance & Acceleration',
    d: 'For those aiming for top universities or looking to maximise their experience once there. You build a strong profile, develop real capability, and learn how to perform in competitive academic environments.',
  },
  {
    n: '(03)',
    t: 'School Entry & Early Leadership',
    d: 'For students preparing for competitive school entry and early leadership development. You build confidence, discipline, and leadership capability early, creating strong foundations for future success.',
  },
];

export function WhoItsFor() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      data-screen-label="03 Who It's For"
      style={{ background: theme.dark, color: theme.base, padding: '120px 40px 100px' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <motion.div
              variants={fadeUp}
              style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.subtitle, marginBottom: 28 }}
            >(WHO IT'S FOR)</motion.div>
            <SplitHeading
              lines={['WHO', "IT'S FOR"]}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(96px, 14vw, 220px)',
                lineHeight: 0.95, letterSpacing: '-0.01em',
              }}
            />
          </div>
          <motion.div variants={fadeUp} style={{ paddingBottom: 24 }}>
            <p style={{ fontSize: 17, lineHeight: 1.55, margin: '0 0 24px', maxWidth: 480 }}>
              For those who need to build high-level capability and confidence to perform
              at their next level.
            </p>
            <motion.a
              whileHover={{ x: 4 }}
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px',
                border: `1px solid ${theme.base}`, borderRadius: 999, color: theme.base,
                textDecoration: 'none', fontSize: 13, fontWeight: 500,
              }}
            >XDGE Programmes <span style={{ fontSize: 16 }}>→</span></motion.a>
          </motion.div>
        </Group>

        <Group
          onMouseLeave={() => setHovered(null)}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {items.map((it, i) => {
            const isFocused = hovered === i;
            return (
              <motion.div key={i} variants={fadeUp}>
                <motion.div
                  data-cursor="grow"
                  onMouseEnter={() => setHovered(i)}
                  animate={{
                    opacity: isFocused ? 1 : 0.35,
                    scale: isFocused ? 1.04 : 0.97,
                    y: isFocused ? -6 : 0,
                    filter: isFocused ? 'blur(0px)' : 'blur(2px)',
                    borderColor: isFocused ? theme.base : theme.borderDark,
                  }}
                  transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: theme.borderDark,
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    background: theme.dark,
                    cursor: 'pointer',
                    transformOrigin: 'center',
                  }}
                >
                  <Img src={`/assets/service-0${i + 1}.jpg`} alt={it.t} ratio="4/3" />
                  <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 12, color: theme.subtitle, letterSpacing: '0.06em' }}>{it.n}</div>
                      <motion.div
                        animate={{ opacity: isFocused ? 1 : 0, x: isFocused ? 0 : -4 }}
                        transition={{ duration: 0.35 }}
                        style={{
                          fontSize: 11, color: theme.accent, letterSpacing: '0.12em',
                          textTransform: 'uppercase', fontWeight: 600,
                        }}
                      >View ●</motion.div>
                    </div>
                    <h3 style={{ fontFamily: theme.display, fontSize: 26, lineHeight: 1.05, margin: 0, fontWeight: 400, letterSpacing: '0.005em' }}>
                      {it.t}
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.55, color: theme.subtitle, margin: 0 }}>{it.d}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </Group>
      </div>
    </section>
  );
}
