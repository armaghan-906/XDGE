import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

export function WhatWeDo() {
  return (
    <section data-screen-label="02 What We Do" data-section-theme="light" style={{
      background: theme.base, color: theme.ink,
      padding: 'clamp(56px, 9vw, 100px) clamp(20px, 4vw, 40px) clamp(64px, 10vw, 120px)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Group className="xg-wwd-top">
          <motion.div variants={fadeUp} style={{ paddingTop: 8 }}>
            <div
              style={{
                width: '70%', maxWidth: 360, aspectRatio: '4/5',
                borderRadius: 2, overflow: 'hidden', background: '#d8d6cf',
              }}
            >
              <motion.img
                src="/assets/hero-team.png"
                alt="XDGE boardroom session"
                variants={{
                  hidden: { scale: 1.15 },
                  visible: { scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </motion.div>
          <SplitHeading
            lines={['WHAT', 'WE DO']}
            style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(64px, 16vw, 260px)',
              lineHeight: 0.92, letterSpacing: '-0.02em',
              textAlign: 'right',
            }}
          />
        </Group>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            height: 1, background: 'rgba(0,0,0,0.18)',
            margin: '64px 0 48px', transformOrigin: 'left',
          }}
        />

        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(32px, 6vw, 80px)' }}>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55, margin: 0, maxWidth: 560 }}>
            XDGE prepares graduates and young students for their next competitive step:
            professional careers, elite internships, top universities, and selective schools.
            Participants develop the confidence, character, tools, and skills required to
            perform at the leadership standard expected at the next level.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-end' }}>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#5a5b58', margin: 0, maxWidth: 360 }}>
              Through engaging, age-appropriate leadership training, every program mirrors
              real-world performance expectations. Participants build strong foundations in
              mindset, discipline, and behavioral leadership while developing the same tools
              and standards taught to leaders in global organizations.
            </p>
            <motion.a
              whileHover={{ x: 4 }}
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                color: theme.ink, textDecoration: 'none', fontSize: 14,
                borderBottom: `1px solid ${theme.ink}`, paddingBottom: 4,
              }}
            >Xdge Programs</motion.a>
          </motion.div>
        </Group>
      </div>
    </section>
  );
}
