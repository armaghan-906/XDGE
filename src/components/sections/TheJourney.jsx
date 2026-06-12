import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { theme, fadeUp, stagger } from '../../theme';
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
  { n: '01', title: 'Select Your Path', desc: 'Together, we identify a project and pathway that will help you grow and stand out', icon: Icons.Search, offset: 152 },
  { n: '02', title: 'Build Your Inner Leadership', desc: 'Build self-awareness, confidence, resilience, and the inner leadership foundations', icon: Icons.Bulb, offset: 78 },
  { n: '03', title: 'Develop Your Professional Skillset', desc: 'Develop the communication, professional, and leadership skills that create real-world results', icon: Icons.Briefcase, offset: 30 },
  { n: '04', title: 'Lead A Real-World Project', desc: 'Take your project from idea to implementation, applying your skills to create meaningful impact', icon: Icons.Flag, offset: 30 },
  { n: '05', title: 'Build Your Leadership Portfolio', desc: 'Create a professional portfolio that showcases your achievements and leadership journey', icon: Icons.Clipboard, offset: 78 },
  { n: '06', title: 'Present Your Impact', desc: 'Showcase your project to a panel of leaders and demonstrate readiness for your next opportunity', icon: Icons.Trophy, offset: 152 },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

import { FloatingVideo } from '../primitives/FloatingVideo';

export function TheJourney() {
  return (
    <section
      data-screen-label="The Journey"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(120px, 15vw, 240px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <Group style={{ display: 'flex', flexDirection: 'column', marginBottom: 'clamp(56px, 8vw, 96px)' }}>
          <div style={{ position: 'relative', alignSelf: 'center', textAlign: 'center', padding: '40px 0' }}>
            <FloatingVideo 
              src="/assets/videos/lightning_3.mp4" 
              style={{ 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%) scale(1.5)', 
                opacity: 0.5, 
                mixBlendMode: 'screen', 
                zIndex: -1 
              }} 
            />
            <motion.h2
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(45px, 7vw, 90px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
                margin: 0, textTransform: 'uppercase', textAlign: 'center'
              }}
            >
              <motion.span variants={fadeUp} style={{ display: 'block' }}>
                <span className="hollow-text" style={{ paddingRight: '0.2em' }}>THE</span>
                <span className="cyan-text">JOURNEY</span>
              </motion.span>
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} style={{ 
            alignSelf: 'flex-end', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end', 
            textAlign: 'right',
            marginTop: 'clamp(16px, 3vw, 32px)',
            maxWidth: 500
          }}>
            <p
              style={{
                fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55,
                color: theme.base, margin: 0, paddingBottom: 24, maxWidth: 480,
              }}
            >
              Six stages from where you are now to where you stand out — clear,
              structured, and built around real performance.
            </p>
          </motion.div>
        </Group>

        <div className="xg-journey-track">
          {/* Desktop: arched curve + circles + label row */}
          <div className="xg-journey-curve-area">
            <motion.svg
              className="xg-journey-curve"
              viewBox="0 0 1200 220"
              preserveAspectRatio="none"
              aria-hidden="true"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.path
                d="M 100 180 C 320 30 880 30 1100 180"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                variants={{
                  hidden: { pathLength: 0 },
                  visible: { pathLength: 1, transition: { duration: 2, ease: fadeEase, delay: 0.3 } }
                }}
              />
              {/* Arrow tip at the right end */}
              <motion.path
                d="M 1090 172 L 1108 180 L 1090 188"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.4, delay: 2.2 } }
                }}
              />
            </motion.svg>

            <motion.div
              className="xg-journey-circles"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } } }}
              style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative' }}
            >
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  className="xg-journey-circle-cell"
                  style={{ paddingTop: s.offset }}
                  variants={{
                    hidden: { opacity: 0, scale: 0, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: fadeEase } }
                  }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.15, borderColor: theme.accent, boxShadow: `0 0 20px rgba(32, 227, 232, 0.3)` }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: theme.dark,
                      border: `1px solid ${theme.base}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: theme.base,
                      flexShrink: 0,
                      boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                      cursor: 'default',
                    }}>
                    {s.icon}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="xg-journey-labels"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 1.2 } } }}
          >
            {steps.map((s, i) => (
              <motion.div 
                key={i} 
                className="xg-journey-label-cell"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: fadeEase } }
                }}
              >
                <h3 style={{
                  fontFamily: theme.display, fontWeight: 700,
                  fontSize: 'clamp(12px, 1.2vw, 15px)',
                  lineHeight: 1.2, letterSpacing: '-0.005em',
                  margin: '0 0 10px',
                  textTransform: 'uppercase',
                  color: theme.base,
                }}>{s.title}</h3>
                <p style={{
                  fontSize: 12, lineHeight: 1.5, margin: 0,
                  color: theme.subtitle,
                }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: simple vertical timeline */}
          <Group className="xg-journey-mobile">
            {steps.map((s, i) => (
              <div
                key={i}
                variants={fadeUp}
                className="xg-journey-mobile-step"
              >
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: theme.dark,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.base,
                  flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: theme.display, fontWeight: 700,
                    fontSize: 15, lineHeight: 1.2, letterSpacing: '-0.005em',
                    margin: '0 0 6px',
                    textTransform: 'uppercase',
                    color: theme.base,
                  }}>{s.title}</h3>
                  <p style={{
                    fontSize: 13, lineHeight: 1.5, margin: 0,
                    color: theme.subtitle,
                  }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </Group>
        </div>
      </div>
    </section>
  );
}
