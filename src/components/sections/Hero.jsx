import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme } from '../../theme';
import { HeroMotion } from '../HeroMotion';

function HeroHeading({ y, opacity }) {
  return (
    <motion.h1
      style={{
        y, opacity,
        fontFamily: theme.display, fontWeight: 900,
        fontSize: 'clamp(100px, 26vw, 420px)',
        lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0,
        color: theme.base, display: 'block',
        overflow: 'hidden',
        paddingBottom: '0.06em',
      }}
    >
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
        style={{ display: 'inline-block' }}
      >XDGE</motion.span>
    </motion.h1>
  );
}

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.4]);

  return (
    <section
      ref={ref}
      data-screen-label="01 Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <HeroMotion variant="ascend" />
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
            transition={{ duration: 0.4, delay: 0.05 }}
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
          <HeroHeading y={y} opacity={opacity} />
          <motion.h4
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            style={{
              display: 'block',
              marginBlockStart: '1.33em',
              marginBlockEnd: '1.33em',
              marginInlineStart: 0,
              marginInlineEnd: 0,
              fontFamily: theme.displayTight,
              fontWeight: 'bold',
              fontSize: 'clamp(28px, 5.5vw, 76px)',
              lineHeight: 1.1, letterSpacing: '-0.01em',
              color: theme.base,
              maxWidth: '20ch',
              unicodeBidi: 'isolate',
            }}
          >
            Lead Your Own Opportunities
          </motion.h4>
        </div>

        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(16px, 2.5vw, 28px)',
              maxWidth: 520,
            }}
          >
            <p style={{
              fontFamily: '"Inter", "Inter Display", "Inter Placeholder", sans-serif',
              fontSize: 40,
              lineHeight: '1.17em',
              letterSpacing: '0em',
              color: theme.base,
              margin: 0,
              fontWeight: 400,
              textAlign: 'left',
            }}>
              Build The Leader Behind What Inspires You.
            </p>
            <p style={{
              fontFamily: '"Inter", "Inter Display", "Inter Placeholder", sans-serif',
              fontSize: 28,
              lineHeight: 1.3,
              letterSpacing: '0em',
              color: theme.subtitle,
              margin: 0,
              fontWeight: 400,
            }}>
              Professional Leadership Development Reengineered for Ages 12&ndash;24+
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
