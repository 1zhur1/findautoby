import { Router } from 'express';
import { z } from 'zod';
import { getProfile, updateSettings } from '../db/users.js';

export const meRouter = Router();

meRouter.get('/', (req, res) => {
  const userId = req.tgUser!.id;
  res.json(getProfile(userId));
});

const settingsSchema = z.object({
  notificationsEnabled: z.boolean().optional(),
  privacyMode: z.boolean().optional(),
  language: z.string().min(1).max(32).optional(),
});

meRouter.patch('/', (req, res) => {
  const parsed = settingsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'invalid_body', issues: parsed.error.issues });
    return;
  }
  res.json(updateSettings(req.tgUser!.id, parsed.data));
});
