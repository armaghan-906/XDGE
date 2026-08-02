/**
 * HeroAmbient — atmospheric mesh-gradient + 3 floating orbs.
 *
 * Animation is driven by CSS keyframes (not framer-motion `animate`) so the
 * browser auto-pauses composited transforms when the section is offscreen.
 * This is the cheap, always-on ambient layer used by every non-home hero.
 */
import { VideoBackground } from './primitives/VideoBackground';

// playbackRate defaults to 1 — the clips are slow in themselves now.
//
// Every hero here used to run at 0.45, which does not slow a video so much as
// thin it out: a 30fps source shown at 0.45 presents 13.5 unique frames a second,
// and that is the judder. The assets are retimed instead (ffmpeg minterpolate,
// genuinely longer with real in-between frames), so native rate is both slow and
// smooth. Passing a rate below 1 again would bring the judder straight back.
export function HeroAmbient({ src = "/assets/videos/hero.mp4", playbackRate = 1, ...rest }) {
  return <VideoBackground src={src} playbackRate={playbackRate} {...rest} />;
}
