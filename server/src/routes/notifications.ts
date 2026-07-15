import { Router } from 'express';
import {
  listNotifications,
  markAllRead,
  markRead,
  unreadCount,
} from '../db/notifications.js';

export const notificationsRouter = Router();

notificationsRouter.get('/', (req, res) => {
  const userId = req.tgUser!.id;
  res.json({
    items: listNotifications(userId),
    unread: unreadCount(userId),
  });
});

// Пометить все прочитанными
notificationsRouter.post('/read', (req, res) => {
  markAllRead(req.tgUser!.id);
  res.json({ ok: true, unread: 0 });
});

// Пометить одно прочитанным
notificationsRouter.post('/:id/read', (req, res) => {
  const ok = markRead(req.tgUser!.id, req.params.id);
  if (!ok) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.json({ ok: true, unread: unreadCount(req.tgUser!.id) });
});
