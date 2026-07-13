import { Bell } from 'lucide-react';
import { Text } from '@ui';
import { HeroCard } from '@widgets/home/hero-card';
import { StatsCards } from '@widgets/home/stats-cards';
import { EmptyState } from '@ui/empty-state';

export function HomePage() {
  return (
    <div className="pt-4">
      {/* Greeting */}
      <div className="mb-6">
        <Text variant="caption" color="secondary" className="mb-1">
          Добро пожаловать
        </Text>
        <Text variant="h1" weight="bold">
          Александр
        </Text>
      </div>

      {/* Hero Card */}
      <HeroCard />

      {/* Stats */}
      <StatsCards />

      {/* Recent Notifications */}
      <div className="mt-6">
        <Text variant="h4" weight="semibold" className="mb-3">
          Последние уведомления
        </Text>
        <EmptyState
          icon={<Bell className="h-8 w-8" />}
          title="Нет уведомлений"
          description="Когда появятся новые автомобили, мы сообщим вам"
        />
      </div>
    </div>
  );
}