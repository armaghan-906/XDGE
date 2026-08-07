import { theme } from '../../theme';
import { SplitHeading } from '../primitives/SplitHeading';

/**
 * CreateYourPath — centered banner heading on the section's own dark ground.
 * CREATE YOUR OWN (outline) / PATH & LEAVE (white) + A TRAIL (gradient).
 */
export function CreateYourPath() {
  return (
    <section
      data-screen-label="Create Your Own Path"
      data-section-theme="dark"
      style={{
        background: theme.dark,
        color: theme.base,
        position: 'relative',
        overflow: 'hidden',
        // generous vertical space above and below the heading
        padding: 'clamp(90px, 11vw, 160px) clamp(20px, 4vw, 40px)',
      }}
    >
      {/* The lightning_1 loop that used to sit behind this heading is gone. It was
          the last video on About, and the only thing still fetching an mp4 here on a
          phone; the heading carries the section on its own. */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 10 }}>
        {/* Same line mask as every other display heading. This was a plain <h2>,
            so it only ever got the generic 0.65s CSS fade while the rest of the
            site rose from behind a clip — which is why it read as not animating.
            Font size lives on the h2 and the kicker is 0.45em of it (the original
            5.09vw/11.3vw and 90px/200px are both exactly that ratio), because the
            clip's em padding resolves against the h2's size, not the line's. */}
        <SplitHeading
          lineClasses={['cyan-text', 'hollow-text']}
          lines={[
            <span style={{ display: 'block', fontSize: '0.45em', whiteSpace: 'nowrap', paddingLeft: '0.05em' }}>
              CREATE YOUR OWN PATH &amp;
            </span>,
            'LEAVE A TRAIL',
          ]}
          style={{
            textAlign: 'left',
            fontFamily: theme.display, fontWeight: 900,
            fontSize: 'clamp(40px, 11.3vw, 200px)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        />
      </div>
    </section>
  );
}
