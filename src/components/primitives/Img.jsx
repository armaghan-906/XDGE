import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Img({ src, alt = '', ratio = '4/3', style, zoom = true, parallax = 4 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    <div
      ref={ref}
      style={{ position: 'relative', width: '100%', aspectRatio: ratio, overflow: 'hidden', ...style }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={zoom ? { scale: 1.12, opacity: 0 } : { opacity: 0 }}
        whileInView={zoom ? { scale: 1, opacity: 1 } : { opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: `${100 + parallax * 2}%`,
          top: `-${parallax}%`,
          objectFit: 'cover', display: 'block',
          y,
        }}
      />
    </div>
  );
}
