import { type ReactNode } from 'react';
import { cn } from '@shared/utils';

type TextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline';
type TextColor = 'primary' | 'secondary' | 'tertiary' | 'brand' | 'danger' | 'success';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

const variantStyles: Record<TextVariant, string> = {
  display: 'text-[28px] leading-[1.2]',
  h1: 'text-[26px] leading-[1.25]',
  h2: 'text-[22px] leading-[1.3]',
  h3: 'text-[18px] leading-[1.35]',
  h4: 'text-[16px] leading-[1.4]',
  body: 'text-[15px] leading-[1.45]',
  caption: 'text-[13px] leading-[1.4]',
  overline: 'text-[11px] leading-[1.3] tracking-[0.05em]',
};

const weightStyles: Record<TextWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorStyles: Record<TextColor, string> = {
  primary: 'text-white',
  secondary: 'text-zinc-400',
  tertiary: 'text-zinc-500',
  brand: 'text-primary',
  danger: 'text-danger',
  success: 'text-success',
};

interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  className?: string;
  children: ReactNode;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4';
}

function Text({
  variant = 'body',
  color = 'primary',
  weight = 'regular',
  className,
  children,
  as: Component = 'p',
}: TextProps) {
  return (
    <Component
      className={cn(
        variantStyles[variant],
        weightStyles[weight],
        colorStyles[color],
        className,
      )}
    >
      {children}
    </Component>
  );
}

export { Text };
export type { TextProps };