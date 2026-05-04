import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const testimonials = [
  {
    name: 'SG',
    role: 'Participant (Age 18) — XDGE Professional Skills Mastery, 2024',
    headline: 'It genuinely changed how I think, not just what I know.',
    body: 'Coming in I expected to learn frameworks. I left with sharper thinking, real evidence of capability, and the confidence to perform when it counts. XDGE shifts how you approach problems — and that compounds.',
  },
  {
    name: 'KH',
    role: 'Parent of Participant (Age 13) — XDGE Leading Yourself, 2025',
    headline: "We saw a real shift in him. He's more confident, focused, and taking responsibility.",
    body: "The XDGE programme didn't just teach skills, it shifted behaviour. He's more deliberate, more accountable, and leading himself in ways we hadn't seen before. The change has stuck.",
  },
  {
    name: 'AR',
    role: 'Participant (Age 13) — XDGE Research Incubator, 2024',
    headline: "My interviewer mentioned my portfolio and that I'd worked on real projects.",
    body: "The leadership portfolio I built through XDGE put me ahead in interviews. I had real evidence of capability that other applicants couldn't match — and that made the difference.",
  },
  {
    name: 'TD',
    role: 'Parent of Participants (Ages 16 & 17) — XDGE Junior MBA, 2025',
    headline: 'Watching my boys present to professionals was emotional.',
    body: "They've changed a lot, especially in how they think about their future. The XDGE programme gave them clarity, capability, and conviction — and it shows in everything they do.",
  },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

const arrowProps = {
  width: 18, height: 18,
  viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.8,
  strokeLinecap: 'round', strokeLinejoin: 'round',
};

const ArrowLeft = (
  <svg {...arrowProps}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);
const ArrowRight = (
  <svg {...arrowProps}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export function ProvenOutcomes() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = testimonials.length;

  const goNext = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  };
  const goPrev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const t = testimonials[index];

  const variants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
    center: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -24 : 24 }),
  };

  return (
    <section
      data-screen-label="Proven Outcomes"
      data-section-theme="light"
      style={{
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-end', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <div>
            <motion.div
              variants={fadeUp}
              style={{
                fontSize: 12, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: '#7d7e7c',
                marginBottom: 28, fontWeight: 600,
              }}
            >(Proven Outcomes)</motion.div>
            <SplitHeading
              lines={['PROVEN', 'OUTCOMES']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(48px, 12vw, 180px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
              }}
            />
          </div>
          <motion.div variants={fadeUp} style={{ paddingBottom: 24, color: '#3a3c3e' }}>
            <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55, margin: '0 0 12px', color: theme.ink, fontWeight: 500 }}>
              See what participants and parents have to say about us.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: '#7d7e7c', margin: 0, maxWidth: 480 }}>
              See what participants and parents have to say about their experience,
              and the outcomes they've achieved.
            </p>
          </motion.div>
        </Group>

        {/* Pagination top row: counter | divider | arrows */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(16px, 3vw, 32px)',
          paddingBottom: 'clamp(28px, 4vw, 40px)',
        }}>
          <div style={{
            fontSize: 13,
            color: theme.ink,
            fontWeight: 600,
            letterSpacing: '0.04em',
            minWidth: 56,
          }}>
            {String(index + 1).padStart(2, '0')} - {String(total).padStart(2, '0')}
          </div>
          <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.18)' }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button
              onClick={goPrev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="grow"
              aria-label="Previous testimonial"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: `1px solid ${theme.borderLight}`,
                background: 'transparent',
                color: theme.ink,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >{ArrowLeft}</motion.button>
            <motion.button
              onClick={goNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="grow"
              aria-label="Next testimonial"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: 'none',
                background: theme.ink,
                color: theme.base,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >{ArrowRight}</motion.button>
          </div>
        </div>

        {/* Testimonial card */}
        <div style={{ position: 'relative', minHeight: 'clamp(280px, 32vw, 380px)' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: fadeEase }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(180px, 240px) 1fr',
                gap: 'clamp(24px, 5vw, 80px)',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: theme.display, fontWeight: 900,
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  lineHeight: 1, letterSpacing: '-0.01em',
                  margin: '0 0 10px',
                  color: theme.ink,
                }}>{t.name}</h3>
                <div style={{
                  fontSize: 13, lineHeight: 1.5,
                  color: '#7d7e7c',
                }}>{t.role}</div>
              </div>

              <div>
                <h2 style={{
                  fontFamily: theme.display, fontWeight: 700,
                  fontSize: 'clamp(22px, 2.6vw, 36px)',
                  lineHeight: 1.18, letterSpacing: '-0.005em',
                  margin: '0 0 24px',
                  color: theme.ink,
                }}>
                  {t.headline}
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 1.4vw, 16px)',
                  lineHeight: 1.65,
                  color: '#3a3c3e',
                  margin: 0,
                  maxWidth: 640,
                }}>
                  {t.body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
