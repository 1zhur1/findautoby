import { Search, Car } from 'lucide-react';
import { Card } from '@ui';
import { Text } from '@ui';
import { motion } from 'framer-motion';

const stats = [
  {
    id: 'active-searches',
    icon: Search,
    label: 'Активных поисков',
    value: '0',
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    id: 'found-cars',
    icon: Car,
    label: 'Найдено автомобилей',
    value: '0',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

export function StatsCards() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
          >
            <Card padding="md" className="text-center">
              <div
                className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}
              >
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <Text variant="h3" weight="bold" className="mb-0.5">
                {stat.value}
              </Text>
              <Text variant="caption" color="secondary">
                {stat.label}
              </Text>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}