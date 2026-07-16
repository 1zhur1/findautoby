import { motion } from 'framer-motion';
import { Car, Zap } from 'lucide-react';
import { Text, Button } from '@ui';
import { useNavigate } from 'react-router-dom';

export function HeroCard() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl bg-[#0F0F18] border border-[#1E1E2A] p-6"
    >
      {/* Glow orbs — как освещение приборной панели EV */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/6 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary-light/4 blur-2xl" />

      {/* DRL accent line */}
      <div className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/20">
            <Car className="h-7 w-7 text-white" />
          </div>
          <div>
            <Text variant="h3" weight="bold" className="text-slate-100">
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
          leftIcon={<Zap className="h-5 w-5" />}
          onClick={() => navigate('/create-search')}
        >
          Запустить поиск
        </Button>

        {/* Keyless-start hint */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-primary/40" />
          <Text variant="caption" color="tertiary">
            Нажмите, чтобы начать поиск
          </Text>
          <div className="h-1 w-1 rounded-full bg-primary/40" />
        </div>
      </div>
    </motion.div>
  );
}