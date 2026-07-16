import { motion } from 'framer-motion';
import { Text, Card, SourceBadge } from '@ui';
import { Heart, MapPin, Clock, ExternalLink } from 'lucide-react';
import type { Car } from '@mocks/cars';

interface CarCardProps {
  car: Car;
  index?: number;
  onOpen?: () => void;
  onFavorite?: () => void;
}

export function CarCard({ car, index = 0, onOpen, onFavorite }: CarCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'только что';
    if (hours < 24) return `${hours} ч назад`;
    const days = Math.floor(hours / 24);
    return `${days} д назад`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      whileTap={{ scale: 0.99 }}
    >
      <Card padding="md" hoverable className="w-full">
        <div className="flex gap-3">
          {/* Image placeholder */}
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-[#0F0F18] border border-[#1E1E2A]">
            <div className="flex h-full items-center justify-center">
              <div className="text-4xl opacity-30">
                {car.brand === 'BMW' ? '🚗' : car.brand === 'Mercedes-Benz' ? '🚘' : car.brand === 'Audi' ? '🚖' : '🚙'}
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onFavorite?.(); }}
              className="absolute right-1.5 top-1.5 rounded-full bg-black/50 p-1.5 backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <Heart className="h-3.5 w-3.5 text-white" />
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <Text variant="body" weight="semibold" className="truncate text-slate-100">
              {car.title}
            </Text>
            <div className="mt-1 flex items-baseline gap-1">
              <Text variant="h4" weight="bold" className="text-gradient-amber tabular-nums">
                {formatPrice(car.price, car.currency)}
              </Text>
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <SourceBadge source={car.source} size="sm" />
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-1 text-slate-500">
                <MapPin className="h-3 w-3" />
                <Text variant="caption" color="tertiary">{car.location}</Text>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-1 text-slate-500">
                <Clock className="h-3 w-3" />
                <Text variant="caption" color="tertiary">{timeAgo(car.createdAt)}</Text>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <Text variant="caption" color="tertiary" className="truncate">
                {car.year} · {car.engineType} · {car.mileage.toLocaleString()} км
              </Text>
              <button
                onClick={onOpen}
                className="ml-auto shrink-0 rounded-lg bg-primary/10 p-1.5 transition-colors hover:bg-primary/20"
              >
                <ExternalLink className="h-3.5 w-3.5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}