import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const mouseX = useSpring(0, { stiffness: 1000, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 1000, damping: 50 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null; // Safety: Only render if mouse has moved

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-gold-accent rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
    />
  );
};

export default CustomCursor;