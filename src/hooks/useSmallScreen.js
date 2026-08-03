import { useEffect, useState } from 'react';

// Phones and small tablets. Matches the breakpoint the layout CSS already uses.
const QUERY = '(max-width: 768px)';

/**
 * useSmallScreen — true on phone-sized viewports.
 *
 * Used to keep background video off small screens. Video decode is the single most
 * expensive continuous thing a phone does on this site, and every hero has one
 * looping behind it. Removing it is measurable without needing to reproduce a phone's
 * frame rate: Home drops 0.90MB of transfer on mobile and stops decoding video frames
 * for the whole session. A poster still is shown instead, so the hero still has an
 * image behind the heading.
 *
 * Deliberately not `window.innerWidth` read once — an orientation change or a resize
 * has to flip it, otherwise a phone rotated to landscape keeps whichever branch it
 * loaded with.
 */
export function useSmallScreen() {
  const [small, setSmall] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = (e) => setSmall(e.matches);
    mq.addEventListener('change', onChange);
    setSmall(mq.matches);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return small;
}
