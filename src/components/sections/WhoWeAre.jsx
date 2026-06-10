import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

import { FloatingVideo } from '../primitives/FloatingVideo';

export function WhoWeAre() {
  return (
    <section
      data-screen-label="Who We Are"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(120px, 15vw, 240px) clamp(20px, 4vw, 40px)',
      }}
    >
      <FloatingVideo 
        src="/assets/videos/lightning_3.mp4" 
        style={{ bottom: 80, left: -40, opacity: 0.5, mixBlendMode: 'screen', transform: 'scale(1.5)' }} 
      />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <SplitHeading
            lines={['WHO', 'ARE WE']}
            style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(36px, 5.5vw, 108px)',
              lineHeight: 0.92, letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          />
        </motion.div>

        <Group className="xg-wwd-top" style={{ alignItems: 'center' }}>
          <motion.div variants={fadeUp}>
            <div
              style={{
                position: 'relative',
                width: '100%', maxWidth: 900, aspectRatio: '1/1',
                borderRadius: 4, overflow: 'hidden', background: '#000000',
              }}
            >
              <motion.img
                src="/assets/who-we-are.webp"
                alt="XDGE coaching session"
                loading="eager"
                decoding="async"
                variants={{
                  hidden: { scale: 1.15 },
                  visible: { scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: '50% 35%',
                  display: 'block',
                }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(24px, 3vw, 32px)',
            }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(12px, 1.5vw, 16px)',
              fontFamily: theme.italic,
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 2.5vw, 32px)',
              lineHeight: 1.45,
              color: theme.base,
            }}>
              <p style={{ margin: 0, fontWeight: 400 }}>
                We are performance and leadership development specialists with
                20+ years of senior industry experience.
              </p>
              <p style={{ margin: 0, fontWeight: 700 }}>
                One mission: developing the next generation of standout talent.
              </p>
            </div>

            <ul style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(14px, 1.8vw, 20px)',
              margin: 0, padding: 0, listStyle: 'none',
              width: '100%',
            }}>
              {[
                "Leadership Experts, University Professors, Senior Leaders, Investors, Entrepreneurs",
                "All Masters or PhD Qualified",
                "20+ Years of Senior Leadership Experience",
                "Experience Across Multiple Industries Around The Globe",
                "On a Mission to Give Young People the Practical Wisdom, Leadership Skills, and Competitive Edge We Wish We'd Had Sooner"
              ].map((text, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 'clamp(16px, 1.8vw, 20px)',
                    lineHeight: 1.5, color: theme.subtitle,
                    position: 'relative',
                    paddingLeft: 24,
                  }}
                >
                  <span style={{
                    position: 'absolute', left: 0, top: '0.45em',
                    width: 5, height: 5, borderRadius: '50%',
                    background: theme.ink
                  }} />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </Group>
      </div>
    </section>
  );
}
