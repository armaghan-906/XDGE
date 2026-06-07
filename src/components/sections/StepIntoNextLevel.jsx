import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const fadeEase = [0.2, 0.7, 0.2, 1];

export function StepIntoNextLevel() {
  return (
    <section
      data-screen-label="Step Into Your Next Level"
      data-section-theme="light"
      style={{
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['STEP INTO', 'YOUR NEXT', 'LEVEL']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(64px, 13vw, 200px)',
            lineHeight: 0.92, letterSpacing: '-0.02em',
            marginBottom: 'clamp(48px, 7vw, 88px)',
          }}
        />

        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(40px, 8vw, 120px)' }}>
          <div
            variants={fadeUp}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 18,
            }}
          >
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{
                width: 'clamp(120px, 14vw, 180px)',
                aspectRatio: '1 / 1',
                overflow: 'hidden', background: '#0e0e0e',
              }}>
                <img
                  src="/assets/blog-02.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 30%',
                    display: 'block',
                  }}
                />
              </div>
              <div style={{
                width: 'clamp(120px, 14vw, 180px)',
                aspectRatio: '1 / 1',
                overflow: 'hidden', background: '#0e0e0e',
              }}>
                <img
                  src="/assets/blog-01.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 30%',
                    display: 'block',
                  }}
                />
              </div>
            </div>
            <div style={{
              fontSize: 14, lineHeight: 1.5,
              color: '#3a3c3e',
              maxWidth: 360,
            }}>
              Mostly available 9AM &ndash; 6PM (GMT) Mon&ndash;Fri
            </div>
          </div>

          <div
            variants={fadeUp}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(20px, 3vw, 32px)',
              paddingTop: 'clamp(8px, 2vw, 16px)',
            }}
          >
            <p style={{
              fontSize: 'clamp(20px, 2.4vw, 30px)',
              lineHeight: 1.4,
              color: theme.ink, margin: 0,
              fontWeight: 500,
              letterSpacing: '-0.005em',
              maxWidth: 560,
            }}>
              Leadership development for ages 12&ndash;24, designed for what
              happens next.
            </p>

            <a
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease: fadeEase }}
              href="#"
              data-cursor="grow"
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '18px 32px',
                background: theme.ink, color: theme.base,
                textDecoration: 'none',
                fontSize: 15, fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Let’s Talk <span style={{ fontSize: 18 }}>→</span>
            </a>
          </div>
        </Group>
      </div>
    </section>
  );
}
