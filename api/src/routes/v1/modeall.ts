import { Hono } from 'hono';
import type { HonoType } from '@/types';
import { toMode, type Mode } from '@/repository/bus.repository';

export const modeAllHandler = new Hono<HonoType>().get('/', c => {
  const { busRepository } = c.var;

  const modes = busRepository.getModes();
  const init: Record<string, { date: string; mode: string }> = {};
  const entries = Object.entries(modes).reduce((acc, [date, mode]) => {
    acc[date] = { date, mode: mode == null ? '' : mode };
    return acc;
  }, init);

  return c.json({ operationModes: entries });
});
