import type { HonoType } from '@/types';
import { Hono } from 'hono';
import { modeHandler } from './mode';
import { injectBusRepository } from '@/middlewares/injectBusRepository';

export const v1Handler = new Hono<HonoType>()
  .all('/', c => c.text('Hello, World! This is v1'))
  .use('*', injectBusRepository)
  .route('mode', modeHandler);
