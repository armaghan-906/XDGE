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
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <FloatingVideo 
        src="/assets/videos/elemental_1.mp4" 
        style={{ bottom: 80, left: -40, opacity: 0.5, mixBlendMode: 'screen', transform: 'scale(1.5)' }} 
      />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Top row: image (left) + huge heading (right) */}
        <Group className="xg-wwd-top" style={{ alignItems: 'flex-start' }}>
          <motion.div variants={fadeUp} style={{ paddingTop: 8 }}>
            <div
              style={{
                position: 'relative',
                width: '100%', maxWidth: 900, aspectRatio: '16/9',
                borderRadius: 2, overflow: 'hidden', background: '#0e0e0e',
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
          <motion.div variants={fadeUp}>
            <SplitHeading
              lines={['WHO WE', 'ARE']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(56px, 11vw, 180px)',
                lineHeight: 0.92, letterSpacing: '-0.02em',
                textAlign: 'right',
              }}
            />
          </motion.div>
        </Group>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            height: 1, background: 'rgba(255,255,255,0.18)',
            margin: 'clamp(48px, 7vw, 80px) 0 clamp(40px, 6vw, 56px)',
            transformOrigin: 'left',
          }}
        />

        {/* Body row */}
        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(32px, 6vw, 80px)' }}>
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(16px, 2vw, 24px)',
              fontFamily: theme.italic,
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2vw, 24px)',
              lineHeight: 1.45,
              color: theme.base,
              maxWidth: 600,
            }}
          >
            <p style={{ margin: 0, fontWeight: 400 }}>
              We are performance and leadership development specialists with
              20+ years of senior industry experience.
            </p>
            <p style={{ margin: 0, fontWeight: 700 }}>
              One mission: developing the next generation of standout talent.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <ul style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(12px, 1.5vw, 16px)',
              margin: 0, padding: 0, listStyle: 'none',
              maxWidth: 480, width: '100%',
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
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
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
