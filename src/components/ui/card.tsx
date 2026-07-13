import { type ReactNode } from 'react';
import { cn } from '@shared/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'glass-strong';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

function Card({
  className,
  children,
  variant = 'default',
  padding = 'md',
  hoverable,
  onClick,
}: CardProps) {
  const variants = {
    default: 'bg-zinc-900/80 dark:bg-zinc-900/80 border border-zinc-800',
    glass: 'glass',
    'glass-strong': 'glass-strong',
  };

  const MotionTag = onClick ? motion.button : motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={hoverable ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={cn(
        'rounded-2xl shadow-card transition-shadow duration-300 text-left',
        variants[variant],
        paddings[padding],
        hoverable && 'cursor-pointer hover:shadow-elevated',
        className,
      )}
    >
      {children}
    </MotionTag>
  );
}

export { Card };
export type { CardProps };