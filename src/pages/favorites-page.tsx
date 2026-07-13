import { Heart } from 'lucide-react';
import { Text } from '@ui';
import { EmptyState } from '@ui/empty-state';

export function FavoritesPage() {
  return (
    <div className="pt-4">
      <div className="mb-6">
        <Text variant="h1" weight="bold">
          Избранное
        </Text>
        <Text variant="body" color="secondary" className="mt-1">
          Сохраненные автомобили
        </Text>
      </div>

      <EmptyState
        icon={<Heart className="h-8 w-8" />}
        title="Нет избранных"
        description="Добавьте автомобили в избранное, чтобы не потерять их"
      />
    </div>
  );
}