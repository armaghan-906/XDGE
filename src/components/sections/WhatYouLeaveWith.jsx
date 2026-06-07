import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const iconProps = {
  width: 32, height: 32,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const Icons = {
  Portfolio: (
    <svg {...iconProps}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M2 13h20" />
    </svg>
  ),
  Video: (
    <svg {...iconProps}>
      <rect x="2" y="7" width="13" height="10" rx="1.5" />
      <path d="M15 10l6-3v10l-6-3z" />
    </svg>
  ),
  Document: (
    <svg {...iconProps}>
      <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  ),
  Award: (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.13" />
    </svg>
  ),
  Letter: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
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
  Chart: (
    <svg {...iconProps}>
      <path d="M3 21h18" />
      <rect x="6" y="13" width="3" height="8" />
      <rect x="11" y="9" width="3" height="12" />
      <rect x="16" y="5" width="3" height="16" />
      <path d="M17 8l2-3 2 3" />
    </svg>
  ),
};

const items = [
  { icon: Icons.Portfolio, title: 'Leadership Portfolio', desc: 'Evidence of capability and readiness for your next level.' },
  { icon: Icons.Video, title: 'Recorded Capstone Presentation', desc: 'Proof of how you think, decide, and deliver under pressure.' },
  { icon: Icons.Document, title: 'Skills Transcript', desc: 'Verified record of your competencies and development.' },
  { icon: Icons.Award, title: 'Certificate of Completion', desc: 'Formal recognition of performance and progression.' },
  { icon: Icons.Letter, title: 'Letter of Recommendation', desc: 'Professional endorsement of your capability and potential.' },
  { icon: Icons.Clipboard, title: '90-Day Action Plan', desc: 'Clear execution plan for your next stage.' },
  { icon: Icons.Chart, title: 'Next-Level Practice', desc: 'Preparation for high-stakes interviews and selection.' },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

const itemVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0 } },
};

const iconVariants = {
  hidden: { scale: 0.4, opacity: 0, rotate: -8 },
  visible: {
    scale: 1, opacity: 1, rotate: 0,
    transition: { duration: 0.7, ease: fadeEase },
  },
};

const titleVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: fadeEase } },
};

const descVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.85, ease: fadeEase } },
};

export function WhatYouLeaveWith() {
  return (
    <section
      data-screen-label="What You Leave With"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['WHAT YOU', 'LEAVE WITH']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(48px, 12vw, 180px)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            marginBottom: 'clamp(24px, 4vw, 40px)',
          }}
        />

        <p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.25 }}
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
          Proof of your capability. Ready for selection.
        </p>

        <Group className="xg-leave-grid">
          {items.map((it, i) => (
            <div
              key={i}
              variants={itemVariants}
              style={{
                display: 'flex', alignItems: 'flex-start',
                gap: 'clamp(16px, 2vw, 24px)',
              }}
            >
              <div
                variants={iconVariants}
                style={{
                  width: 44, height: 44,
                  color: theme.base,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transformOrigin: 'center',
                }}
              >
                {it.icon}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h3
                  variants={titleVariants}
                  style={{
                    fontSize: 'clamp(16px, 1.8vw, 20px)',
                    margin: '0 0 8px',
                    fontWeight: 600,
                    color: theme.base,
                    letterSpacing: '-0.005em',
                  }}
                >{it.title}</h3>
                <p
                  variants={descVariants}
                  style={{
                    fontSize: 'clamp(13px, 1.4vw, 15px)',
                    margin: 0,
                    lineHeight: 1.5,
                    color: theme.subtitle,
                  }}
                >{it.desc}</p>
              </div>
            </div>
          ))}
        </Group>
      </div>
    </section>
  );
}
