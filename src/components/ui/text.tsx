import { type ReactNode } from 'react';
import { cn } from '@shared/utils';

interface TextProps {
  children: ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'gradient';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const tags: Record<string, 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  caption: 'span',
  label: 'span',
};

function Text({
  children,
  className,
  variant = 'body',
  weight = 'normal',
  color = 'primary',
  as,
}: TextProps) {
  const Component = as ?? tags[variant] ?? 'p';

  const variants = {
    h1: 'text-3xl tracking-tight',
    h2: 'text-2xl tracking-tight',
    h3: 'text-xl',
    h4: 'text-lg',
    body: 'text-base leading-relaxed',
    caption: 'text-sm',
    label: 'text-xs uppercase tracking-wider',
  };

  const colors = {
    primary: 'text-white dark:text-white',
    secondary: 'text-zinc-400 dark:text-zinc-400',
    tertiary: 'text-zinc-500 dark:text-zinc-500',
    gradient: 'text-gradient',
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <Component
      className={cn(
        variants[variant],
        colors[color],
        weights[weight],
        className,
      )}
    >
      {children}
    </Component>
  );
}

export { Text };