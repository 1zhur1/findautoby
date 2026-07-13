import { type ReactNode } from 'react';
import { cn } from '@shared/utils';
import { Card } from './card';
import { Text } from './text';
import { Button } from './button';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn('mt-8 text-center', className)} padding="lg">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-4"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-800/50">
          <div className="text-zinc-500">{icon}</div>
        </div>
      </motion.div>
      <Text variant="h3" weight="semibold" className="mb-1">
        {title}
      </Text>
      {description && (
        <Text variant="body" color="secondary" className="mb-4">
          {description}
        </Text>
      )}
      {action && (
        <Button onClick={action.onClick} variant="primary" size="md">
          {action.label}
        </Button>
      )}
    </Card>
  );
}