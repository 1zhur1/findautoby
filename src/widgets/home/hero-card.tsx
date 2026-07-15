import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import { Text, Button } from '@ui';
import { useNavigate } from 'react-router-dom';

export function HeroCard() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-zinc-900 p-6"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary-light/5 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/20">
            <Car className="h-7 w-7 text-white" />
          </div>
          <div>
            <Text variant="h3" weight="bold" className="text-white">
              Поиск автомобилей
            </Text>
            <Text variant="caption" color="secondary" className="mt-0.5">
              Бот следит за новыми объявлениями 24/7
            </Text>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          leftIcon={<Car className="h-5 w-5" />}
          onClick={() => navigate('/create-search')}
        >
          Создать поиск
        </Button>
      </div>
    </motion.div>
  );
}