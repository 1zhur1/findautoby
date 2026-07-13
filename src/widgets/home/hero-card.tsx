import { Search } from 'lucide-react';
import { Card } from '@ui';
import { Text } from '@ui';
import { Button } from '@ui';
import { motion } from 'framer-motion';

export function HeroCard() {
  return (
    <Card variant="glass-strong" padding="lg" className="relative overflow-hidden">
      <motion.div
        className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20">
          <Search className="h-7 w-7 text-primary" />
        </div>
        <Text variant="h3" weight="bold" className="mb-2">
          Поиск автомобилей
        </Text>
        <Text variant="body" color="secondary" className="mb-5">
          Создайте фильтр и бот начнет искать автомобили 24/7
        </Text>
        <Button variant="primary" size="lg" fullWidth leftIcon={<Search className="h-5 w-5" />}>
          Создать поиск
        </Button>
      </div>
    </Card>
  );
}