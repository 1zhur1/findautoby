import { Search } from 'lucide-react';
import { Text } from '@ui';
import { EmptyState } from '@ui/empty-state';

export function SearchesPage() {
  return (
    <div className="pt-4">
      <div className="mb-6">
        <Text variant="h1" weight="bold">
          Поиски
        </Text>
        <Text variant="body" color="secondary" className="mt-1">
          Управляйте вашими поисками
        </Text>
      </div>

      <EmptyState
        icon={<Search className="h-8 w-8" />}
        title="Нет активных поисков"
        description="Создайте первый поиск, чтобы мы начали искать автомобили"
        action={{ label: 'Создать поиск', onClick: () => {} }}
      />
    </div>
  );
}