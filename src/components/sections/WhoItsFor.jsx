import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { useCanHover } from '../../hooks/useMediaQuery';
import { FloatingVideo } from '../primitives/FloatingVideo';

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
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const canHover = useCanHover();

  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start end", "end start"]
  });

  // Increased range for a much more noticeable parallax effect
  const imgY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <section
      ref={sectionRef}
      data-screen-label="03 Who It's For"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        padding: 'clamp(120px, 15vw, 240px) clamp(20px, 4vw, 40px) clamp(56px, 8vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <FloatingVideo 
          src="/assets/videos/lightning_3.mp4" 
          style={{ 
            top: '-20%', 
            left: '-10%', 
            opacity: 0.6, 
            mixBlendMode: 'screen', 
            transform: 'scale(1.8)', 
            zIndex: -1 
          }} 
        />
        <Group className="xg-2" style={{ alignItems: 'flex-end', marginBottom: 'clamp(32px, 6vw, 56px)' }}>
          <div>
            <motion.div
              variants={fadeUp}
              style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: theme.subtitle, marginBottom: 28 }}
            >(WHO IT'S FOR)</motion.div>
            <SplitHeading
              lines={['WHO', "IT'S FOR"]}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(45px, 7vw, 108px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
              }}
            />
          </div>
          <motion.div variants={fadeUp} style={{ paddingBottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h3 style={{ 
              fontSize: 'clamp(20px, 2.5vw, 28px)', 
              lineHeight: 1.2, 
              marginBottom: 16, 
              fontFamily: theme.displayTight, 
              color: theme.base,
              maxWidth: 520 
            }}>
              For Young People 12–24 Building Their Next Step Advantage
            </h3>
            <p style={{ fontSize: 17, lineHeight: 1.55, margin: '0 0 24px', maxWidth: 520, color: theme.subtitle }}>
              XDGE helps ambitious young people build the confidence, leadership skills, and professional edge to stand out in school, university, career, business, and life.
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

        <Group ref={cardsRef} className="xg-3 xg-stagger-cards-25" onMouseLeave={canHover ? () => setHovered(null) : undefined} style={{ position: 'relative', zIndex: 10, paddingBottom: '25%' }}>
          {items.map((it, i) => {
            const isFocused = canHover && hovered === i;
            return (
              <motion.div key={i} variants={fadeUp}>
                <motion.div
                  data-cursor="grow"
                  onMouseEnter={canHover ? () => setHovered(i) : undefined}
                  animate={canHover ? {
                    opacity: isFocused ? 1 : 0.35,
                    scale: isFocused ? 1.04 : 0.97,
                    y: isFocused ? -6 : 0,
                    filter: isFocused ? 'blur(0px)' : 'blur(2px)',
                    borderColor: isFocused ? theme.base : theme.borderDark,
                  } : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', borderColor: theme.borderDark }}
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
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <motion.img
                      src={`/assets/service-0${i + 1}.jpg`}
                      alt={it.t}
                      loading="eager"
                      // Stop any parent variants from breaking the scroll transform
                      inherit={false}
                      style={{
                        position: 'absolute',
                        top: '-25%', // Match the -25% start value
                        left: 0,
                        width: '100%',
                        height: '150%', // Must be tall enough to travel without showing gaps
                        objectFit: 'cover',
                        y: imgY,
                      }}
                    />
                  </div>
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
