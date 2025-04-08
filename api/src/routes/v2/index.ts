import type { HonoType } from '@/types';
import { Hono } from 'hono';
import { injectBusRepository } from '@/middlewares/injectBusRepository';
import { afterBusHandler } from './afterbus';

export const v2Handler = new Hono<HonoType>()
  .all('/', c => c.text('Hello, World! This is v2'))
  .use('*', injectBusRepository)
  .route('afterbus', afterBusHandler);
