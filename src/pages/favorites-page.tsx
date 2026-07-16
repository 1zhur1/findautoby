import { Text, SectionHeader } from '@ui';
import { HeartIllustration } from '@ui/illustrations';
import { EmptyState } from '@ui';
import { CarCard } from '@widgets/favorites/car-card';
import { useFavorites } from '@hooks';
import { motion } from 'framer-motion';

export function FavoritesPage() {
  const { data: cars = [] } = useFavorites();

  return (
    <div className="pt-5">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="mb-6"
      >
        <Text variant="h1" weight="bold" className="mb-1 text-slate-100">
          Избранное
        </Text>
        <Text variant="body" color="secondary">
          Сохраненные автомобили
        </Text>
      </motion.div>

      {cars.length > 0 ? (
        <div className="space-y-3">
          <SectionHeader title="Все сохраненные" subtitle={`${cars.length} автомобилей`} />
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<HeartIllustration className="h-32 w-full text-slate-700" />}
          title="Нет избранных"
          description="Сохраняйте интересные автомобили, чтобы не потерять их"
        />
      )}
    </div>
  );
}