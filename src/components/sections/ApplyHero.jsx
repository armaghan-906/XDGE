import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';

function ApplyHeading() {
  const ease = [0.2, 0.7, 0.2, 1];
  return (
    <h1
      style={{
        fontFamily: theme.display, fontWeight: 900,
        fontSize: 'clamp(56px, 12vw, 200px)',
        lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0,
        color: theme.base, display: 'block',
        overflow: 'hidden',
        paddingBottom: '0.06em',
      }}
    >
      <span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.0, ease, delay: 0.1 }}
        style={{ display: 'block' }}
      >READY TO BUILD</span>
      <span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.0, ease, delay: 0.22 }}
        style={{ display: 'block' }}
      >YOUR EDGE?</span>
    </h1>
  );
}

export function ApplyHero() {
  return (
    <section
      data-screen-label="01 Apply Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <HeroAmbient />
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 10,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(40px, 6vw, 64px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 32,
      }}>
        <div style={{ marginTop: 24, position: 'relative' }}>
          <ApplyHeading />
        </div>

        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            style={{ maxWidth: 560 }}
          >
            <p style={{
              fontFamily: '"Inter", "Inter Display", sans-serif',
              fontSize: 'clamp(16px, 1.6vw, 19px)',
              lineHeight: 1.5,
              color: theme.base,
              margin: 0,
              fontWeight: 500,
            }}>
              Tell us a little about yourself and we&rsquo;ll help identify the
              right pathway for your goals, interests, and ambitions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
