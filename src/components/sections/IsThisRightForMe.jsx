import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';
import { SplitHeading } from '../primitives/SplitHeading';

const groups = [
  {
    title: 'Career Entry & Professional Development',
    age: 'Ages 19+',
    img: '/assets/blog-01.webp',
    highlight:
      'Many of our graduates, professionals, and emerging leaders started here — wanting to stand out, make an impact, and step confidently into the next stage of their career.',
    bullets: [
      'I have an idea, interest, or industry problem I want to develop into a project I can showcase in interviews',
      'I want to stand out in competitive interviews',
      'I want to build credibility quickly in professional environments',
      'I want to communicate with confidence and presence',
      'I’m stepping into higher expectations and want to perform strongly',
      'I’m more introverted, but want to develop confidence as a leader',
      'I want to feel equipped, capable, and ready for the workplace',
    ],
  },
  {
    title: 'University Entrance & Academic Progression',
    age: 'Ages 16+',
    img: '/assets/blog-02.webp',
    highlight:
      'If you recognise yourself in these, you’re likely exactly where many of our students are.',
    bullets: [
      'I’m academically capable but unsure how to truly stand out',
      'I have an idea related to my chosen degree that I want to develop and showcase through a leadership project',
      'I want to demonstrate my leadership to strengthen my university applications',
      'I lack confidence in interviews or high-pressure situations',
      'I want to build something meaningful alongside my studies',
      'I want to communicate myself more confidently',
      'I want to meet like-minded people who are pushing themselves forward',
    ],
  },
  {
    title: 'School Entrance & Early Leader Foundations',
    age: 'Ages 11+',
    img: '/assets/blog-03.webp',
    highlight:
      'This stage is often where confidence, leadership habits, and self-belief begin to grow.',
    bullets: [
      'I want more confidence in myself',
      'I want to become more focused, motivated, and disciplined',
      'I want to learn how to step up and lead',
      'I know I have strengths, but I’m not using them fully yet',
      'I have an idea for a project and want to showcase it in a school application',
      'I want to stand out in opportunities available to me',
    ],
  },
];

const fadeEase = [0.2, 0.7, 0.2, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: fadeEase } },
};

function Card({ group, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      variants={cardVariants}
      style={{
        background: theme.dark,
        border: `1px solid ${theme.borderDark}`,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        overflow: 'hidden',
        background: theme.dark,
      }}>
        <img
          src={group.img}
          alt={group.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: '50% 35%',
            display: 'block',
          }}
        />
      </div>

      <div style={{
        padding: 'clamp(22px, 2.6vw, 32px)',
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(14px, 1.6vw, 20px)',
        flex: 1,
      }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: theme.subtitle, fontWeight: 600,
        }}>{group.age}</div>

        <h3 style={{
          fontFamily: theme.display, fontWeight: 800,
          fontSize: 'clamp(20px, 2.2vw, 26px)',
          lineHeight: 1.1, letterSpacing: '-0.005em',
          margin: 0,
          textTransform: 'uppercase',
          color: theme.base,
        }}>{group.title}</h3>

        <p style={{
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          lineHeight: 1.6, margin: 0,
          color: theme.subtitle,
        }}>{group.highlight}</p>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          data-cursor="grow"
          style={{
            marginTop: 'auto',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%',
            padding: '14px 0',
            background: 'transparent', color: theme.base,
            border: 'none',
            borderTop: `1px solid ${theme.borderDark}`,
            fontSize: 13, letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer', fontWeight: 500,
          }}
        >
          <span>{open ? 'Hide details' : 'You might recognise yourself'}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: fadeEase }}
            style={{
              display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 18, lineHeight: 1,
            }}
          >+</motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: fadeEase }}
              style={{ overflow: 'hidden' }}
            >
              <ul style={{
                listStyle: 'none', margin: 0, padding: '4px 0 0',
                display: 'flex', flexDirection: 'column',
                gap: 12,
              }}>
                {group.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      fontSize: 'clamp(13px, 1.4vw, 14px)',
                      lineHeight: 1.55,
                      color: theme.base,
                    }}
                  >
                    <span aria-hidden style={{
                      flexShrink: 0,
                      width: 5, height: 5, borderRadius: '50%',
                      background: theme.base, marginTop: '0.55em',
                    }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export function IsThisRightForMe() {
  return (
    <section
      data-screen-label="Is This Right For Me"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
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
                textTransform: 'uppercase', color: theme.subtitle,
                marginBottom: 28, fontWeight: 600,
              }}
            >(Is This Right For Me?)</motion.div>
            <SplitHeading
              lines={['IS THIS', 'RIGHT FOR ME']}
              style={{
                fontFamily: theme.display, fontWeight: 900,
                fontSize: 'clamp(48px, 11vw, 170px)',
                lineHeight: 0.95, letterSpacing: '-0.02em',
              }}
            />
          </div>
          <motion.div
            variants={fadeUp}
            style={{ paddingBottom: 24, maxWidth: 480 }}
          >
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.55,
              color: theme.base, margin: '0 0 18px',
            }}>
              Not sure if this is right for you?
            </p>
            <motion.a
              whileHover={{ x: 4 }}
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '12px 20px',
                border: `1px solid ${theme.base}`, borderRadius: 999,
                color: theme.base, textDecoration: 'none',
                fontSize: 13, fontWeight: 500,
              }}
            >
              Schedule A Call With Us <span style={{ fontSize: 16 }}>→</span>
            </motion.a>
          </motion.div>
        </Group>

        <Group
          className="xg-3"
          style={{
            gap: 'clamp(20px, 2.4vw, 28px)',
            alignItems: 'stretch',
          }}
        >
          {groups.map((g, i) => (
            <Card key={g.title} group={g} index={i} />
          ))}
        </Group>
      </div>
    </section>
  );
}
