import { type ReactNode, type KeyboardEvent } from 'react';
import { cn } from '@shared/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  variant?: 'default' | 'glass' | 'elevated';
  hoverable?: boolean;
  onClick?: () => void;
  className?: string;
}

const paddingStyles = {
  sm: 'p-4',              // 16px
  md: 'p-5',              // 20px
  lg: 'p-6',              // 24px
  none: 'p-0',
};

const variantStyles = {
  default: 'bg-zinc-900/80 border border-zinc-800',
  glass: 'bg-zinc-900/40 backdrop-blur-xl border border-white/5',
  elevated: 'bg-zinc-900 border border-zinc-800 shadow-lg shadow-black/20',
};

export function Card({
  children,
  padding = 'md',
  variant = 'default',
  hoverable,
  onClick,
  className,
}: CardProps) {
  // Кликабельную карточку рендерим как div с ролью кнопки, а не <button>,
  // чтобы внутри могли находиться вложенные кнопки (валидный HTML).
  const interactiveProps = onClick
    ? {
        role: 'button',
        tabIndex: 0,
        whileTap: { scale: 0.99 },
        whileHover: { scale: hoverable ? 1.005 : 1 },
        onClick,
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};

  return (
    <motion.div
      className={cn(
        'rounded-2xl text-left',
        paddingStyles[padding],
        variantStyles[variant],
        hoverable && 'cursor-pointer transition-colors hover:border-zinc-700',
        className,
      )}
      {...interactiveProps}
    >
      {children}
    </motion.div>
  );
}

export type { CardProps };