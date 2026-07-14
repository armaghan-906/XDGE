import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { theme } from '../../theme';

// Boldz-style line mask: each line rises up from behind its clip, one-by-one.
const lineMask = {
  hidden: { y: '120%' },
  visible: (i = 0) => ({
    y: '0%',
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.13 },
  }),
};

const items = [
  { 
    id: '01', 
    title: "Business & Entrepreneurship", 
    desc: "Start a business, launch a product, develop a service, or solve a commercial challenge.",
    img: "/assets/1.webp" 
  },
  { 
    id: '02', 
    title: "Engineering, Design & Future Technologies", 
    desc: "Develop products, systems, prototypes, infrastructure, robotics, AI, and emerging technologies.",
    img: "/assets/4.webp" 
  },
  { 
    id: '03', 
    title: "Community Impact & Social Change", 
    desc: "Lead initiatives that improve communities, wellbeing, inclusion, or social outcomes.",
    img: "/assets/3.webp" 
  },
  { 
    id: '04', 
    title: "Media, Marketing & Creative Industries", 
    desc: "Lead projects in content creation, branding, journalism, film, design, communications, and digital media.",
    img: "/assets/7.webp" 
  },
  { 
    id: '05', 
    title: "Leadership, Sport & Human Performance", 
    desc: "Develop projects around coaching, team leadership, sport, performance psychology, and personal excellence.",
    img: "/assets/2.webp" 
  },
  { 
    id: '06', 
    title: "Law, Government & Public Affairs", 
    desc: "Explore policy, law, governance, diplomacy, public service, and societal challenges.",
    img: "/assets/5.webp" 
  },
  { 
    id: '07', 
    title: "Health, Medicine & Life Sciences", 
    desc: "Explore healthcare, medicine, psychology, sport science, biotechnology, and human performance.",
    img: "/assets/9.webp" 
  },
  { 
    id: '08', 
    title: "Culture, Fashion & Creative Enterprise", 
    desc: "Create ventures, campaigns, products, events, or initiatives within fashion, music, arts, culture, and entertainment.",
    img: "/assets/6.webp" 
  },
  { 
    id: '09', 
    title: "Research, Education & Knowledge Creation", 
    desc: "Conduct original research, investigations, publications, educational resources, or academic studies.",
    img: "/assets/8.webp" 
  },
  { 
    id: '10', 
    title: "Finance, Economics & Investment", 
    desc: "Explore markets, investment, economics, fintech, business finance, and financial decision-making.",
    img: "/assets/10.webp" 
  },
];

function Card({ item, index, progress, total }) {
  // Difference from the active centre, WRAPPED so the wheel loops forever
  // (the shortest signed distance around the ring, in −total/2 … total/2).
  const diff = useTransform(progress, (p) => {
    let d = (((index - p) % total) + total) % total;
    if (d > total / 2) d -= total;
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
        width: 'clamp(260px, 27vw, 400px)',
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
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 38%, transparent 72%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 28, left: 28, right: 28,
          color: theme.base
        }}>
          <div style={{
            fontFamily: theme.display,
            fontSize: 'clamp(30px, 4.5vw, 56px)',
            fontWeight: 900,
            lineHeight: 1,
            opacity: 0.55,
            marginBottom: 10
          }}>
            {item.id}
          </div>
          <h3 style={{
            fontFamily: theme.displayTight,
            fontSize: 'clamp(22px, 2.6vw, 32px)',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            marginBottom: item.desc ? 10 : 0
          }}>
            {item.title}
          </h3>
          {item.desc && (
            <p style={{
              margin: 0,
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.9)'
            }}>
              {item.desc}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function DragWheelCarousel() {
  const progress = useMotionValue(0);
  const pausedRef = useRef(false);

  // Gentle, continuous auto-rotation (same "always drifting" feel as the footer
  // CAREER · UNIVERSITY · SCHOOL marquee). rAF-driven so it's GPU-smooth and
  // auto-throttles offscreen; pauses while the user hovers or drags.
  useEffect(() => {
    let raf, last = performance.now();
    const SPEED = 0.12; // cards advanced per second — slow and gradual
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      if (!pausedRef.current) progress.set(progress.get() + SPEED * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  // Drag/swipe nudges the wheel; wrapping in Card keeps it infinite.
  const handleDrag = (event, info) => {
    progress.set(progress.get() - info.delta.x / 200);
  };

  return (
    <section 
      data-section-theme="dark"
      style={{
        background: theme.dark,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 9vw, 120px) 0',
      }}
    >
      <div style={{ marginBottom: 60, position: 'relative', zIndex: 10, padding: '0 clamp(20px, 4vw, 40px)' }}>
        <motion.h2
          data-no-reveal
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            fontFamily: theme.display,
            margin: 0,
            textTransform: 'uppercase',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em', marginBottom: 0 }}>
            <motion.span custom={0} variants={lineMask} style={{
              display: 'block',
              fontSize: 'clamp(14px, 2vw, 24px)',
              fontWeight: 800,
              color: theme.base,
              letterSpacing: '0.02em',
            }}>
              BUILD A PROJECT THAT
            </motion.span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: 0, marginBottom: 'clamp(-8px, -0.6vw, -2px)' }}>
            <motion.span custom={1} variants={lineMask} style={{
              display: 'block',
              fontSize: 'clamp(48px, 16vw, 220px)',
              fontWeight: 900,
              lineHeight: 0.85,
              background: 'linear-gradient(90deg, #3B4CCA 0%, #20E3E8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}>
              PROVES
            </motion.span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
            <motion.span className="hollow-text" custom={2} variants={lineMask} style={{
              display: 'block',
              fontSize: 'clamp(28px, 6vw, 84px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}>
              YOUR FUTURE POTENTIAL
            </motion.span>
          </span>
        </motion.h2>
      </div>

      {/* Drag Surface & Cards — wrapper reveals the whole wheel as one block on scroll */}
      <div data-reveal>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }} // movement is driven via `progress`
        dragElastic={0}
        onDrag={handleDrag}
        onDragStart={() => { pausedRef.current = true; }}
        onDragEnd={() => { pausedRef.current = false; }}
        onPointerEnter={() => { pausedRef.current = true; }}
        onPointerLeave={() => { pausedRef.current = false; }}
        style={{
          position: 'relative',
          height: 'clamp(400px, 60vh, 600px)',
          width: '100%',
          cursor: 'grab',
          // touchAction: 'pan-y' keeps native vertical page scrolling while
          // Framer Motion still intercepts horizontal drags/swipes.
          touchAction: 'pan-y'
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {items.map((item, i) => (
          <Card key={item.id} item={item} index={i} progress={progress} total={items.length} />
        ))}
      </motion.div>
      </div>
    </section>
  );
}
