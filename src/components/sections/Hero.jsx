import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme } from '../../theme';

function HeroHeading({ y, opacity }) {
  return (
    <motion.h1
      style={{
        y, opacity,
        fontFamily: theme.display, fontWeight: 900,
        fontSize: 'clamp(100px, 24vw, 440px)',
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
      >XDGE.</motion.span>
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
      <div style={{
        flex: 1,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(32px, 6vw, 48px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 32,
      }}>
        <div style={{ marginTop: 24, position: 'relative' }}>
          <HeroHeading y={y} opacity={opacity} />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{ fontSize: 13, fontWeight: 600, color: theme.base, marginTop: 18, letterSpacing: '0.01em' }}
          >
            Get the Leadership Edge That Sets You Apart
          </motion.div>
        </div>

        <div className="xg-hero-body" style={{ marginTop: 16 }}>
          <div className="xg-hide-md" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.55, color: theme.base, maxWidth: 460 }}
          >
            <p style={{ margin: 0 }}>
              The XDGE — corporate leadership development, redesigned for ages 12–24.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 24, gap: 16, flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: `1px solid ${theme.base}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'serif', fontSize: 14, color: theme.base,
                flexShrink: 0, lineHeight: 1,
              }}
            >X</div>
            <div style={{ fontSize: 13, color: theme.base, letterSpacing: '0.01em' }}>
              Build the leader behind what drives you
            </div>
          </div>
          <motion.a
            whileHover={{ x: 4 }}
            href="#"
            style={{
              color: theme.base, textDecoration: 'none', fontSize: 14,
              borderBottom: `1px solid ${theme.base}`, paddingBottom: 3,
              whiteSpace: 'nowrap',
            }}
          >Book Your Discovery Session</motion.a>
        </motion.div>
      </div>
    </section>
  );
}
