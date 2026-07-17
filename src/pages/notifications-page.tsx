import { Text, SectionHeader } from '@ui';
import { BellIllustration } from '@ui/illustrations';
import { EmptyState } from '@ui';
import { NotificationCard } from '@widgets/notifications/notification-card';
import { useNotifications } from '@hooks';
import { motion } from 'framer-motion';

export function NotificationsPage() {
  const { data } = useNotifications();
  const notifications = data?.items ?? [];
  const newCount = notifications.filter((n) => n.isNew).length;
  const oldNotifications = notifications.filter((n) => !n.isNew);

  return (
    <div className="pt-5">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="mb-6"
      >
        <Text variant="h1" weight="bold" className="mb-1 text-slate-100">
          Уведомления
        </Text>
        <Text variant="body" color="secondary">
          {newCount > 0
            ? `${newCount} новых уведомлений`
            : 'Нет новых уведомлений'}
        </Text>
      </motion.div>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {newCount > 0 && (
            <>
              <SectionHeader title="Новые" subtitle={`${newCount} уведомления`} />
              {notifications
                .filter((n) => n.isNew)
                .map((notification, index) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    index={index}
                  />
                ))}
            </>
          )}

          {oldNotifications.length > 0 && (
            <>
              <SectionHeader title="Ранее" className="mt-8" />
              {oldNotifications.map((notification, index) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  index={index}
                />
              ))}
            </>
          )}
        </div>
      ) : (
        <EmptyState
          icon={<BellIllustration className="h-32 w-full text-slate-700" />}
          title="Нет уведомлений"
          description="Новые уведомления о найденных автомобилях будут появляться здесь"
        />
      )}
    </div>
  );
}