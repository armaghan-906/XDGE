import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { theme } from '../../theme';

const items = [
  { id: '01', title: "Leadership Foundation", img: "/assets/serve-01.webp" },
  { id: '02', title: "Advanced Communication", img: "/assets/serve-02.webp" },
  { id: '03', title: "Strategic Thinking", img: "/assets/serve-03.webp" },
  { id: '04', title: "Team Dynamics", img: "/assets/serve-04.webp" },
  { id: '05', title: "Conflict Resolution", img: "/assets/principle-1.webp" },
  { id: '06', title: "Resilience Training", img: "/assets/principle-2.webp" },
  { id: '07', title: "Mentorship Masterclass", img: "/assets/principle-3.webp" },
  { id: '08', title: "Performance Habits", img: "/assets/principle-4.webp" },
  { id: '09', title: "Winning Mindset", img: "/assets/principle-5.webp" },
];

function Card({ item, index, progress, total }) {
  // progress goes from 0 to total - 1
  
  // Calculate difference from active center
  const diff = useTransform(progress, (p) => {
    let d = index - p;
    // Optional: make it infinitely wrap around. 
    // For now, we'll just do clamped linear drag, but we can allow overflow wrapping.
    return d; 
  });

  // Calculate layout on a circle
  const radius = 1200; // Radius of the wheel
  const anglePerItem = 14; // Degrees between each item

  const angle = useTransform(diff, (d) => d * anglePerItem);
  
  const x = useTransform(angle, (a) => radius * Math.sin((a * Math.PI) / 180));
  const y = useTransform(angle, (a) => radius - radius * Math.cos((a * Math.PI) / 180));
  const rotate = angle;
  
  const zIndex = useTransform(diff, (d) => total - Math.abs(Math.round(d)));
  
  // Fade out cards that are too far around the wheel
  const opacity = useTransform(diff, [-4, -3, 0, 3, 4], [0, 0.4, 1, 0.4, 0]);
  const scale = useTransform(diff, [-3, 0, 3], [0.8, 1, 0.8]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 'clamp(240px, 25vw, 340px)',
        aspectRatio: '3/4',
        originX: 0.5,
        originY: 0.5,
        x: useTransform(x, (val) => `calc(-50% + ${val}px)`),
        y: useTransform(y, (val) => `calc(-50% + ${val}px)`),
        rotate,
        zIndex,
        opacity,
        scale,
      }}
    >
      <div style={{
        width: '100%', height: '100%',
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 24px 48px -12px rgba(0,0,0,0.4)',
        background: '#111',
      }}>
        <img 
          src={item.img} 
          alt={item.title} 
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: 0.8,
            transition: 'opacity 0.4s ease',
          }} 
          onMouseOver={(e) => e.currentTarget.style.opacity = 1}
          onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 24, left: 24, right: 24,
          color: theme.base
        }}>
          <div style={{
            fontFamily: theme.display,
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 900,
            lineHeight: 1,
            opacity: 0.5,
            marginBottom: 8
          }}>
            {item.id}
          </div>
          <h3 style={{
            fontFamily: theme.displayTight,
            fontSize: 'clamp(18px, 2vw, 24px)',
            margin: 0,
            lineHeight: 1.1
          }}>
            {item.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export function DragWheelCarousel() {
  const containerRef = useRef(null);
  
  // Progress value (0 to items.length - 1)
  const progressRaw = useMotionValue(0);
  // Extremely soft, slow spring to make the transition slow
  const progress = useSpring(progressRaw, { stiffness: 15, damping: 25, mass: 1.5 });

  // Handle Dragging
  const handleDrag = (event, info) => {
    // Determine how much we dragged (in items).
    // Increased from 100 to 400 to slow down the drag speed significantly
    const delta = -info.delta.x / 400;
    let next = progressRaw.get() + delta;
    
    // Clamp to [0, items.length - 1]
    next = Math.max(0, Math.min(items.length - 1, next));
    progressRaw.set(next);
  };

  // Handle Wheel scroll (trackpad / mousewheel)
  const handleWheel = (e) => {
    const isVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    // Increased denominator to slow down scroll speed
    const delta = isVertical ? e.deltaY / 400 : e.deltaX / 400;
    
    const current = progressRaw.get();
    
    // Release scroll at bounds
    if (current <= 0 && delta < 0) return;
    if (current >= items.length - 1 && delta > 0) return;

    e.preventDefault();
    let next = current + delta;
    next = Math.max(0, Math.min(items.length - 1, next));
    progressRaw.set(next);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // Non-passive wheel listener to allow e.preventDefault() to stop page scroll when over the carousel
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section 
      data-section-theme="dark"
      style={{
        background: theme.dark,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 120px) 0',
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 60, position: 'relative', zIndex: 10 }}>
        <h2 style={{
          fontFamily: theme.display,
          fontSize: 'clamp(28px, 4vw, 56px)',
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
        }}>
          <span className="cyan-text" style={{ display: 'block' }}>BUILD A PROJECT THAT SHOWCASES</span>
          <span className="hollow-text" style={{ display: 'block', marginTop: 8 }}>YOUR FUTURE POTENTIAL.</span>
        </h2>
      </div>

      {/* Drag Surface & Cards */}
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }} // We handle the actual movement via progressRaw
        dragElastic={0}
        onDrag={handleDrag}
        style={{
          position: 'relative',
          height: 'clamp(400px, 60vh, 600px)',
          width: '100%',
          cursor: 'grab',
          touchAction: 'none' // Prevent vertical scroll while dragging horizontally
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {items.map((item, i) => (
          <Card key={item.id} item={item} index={i} progress={progress} total={items.length} />
        ))}
      </motion.div>
    </section>
  );
}
