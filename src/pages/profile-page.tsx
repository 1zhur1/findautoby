import { User, Settings, Moon, Sun, LogOut, ChevronRight } from 'lucide-react';
import { Text, Card, Button } from '@ui';
import { useThemeStore } from '@store';
import { motion } from 'framer-motion';

export function ProfilePage() {
  const { mode, toggle } = useThemeStore();

  const settingsItems = [
    {
      id: 'theme',
      icon: mode === 'dark' ? Moon : Sun,
      label: 'Тема',
      value: mode === 'dark' ? 'Темная' : 'Светлая',
      onClick: toggle,
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Настройки',
      value: 'Уведомления, язык',
      onClick: () => {},
    },
  ];

  return (
    <div className="pt-4">
      {/* Profile Header */}
      <div className="mb-8 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800"
        >
          <User className="h-10 w-10 text-zinc-400" />
        </motion.div>
        <Text variant="h2" weight="bold">
          Александр
        </Text>
        <Text variant="body" color="secondary" className="mt-0.5">
          @alexander
        </Text>
      </div>

      {/* Settings */}
      <div className="space-y-2">
        {settingsItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.3 }}
            >
              <Card padding="md" hoverable onClick={item.onClick}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
                      <Icon className="h-5 w-5 text-zinc-300" />
                    </div>
                    <div>
                      <Text variant="body" weight="medium">
                        {item.label}
                      </Text>
                      <Text variant="caption" color="tertiary">
                        {item.value}
                      </Text>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-zinc-600" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Logout */}
      <div className="mt-8">
        <Button variant="ghost" size="lg" fullWidth leftIcon={<LogOut className="h-5 w-5" />}>
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
}