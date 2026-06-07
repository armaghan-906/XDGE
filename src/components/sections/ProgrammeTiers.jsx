import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';

const tiers = [
  {
    heading: 'For School Students Ready to Build Their Leadership Edge',
    cards: [
      {
        duration: 'Weeks 1-4',
        title: 'Lead Yourself',
        desc: 'Build the confidence, resilience, self-awareness, and mindset mastery that help young people take ownership, lead with confidence, and realise their potential.',
        img: '/assets/principle-2.webp',
      },
      {
        duration: 'Weeks 5-8',
        title: 'Leadership Toolkit',
        desc: 'Develop communication, teamwork, problem-solving, presentation, and leadership skills adapted from the professional world to help young people stand out with confidence.',
        img: '/assets/blog-02.webp',
      },
      {
        duration: 'Weeks 9-12',
        title: 'Leadership Changemaker Project',
        desc: 'Create and lead a meaningful project that demonstrates leadership, initiative, and real-world impact while showcasing your unique strengths and ability to make a difference.',
        img: '/assets/principle-1.webp',
      },
    ],
  },
  {
    heading: 'For Students Preparing for University, College, Apprenticeships, and Competitive Future Opportunities',
    cards: [
      {
        duration: 'Weeks 1-4',
        title: 'Leader Mindset',
        desc: 'Develop the mindset, confidence, and leadership qualities that help ambitious people pursue bigger goals and set themselves apart.',
        img: '/assets/right-for-me-2.webp',
      },
      {
        duration: 'Weeks 5-8',
        title: 'Professional & Leadership Toolkit',
        desc: 'Develop the professional skills, executive presence, and leadership capability that help you stand out in applications, interviews, and future opportunities.',
        img: '/assets/experience-card-1.webp',
      },
      {
        duration: 'Weeks 9-12',
        title: 'Leadership Impact Project',
        desc: 'Design and deliver a project that demonstrates your leadership, interests, and potential while creating compelling evidence of what makes you different.',
        img: '/assets/experience-card-2.webp',
      },
    ],
  },
  {
    heading: 'For University Students, Graduates & Future Industry Leaders',
    cards: [
      {
        duration: 'Weeks 1-4',
        title: 'High Performance Leadership Mindset',
        desc: 'Build the mindset, confidence, resilience, and professional presence that distinguish high performers and future leaders.',
        img: '/assets/right-for-me-1.webp',
      },
      {
        duration: 'Weeks 5-8',
        title: 'Leadership Influence & Impact Skills',
        desc: 'Develop executive presence, workplace influence, and the practical leadership and people skills needed to build credibility, navigate challenges, and create results from day one.',
        img: '/assets/experience-card-3.webp',
      },
      {
        duration: 'Weeks 9-12',
        title: 'Career Accelerator Project',
        desc: 'Lead a signature leadership project that showcases your expertise, demonstrates real-world impact, and helps establish your reputation as an emerging leader in your chosen profession.',
        img: '/assets/hero-team.webp',
      },
    ],
  },
  {
    heading: 'Leader Foundations — For Individuals Seeking Personalised Guidance & Focused Development',
    cards: [
      {
        duration: '12-14 weeks · 1:2:1 Mentor Programme',
        title: 'Incubator Pathways',
        desc: 'Take your idea from concept to reality through a specialist mentored incubator pathway focused on business, research, technology, life sciences, social enterprise, or leadership.',
        img: '/assets/who-we-are.webp',
      },
      {
        duration: '12-14 weeks · 1:2:1 Mentor Programme',
        title: 'Junior MBA',
        desc: 'Build a strong foundation in business and leadership through an accelerated programme designed for future entrepreneurs and leaders.',
        img: '/assets/about-hero.webp',
      },
      {
        duration: '12-14 weeks · 1:2:1 Mentor Programme',
        title: 'Business English & Workplace Fluency',
        desc: 'Master the language of business through practical training in meetings, presentations, networking, professional writing, and workplace communication.',
        img: '/assets/what-you-experience.webp',
      },
    ],
  },
];

function ProgrammeCard({ card }) {
  return (
    <article
      variants={fadeUp}
      className="xg-tier-card"
      data-cursor="grow"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: theme.base,
        border: `1px solid ${theme.borderLight}`,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <div className="xg-tier-card-media" style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        background: '#f3f3f1',
      }}>
        <img
          src={card.img}
          alt=""
          loading="eager"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 35%',
          }}
        />
      </div>

      <div style={{
        padding: 'clamp(22px, 2.6vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(12px, 1.4vw, 18px)',
        flex: 1,
      }}>
        <div style={{
          fontFamily: theme.body,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: theme.ink,
        }}>
          {card.duration}
        </div>

        <h4 style={{
          fontFamily: theme.displayTight,
          fontSize: 'clamp(20px, 2.1vw, 26px)',
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          margin: 0,
          color: theme.ink,
        }}>
          {card.title}
        </h4>

        <p style={{
          fontFamily: theme.body,
          fontSize: 'clamp(13px, 1.35vw, 15px)',
          lineHeight: 1.55,
          margin: 0,
          color: '#5b5c5a',
        }}>
          {card.desc}
        </p>
      </div>
    </article>
  );
}

function TierSeparator() {
  return (
    <div
      aria-hidden="true"
      style={{
        margin: 'clamp(96px, 14vw, 180px) 0',
        height: 1,
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.18) 50%, transparent 100%)',
      }}
    />
  );
}

export function ProgrammeTiers() {
  return (
    <section
      data-screen-label="Programme Tiers"
      data-section-theme="light"
      style={{
        background: theme.base,
        color: theme.ink,
        padding: 'clamp(96px, 14vw, 180px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {tiers.map((tier, i) => (
          <div key={tier.heading}>
            <h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{
                fontFamily: theme.displayTight,
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: '-0.005em',
                margin: '0 0 clamp(28px, 4vw, 40px)',
                color: theme.ink,
                maxWidth: '60ch',
              }}
            >
              {tier.heading}
            </h3>

            <Group
              className="xg-3"
              style={{
                gap: 'clamp(20px, 2.4vw, 28px)',
                alignItems: 'stretch',
              }}
            >
              {tier.cards.map((card) => (
                <ProgrammeCard key={card.title} card={card} />
              ))}
            </Group>

            {i < tiers.length - 1 && <TierSeparator />}
          </div>
        ))}
      </div>
    </section>
  );
}
