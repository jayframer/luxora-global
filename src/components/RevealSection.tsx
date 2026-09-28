import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

const directionMap = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { y: 0, x: 32 },
  right: { y: 0, x: -32 },
  none: { y: 0, x: 0 },
};

export const RevealSection: React.FC<RevealSectionProps> = React.memo(({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
}) => {
  const { ref, isInView } = useScrollReveal();

  const initial = useMemo(
    () => ({ opacity: 0, ...directionMap[direction] }),
    [direction]
  );
  const animate = useMemo(() => isInView
    ? { opacity: 1, y: 0, x: 0 }
    : initial, [isInView, initial]);

  const transition = useMemo(() => ({
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  }), [duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
});
