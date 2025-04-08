import { Hono } from 'hono';
import type { HonoType } from '@/types';
import { z } from 'zod';
import { destinations, modes } from '@/repository/db.repository';

const modeQuerySchema = z
  .enum(['A_toAIT', 'A_toYakusa', 'B_toAIT', 'B_toYakusa', 'C_toAIT', 'C_toYakusa'])
  .default('A_toAIT');

const modeSchema = z.enum(modes);
const destinationSchema = z.enum(destinations);

export const timetableHandler = new Hono<HonoType>().get('/', c => {
  const { busRepository } = c.var;

  const modeQuery = modeQuerySchema.safeParse(c.req.query('mode'));

  if (modeQuery.error) return c.json({ errorMessage: 'modeが指定されていないか、正しくありません' }, { status: 400 });

  const mode = modeSchema.safeParse(modeQuery.data.split('_')[0]);
  if (mode.error) return c.json({ errorMessage: 'modeが指定されていないか、正しくありません' }, { status: 400 });
  const destination = destinationSchema.safeParse(modeQuery.data.split('_')[1]);
  if (destination.error) return c.json({ errorMessage: 'modeが指定されていないか、正しくありません' }, { status: 400 });

  const tt = busRepository.getDateTimeTable(mode.data, destination.data);

  const init: Record<string, { hour: number; minutes: number[] | null }> = {};
  const timeTable = Object.entries(tt).reduce((acc, [hour, ms]) => {
    const minutes = ms.length > 0 ? ms : null;
    acc[hour] = { hour: Number(hour), minutes };
    return acc;
  }, init);

  return c.json({ timeTable });
});
