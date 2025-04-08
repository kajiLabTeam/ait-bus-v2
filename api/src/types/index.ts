import type { BusRepository } from '@/repository/bus.repository';
import type { BusRepositoryV2 } from '@/repository/busv2.repository';

export type ENV = Record<string, unknown>;

export type Variables = {
  busRepository: BusRepository;
  busRepositoryV2: BusRepositoryV2;
};

export type HonoType = { Bindings: ENV; Variables: Variables };
