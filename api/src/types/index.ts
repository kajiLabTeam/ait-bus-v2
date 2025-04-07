import type { BusRepository } from '@/repository/bus.repository';

export type ENV = Record<string, unknown>;

export type Variables = {
  busRepository: BusRepository;
};

export type HonoType = { Bindings: ENV; Variables: Variables };
