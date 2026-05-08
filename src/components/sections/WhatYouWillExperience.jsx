import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const bullets = [
  'Active, engaging sessions with focused discussion',
  'Real challenges.',
  'Direct coaching, feedback, and guidance from experienced leaders',
  'A supportive, high-energy environment that combines challenge with encouragement',
  'Clear accountability to follow through and deliver',
  'Working alongside others committed to improving their performance',
  'Exposure to real leadership thinking and professional standards',
];

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
};

export function WhatYouWillExperience() {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

  return (
    <section
      data-screen-label="What You Will Experience"
      data-section-theme="light"
      style={{
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-wwd-top" style={{ alignItems: 'flex-start' }}>
          <motion.div variants={fadeUp} style={{ paddingTop: 8 }}>
            <div
              ref={imgRef}
              style={{
                position: 'relative',
                width: '100%', maxWidth: 700, aspectRatio: '16/9',
                borderRadius: 2, overflow: 'hidden', background: '#d8d6cf',
              }}
            >
              <motion.img
                src="/assets/who-we-are.webp"
                alt="XDGE active session"
                style={{
                  position: 'absolute', left: 0, right: 0,
                  top: '-3%',
                  width: '100%', height: '106%',
                  objectFit: 'cover',
                  objectPosition: '50% 35%',
                  display: 'block',
                  y: imgY,
                  willChange: 'transform',
                }}
              />
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <SplitHeading
              lines={['WHAT YOU WILL', 'EXPERIENCE']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(48px, 11vw, 170px)',
                lineHeight: 0.92, letterSpacing: '-0.02em',
                textAlign: 'right',
              }}
            />
          </motion.div>
        </Group>

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

        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(32px, 6vw, 80px)' }}>
          <motion.ul
            variants={listContainer}
            style={{
              listStyle: 'none', margin: 0, padding: 0,
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(14px, 1.6vw, 18px)',
              maxWidth: 560,
            }}
          >
            {bullets.map((b) => (
              <motion.li
                key={b}
                variants={listItem}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  fontSize: 'clamp(15px, 1.6vw, 18px)',
                  lineHeight: 1.5,
                  color: theme.ink,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 6, height: 6, borderRadius: '50%',
                    background: theme.ink,
                    marginTop: '0.55em',
                  }}
                />
                <span>{b}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(16px, 2vw, 22px)',
              alignItems: 'flex-end',
            }}
          >
            <p style={{
              fontFamily: theme.italic,
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2vw, 24px)',
              lineHeight: 1.45,
              margin: 0, fontWeight: 700,
              color: theme.ink,
              maxWidth: 520,
            }}>
              This is not passive learning.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.6, margin: 0,
              color: '#3a3c3e', maxWidth: 520,
            }}>
              You are challenged, supported, and encouraged by experienced industry
              leaders and leadership development experts. You work on real problems,
              build real capability, and are held to a high standard throughout.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.6, margin: 0,
              color: '#3a3c3e', maxWidth: 520,
            }}>
              Every session is active, focused, and designed to drive your progress.
            </p>
          </motion.div>
        </Group>
      </div>
    </section>
  );
}
