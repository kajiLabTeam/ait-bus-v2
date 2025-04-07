import { Hono } from 'hono';
import type { HonoType } from '@/types';
import { z } from 'zod';

const dateSchema = z.coerce.date().optional();

export const modeHandler = new Hono<HonoType>().get('/', c => {
  const { busRepository } = c.var;

  const date = dateSchema.safeParse(c.req.query('date'));

  if (date.error) return c.json({ error: 'Invalid date format' }, { status: 400 });

  const dateObj = new Date(date.data ?? new Date());
  const mode = busRepository.getMode(dateObj);

  return c.json({ operationMode: mode });
});
