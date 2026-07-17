import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@shared/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-lg shadow-primary/20',
      secondary:
        'bg-[#1E1E2A] text-white hover:bg-[#2A2A3A] active:bg-[#35354A] border border-[#2A2A3A]',
      ghost:
        'bg-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5',
      danger:
        'bg-danger/10 text-danger hover:bg-danger/20 active:bg-danger/30 border border-danger/15',
      accent:
        'bg-accent text-white hover:bg-accent-dark active:bg-accent-dark shadow-lg shadow-accent/20',
    };

    const sizes = {
      sm: 'h-10 px-4 text-sm gap-1.5',
      md: 'h-[52px] px-6 text-[15px] gap-2',
      lg: 'h-[56px] px-8 text-base gap-2.5',
      xl: 'h-[60px] px-10 text-lg gap-3',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-xl',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          'disabled:opacity-40 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className,
        )}
        disabled={disabled || isLoading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {isLoading ? (
          <svg className="animate-spin h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };