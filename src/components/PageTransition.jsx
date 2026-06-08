import { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  useEffect(() => {
    // Small delay to prevent scroll jump before unmount
    setTimeout(() => { window.scrollTo(0, 0); }, 50);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#000000' }} />}>
          {outlet}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
