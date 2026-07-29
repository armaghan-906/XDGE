import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/**
 * ParallaxImage — the image drifts vertically inside its frame as the page
 * scrolls (Boldz-style, matching the "Who Is It For" cards). The wrapper clips;
 * the image is oversized by `range`% at top & bottom so an edge is never
 * revealed as it moves. Drop-in replacement for a `div > img` image frame.
 *
 * Pass the frame's shape (aspectRatio / height / borderRadius) via `style`.
 * Hover-zoom keeps working because it animates `scale`, which composes with
 * the `y` transform used here.
 */
export function ParallaxImage({
  src,
  alt = '',
  range = 16,
  className,
  style,
  imgStyle,
  objectPosition = '50% 50%',
  loading = 'eager',
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  // `will-change: transform` used to be set unconditionally, which pinned a
  // separate compositor layer (and its full-resolution texture) for every
  // parallax image on the page at once — on an image-heavy page like Home that
  // is a large standing GPU allocation, and the memory pressure shows up as
  // scroll stutter rather than as anything visibly wrong. Promote only while the
  // image is near the viewport, i.e. only while its parallax is observable.
  const near = useInView(ref, { margin: '300px 0px 300px 0px' });

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        style={{
          position: 'absolute',
          top: `-${range}%`,
          left: 0,
          width: '100%',
          height: `${100 + range * 2}%`,
          objectFit: 'cover',
          objectPosition,
          y,
          willChange: near ? 'transform' : 'auto',
          display: 'block',
          ...imgStyle,
        }}
      />
    </div>
  );
}
