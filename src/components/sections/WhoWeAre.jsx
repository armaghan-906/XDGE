import { motion } from 'framer-motion';
import { theme, fadeUp, stagger } from '../../theme';
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
      <video
        autoPlay loop muted playsInline
        src="/assets/videos/spiraling_force.mp4"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          opacity: 0.4,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <motion.h2
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(36px, 6vw, 108px)',
              lineHeight: 0.92, letterSpacing: '-0.02em',
              textAlign: 'left', margin: 0, textTransform: 'uppercase'
            }}
          >
            <motion.span variants={fadeUp} className="hollow-text">
              WHO ARE WE
            </motion.span>
          </motion.h2>
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
            <ul style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(24px, 3vw, 36px)',
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
                    fontSize: 'clamp(20px, 2.5vw, 32px)',
                    lineHeight: 1.4, color: theme.base,
                    position: 'relative',
                    paddingLeft: 32,
                    fontWeight: i === 4 ? 700 : 400,
                  }}
                >
                  <span style={{
                    position: 'absolute', left: 0, top: '0.4em',
                    width: 8, height: 8, borderRadius: '50%',
                    background: theme.base,
                    opacity: 0.6
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
