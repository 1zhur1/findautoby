import { type ReactNode } from 'react';
import { Text } from './text';
import { cn } from '@shared/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-4 flex items-end justify-between', className)}>
      <div>
        <Text variant="h4" weight="semibold">
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" color="tertiary" className="mt-0.5">
            {subtitle}
          </Text>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}