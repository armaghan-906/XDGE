import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';
import { SplitHeading } from '../primitives/SplitHeading';

const pStyle = {
  fontFamily: theme.body,
  fontSize: 'clamp(14px, 1.4vw, 16px)',
  lineHeight: 1.6,
  color: theme.subtitle,
  margin: 0,
};

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
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(56px, 7vw, 88px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 'clamp(40px, 6vw, 72px)',
      }}>
        {/* Big hollow heading with a cyan X — "HOW XDGE WORKS" */}
        <motion.div style={{ y, opacity, marginTop: 8 }}>
          <SplitHeading
            tag="h1"
            lines={[
              <>
                <span className="hollow-text" style={{ paddingRight: '0.28em' }}>HOW</span>
                <span className="cyan-text">X</span>
                <span className="hollow-text">DGE</span>
              </>,
              <span className="hollow-text">WORKS</span>,
            ]}
            style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(44px, 11vw, 172px)',
              lineHeight: 0.9, letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          />
        </motion.div>

        {/* Content card — bottom-right */}
        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <div
            data-reveal
            style={{
              maxWidth: 640,
              border: '1px solid rgba(255,255,255,0.14)',
              padding: 'clamp(26px, 3vw, 44px)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(2px)',
            }}
          >
            <div style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(19px, 2vw, 28px)',
              lineHeight: 1.18, letterSpacing: '-0.01em',
              textTransform: 'uppercase', color: theme.base,
            }}>
              <div>Real Leadership Development.</div>
              <div>Real Projects.</div>
              <div>Industry Professionals &amp; Coaches.</div>
              <div>Real Results For <span className="cyan-text">Ages 12&ndash;24+</span></div>
            </div>

            <div style={{
              height: 1, background: 'rgba(255,255,255,0.2)',
              margin: 'clamp(20px, 2.4vw, 30px) 0',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.6vw, 18px)' }}>
              <p style={pStyle}>
                Receive the same leadership development trusted by organisations
                around the world, re-engineered for young people, graduates, and
                early career professionals.
              </p>
              <p style={pStyle}>
                Build a project that reflects your interests, ambitions, and
                future goals.
              </p>
              <p style={pStyle}>
                Supported by vetted expert leaders and professionals, you develop
                leadership capability, professional skills, and real-world
                experience, while building evidence of initiative, achievement,
                and impact that helps you stand out in future opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
