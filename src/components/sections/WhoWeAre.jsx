import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

export function WhoWeAre() {
  return (
    <section
      data-screen-label="Who We Are"
      data-section-theme="light"
      style={{
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Top row: image (left) + huge heading (right) */}
        <Group className="xg-wwd-top" style={{ alignItems: 'flex-start' }}>
          <motion.div variants={fadeUp} style={{ paddingTop: 8 }}>
            <div style={{
              width: '70%', maxWidth: 360, aspectRatio: '1/1',
              borderRadius: 2, overflow: 'hidden', background: '#d8d6cf',
            }}>
              <img
                src="/assets/hero-team.png"
                alt="XDGE coaching session"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <SplitHeading
              lines={['WHO WE', 'ARE']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(64px, 15vw, 240px)',
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
            height: 1, background: 'rgba(0,0,0,0.18)',
            margin: 'clamp(48px, 7vw, 80px) 0 clamp(40px, 6vw, 56px)',
            transformOrigin: 'left',
          }}
        />

        {/* Body row */}
        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(32px, 6vw, 80px)' }}>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(20px, 2.6vw, 34px)',
              lineHeight: 1.32,
              margin: 0,
              fontWeight: 500,
              color: theme.ink,
              letterSpacing: '-0.01em',
              maxWidth: 640,
            }}
          >
            We are leadership development experts with 20+ years' senior industry
            experience, focused on developing the next generation of leaders.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(20px, 2.5vw, 28px)',
              alignItems: 'flex-end',
            }}
          >
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.6, margin: 0,
              color: '#3a3c3e', maxWidth: 460,
            }}>
              XDGE programmes are guided and delivered exclusively by experienced
              industry leaders and mentors with over two decades of experience.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.6, margin: 0,
              color: '#3a3c3e', maxWidth: 460,
            }}>
              Our coaches bring real-world leadership expertise and translate it
              into practical, engaging development. We build leadership capability
              that performs in real-world selection environments.
            </p>
            <motion.a
              whileHover={{ x: 4 }}
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                color: theme.ink, textDecoration: 'none', fontSize: 14,
                borderBottom: `1px solid ${theme.ink}`, paddingBottom: 4,
                marginTop: 8,
              }}
            >More About Us</motion.a>
          </motion.div>
        </Group>
      </div>
    </section>
  );
}
