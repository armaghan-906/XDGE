import { useEffect, useState } from 'react';

// Cap on waiting for webfonts before animating anyway, so a slow or failed
// font request can never leave a heading stuck hidden.
const CAP_MS = 1200;

let settled = false;

/**
 * useFontsReady — true once webfont metrics are final (or the cap elapses).
 *
 * Fonts are served with `display=swap`, so Archivo Black replaces the fallback
 * partway through load and every heading re-lays-out. Any heading animating a
 * *percentage* transform at that moment recomputes against a new height and
 * visibly jumps — the heading flicker. Gating the start on this means a heading
 * only ever animates against metrics that will not change under it.
 *
 * The module-level `settled` latch means that after the first resolve every
 * later mount (route changes) starts ready and never re-gates.
 */
export function useFontsReady() {
  const [ready, setReady] = useState(settled);

  useEffect(() => {
    if (ready) return;

    let alive = true;
    const done = () => {
      if (!alive) return;
      settled = true;
      setReady(true);
    };

    const timer = setTimeout(done, CAP_MS);
    if (document.fonts) document.fonts.ready.then(done);
    else done();

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [ready]);

  return ready;
}
