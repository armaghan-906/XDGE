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
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(80px, 10vw, 120px)',
      }}
    >
      <HeroAmbient src="/assets/videos/hero.mp4" />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <SplitHeading
          lines={['ABOUT US']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(80px, 17vw, 260px)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            marginBottom: 'clamp(48px, 7vw, 80px)',
          }}
        />

        <div className="xg-about-grid">
          <div className="xg-about-image-col">
            <div className="xg-about-image-sticky">
              <div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.1, ease: fadeEase }}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/5',
                  overflow: 'hidden',
                  background: '#0e0e0e',
                }}
              >
                <img
                  src="/assets/about-hero.webp"
                  alt="The XDGE team"
                  loading="eager"
                  decoding="async"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 35%',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>

          <Group
            className="xg-about-text-col"
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(20px, 2.5vw, 28px)',
            }}
          >
            <p
              variants={fadeUp}
              style={{
                fontFamily: theme.italic, fontStyle: 'italic',
                fontSize: 'clamp(22px, 2.6vw, 34px)',
                lineHeight: 1.35,
                color: theme.base, margin: 0,
                fontWeight: 500,
                letterSpacing: '-0.005em',
              }}
            >
              We believe leadership starts long before someone receives a title.
            </p>

            <p
              variants={fadeUp}
              style={{
                fontSize: 'clamp(16px, 1.7vw, 19px)',
                lineHeight: 1.6, margin: 0,
                color: theme.base,
              }}
            >
              It starts when an individual takes ownership of an idea, stands
              behind something they care about, and develops the confidence to
              make a positive impact.
            </p>

            <p
              variants={fadeUp}
              style={{
                fontSize: 'clamp(16px, 1.7vw, 19px)',
                lineHeight: 1.6, margin: 0,
                color: theme.base,
              }}
            >
              XDGE was built to create those opportunities for young people
              ages 12&ndash;24+.
            </p>
          </Group>
        </div>
      </div>
    </section>
  );
}
