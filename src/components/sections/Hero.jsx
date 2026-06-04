import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { HeroAmbient } from '../HeroAmbient';

function HeroHeading() {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
      style={{
        fontFamily: theme.display, fontWeight: 900,
        fontSize: 'clamp(100px, 26vw, 420px)',
        lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0,
        color: theme.base, display: 'block',
        paddingBottom: '0.06em',
      }}
    >
      XDGE
    </motion.h1>
  );
}

export function Hero() {
  return (
    <section
      data-screen-label="01 Hero"
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
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(32px, 4vw, 56px)',
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(32px, 5vw, 56px)',
      }}>
        <div style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            style={{
              fontFamily: theme.display, fontWeight: 700,
              fontSize: 'clamp(18px, 2vw, 30px)',
              lineHeight: 1, letterSpacing: '-0.01em',
              color: theme.base,
              marginBottom: 'clamp(6px, 1vw, 12px)',
              textTransform: 'capitalize',
            }}
          >
            The
          </motion.div>
          <HeroHeading />
          <motion.h4
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            style={{
              display: 'block',
              margin: 'clamp(10px, 1.4vw, 18px) 0 0',
              fontFamily: theme.displayTight,
              fontWeight: 500,
              fontSize: 'clamp(16px, 1.9vw, 26px)',
              lineHeight: 1.3, letterSpacing: '-0.005em',
              color: theme.base,
              maxWidth: '36ch',
            }}
          >
            Lead Your Own Opportunities
          </motion.h4>
        </div>

        <div className="xg-hero-body" style={{ alignItems: 'flex-end', marginTop: 'auto' }}>
          <div className="xg-hide-md" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(10px, 1.4vw, 16px)',
              maxWidth: 520,
            }}
          >
            <p style={{
              fontFamily: '"Inter", "Inter Display", "Inter Placeholder", sans-serif',
              fontSize: 'clamp(20px, 2.2vw, 30px)',
              lineHeight: 1.2,
              letterSpacing: '-0.005em',
              color: theme.base,
              margin: 0,
              fontWeight: 500,
              textAlign: 'left',
            }}>
              Build The Leader Behind What Inspires You.
            </p>
            <p style={{
              fontFamily: '"Inter", "Inter Display", "Inter Placeholder", sans-serif',
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              lineHeight: 1.45,
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
