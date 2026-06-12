import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';

function ExperienceHeading({ y, opacity }) {
  const ease = [0.2, 0.7, 0.2, 1];
  return (
    <h1
      style={{
        y, opacity,
        fontFamily: theme.display, fontWeight: 900,
        fontSize: 'clamp(45px, 7vw, 133px)',
        lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0,
        color: theme.base, display: 'block',
        overflow: 'hidden',
        paddingBottom: '0.06em',
      }}
    >
      <span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.6, ease, delay: 0.25 }}
        style={{ display: 'block' }}
      >HOW IT</span>
      <span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.6, ease, delay: 0.4 }}
        style={{ display: 'block' }}
      >WORKS</span>
    </h1>
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
      <HeroAmbient src="/assets/videos/gold_swirls.mp4" />
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 10,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(40px, 6vw, 64px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 32,
      }}>
        <div style={{ marginTop: 24, position: 'relative' }}>
          <ExperienceHeading y={y} opacity={opacity} />
          <div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{
              fontFamily: theme.displayTight, fontWeight: 500,
              fontSize: 'clamp(18px, 2vw, 28px)',
              lineHeight: 1.4, letterSpacing: '-0.005em',
              color: theme.base,
              marginTop: 'clamp(14px, 2vw, 32px)',
              maxWidth: '36ch',
            }}
          >
            Leadership Through Something You Care About
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
              gap: 'clamp(14px, 1.8vw, 20px)',
              maxWidth: 560,
            }}
          >
            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              lineHeight: 1.4,
              color: theme.base,
              margin: 0,
              fontWeight: 500,
              letterSpacing: '-0.005em',
            }}>
              At XDGE, leadership isn&rsquo;t taught through theory alone.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              lineHeight: 1.55,
              color: theme.subtitle,
              margin: 0,
            }}>
              You develop leadership by taking the lead on a project connected
              to a cause, idea, passion, or future ambition that matters to you.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              lineHeight: 1.55,
              color: theme.subtitle,
              margin: 0,
            }}>
              Along the way, you work with experienced coaches, professionals,
              and leaders who help you develop the confidence, professional
              skills, and leadership capability needed to bring your ideas to
              life.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              lineHeight: 1.55,
              color: theme.base,
              margin: 0,
              fontWeight: 500,
            }}>
              The result is more than a project. It is evidence of initiative,
              achievement, and leadership that helps you stand out in
              interviews, applications, careers, and future opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
