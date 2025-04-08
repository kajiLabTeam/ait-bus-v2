import { BusRepository } from '@/repository/bus.repository';
import { BusRepositoryV2 } from '@/repository/busv2.repository';
import type { HonoType } from '@/types';
import type { MiddlewareHandler } from 'hono';

export const injectBusRepository: MiddlewareHandler<HonoType> = async (ctx, next) => {
  const busRepository = new BusRepository();
  const busRepositoryV2 = new BusRepositoryV2();
  ctx.set('busRepository', busRepository);
  ctx.set('busRepositoryV2', busRepositoryV2);
  await next();
};
