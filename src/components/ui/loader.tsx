import { cn } from '@shared/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function Loader({ size = 'md', className }: LoaderProps) {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-zinc-700 border-t-primary',
        sizes[size],
        className,
      )}
    />
  );
}

export { Loader };