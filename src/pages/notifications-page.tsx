import { Bell } from 'lucide-react';
import { Text } from '@ui';
import { EmptyState } from '@ui/empty-state';

export function NotificationsPage() {
  return (
    <div className="pt-4">
      <div className="mb-6">
        <Text variant="h1" weight="bold">
          Уведомления
        </Text>
        <Text variant="body" color="secondary" className="mt-1">
          Все уведомления о новых автомобилях
        </Text>
      </div>

      <EmptyState
        icon={<Bell className="h-8 w-8" />}
        title="Нет уведомлений"
        description="Мы сообщим вам, когда найдем подходящие автомобили"
      />
    </div>
  );
}