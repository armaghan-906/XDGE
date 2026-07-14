import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
          willChange: 'transform',
          display: 'block',
          ...imgStyle,
        }}
      />
    </div>
  );
}
