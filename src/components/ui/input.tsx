import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@shared/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-zinc-400">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-[52px] w-full rounded-xl border bg-zinc-900/60 px-4 text-[15px] text-white',
            'placeholder:text-zinc-500',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error ? 'border-danger/50 focus:ring-danger/30' : 'border-zinc-800 hover:border-zinc-700',
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-danger">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };