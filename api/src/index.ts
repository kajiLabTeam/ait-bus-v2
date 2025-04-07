import { Hono } from 'hono';
import type { HonoType } from '@/types';
import { v1Handler } from './routes/v1';

const app = new Hono<HonoType>()
  .basePath('api')
  .all('/', c => c.text('Hello, World!'))
  .route('v1', v1Handler);

export default app;
