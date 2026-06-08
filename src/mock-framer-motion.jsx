import React from 'react';

// A lightweight mock of framer-motion to completely eliminate scroll overhead,
// layout thrashing, and animation flickering.

const motionFactory = (tag) => {
  return React.forwardRef((props, ref) => {
    const { 
      initial, animate, exit, variants, transition, whileHover, whileTap, whileInView, 
      viewport, layout, layoutId, onViewportEnter, onViewportLeave, style,
      ...rest 
    } = props;
    
    // Strip any MotionValues from the style object
    let cleanStyle = undefined;
    if (style) {
      cleanStyle = { ...style };
      for (const key in cleanStyle) {
        if (cleanStyle[key] && typeof cleanStyle[key].get === 'function') {
          cleanStyle[key] = cleanStyle[key].get();
        }
      }
    }

    // Filter out any other custom motion props that React might complain about
    const domProps = {};
    for (const key in rest) {
      if (!key.startsWith('onPan') && !key.startsWith('onHover') && !key.startsWith('onTap') && !key.startsWith('drag')) {
        domProps[key] = rest[key];
      }
    }

    return React.createElement(tag, { ref, style: cleanStyle, ...domProps });
  });
};

export const motion = new Proxy(motionFactory, {
  get: (_, tag) => motionFactory(tag),
  apply: (_, __, args) => motionFactory(args[0])
});

export const AnimatePresence = ({ children }) => <>{children}</>;
export const MotionConfig = ({ children }) => <>{children}</>;

// Mock hooks to return static values
const mockMotionValue = { get: () => 0, set: () => {}, onChange: () => () => {} };
export const useScroll = () => ({ scrollYProgress: mockMotionValue, scrollY: mockMotionValue });
export const useTransform = (val, input, output) => {
  return { get: () => (output && output.length > 0 ? output[0] : 0), onChange: () => () => {} };
};
export const useSpring = () => mockMotionValue;
export const useMotionValue = (v) => ({ get: () => v, set: () => {}, onChange: () => () => {} });
export const useAnimation = () => ({ start: () => {}, stop: () => {} });
export const useInView = () => true;
export const useIsPresent = () => true;
