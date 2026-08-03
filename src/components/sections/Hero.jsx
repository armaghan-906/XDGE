import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useSmallScreen } from '../../hooks/useSmallScreen';
import { mobileVideo } from '../../utils/mobileVideo';
import { useVideoAutoplay } from '../../hooks/useVideoAutoplay';
import { Link } from 'react-router-dom';
import { theme } from '../../theme';
import { Logo } from '../Logo';
import { Group, Reveal } from '../primitives/Reveal';

// No playbackRate here on purpose — the clip itself is slow.
//
// The calm pacing used to come from playbackRate 0.4 on a 1.67s / 30fps / 50-frame
// source. That does not create frames, it just holds each one 2.5x longer, so the
// effective rate was 12.5fps: measured with requestVideoFrameCallback as 50 unique
// frames over 4s, against a page that was itself dropping zero frames. Twelve fps
// is the judder — slowing a video this way can only ever make it choppier.
//
// The asset is now genuinely slow instead: retimed 2.5x with motion-interpolated
// in-between frames (ffmpeg minterpolate), so it is 4.03s of real 30fps, 121 frames.
// Same pacing as before, ~30fps instead of 12.5, and 924KB instead of 2.1MB because
// the source was a wildly overspecced 10.3Mbps for a background loop.
//
// So: leave it at native rate. Re-introducing playbackRate would bring the judder
// straight back.

export function Hero() {
  const videoRef = useRef(null);
  // Phones get a 640px cut of the same clip rather than the desktop file.
  const small = useSmallScreen();
  const clip = small ? mobileVideo('/assets/videos/logo_reveal.mp4') : '/assets/videos/logo_reveal.mp4';

  // Stop decoding once the hero is off-screen. `autoPlay loop` on its own keeps
  // this clip decoding for the whole session — it was still running while the
  // visitor was 13,000px down the page, so every scroll frame anywhere on Home
  // paid for a video nobody could see. `FloatingVideo` and `VideoBackground`
  // already gate playback this way; the hero was the one that did not.
  const inView = useInView(videoRef, { margin: '200px' });

  useVideoAutoplay(videoRef, inView);

  return (
    <section
      data-screen-label="01 Hero"
      data-cursor="light"
      data-section-theme="dark"
      style={{
        background: '#000000', color: theme.base,
        minHeight: '135vh', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Full-bleed 100vh cover video with the logo dead-centre of the first
          viewport — this is now the first thing the visitor sees, since the intro
          preloader that used to precede it has been removed. */}
      <video
        ref={videoRef}
        src={clip}
        poster={small ? undefined : "/assets/videos/logo_reveal_poster.jpg"}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#000000',
        opacity: 0.2,
        zIndex: 2,
      }} />
      <div
        className="xg-hero-lockup"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '100vh',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
        }}
      >
        <Logo style={{ fontSize: 'clamp(64px, 15vw, 200px)' }} />
        <div style={{ textAlign: 'center', marginTop: 'clamp(16px, 2vw, 24px)' }}>
          <div style={{
            fontFamily: theme.body,
            fontSize: 'clamp(10px, 1.8vw, 24px)',
            letterSpacing: '0.2em',
            color: '#ffffff',
            marginBottom: 'clamp(8px, 1.2vw, 16px)',
            fontWeight: 400
          }}>
            LEAD YOUR OWN OPPORTUNITIES.
          </div>
          <div className="cyan-text" style={{
            fontSize: 'clamp(10px, 1.8vw, 24px)',
            letterSpacing: '0.3em',
            fontWeight: 600
          }}>
            TRAIN • BUILD • LEAD • IMPACT
          </div>
        </div>
      </div>

      {/* Rises from below as one cascade under framer, rather than picking up the
          generic CSS reveal. Left to the CSS engine, the <h3> and <p> each got the
          shared 20px lift — barely readable as motion next to the 48px `fadeUp`
          used everywhere else, so this block looked like it just switched on. */}
      <Group className="xg-hero-copy" style={{
        position: 'absolute',
        bottom: 'clamp(12px, 2vw, 20px)',
        right: 'clamp(24px, 4vw, 40px)',
        zIndex: 10,
        textAlign: 'right',
        maxWidth: 580,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}>
        <Reveal style={{ width: '100%' }}>
          <h3 style={{
            fontSize: 'clamp(20px, 2.2vw, 28px)',
            lineHeight: 1.25,
            margin: 0,
            fontFamily: theme.body,
            color: theme.base,
            fontWeight: 600
          }}>
            For Young People 12&ndash;24 Building<br />
            Their Next Step Advantage
          </h3>
        </Reveal>

        <Reveal style={{ width: '100%' }}>
          <div style={{ width: '100%', height: 1, background: '#ffffff', margin: '16px 0 20px' }}></div>
        </Reveal>

        <Reveal style={{ width: '100%' }}>
          <p style={{
            fontSize: 'clamp(12px, 1.3vw, 14px)',
            lineHeight: 1.5,
            margin: '0 0 20px',
            color: '#e0e0e0',
            fontWeight: 400,
          }}>
            The XDGE (pronounced Edge) helps ambitious young people develop the
            leadership, skills, and real-world experience that define their distinctive edge.
            Guided by experienced leaders and industry experts, participants build the
            confidence, capability, and portfolio to stand out in their next opportunity and
            make an impact in school, university, careers, business, and life.
          </p>
        </Reveal>

        <Reveal>
          <Link
            to="/programmes"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px',
              border: `1px solid rgba(255,255,255,0.4)`, borderRadius: 999, color: theme.base,
              textDecoration: 'none', fontSize: 13, fontWeight: 500,
              // No backdrop-filter. This button sits over the looping hero video, and
              // a backdrop blur has to re-sample its backdrop every frame the video
              // paints — which is every frame, so the cost landed on each scroll frame
              // and made this corner stutter. A flatter solid keeps it legible for free.
              background: 'rgba(0,0,0,0.55)',
            }}
          >View All Programmes <span style={{ fontSize: 16 }}>→</span></Link>
        </Reveal>
      </Group>
    </section>
  );
}
