import { Hono } from 'hono';
import type { HonoType } from '@/types';
import { z } from 'zod';

const offsetSchema = z.coerce.number().optional();

export const nextBusHandler = new Hono<HonoType>().get('/', c => {
  const { busRepository } = c.var;

  const offset = offsetSchema.safeParse(c.req.query('offset'));

  if (offset.error) return c.json({ errorMessage: 'offsetが正しくありません' }, { status: 400 });

  const bus = busRepository.getNextBus(
    new Date(new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })),
    offset.data ?? 0,
  );
  console.log({ bus });

  return c.json({
    schedule: bus.mode,
    busState: {
      IsFirst: bus.isFirst,
      IsExist: bus.isLast,
    },
    nextHourToAIT: bus.nextToAIT ? bus.nextToAIT[0] : undefined,
    nextMinuteToAIT: bus.nextToAIT ? bus.nextToAIT[1] : undefined,
    nextHourToYakusa: bus.nextToYakusa ? bus.nextToYakusa[0] : undefined,
    nextMinuteToYakusa: bus.nextToYakusa ? bus.nextToYakusa[1] : undefined,
  });
});
