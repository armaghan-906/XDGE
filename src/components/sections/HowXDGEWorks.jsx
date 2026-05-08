import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const stages = [
  {
    n: '01',
    title: 'Select Your Path',
    line1: 'You begin with a clear assessment of where you are now.',
    line2: 'Together, we define your goals, strengths, challenges, and what is required for your next level.',
  },
  {
    n: '02',
    title: 'Build Your Internal Operating System',
    line1: 'You develop your mindset, discipline, and decision-making.',
    line2: 'You are introduced to core leadership principles, thinking, and frameworks.',
  },
  {
    n: '03',
    title: 'Develop Your Leadership Skillset',
    line1: 'You build communication, leadership, and execution capability.',
    line2: 'Sessions are delivered one-to-one, in small groups, or cohort environments by experienced practitioners.',
  },
  {
    n: '04',
    title: 'Lead A Real-World Project',
    line1: 'You apply your learning through meaningful challenges and projects.',
    line2: 'You analyse situations, make decisions, and build real evidence of your capability.',
  },
  {
    n: '05',
    title: 'Build Your Leadership Portfolio',
    line1: 'You document your work, decisions, growth, and outcomes in a professional leadership portfolio.',
    line2: 'You are not just developing skills. You are demonstrating them.',
  },
  {
    n: '06',
    title: 'Perform Under Pressure',
    line1: 'You complete and present a leadership project to a panel.',
    line2: 'You prepare for high-stakes interviews and demonstrate readiness for your next opportunity.',
  },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

const itemVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const numberVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: fadeEase } },
};

const titleVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: fadeEase } },
};

const descVariants = {
  hidden: { y: 14, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.85, ease: fadeEase } },
};

export function HowXDGEWorks() {
  return (
    <section
      data-screen-label="How XDGE Works"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['HOW XDGE', 'WORKS']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(48px, 12vw, 180px)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            marginBottom: 'clamp(24px, 4vw, 40px)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: fadeEase, delay: 0.25 }}
          style={{
            fontSize: 'clamp(20px, 2.4vw, 30px)',
            lineHeight: 1.4,
            color: theme.base,
            margin: '0 0 clamp(48px, 7vw, 88px)',
            fontWeight: 500,
            letterSpacing: '-0.005em',
            maxWidth: 900,
          }}
        >
          A six-stage progression from where you are now to ready for your next level.
        </motion.p>

        <Group
          className="xg-2"
          style={{
            gap: 'clamp(40px, 5vw, 64px) clamp(32px, 5vw, 80px)',
            alignItems: 'flex-start',
          }}
        >
          {stages.map((s) => (
            <motion.div
              key={s.n}
              variants={itemVariants}
              style={{
                display: 'flex', alignItems: 'flex-start',
                gap: 'clamp(20px, 2.5vw, 32px)',
                paddingTop: 'clamp(20px, 2vw, 24px)',
                borderTop: `1px solid ${theme.borderDark}`,
              }}
            >
              <motion.div
                variants={numberVariants}
                style={{
                  fontFamily: theme.display, fontWeight: 900,
                  fontSize: 'clamp(28px, 3.6vw, 44px)',
                  lineHeight: 1, letterSpacing: '-0.01em',
                  color: theme.base,
                  flexShrink: 0,
                  minWidth: '1.6em',
                }}
              >{s.n}</motion.div>
              <div style={{ flex: 1 }}>
                <motion.h3
                  variants={titleVariants}
                  style={{
                    fontFamily: theme.display, fontWeight: 700,
                    fontSize: 'clamp(20px, 2.2vw, 28px)',
                    lineHeight: 1.1, letterSpacing: '-0.005em',
                    margin: '0 0 clamp(12px, 1.5vw, 18px)',
                    textTransform: 'uppercase',
                    color: theme.base,
                  }}
                >{s.title}</motion.h3>
                <motion.p
                  variants={descVariants}
                  style={{
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    lineHeight: 1.55,
                    margin: '0 0 8px',
                    color: theme.base,
                    fontWeight: 500,
                  }}
                >{s.line1}</motion.p>
                <motion.p
                  variants={descVariants}
                  style={{
                    fontSize: 'clamp(13px, 1.4vw, 15px)',
                    lineHeight: 1.55,
                    margin: 0,
                    color: theme.subtitle,
                  }}
                >{s.line2}</motion.p>
              </div>
            </motion.div>
          ))}
        </Group>
      </div>
    </section>
  );
}
