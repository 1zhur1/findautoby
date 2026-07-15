import { Moon, Sun, Globe, Bell, Shield, MessageCircle, Info, LogOut, Crown, Search, Bell as BellIcon, User, ChevronRight } from 'lucide-react';
import { Text, Card, Button } from '@ui';
import { useThemeStore } from '@store';
import { useTelegramUser } from '@hooks';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] as const },
});

export function ProfilePage() {
  const { mode, toggle } = useThemeStore();
  const profile = useTelegramUser();

  const statCards = [
    { id: 'premium', icon: Crown, label: 'Premium', value: profile.premium ? '✓' : 'Нет', color: 'text-primary', bg: 'bg-primary/10' },
    { id: 'searches', icon: Search, label: 'Поисков', value: String(profile.searchesCreated), color: 'text-info', bg: 'bg-info/10' },
    { id: 'notifications', icon: BellIcon, label: 'Уведомлений', value: String(profile.notificationsReceived), color: 'text-success', bg: 'bg-success/10' },
  ];

  const settingsItems = [
    { id: 'theme', icon: mode === 'dark' ? Sun : Moon, label: mode === 'dark' ? 'Светлая тема' : 'Темная тема', value: '', onClick: toggle },
    { id: 'language', icon: Globe, label: 'Язык', value: profile.language, onClick: () => {} },
    { id: 'notifications', icon: Bell, label: 'Уведомления', value: profile.notificationsEnabled ? 'Включены' : 'Выключены', onClick: () => {} },
    { id: 'privacy', icon: Shield, label: 'Конфиденциальность', value: '', onClick: () => {} },
    { id: 'support', icon: MessageCircle, label: 'Поддержка', value: '', onClick: () => {} },
    { id: 'about', icon: Info, label: 'О приложении', value: 'v1.0.0', onClick: () => {} },
  ];

  return (
    <div className="pt-5">
      {/* Profile Header */}
      <motion.div {...fadeUp(0)} className="mb-8 flex flex-col items-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/20">
          <User className="h-9 w-9 text-white" />
        </div>
        <Text variant="h2" weight="bold">
          {profile.firstName} {profile.lastName}
        </Text>
        <Text variant="body" color="secondary" className="mt-0.5">
          @{profile.username}
        </Text>
        <div className="mt-2 rounded-lg bg-zinc-800 px-3 py-1">
          <Text variant="caption" color="tertiary">ID: {profile.telegramId}</Text>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.08)} className="mb-8 grid grid-cols-3 gap-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.id} padding="sm" className="flex h-full min-h-[110px] flex-col items-center justify-center text-center">
              <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <Text variant="h4" weight="bold">{stat.value}</Text>
              <Text variant="caption" color="tertiary">{stat.label}</Text>
            </Card>
          );
        })}
      </motion.div>

      {/* Settings */}
      <div className="mb-8 space-y-1">
        {settingsItems.map((item, i) => {
          const Icon = item.icon;
          const isThemeRow = item.id === 'theme';
          return (
            <motion.div key={item.id} {...fadeUp(0.12 + i * 0.04)}>
              <Card padding="md" hoverable onClick={item.onClick} className="w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-zinc-800">
                      <Icon className="h-5 w-5 text-zinc-300" />
                    </div>
                    <div>
                      <Text variant="body" weight="medium">{item.label}</Text>
                      <Text variant="caption" color="tertiary" className={!item.value ? 'invisible' : ''}>{item.value || 'placeholder'}</Text>
                    </div>
                  </div>
                  {isThemeRow ? (
                    <div className={`h-6 w-10 rounded-full p-0.5 transition-colors ${mode === 'dark' ? 'bg-primary' : 'bg-zinc-600'}`}>
                      <div className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${mode === 'dark' ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  ) : (
                    <ChevronRight className="h-5 w-5 text-zinc-600" />
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Logout */}
      <motion.div {...fadeUp(0.35)}>
        <Button variant="ghost" size="md" fullWidth leftIcon={<LogOut className="h-5 w-5" />}>
          Выйти из аккаунта
        </Button>
      </motion.div>

      <div className="h-8" />
    </div>
  );
}