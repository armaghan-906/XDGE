import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useSmallScreen } from '../../hooks/useSmallScreen';

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
  // Lazy by default. Every ParallaxImage on the site sits below the fold (they are
  // card and row images), so eager loading only meant all of them competed for
  // bandwidth and decode time during first paint, and their decodes then landed
  // inside the first scroll frames. Pass loading="eager" explicitly for anything
  // genuinely above the fold.
  loading = 'lazy',
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

  // No parallax on phones. The page scrolls on the compositor thread while this
  // transform is computed in JS on the main thread, so on a phone the image visibly
  // trails the card it sits in — which reads as the image itself stuttering inside
  // the card. Holding it still removes the lag outright; there is nothing to fall
  // behind. It also drops a scroll subscriber per image (seven on this site).
  const small = useSmallScreen();
  const parallax = small ? 0 : range;

  // /assets/foo.webp -> /assets/foo@1000.jpg  (generated for every referenced image
  // wider than 1100px; webp encoding was unavailable locally, and the decode saving
  // is about pixel count rather than format anyway).
  const mobileSrc = src ? src.replace(/\.(webp|jpe?g)$/i, '@1000.jpg') : src;

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {/* Phones get a 1000px variant, not the 1600px original. `srcset` alone is no
          use here: at DPR 3 a 390px phone computes a need of ~1170px and picks the
          1600px file anyway, which is the opposite of the point. A `<picture>` media
          condition is the only way to make the choice by viewport rather than by
          pixel density. Measured on Home: 31MP decoded against 14.7MP the screen can
          actually show; the variants are 1.0MP each instead of 2.56MP. */}
      <picture>
        <source media="(max-width: 768px)" srcSet={mobileSrc} />
        <motion.img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          style={{
            position: 'absolute',
            top: `-${parallax}%`,
            left: 0,
            width: '100%',
            height: `${100 + parallax * 2}%`,
            objectFit: 'cover',
            objectPosition,
            ...(small ? null : { y }),
            willChange: small ? 'auto' : (near ? 'transform' : 'auto'),
            display: 'block',
            ...imgStyle,
          }}
        />
      </picture>
    </div>
  );
}
