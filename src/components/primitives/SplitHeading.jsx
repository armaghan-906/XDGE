import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
};

const lineVariants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 1.4, ease: [0.2, 0.7, 0.2, 1] } },
};

export function SplitHeading({ lines, style, tag = 'h2', amount = 0.4 }) {
  const Tag = motion[tag];
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={containerVariants}
      style={{ margin: 0, ...style }}
    >
      {lines.map((l, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
          <motion.span variants={lineVariants} style={{ display: 'block' }}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
