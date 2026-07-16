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
      ringColor: 'stroke-info',
      bgGlow: 'bg-info/8',
    },
    {
      id: 'found-today',
      icon: Car,
      label: 'Найдено сегодня',
      value: String(data?.foundToday ?? 0),
      ringColor: 'stroke-success',
      bgGlow: 'bg-success/8',
    },
    {
      id: 'total-notifications',
      icon: Bell,
      label: 'Уведомления',
      value: String(data?.unreadNotifications ?? 0),
      ringColor: 'stroke-primary',
      bgGlow: 'bg-primary/8',
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
              {/* Gauge-style icon container */}
              <div className="relative mx-auto mb-3 flex h-12 w-12 items-center justify-center">
                {/* Circular gauge ring */}
                <svg className="absolute inset-0 h-12 w-12 -rotate-90" viewBox="0 0 48 48">
                  <circle
                    cx="24" cy="24" r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white/5"
                  />
                  <motion.circle
                    cx="24" cy="24" r="20"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${Number(stat.value) > 0 ? Math.min(Number(stat.value) * 5, 125) : 15} ${125}`}
                    className={stat.ringColor}
                    initial={{ strokeDashoffset: 126 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                  />
                </svg>
                <Icon className="relative h-5 w-5 text-slate-300" />
              </div>

              <Text variant="h3" weight="bold" className="mb-0.5 tabular-nums">
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