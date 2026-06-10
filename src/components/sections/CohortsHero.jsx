import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';

function CohortsHeading({ y, opacity }) {
  return (
    <h1
      style={{
        y, opacity,
        fontFamily: theme.display, fontWeight: 900,
        fontSize: 'clamp(56px, 14vw, 220px)',
        lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0,
        color: theme.base, display: 'block',
        overflow: 'hidden',
        paddingBottom: '0.06em',
      }}
    >
      <span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1], delay: 0.25 }}
        style={{ display: 'block' }}
      >COHORTS &amp;</span>
      <span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1], delay: 0.4 }}
        style={{ display: 'block' }}
      >INDIVIDUALS.</span>
    </h1>
  );
}

export function CohortsHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.4]);

  return (
    <section
      ref={ref}
      data-screen-label="01 Cohorts Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <HeroAmbient src="/assets/videos/hud.mp4" />
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 10,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(40px, 6vw, 64px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 32,
      }}>
        <div style={{ marginTop: 24, position: 'relative' }}>
          <div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
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
          </div>
          <CohortsHeading y={y} opacity={opacity} />
          <div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            style={{
              fontFamily: theme.displayTight, fontWeight: 500,
              fontSize: 'clamp(18px, 2vw, 28px)',
              lineHeight: 1.4, letterSpacing: '-0.005em',
              color: theme.base,
              marginTop: 'clamp(14px, 2vw, 32px)',
              maxWidth: '36ch',
            }}
          >
            Tailored for your next step.
          </div>
        </div>

        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(16px, 2.5vw, 28px)',
              maxWidth: 520,
            }}
          >
            <p style={{
              fontSize: 'clamp(20px, 2.4vw, 30px)',
              lineHeight: 1.32,
              color: theme.base, margin: 0,
              fontWeight: 500,
              letterSpacing: '-0.005em',
            }}>
              Designed for individuals and groups preparing for high-stakes
              transitions and future opportunities.
            </p>
            <p style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              lineHeight: 1.5,
              color: theme.subtitle, margin: 0,
            }}>
              Two pathways. One standard of excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
