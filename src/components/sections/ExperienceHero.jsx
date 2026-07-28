import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme } from '../../theme';
import { SplitHeading } from '../primitives/SplitHeading';
import { HeroAmbient } from '../HeroAmbient';

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
        minHeight: '120vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <HeroAmbient src="/assets/videos/hero.mp4" playbackRate={0.45} overlayOpacity={0.25} />
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 10,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(32px, 4vw, 48px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 'clamp(40px, 6vw, 72px)',
      }}>
        {/* Two-line hero — "HOW XDGE" (size B) over "WORKS" (size A), cyan X */}
        <motion.div style={{ y, opacity, marginTop: 8 }}>
          <SplitHeading
            tag="h1"
            lines={[
              <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: '0.45em', paddingBottom: '0.1em' }}>
                <span className="hollow-text" style={{ paddingRight: '0.28em' }}>HOW</span>
                <span className="cyan-text">X</span>
                <span className="hollow-text">DGE</span>
              </span>,
              <span className="hollow-text" style={{ display: 'block' }}>WORKS</span>,
            ]}
            style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(40px, 11.3vw, 200px)',
              lineHeight: 0.95, letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              textAlign: 'center',
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
            }}
          >
            <div style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(13px, 1.4vw, 20px)',
              lineHeight: 1.2, letterSpacing: '-0.01em',
              textTransform: 'uppercase', color: theme.base,
              whiteSpace: 'nowrap',
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
