import type { HonoType } from '@/types';
import { Hono } from 'hono';

export const afterBusHandler = new Hono<HonoType>().get('/', c => {
  const { busRepositoryV2 } = c.var;

  const busTimes = busRepositoryV2.getAfterBus(
    new Date(new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })),
  );

  return c.json({ busTimes });
});
