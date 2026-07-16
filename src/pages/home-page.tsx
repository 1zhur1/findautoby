import { Bell, User } from 'lucide-react';
import { Text, SectionHeader, EmptyState } from '@ui';
import { HeroCard } from '@widgets/home/hero-card';
import { StatsCards } from '@widgets/home/stats-cards';
import { BellIllustration } from '@ui/illustrations';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTelegramUser } from '@hooks';
import { getGreeting } from '@shared/utils';

export function HomePage() {
  const navigate = useNavigate();
  const user = useTelegramUser();
  const greeting = getGreeting();
  const displayName = user.username || user.firstName || 'Гость';

  return (
    <div className="pt-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <Text variant="caption" color="secondary" className="mb-0.5">
            {greeting} 👋
          </Text>
          <Text variant="h2" weight="bold" className="text-slate-100">
            {displayName}
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate('/notifications')}
            className="relative flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#1E1E2A] transition-colors hover:bg-[#2A2A3A]"
          >
            <Bell className="h-5 w-5 text-slate-400" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate('/profile')}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark"
          >
            <User className="h-5 w-5 text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Hero Card */}
      <HeroCard />

      {/* Stats */}
      <StatsCards />

      {/* Recent Activity */}
      <div className="mt-8">
        <SectionHeader title="Последняя активность" subtitle="Уведомления за сегодня" />
        <EmptyState
          icon={<BellIllustration className="h-32 w-full text-slate-700" />}
          title="Нет активности"
          description="Когда появятся новые автомобили, уведомления будут здесь"
        />
      </div>

      <div className="h-6" />
    </div>
  );
}