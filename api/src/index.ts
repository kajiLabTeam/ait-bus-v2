import { Hono } from 'hono';
import type { HonoType } from '@/types';
import { v1Handler } from './routes/v1';
import { v2Handler } from './routes/v2';
import { cors } from 'hono/cors';

const app = new Hono<HonoType>()
  .basePath('api')
  .use('*', cors())
  .all('/', c => c.text('Hello, World!'))
  .route('v1', v1Handler)
  .route('v2', v2Handler);

export default app;
