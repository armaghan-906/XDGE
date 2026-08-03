import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';
import { SplitHeading } from '../primitives/SplitHeading';

function ApplyHeading() {
  return (
    <SplitHeading
      tag="h1"
      lines={['READY TO BUILD', 'YOUR EDGE?']}
      style={{
        fontFamily: theme.display, fontWeight: 900,
        fontSize: 'clamp(40px, 11.3vw, 200px)',
        lineHeight: 0.92, letterSpacing: '-0.03em',
        color: theme.base,
      }}
    />
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
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(80px, 9vw, 120px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 32,
      }}>
        <div style={{ marginTop: 24, position: 'relative' }}>
          <ApplyHeading />
        </div>

        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          <motion.div data-no-reveal
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            style={{ maxWidth: 560 }}
          >
            <p style={{
              fontFamily: theme.body,
              fontSize: 'clamp(16px, 1.6vw, 19px)',
              lineHeight: 1.5,
              color: '#e0e0e0',
              margin: 0,
              fontWeight: 400,
            }}>
              Tell us a little about yourself and we&rsquo;ll help identify the
              right pathway for your goals, interests, and ambitions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
