import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const principles = [
  {
    n: '01',
    title: 'Our Approach',
    body: 'XDGE is led by senior leaders, leadership development specialists, and industry professionals with over 20 years of experience developing high performance in individuals, teams, and organisations. We bring the calibre of leadership development typically reserved for professionals and executives, translating it into engaging, practical experiences that prepare young people for the real world.',
    img: '/assets/principle-1.webp',
  },
  {
    n: '02',
    title: 'From Learning To Performance',
    body: 'Too many programmes focus on knowledge and assume results will follow. We know there is a gap between learning and performance, and we are built to close it. Through meaningful projects, real challenges, and practical application, young people develop leadership, confidence, and professional capability through passion-driven projects they genuinely care about — giving them a reason to step forward, take ownership, and lead.',
    img: '/assets/principle-2.webp',
  },
  {
    n: '03',
    title: 'Our Belief',
    body: 'We are driven by one belief: young people are capable of far more than they realise. They should see themselves as professionals and leaders long before titles are given.',
    img: '/assets/principle-3.webp',
  },
  {
    n: '04',
    title: 'Our Standard',
    body: 'We thrive in the moments where individuals and teams rise to a new level of performance. We work alongside individuals to remove limitations, create clarity, and move forward with purpose. We exist to help people reach their next level. Our focus is not just improvement — it is transformation.',
    img: '/assets/principle-4.webp',
  },
  {
    n: '05',
    title: 'The Moment That Matters',
    body: 'Many people never experience the moment where everything shifts — the moment they realise they are capable of far more than they ever believed. That moment changes confidence. It changes ambition. It changes performance. XDGE was built to create those moments early, in the foundational years where belief, identity, and leadership capability can shape everything that comes next.',
    img: '/assets/principle-5.webp',
  },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: fadeEase } },
};

export function AboutPrinciples() {
  return (
    <section
      data-screen-label="Why XDGE Exists"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        padding: 'clamp(120px, 15vw, 240px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SplitHeading
          lines={['WHY XDGE', 'EXISTS']}
          style={{
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(67.5px, 10.5vw, 199.5px)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            marginBottom: 'clamp(28px, 4vw, 40px)',
          }}
        />

        <div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            display: 'flex', flexDirection: 'column',
            gap: 10,
            marginBottom: 'clamp(48px, 7vw, 88px)',
            maxWidth: 640,
          }}
        >
          <div style={{
            fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: theme.subtitle, fontWeight: 700,
            marginBottom: 14,
          }}>
            Who Are We
          </div>
          <p style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            lineHeight: 1.55,
            color: theme.base, margin: 0,
            fontWeight: 500,
          }}>
            A clear set of beliefs defines how we think, how we work, and how we
            develop leaders. These principles shape every programme, every
            experience, and every outcome we deliver.
          </p>
        </div>

        <div className="xg-principles-list">
          {principles.map((p) => (
            <div
              key={p.n}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="xg-principle-row"
            >
              <div className="xg-principle-num" style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(67.5px, 10.5vw, 199.5px)',
                lineHeight: 0.9, letterSpacing: '-0.03em',
                color: theme.base,
              }}>{p.n}</div>

              <div className="xg-principle-text">
                <h3 style={{
                  fontFamily: theme.body, fontWeight: 700,
                  fontSize: 'clamp(22px, 2.4vw, 30px)',
                  lineHeight: 1.15, letterSpacing: '-0.005em',
                  margin: '0 0 16px',
                  color: theme.base,
                }}>{p.title}</h3>
                <p style={{
                  fontSize: 'clamp(14px, 1.5vw, 16px)',
                  lineHeight: 1.65, margin: 0,
                  color: theme.subtitle,
                  maxWidth: 560,
                }}>{p.body}</p>
              </div>

              <div className="xg-principle-img">
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  overflow: 'hidden',
                  background: '#000000',
                }}>
                  <img
                    src={p.img}
                    alt=""
                    loading="eager"
                    decoding="async"
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      objectPosition: '50% 40%',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
