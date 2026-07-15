import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from '@widgets/navigation/bottom-nav';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children?: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

const pageTransition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1] as const,
};

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-lg flex-col bg-zinc-950 text-white">
      <div className="safe-area-top" />
      <div className="h-1" />

      <main className="relative flex-1 overflow-y-auto px-4 pb-24 no-scrollbar">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="w-full"
          >
            {children ?? <Outlet />}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  );
}