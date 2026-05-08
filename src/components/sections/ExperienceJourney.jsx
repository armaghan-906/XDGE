import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const iconProps = {
  width: 22, height: 22,
  viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.6,
  strokeLinecap: 'round', strokeLinejoin: 'round',
};

const Icons = {
  Search: (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="6" />
      <line x1="20" y1="20" x2="15.5" y2="15.5" />
      <path d="M9 11l1.6 1.6L13.5 9.5" />
    </svg>
  ),
  Bulb: (
    <svg {...iconProps}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a7 7 0 00-4 12.7V18h8v-2.3A7 7 0 0012 3z" />
    </svg>
  ),
  Briefcase: (
    <svg {...iconProps}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M2 13h20" />
    </svg>
  ),
  Flag: (
    <svg {...iconProps}>
      <circle cx="12" cy="14" r="3" />
      <path d="M12 11V3M12 3l5 2-5 2" />
      <path d="M9 14H6M18 14h-3M14.5 16.5l1.5 1.5M9.5 16.5L8 18" />
    </svg>
  ),
  Clipboard: (
    <svg {...iconProps}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 12l2 2 4-4" />
      <path d="M9 17h6" />
    </svg>
  ),
  Trophy: (
    <svg {...iconProps}>
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4h10v6a5 5 0 01-10 0V4z" />
      <path d="M17 4h2a3 3 0 010 6h-2M7 4H5a3 3 0 000 6h2" />
    </svg>
  ),
};

const steps = [
  { n: '01', title: 'Select Your Path', desc: 'Fit, goals, and program alignment', icon: Icons.Search, offset: 152 },
  { n: '02', title: 'Build Your Internal Operating System', desc: 'Mindset, discipline, decision-making', icon: Icons.Bulb, offset: 78 },
  { n: '03', title: 'Develop Your Professional Skillset', desc: 'Communication, leadership, execution', icon: Icons.Briefcase, offset: 30 },
  { n: '04', title: 'Lead a Mentored, Real-World Project', desc: 'Apply skills and create real evidence', icon: Icons.Flag, offset: 30 },
  { n: '05', title: 'Prove Your Capability', desc: 'Leadership portfolio and capstone presentation', icon: Icons.Clipboard, offset: 78 },
  { n: '06', title: 'Perform Under Pressure', desc: 'High-stakes interview and selection readiness', icon: Icons.Trophy, offset: 152 },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

export function ExperienceJourney() {
  return (
    <section
      data-screen-label="The Leadership Edge Journey"
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
            >(The Leadership Edge Journey)</motion.div>
            <SplitHeading
              lines={['THE LEADERSHIP', 'EDGE JOURNEY']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(48px, 11vw, 170px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
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

        <div className="xg-journey-track">
          <div className="xg-journey-curve-area">
            <svg
              className="xg-journey-curve"
              viewBox="0 0 1200 220"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M 100 180 C 320 30 880 30 1100 180"
                stroke="rgba(236,237,232,0.45)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.8, ease: fadeEase, delay: 0.2 }}
              />
              <motion.path
                d="M 1090 172 L 1108 180 L 1090 188"
                stroke="rgba(236,237,232,0.55)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 1.9 }}
              />
            </svg>

            <Group className="xg-journey-circles">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="xg-journey-circle-cell"
                  style={{ paddingTop: s.offset }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: theme.base,
                    border: `1px solid ${theme.base}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: theme.ink,
                    flexShrink: 0,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                  }}>
                    {s.icon}
                  </div>
                </motion.div>
              ))}
            </Group>
          </div>

          <div className="xg-journey-labels">
            {steps.map((s, i) => (
              <div key={i} className="xg-journey-label-cell">
                <h3 style={{
                  fontFamily: theme.display, fontWeight: 700,
                  fontSize: 'clamp(14px, 1.4vw, 17px)',
                  lineHeight: 1.18, letterSpacing: '-0.005em',
                  margin: '0 0 10px',
                  textTransform: 'uppercase',
                  color: theme.base,
                }}>{s.title}</h3>
                <p style={{
                  fontSize: 12, lineHeight: 1.5, margin: 0,
                  color: theme.subtitle,
                }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <Group className="xg-journey-mobile">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="xg-journey-mobile-step"
              >
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: theme.base,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.ink,
                  flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: theme.display, fontWeight: 700,
                    fontSize: 17, lineHeight: 1.2, letterSpacing: '-0.005em',
                    margin: '0 0 8px',
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

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: fadeEase, delay: 0.2 }}
          style={{
            textAlign: 'center',
            margin: 'clamp(56px, 8vw, 96px) auto 0',
            fontFamily: theme.italic,
            fontStyle: 'italic',
            fontSize: 'clamp(20px, 2.4vw, 30px)',
            lineHeight: 1.35,
            color: theme.base,
            maxWidth: 720,
            fontWeight: 500,
            letterSpacing: '-0.005em',
          }}
        >
          From potential to proven performance.
        </motion.p>
      </div>
    </section>
  );
}
