import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { theme, fadeUp, stagger } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { Magnetic } from '../Magnetic';

const cards = [
  { year: 'The XDGE', t: 'Early Career & Professional Advantage', d: '', img: '/assets/graduates-card.webp' },
  { year: 'The XDGE', t: 'University Entry Edge', d: '', img: '/assets/serve-02.webp' },
  { year: 'The XDGE', t: 'School Entry Edge', d: '', img: '/assets/school-entry-edge.jpg' },
  { year: 'The XDGE', t: 'Early Leadership Foundations', d: '', img: '/assets/serve-04.webp' },
];

function ServeCard({ card, index, hovered, onEnter, onLeave, style }) {
  const isHovered = hovered === index;
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <motion.a
      ref={cardRef}
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
        ...style,
      }}
    >
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '4/3',
        background: '#000000',
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
              position: 'absolute',
              top: '-25%',
              left: 0,
              width: '100%', 
              height: '150%',
              objectFit: 'cover',
              willChange: 'transform',
              y: imgY,
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
          fontSize: 'clamp(24px, 3vw, 36px)',
          lineHeight: 1.05,
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

import { FloatingVideo } from '../primitives/FloatingVideo';

export function WhoWeServe() {
  const [hovered, setHovered] = useState(null);

  return (
    <section data-screen-label="05 Who We Serve" data-section-theme="dark" style={{
      background: theme.dark, color: theme.base,
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(64px, 7.5vw, 96px) clamp(20px, 4vw, 40px) clamp(56px, 6vw, 80px)',
    }}>
      <FloatingVideo 
        src="/assets/videos/thunder_1.mp4" 
        style={{ top: '35%', right: '-10%', opacity: 0.6, mixBlendMode: 'screen', transform: 'scale(1.5)', zIndex: 0 }} 
      />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <Group style={{ display: 'flex', flexDirection: 'column', marginBottom: 'clamp(32px, 6vw, 56px)' }}>
          <div style={{ position: 'relative', alignSelf: 'center', textAlign: 'center', padding: '40px 0' }}>
            <FloatingVideo 
              src="/assets/videos/lightning_3.mp4" 
              style={{ 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%) scale(1.5)', 
                opacity: 0.6, 
                mixBlendMode: 'screen', 
                zIndex: -1 
              }} 
            />
            <motion.h2
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(45px, 7vw, 90px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
                margin: 0, textTransform: 'uppercase'
              }}
            >
              <motion.span variants={fadeUp} style={{ display: 'block' }}>
                <span className="cyan-text" style={{ paddingRight: '0.2em' }}>WHO</span>
                <span className="hollow-text">IS IT FOR</span>
              </motion.span>
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} style={{ 
            alignSelf: 'flex-end', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end', 
            textAlign: 'right',
            marginTop: 'clamp(16px, 3vw, 32px)',
            maxWidth: 500
          }}>
            <h3 style={{
              fontSize: 'clamp(18px, 2.2vw, 24px)', 
              lineHeight: 1.3,
              marginBottom: 16,
              fontFamily: theme.displayTight,
              color: theme.base,
              fontWeight: 700
            }}>
              For Young People 12&ndash;24 Building Their Next Step Advantage
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.6, margin: '0 0 24px', color: theme.subtitle }}>
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

        <Group className="xg-2" style={{ gap: 'clamp(24px, 4vw, 40px)', alignItems: 'flex-start' }}>
          {cards.map((c, i) => (
            <ServeCard
              key={i}
              card={c}
              index={i}
              hovered={hovered}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
              style={{ 
                width: '80%', 
                margin: '0 auto',
                marginTop: i % 2 !== 0 ? 'clamp(40px, 8vw, 100px)' : 0 
              }}
            />
          ))}
        </Group>
      </div>
    </section>
  );
}
