import { Hono } from 'hono';
import type { HonoType } from '@/types';
import { isHour } from '@/repository/bus.repository';

export const timetableAllHandler = new Hono<HonoType>().get('/', c => {
  const { busRepository } = c.var;

  const tt = busRepository.getTimeTable();

  const timeTables: Record<string, Record<string, number[] | null>> = {};

  for (const mode in tt) {
    const modeKey = mode as keyof typeof tt;
    for (const dest in tt[modeKey]) {
      const destKey = dest as keyof (typeof tt)[typeof modeKey];
      const key = `${mode}_${dest}`;
      timeTables[key] = {};

      for (let hour = 0; hour <= 23; hour++) {
        if (!isHour(hour)) continue;

        const times = tt[modeKey][destKey][hour];
        timeTables[key][hour] = times.length > 0 ? times : null;
      }
    }
  }

  return c.json({ timeTables });
});
