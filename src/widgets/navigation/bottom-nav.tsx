import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, Bell, User } from 'lucide-react';
import { cn } from '@shared/utils';
import { motion } from 'framer-motion';
import { ROUTES } from '@shared/constants';
import { haptic } from '@shared/lib/telegram';

const navItems = [
  { id: 'home', icon: Home, path: ROUTES.HOME, label: 'Главная' },
  { id: 'searches', icon: Search, path: ROUTES.SEARCHES, label: 'Поиски' },
  { id: 'favorites', icon: Heart, path: ROUTES.FAVORITES, label: 'Избранное' },
  { id: 'notifications', icon: Bell, path: ROUTES.NOTIFICATIONS, label: 'Уведомления' },
  { id: 'profile', icon: User, path: ROUTES.PROFILE, label: 'Профиль' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="mx-auto max-w-lg px-2 pb-2">
        <div className="glass-strong rounded-2xl px-2 py-1.5">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    if (!isActive) haptic.selection();
                    navigate(item.path);
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    'relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-2 transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-zinc-600 hover:text-zinc-400',
                  )}
                >
                  {isActive && (
                    <>
                      {/* Glow background */}
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-xl bg-primary/8"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                      {/* DRL-style underline glow */}
                      <motion.div
                        layoutId="nav-drl"
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    </>
                  )}
                  <div className="relative">
                    <Icon className="h-6 w-6" />
                    {item.id === 'notifications' && (
                      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-danger" />
                    )}
                  </div>
                  <span className="relative text-[10px] font-medium">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}