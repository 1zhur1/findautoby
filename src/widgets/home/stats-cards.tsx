import { Search, Car, Bell } from 'lucide-react';
import { Text, Card } from '@ui';
import { motion } from 'framer-motion';
import { useStats } from '@hooks';

export function StatsCards() {
  const { data } = useStats();

  const stats = [
    {
      id: 'active-searches',
      icon: Search,
      label: 'Активные поиски',
      value: String(data?.activeSearches ?? 0),
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      id: 'found-today',
      icon: Car,
      label: 'Найдено сегодня',
      value: String(data?.foundToday ?? 0),
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      id: 'total-notifications',
      icon: Bell,
      label: 'Уведомления',
      value: String(data?.unreadNotifications ?? 0),
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * (i + 1), duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <Card padding="sm" className="text-center">
              <div
                className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bgColor}`}
              >
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <Text variant="h3" weight="bold" className="mb-0.5">
                {stat.value}
              </Text>
              <Text variant="caption" color="tertiary" className="leading-tight">
                {stat.label}
              </Text>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}