import { motion } from 'framer-motion';
import { Text, Card, Badge, SourceBadge } from '@ui';
import { Search, ToggleLeft, ToggleRight, MoreHorizontal } from 'lucide-react';
import type { Search as SearchType } from '@mocks/searches';

interface SearchCardProps {
  search: SearchType;
  onToggle?: () => void;
  onMenu?: () => void;
  onClick?: () => void;
  index?: number;
}

export function SearchCard({ search, onToggle, onMenu, onClick, index = 0 }: SearchCardProps) {
  const label = `${search.brand} ${search.generation ? search.generation : search.model}`;
  const priceLabel = search.priceMin
    ? `${search.priceMin.toLocaleString()} - ${search.priceMax.toLocaleString()} ${search.currency}`
    : `до ${search.priceMax.toLocaleString()} ${search.currency}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      whileTap={{ scale: 0.985 }}
    >
      <Card padding="md" hoverable className="group" onClick={onClick}>
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Text variant="body" weight="semibold" className="truncate">
                  {label}
                </Text>
                <Text variant="caption" color="secondary" className="mt-0.5">
                  {priceLabel}
                </Text>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle?.();
                }}
                className="shrink-0 text-zinc-500 hover:text-primary transition-colors"
              >
                {search.isActive ? (
                  <ToggleRight className="h-6 w-6 text-primary" />
                ) : (
                  <ToggleLeft className="h-6 w-6" />
                )}
              </button>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {search.city && (
                <Text variant="caption" color="tertiary">
                  {search.city}
                </Text>
              )}
              <span className="text-zinc-700">·</span>
              <Badge
                variant={search.isActive ? 'success' : 'default'}
                size="sm"
              >
                {search.isActive ? 'Активен' : 'Пауза'}
              </Badge>
              <span className="text-zinc-700">·</span>
              <div className="flex items-center gap-1">
                {search.sources.map((src) => (
                  <SourceBadge key={src} source={src as any} size="sm" />
                ))}
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <Text variant="caption" weight="semibold" className="text-primary">
                Нашел {search.foundCount} объявлений
              </Text>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMenu?.();
                }}
                className="ml-auto shrink-0 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-800"
              >
                <MoreHorizontal className="h-4 w-4 text-zinc-500" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}