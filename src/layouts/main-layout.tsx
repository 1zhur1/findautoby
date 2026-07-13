import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from '@widgets/navigation/bottom-nav';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children?: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
};

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-lg flex-col bg-bg-dark text-white">
      {/* Safe Area Top */}
      <div className="safe-area-top" />

      {/* Status Bar spacer for Telegram */}
      <div className="h-1" />

      {/* Main Content */}
      <main className="relative flex-1 overflow-y-auto px-4 pb-24 no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            {children ?? <Outlet />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}