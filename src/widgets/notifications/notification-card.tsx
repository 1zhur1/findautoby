import { useState } from 'react';
import { motion } from 'framer-motion';
import { Text, Card, SourceBadge } from '@ui';
import { Bell, Clock, ExternalLink } from 'lucide-react';
import type { Notification } from '@mocks/notifications';
import { cn } from '@shared/utils';
import { openExternal, haptic } from '@shared/lib/telegram';

interface NotificationCardProps {
  notification: Notification;
  index?: number;
  onClick?: () => void;
}

export function NotificationCard({ notification, index = 0, onClick }: NotificationCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !!notification.imageUrl && !imgFailed;

  // Переход на объявление на площадке
  const handleOpen = () => {
    haptic.impact('light');
    if (onClick) onClick();
    else if (notification.url) openExternal(notification.url);
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
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      whileTap={{ scale: 0.99 }}
    >
      <Card
        padding="md"
        hoverable
        onClick={handleOpen}
        className={cn(
          'relative w-full overflow-hidden',
          notification.isNew && 'border-l-2 border-l-primary',
        )}
      >
        <div className="flex items-start gap-3">
          {/* Фото авто из объявления */}
          <div
            className={cn(
              'relative flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl',
              notification.isNew ? 'bg-primary/15' : 'bg-zinc-800',
            )}
          >
            {showImage ? (
              <img
                src={notification.imageUrl}
                alt={notification.carTitle}
                loading="lazy"
                onError={() => setImgFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <Bell
                className={cn('h-5 w-5', notification.isNew ? 'text-primary' : 'text-zinc-500')}
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Text variant="body" weight="semibold" className="truncate">
                  {notification.carTitle}
                </Text>
                <Text variant="caption" color="secondary" className="mt-0.5 line-clamp-1">
                  {notification.message}
                </Text>
              </div>
              {notification.isNew && (
                <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-white">
                  Новая
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <Text variant="h4" weight="bold" className="text-primary">
                {notification.price.toLocaleString()} {notification.currency}
              </Text>
              <span className="text-zinc-700">·</span>
              <SourceBadge source={notification.source} size="sm" />
              <span className="text-zinc-700">·</span>
              <div className="flex items-center gap-1 text-zinc-500">
                <Clock className="h-3 w-3" />
                <Text variant="caption" color="tertiary">
                  {timeAgo(notification.createdAt)}
                </Text>
              </div>
              {notification.url && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    haptic.impact('light');
                    openExternal(notification.url!);
                  }}
                  className="ml-auto shrink-0 rounded-lg bg-primary/10 p-1.5 transition-colors hover:bg-primary/20"
                  aria-label="Открыть объявление"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-primary" />
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}