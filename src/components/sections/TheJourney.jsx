import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const steps = [
  { n: '01', title: 'Select Your Path', desc: 'Fit, goals, and program alignment' },
  { n: '02', title: 'Build Your Internal Operating System', desc: 'Mindset, discipline, decision-making' },
  { n: '03', title: 'Develop Your Professional Skillset', desc: 'Communication, leadership, execution' },
  { n: '04', title: 'Lead a Mentored, Real-World Project', desc: 'Apply skills and create real evidence' },
  { n: '05', title: 'Prove Your Capability', desc: 'Leadership portfolio and capstone presentation' },
  { n: '06', title: 'Perform Under Pressure', desc: 'High-stakes interview and selection readiness' },
];

export function TheJourney() {
  return (
    <section
      data-screen-label="The Journey"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Group className="xg-2" style={{ alignItems: 'flex-end', marginBottom: 'clamp(56px, 8vw, 96px)' }}>
          <div>
            <motion.div
              variants={fadeUp}
              style={{
                fontSize: 12, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: theme.subtitle,
                marginBottom: 28, fontWeight: 600,
              }}
            >(The Journey)</motion.div>
            <SplitHeading
              lines={['THE JOURNEY']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(56px, 14vw, 220px)',
                lineHeight: 0.95, letterSpacing: '-0.01em',
              }}
            />
          </div>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55,
              color: theme.base, margin: 0, paddingBottom: 24, maxWidth: 480,
            }}
          >
            Six stages from where you are now to where you stand out — clear,
            structured, and built around real performance.
          </motion.p>
        </Group>

        <div style={{ position: 'relative' }}>
          <motion.div
            className="xg-journey-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
            style={{
              position: 'absolute',
              top: 27,
              left: 'calc(100% / 12)',
              right: 'calc(100% / 12)',
              height: 1,
              background: 'rgba(236,237,232,0.45)',
              transformOrigin: 'left',
              zIndex: 0,
            }}
          />

          <Group className="xg-journey-grid">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="xg-journey-step"
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: theme.dark,
                  border: `1px solid ${theme.base}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: theme.display, fontWeight: 900,
                  fontSize: 16, letterSpacing: '0.02em',
                  color: theme.base,
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}>{s.n}</div>
                <div>
                  <h3 style={{
                    fontFamily: theme.display, fontWeight: 900,
                    fontSize: 'clamp(16px, 1.6vw, 20px)',
                    lineHeight: 1.18, letterSpacing: '-0.005em',
                    margin: '0 0 12px',
                    textTransform: 'uppercase',
                    color: theme.base,
                  }}>{s.title}</h3>
                  <p style={{
                    fontSize: 13, lineHeight: 1.5, margin: 0,
                    color: theme.subtitle,
                  }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </Group>
        </div>
      </div>
    </section>
  );
}
