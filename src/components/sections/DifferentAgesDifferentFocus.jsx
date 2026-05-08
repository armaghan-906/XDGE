import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const rows = [
  {
    title: 'Career Entry & Professional Development',
    age: 'Ages 19+',
    focus: 'Performance, credibility, and impact',
    experience: [
      'Delivered at a professional standard aligned to the workplace',
      'Builds credibility for interviews, internships, and early roles',
      'Develops communication, judgement, and execution skills',
      'Applies learning to real-world challenges',
    ],
    project: [
      'Work on real-world business or leadership challenges',
      'Present ideas, solutions, and recommendations clearly',
      'Build a portfolio of work that demonstrates capability',
      'Develop evidence of impact to use in interviews and early career roles',
    ],
  },
  {
    title: 'University & Academic Progression',
    age: 'Ages 16+',
    focus: 'Standing out in competitive environments',
    experience: [
      'Prepares students for university applications and interviews',
      'Builds confidence, articulation, and personal presence',
      'Develops readiness for competitive academic environments',
    ],
    project: [
      'Create and present structured projects linked to interests or future goals',
      'Develop clear thinking, communication, and positioning',
      'Build strong material for personal statements and interviews',
      'Practise presenting ideas with confidence and credibility',
    ],
  },
  {
    title: 'School Entry & Early Leadership',
    age: 'Ages 11–16',
    focus: 'Confidence, habits, and early leadership behaviours',
    experience: [
      'Delivered through engaging, interactive activities',
      'Introduces leadership in a practical and relatable way',
      'Builds confidence, communication, and early habits',
    ],
    project: [
      'Work on simple, structured projects to build confidence',
      'Share ideas and present in a supportive environment',
      'Practise teamwork, responsibility, and follow-through',
      'Begin developing the confidence to speak up and contribute',
    ],
  },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: fadeEase } },
};

function Bullets({ items }) {
  return (
    <ul style={{
      listStyle: 'none', margin: 0, padding: 0,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {items.map((b) => (
        <li
          key={b}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            fontSize: 'clamp(13px, 1.4vw, 15px)',
            lineHeight: 1.55,
            color: '#3a3c3e',
          }}
        >
          <span aria-hidden style={{
            flexShrink: 0,
            width: 5, height: 5, borderRadius: '50%',
            background: theme.ink, marginTop: '0.55em',
          }} />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function DifferentAgesDifferentFocus() {
  return (
    <section
      data-screen-label="Different Ages, Different Focus"
      data-section-theme="light"
      style={{
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['DIFFERENT AGES.', 'DIFFERENT FOCUS.', 'DIFFERENT OUTCOMES.']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(40px, 8.5vw, 130px)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            marginBottom: 'clamp(28px, 4vw, 40px)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: fadeEase, delay: 0.2 }}
          style={{
            fontSize: 'clamp(18px, 2vw, 24px)',
            lineHeight: 1.45,
            color: theme.ink,
            margin: '0 0 clamp(48px, 7vw, 80px)',
            fontWeight: 500,
            letterSpacing: '-0.005em',
            maxWidth: 820,
          }}
        >
          This is not the same programme repeated at different ages. Each stage
          is designed around where students are and what they are working towards next.
        </motion.p>

        {rows.map((r, i) => (
          <motion.div
            key={r.title}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {i > 0 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.1, ease: fadeEase }}
                style={{
                  height: 2, background: theme.ink,
                  margin: 'clamp(36px, 5vw, 56px) 0',
                  transformOrigin: 'left',
                }}
              />
            )}
            <div className="xg-ages-row" style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(220px, 1fr) 1.4fr 1.4fr',
              gap: 'clamp(24px, 4vw, 56px)',
              alignItems: 'flex-start',
            }}>
              <div>
                <h3 style={{
                  fontFamily: theme.display, fontWeight: 800,
                  fontSize: 'clamp(18px, 1.8vw, 22px)',
                  lineHeight: 1.18, letterSpacing: '-0.005em',
                  margin: '0 0 6px',
                  textTransform: 'uppercase',
                  color: theme.ink,
                }}>
                  {r.title} <span style={{ whiteSpace: 'nowrap' }}>({r.age})</span>
                </h3>
                <div style={{
                  fontSize: 'clamp(13px, 1.4vw, 15px)',
                  lineHeight: 1.5,
                  color: '#3a3c3e',
                  fontStyle: 'italic',
                }}>
                  Focus: {r.focus}
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: 11, letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#7d7e7c',
                  marginBottom: 14, fontWeight: 700,
                }}>Experience</div>
                <Bullets items={r.experience} />
              </div>
              <div>
                <div style={{
                  fontSize: 11, letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#7d7e7c',
                  marginBottom: 14, fontWeight: 700,
                }}>Project Application</div>
                <Bullets items={r.project} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
