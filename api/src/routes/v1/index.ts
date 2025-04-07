import type { HonoType } from '@/types';
import { Hono } from 'hono';
import { modeHandler } from './mode';
import { injectBusRepository } from '@/middlewares/injectBusRepository';
import { modeAllHandler } from './modeall';
import { nextBusHandler } from './nextbus';
import { timetableHandler } from './timetable';
import { timetableAllHandler } from './timetableall';

export const v1Handler = new Hono<HonoType>()
  .all('/', c => c.text('Hello, World! This is v1'))
  .use('*', injectBusRepository)
  .route('mode', modeHandler)
  .route('modeall', modeAllHandler)
  .route('nextbus', nextBusHandler)
  .route('timetable', timetableHandler)
  .route('timetableall', timetableAllHandler);
