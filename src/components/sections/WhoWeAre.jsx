import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

export function WhoWeAre() {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

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
                alt="XDGE coaching session"
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
              lines={['WHO WE', 'ARE']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(72px, 17vw, 260px)',
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
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(16px, 2vw, 24px)',
              fontFamily: theme.italic,
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2vw, 24px)',
              lineHeight: 1.45,
              color: theme.ink,
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
              gap: 'clamp(16px, 2vw, 22px)',
              alignItems: 'flex-end',
            }}
          >
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.6, margin: 0,
              color: '#3a3c3e', maxWidth: 480,
            }}>
              We bring the professional world to young people through meaningful,
              high-challenge experiences modelled on elite professional leadership
              development — carefully adapted to be supportive, empowering, and
              relevant to the young people we serve.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.6, margin: 0,
              color: '#3a3c3e', maxWidth: 480,
            }}>
              Designed to develop the leader behind their ambition, our programmes
              combine stretch, support, and real-world relevance to build mindset,
              professional capability, and the personal edge that lasts far beyond
              the programme.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.6, margin: 0,
              color: '#3a3c3e', maxWidth: 480,
            }}>
              From school entrance and university applications to internships,
              careers, and early leadership development, we prepare young people
              to stand out where it matters most.
            </p>
          </motion.div>
        </Group>
      </div>
    </section>
  );
}
