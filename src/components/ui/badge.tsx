import { type ReactNode } from 'react';
import { cn } from '@shared/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'info' | 'warning';
  size?: 'sm' | 'md';
  className?: string;
}

function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants = {
    default: 'bg-zinc-800 text-zinc-400',
    success: 'bg-success/10 text-success',
    danger: 'bg-danger/10 text-danger',
    info: 'bg-info/10 text-info',
    warning: 'bg-primary/10 text-primary',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-[13px] px-3 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg font-medium',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps };