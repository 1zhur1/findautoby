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
  default: 'bg-[#14141E]/90 border border-[#1E1E2A]',
  glass: 'bg-[#14141E]/40 backdrop-blur-xl border border-white/5',
  elevated: 'bg-[#14141E] border border-[#1E1E2A] shadow-lg shadow-black/30',
};

export function Card({
  children,
  padding = 'md',
  variant = 'default',
  hoverable,
  onClick,
  className,
}: CardProps) {
  // DRL Glow — светящаяся линия в стиле дневных ходовых огней
  const drlClass = variant === 'default' ? 'drl-glow' : '';
  const drlActiveClass = hoverable || onClick ? 'drl-glow-active' : '';

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
        drlClass,
        hoverable && drlActiveClass,
        hoverable && 'cursor-pointer transition-colors hover:border-cyan-800/50',
        className,
      )}
      {...interactiveProps}
    >
      {children}
    </motion.div>
  );
}

export type { CardProps };