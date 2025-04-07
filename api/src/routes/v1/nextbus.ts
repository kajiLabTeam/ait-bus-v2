import { Hono } from 'hono';
import type { HonoType } from '@/types';
import { z } from 'zod';

const offsetSchema = z.coerce.number().optional();

export const nextBusHandler = new Hono<HonoType>().get('/', c => {
  const { busRepository } = c.var;

  const offset = offsetSchema.safeParse(c.req.query('offset'));

  if (offset.error) return c.json({ errorMessage: 'offsetが正しくありません' }, { status: 400 });

  const bus = busRepository.getNextBus(new Date(), offset.data ?? 0);

  return c.json({
    schedule: bus.mode,
    busState: {
      IsFirst: bus.isFirst,
      IsExist: bus.isLast,
    },
    nextHourToAIT: bus.nextToAIT[0],
    nextMinuteToAIT: bus.nextToAIT[1],
    nextHourToYakusa: bus.nextToYakusa[0],
    nextMinuteToYakusa: bus.nextToYakusa[1],
  });
});
