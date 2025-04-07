import { BusRepository } from '@/repository/bus.repository';
import type { HonoType } from '@/types';
import type { MiddlewareHandler } from 'hono';

export const injectBusRepository: MiddlewareHandler<HonoType> = async (ctx, next) => {
  const busRepository = new BusRepository();
  ctx.set('busRepository', busRepository);
  await next();
};
