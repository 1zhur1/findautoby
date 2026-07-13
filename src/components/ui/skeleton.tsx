import { cn } from '@shared/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  const variants = {
    text: 'rounded-lg h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-2xl',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-zinc-800/50',
        variants[variant],
        className,
      )}
      style={{ width, height }}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };