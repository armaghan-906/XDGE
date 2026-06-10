import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const bullets = [
  'Your own dedicated coach who supports, challenges, and guides your development throughout the programme',
  'Meaningful leadership projects connected to your interests and ambitions',
  'Leadership and professional skills workshops',
  'Executive Round Tables with experienced business leaders and professionals',
  'Feedback, coaching, and project reviews from industry experts',
  'Presentation opportunities that build confidence and communication skills',
  'A supportive environment that combines challenge, accountability, and encouragement',
  'A professional leadership portfolio that showcases your achievements',
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
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 'clamp(40px, 6vw, 64px)', gap: 32 }}>
          <div variants={fadeUp} style={{ width: '100%' }}>
            <SplitHeading
              lines={['WHAT YOU WILL', 'EXPERIENCE']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(36px, 5.5vw, 102px)',
                lineHeight: 0.92, letterSpacing: '-0.02em',
                textAlign: 'left',
              }}
            />
          </div>
          <div variants={fadeUp} style={{ width: '100%', paddingTop: 16 }}>
            <div
              ref={imgRef}
              style={{
                position: 'relative',
                width: '100%', aspectRatio: '16/9',
                borderRadius: 4, overflow: 'hidden', background: '#000000',
              }}
            >
              <motion.img
                src="/assets/what-you-experience.webp"
                alt="XDGE active session"
                loading="eager"
                decoding="async"
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
          </div>
        </Group>

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

        <Group className="xg-2" style={{ alignItems: 'flex-start', gap: 'clamp(32px, 6vw, 80px)' }}>
          <ul
            variants={listContainer}
            style={{
              listStyle: 'none', margin: 0, padding: 0,
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(14px, 1.6vw, 18px)',
              maxWidth: 560,
            }}
          >
            {bullets.map((b) => (
              <li
                key={b}
                variants={listItem}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  fontSize: 'clamp(15px, 1.6vw, 18px)',
                  lineHeight: 1.5,
                  color: theme.base,
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
              </li>
            ))}
          </ul>

          <div
            variants={fadeUp}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(16px, 2vw, 22px)',
              alignItems: 'flex-end',
            }}
          >
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.6, margin: 0,
              color: theme.base,
              fontWeight: 500,
              maxWidth: 540,
            }}>
              Throughout the programme, you will work alongside experienced
              coaches, professionals, entrepreneurs, and business leaders who
              help you develop the confidence, capability, and leadership
              skills needed to achieve your next-level goal.
            </p>
          </div>
        </Group>
      </div>
    </section>
  );
}
