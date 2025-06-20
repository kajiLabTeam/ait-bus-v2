import { Hono } from 'hono';
import type { HonoType } from '@/types';
import { z } from 'zod';
import type { Mode } from '@/repository/db.repository';

const offsetSchema = z.coerce.number().optional();

export interface NextBusResponse {
  schedule: Mode;
  busState: {
    IsFirst: boolean;
    IsExist: boolean;
  };
  nextHourToAIT?: number;
  nextMinuteToAIT?: number;
  nextHourToYakusa?: number;
  nextMinuteToYakusa?: number;
}

export const nextBusHandler = new Hono<HonoType>().get('/', c => {
  const { busRepository } = c.var;

  const offset = offsetSchema.safeParse(c.req.query('offset'));

  if (offset.error) return c.json({ errorMessage: 'offsetが正しくありません' }, { status: 400 });

  const bus = busRepository.getNextBus(
    new Date(new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })),
    offset.data ?? 0,
  );

  return c.json({
    schedule: bus.mode,
    busState: {
      IsFirst: bus.isFirst,
      IsExist: bus.isExist,
    },
    nextHourToAIT: bus.nextToAIT ? bus.nextToAIT[0] : undefined,
    nextMinuteToAIT: bus.nextToAIT ? bus.nextToAIT[1] : undefined,
    nextHourToYakusa: bus.nextToYakusa ? bus.nextToYakusa[0] : undefined,
    nextMinuteToYakusa: bus.nextToYakusa ? bus.nextToYakusa[1] : undefined,
  } satisfies NextBusResponse);
});
