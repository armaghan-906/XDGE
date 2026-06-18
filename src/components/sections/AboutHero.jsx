import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';
import { HeroAmbient } from '../HeroAmbient';

const fadeEase = [0.2, 0.7, 0.2, 1];

export function AboutHero() {
  return (
    <section
      data-screen-label="About Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(160px, 18vw, 240px)',
      }}
    >
      <HeroAmbient src="/assets/videos/thunder_2.mp4" />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <SplitHeading
          lines={[
            <>
              <span className="hollow-text">ABOUT</span>{' '}
              <span className="cyan-text">US</span>
            </>
          ]}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(40px, 11.3vw, 200px)',
            lineHeight: 0.95, letterSpacing: '-0.06em',
            margin: 0,
          }}
        />

        {/* Bottom-right intro block — bold heading, divider, body */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end',
          marginTop: 'clamp(120px, 22vw, 360px)',
        }}>
          <div style={{ maxWidth: 640 }}>
            <h3 style={{
              fontFamily: theme.body,
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              lineHeight: 1.3, fontWeight: 600,
              color: theme.base, margin: 0,
            }}>
              Professional Leadership Development Re-engineered for Young People 12&ndash;24+
            </h3>
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.35)',
              margin: 'clamp(18px, 2.4vw, 28px) 0',
            }} />
            <p style={{
              fontSize: 'clamp(12px, 1.3vw, 14px)',
              lineHeight: 1.6, margin: 0, color: theme.base,
            }}>
              It starts when an individual takes ownership of an idea, stands behind
              something they care about, and develops the confidence to make a positive
              impact. XDGE was built to create those opportunities for young people
              ages 12&ndash;24+.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
