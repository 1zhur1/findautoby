import { cn } from '@shared/utils';

const sourceConfig = {
  onliner: { label: 'Onliner', bg: 'bg-sky-500/15', text: 'text-sky-400' },
  avby: { label: 'AV.BY', bg: 'bg-green-500/15', text: 'text-green-400' },
  kufar: { label: 'Kufar', bg: 'bg-amber-500/15', text: 'text-amber-400' },
} as const;

type Source = keyof typeof sourceConfig;

interface SourceBadgeProps {
  source: Source;
  size?: 'sm' | 'md';
  className?: string;
}

export function SourceBadge({ source, size = 'sm', className }: SourceBadgeProps) {
  const config = sourceConfig[source];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md font-medium',
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs',
        config.bg,
        config.text,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

export type { Source };