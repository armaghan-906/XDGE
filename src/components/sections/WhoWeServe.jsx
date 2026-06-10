import { useState } from 'react';
import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { Magnetic } from '../Magnetic';

const cards = [
  { year: 'The XDGE', t: 'Early Career & Professional Advantage', d: '', img: '/assets/graduates-card.webp' },
  { year: 'The XDGE', t: 'University Entry Edge', d: '', img: '/assets/serve-02.webp' },
  { year: 'The XDGE', t: 'School Entry Edge', d: '', img: '/assets/school-entry-edge.png' },
  { year: 'The XDGE', t: 'Early Leadership Foundations', d: '', img: '/assets/serve-04.webp' },
];

function ServeCard({ card, index, hovered, onEnter, onLeave }) {
  const isHovered = hovered === index;

  return (
    <motion.a
      href="#"
      variants={fadeUp}
      data-cursor="grow"
      className="xg-glass-solid xg-tilt"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        textDecoration: 'none',
        color: theme.base,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 4,
      }}
    >
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '4/3',
        background: '#0e0e0e',
      }}>
        <motion.div
          variants={{
            hidden: { scale: 1.15 },
            visible: { scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        >
          <motion.img
            src={card.img}
            alt={card.t}
            loading="eager"
            decoding="async"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              willChange: 'transform',
            }}
          />
        </motion.div>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              padding: '10px 18px',
              background: theme.dark,
              color: theme.base,
              borderRadius: 4,
              fontSize: 13, fontWeight: 500, letterSpacing: '0.02em',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >View Project →</motion.div>
        </div>
      </div>

      <div style={{
        padding: 'clamp(24px, 3vw, 32px)',
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(16px, 2.5vw, 24px)',
        flex: 1,
      }}>
        <div style={{ fontSize: 12, color: theme.subtitle, letterSpacing: '0.04em' }}>
          {card.year}
        </div>
        <h3 style={{
          fontFamily: theme.display,
          fontSize: 'clamp(28px, 3.6vw, 48px)',
          lineHeight: 1.0,
          margin: 0,
          letterSpacing: '-0.01em',
          fontWeight: 900,
          textTransform: 'uppercase',
          flex: 1,
        }}>
          {card.t}
        </h3>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', gap: 16,
        }}>
          <p style={{
            fontSize: 13, color: theme.subtitle,
            lineHeight: 1.55, margin: 0, maxWidth: 280,
          }}>
            {card.d}
          </p>
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              borderColor: isHovered ? theme.base : theme.borderDark,
            }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              borderWidth: 1, borderStyle: 'solid', borderColor: theme.borderDark,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, color: theme.base, flexShrink: 0,
            }}
          >↗</motion.div>
        </div>
      </div>
    </motion.a>
  );
}

import { VideoBackground } from '../primitives/VideoBackground';

export function WhoWeServe() {
  const [hovered, setHovered] = useState(null);

  return (
    <section data-screen-label="05 Who We Serve" data-section-theme="dark" style={{
      background: theme.dark, color: theme.base,
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px) clamp(56px, 8vw, 100px)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-end', marginBottom: 'clamp(32px, 6vw, 56px)' }}>
          <div>
            <SplitHeading
              lines={['WHO IS', 'IT FOR']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(48px, 12vw, 180px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
              }}
            />
          </div>
          <motion.div variants={fadeUp} style={{ paddingBottom: 24 }}>
            <div style={{
              fontSize: 12, letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: theme.base, marginBottom: 14,
              fontWeight: 700, lineHeight: 1.35,
              maxWidth: 460,
            }}>
              For Young People 12&ndash;24 Building Their Next Step Advantage
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: '0 0 24px', color: theme.subtitle, maxWidth: 480 }}>
              XDGE helps ambitious young people build the confidence,
              leadership skills, and professional edge to stand out in school,
              university, career, business, and life.
            </p>
            <Magnetic strength={0.3}>
              <a
                href="#"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px',
                  border: `1px solid ${theme.base}`, borderRadius: 999, color: theme.base,
                  textDecoration: 'none', fontSize: 13, fontWeight: 500,
                }}
              >View All Programmes <span style={{ fontSize: 16 }}>→</span></a>
            </Magnetic>
          </motion.div>
        </Group>

        <Group className="xg-2" style={{ gap: 24 }}>
          {cards.map((c, i) => (
            <ServeCard
              key={i}
              card={c}
              index={i}
              hovered={hovered}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </Group>
      </div>
    </section>
  );
}
