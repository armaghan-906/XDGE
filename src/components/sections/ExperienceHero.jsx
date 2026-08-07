import { theme } from '../../theme';
import { SplitHeading } from '../primitives/SplitHeading';
import { Group, Reveal } from '../primitives/Reveal';
import { HeroAmbient } from '../HeroAmbient';

const pStyle = {
  fontFamily: theme.body,
  fontSize: 'clamp(14px, 1.4vw, 16px)',
  lineHeight: 1.6,
  color: theme.subtitle,
  margin: 0,
};

export function ExperienceHero() {

  return (
    <section
      data-screen-label="01 Experience Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        minHeight: '120vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <HeroAmbient src="/assets/videos/hero.mp4" overlayOpacity={0.25} />
      <div style={{
        flex: 1,
        position: 'relative', zIndex: 10,
        padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 56px) clamp(32px, 4vw, 48px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        gap: 'clamp(40px, 6vw, 72px)',
      }}>
        {/* Two-line hero — "HOW XDGE" (size B) over "WORKS" (size A), cyan X.
            No scroll parallax on this block. It used to drift up 120px and fade to
            0.4 opacity as the page scrolled, on top of the mask — which is why this
            heading read differently from every other one on the site. The section
            headings all measure the same on both pages (THE JOURNEY 0.70s, OUR
            PERFORMANCE FORMULA 0.65s, WHAT YOU LEAVE WITH 0.70s, IS THIS RIGHT FOR
            ME 0.65s); the drift was the only thing setting the hero apart. Dropping
            it also removes a scroll subscriber. */}
        <div style={{ marginTop: 8 }}>
          <SplitHeading
            tag="h1"
            lines={[
              <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: '0.45em', paddingBottom: '0.1em' }}>
                <span className="hollow-text" style={{ paddingRight: '0.28em' }}>HOW</span>
                <span className="cyan-text">X</span>
                <span className="hollow-text">DGE</span>
              </span>,
              <span className="hollow-text" style={{ display: 'block' }}>WORKS</span>,
            ]}
            style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(40px, 11.3vw, 200px)',
              lineHeight: 0.95, letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          />
        </div>

        {/* Content card — bottom-right */}
        <div className="xg-hero-body" style={{ alignItems: 'flex-end' }}>
          <div className="xg-hide-md" />
          {/* Group + Reveal per part, the same cascade as the Home hero copy — the
              user asked for the heros to read identically across pages.

              This block carried `data-reveal`, which hands it to the global CSS
              engine: one 20px lift over 0.65s for the whole card. At this size, next
              to the 48px rise used everywhere else, that reads as the text simply
              being there rather than arriving — which is why it looked static. */}
          <Group
            style={{
              maxWidth: 640,
            }}
          >
            <Reveal>
            <div style={{
              fontFamily: theme.display, fontWeight: 900,
              fontSize: 'clamp(13px, 1.4vw, 20px)',
              lineHeight: 1.2, letterSpacing: '-0.01em',
              textTransform: 'uppercase', color: theme.base,
              whiteSpace: 'nowrap',
            }}>
              <div>Real Leadership Development.</div>
              <div>Real Projects.</div>
              <div>Industry Professionals &amp; Coaches.</div>
              <div>Real Results For <span className="cyan-text">Ages 12&ndash;24+</span></div>
            </div>
            </Reveal>

            <Reveal>
            <div style={{
              height: 1, background: 'rgba(255,255,255,0.2)',
              margin: 'clamp(20px, 2.4vw, 30px) 0',
            }} />
            </Reveal>

            <Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.6vw, 18px)' }}>
              <p style={pStyle}>
                Receive the same leadership development trusted by organisations
                around the world, re-engineered for young people, graduates, and
                early career professionals.
              </p>
              <p style={pStyle}>
                Build a project that reflects your interests, ambitions, and
                future goals.
              </p>
              <p style={pStyle}>
                Supported by vetted expert leaders and professionals, you develop
                leadership capability, professional skills, and real-world
                experience, while building evidence of initiative, achievement,
                and impact that helps you stand out in future opportunities.
              </p>
            </div>
            </Reveal>
          </Group>
        </div>
      </div>
    </section>
  );
}
