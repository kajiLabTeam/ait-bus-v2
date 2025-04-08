import { unwrapBrand } from '@/utils';
import { DB, destinations, type Destination } from './db.repository';
import { isHour } from './bus.repository';

export type BusTimeTable = { [key in Destination]: [number, number][] };

export class BusRepositoryV2 extends DB {
  /**
   * 指定した時間の次のバスの時刻を取得する
   * @param datetime - 日付
   * @param offset - 先のバスの時刻を取得する
   */
  getAfterBus(datetime: Date): BusTimeTable {
    const mode = unwrapBrand(this.getModeByDate(datetime));
    if (mode === null) {
      return {
        toAIT: [],
        toYakusa: [],
      };
    }

    const busTimes: { [key in Destination]: [number, number][] } = { toAIT: [], toYakusa: [] };
    const timeTable = this.timeTable[mode];

    for (const destination of destinations) {
      for (let hour = 0; hour < 24; hour++) {
        if (!isHour(hour)) continue;
        for (const minute of timeTable[destination][hour]) {
          busTimes[destination].push([hour, minute]);
        }
      }
    }

    return busTimes;
  }
}
