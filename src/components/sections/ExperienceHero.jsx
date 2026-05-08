import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme } from '../../theme';

function ExperienceHeading({ y, opacity }) {
  return (
    <motion.h1
      style={{
        y, opacity,
        fontFamily: theme.display, fontWeight: 900,
        fontSize: 'clamp(56px, 16vw, 240px)',
        lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0,
        color: theme.base, display: 'block',
        overflow: 'hidden',
        paddingBottom: '0.06em',
      }}
    >
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.35 }}
        style={{ display: 'inline-block' }}
      >EXPERIENCE.</motion.span>
    </motion.h1>
  );
}

export function ExperienceHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.4]);

  return (
    <section
      ref={ref}
      data-screen-label="01 Experience Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        flex: 1,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(40px, 6vw, 64px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 32,
      }}>
        <div style={{ marginTop: 24, position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: theme.display, fontWeight: 700,
              fontSize: 'clamp(22px, 2.8vw, 40px)',
              lineHeight: 1, letterSpacing: '-0.01em',
              color: theme.base,
              marginBottom: 'clamp(8px, 1.5vw, 16px)',
              textTransform: 'capitalize',
            }}
          >
            The
          </motion.div>
          <ExperienceHeading y={y} opacity={opacity} />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{
              fontFamily: theme.display, fontWeight: 700,
              fontSize: 'clamp(20px, 3.2vw, 48px)',
              lineHeight: 1.1, letterSpacing: '-0.01em',
              color: theme.base,
              marginTop: 'clamp(14px, 2vw, 32px)',
              textTransform: 'uppercase',
              maxWidth: '24ch',
            }}
          >
            Leadership develops through experience, challenge, and guided progression.
          </motion.div>
        </div>

        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(12px, 1.8vw, 20px)',
              maxWidth: 520,
            }}
          >
            <div style={{
              fontSize: 12, letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: theme.subtitle,
            }}>
              What It&rsquo;s Like
            </div>
            <p style={{
              fontSize: 'clamp(20px, 2.4vw, 30px)',
              lineHeight: 1.32,
              color: theme.base,
              margin: 0,
              fontWeight: 500,
              letterSpacing: '-0.005em',
            }}>
              Develop Your Leadership Edge
            </p>
            <p style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              lineHeight: 1.5,
              color: theme.subtitle,
              margin: 0,
            }}>
              A high-standard experience designed to elevate your performance to the next level.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
