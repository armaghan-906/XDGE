import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const quotes = [
  { q: 'It genuinely changed how I think, not just what I know.', a: '— SG, Participant (Age 18), XDGE Professional Skills Mastery (2024)' },
  { q: "We saw a real shift in him. He's more confident, more focused, and taking responsibility in a way we hadn't seen before.", a: '— KH, Parent of Participant (Age 13), XDGE Leading Yourself (2025)' },
  { q: "My interviewer actually mentioned my portfolio and the fact I'd already worked on real projects. That made a difference.", a: '— AR, Participant (Age 13), XDGE Research Incubator (2024)' },
  { q: "Watching my boys present to professionals was emotional. They've changed a lot, especially in how they think about their future.", a: '— TD, Parent of Participants (Ages 16 & 17), XDGE Junior MBA (2025)' },
  { q: "I feel a lot more prepared than people my age. It didn't feel like school — you're learning how to perform when expectations are higher.", a: '— SG, Participant (Age 14), XDGE Leading Yourself (2024)' },
];

function TestimonialMarquee({ quotes }) {
  const loop = [...quotes, ...quotes];
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="xdge-marquee">
        {loop.map((q, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 380px',
              border: `1px solid ${theme.borderLight}`,
              background: '#f3f4f0',
              padding: '28px 26px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: 220,
            }}
          >
            <p
              style={{
                fontSize: 17, lineHeight: 1.45, margin: 0, color: theme.ink,
                fontFamily: theme.display, fontWeight: 400, letterSpacing: '0.005em',
              }}
            >"{q.q}"</p>
            <div style={{ fontSize: 12, color: '#7d7e7c', marginTop: 24, lineHeight: 1.5 }}>{q.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProvenOutcomes() {
  return (
    <section data-screen-label="06 Proven Outcomes" style={{ background: theme.base, color: theme.ink, padding: '120px 0 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <Group style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'flex-end', marginBottom: 64 }}>
          <div>
            <motion.div
              variants={fadeUp}
              style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7d7e7c', marginBottom: 28 }}
            >(PROVEN OUTCOMES)</motion.div>
            <SplitHeading
              lines={['PROVEN', 'OUTCOMES']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(96px, 14vw, 220px)',
                lineHeight: 0.95, letterSpacing: '-0.01em',
              }}
            />
          </div>
          <motion.div variants={fadeUp} style={{ paddingBottom: 24, color: '#3a3c3e' }}>
            <p style={{ fontSize: 17, lineHeight: 1.55, margin: '0 0 12px' }}>
              See what participants and parents have to say about us.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: '#7d7e7c', margin: 0, maxWidth: 480 }}>
              See what participants and parents have to say about their experience,
              and the outcomes they've achieved.
            </p>
          </motion.div>
        </Group>
      </div>
      <TestimonialMarquee quotes={quotes} />
    </section>
  );
}
