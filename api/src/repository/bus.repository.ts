import { unwrapBrand } from '../utils';
import type { Destination, Hour, Mode } from './db.repository';
import { DB, destinations } from './db.repository';

interface NextBus {
  mode: Mode;
  isFirst: boolean;
  isLast: boolean;
  nextToYakusa: [hour: number, minute: number] | undefined;
  nextToAIT: [hour: number, minute: number] | undefined;
}

export function isHour(hour: number): hour is Hour {
  return hour >= 0 && hour <= 23;
}

export class BusRepository extends DB {
  /**
   * 指定した日のバスの時刻を取得する
   * @param date - 日付(時間は無視する)
   */
  getBusTimes(date: Date): { [key in Destination]: [hour: number, minute: number][] } {
    const mode = unwrapBrand(this.getModeByDate(date));

    if (!mode) return { toAIT: [], toYakusa: [] };

    const busTimes: { [key in Destination]: [hour: number, minute: number][] } = { toAIT: [], toYakusa: [] };
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

  /**
   * 指定した時間の次のバスの時刻を取得する
   * @param datetime - 日付
   * @param offset - 先のバスの時刻を取得する
   */
  getNextBus(datetime: Date, offset: number): NextBus {
    datetime.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    const mode = this.getModeByDate(datetime);
    const times = this.getBusTimes(datetime);

    const hour = datetime.getHours();
    const minute = datetime.getMinutes();

    const nextToYakusaIndex = times.toYakusa.findIndex(([h, m]) => {
      if (h < hour) return false;
      if (h === hour && m <= minute) return false;
      return true;
    });
    const nextToAITIndex = times.toAIT.findIndex(([h, m]) => {
      if (h < hour) return false;
      if (h === hour && m <= minute) return false;
      return true;
    });
    const isFirst = nextToYakusaIndex + offset === 0 && nextToAITIndex + offset === 0;
    const isLast = nextToYakusaIndex !== -1 || nextToAITIndex !== -1;
    const nextToYakusaTime = times.toYakusa.at(nextToYakusaIndex + offset);
    const nextToAITTime = times.toAIT.at(nextToAITIndex + offset);

    if (nextToYakusaTime === undefined && nextToAITTime === undefined) {
      return {
        mode,
        isFirst,
        isLast,
        nextToYakusa: undefined,
        nextToAIT: undefined,
      };
    }

    return {
      mode,
      isFirst,
      isLast,
      nextToYakusa: nextToYakusaTime ? [nextToYakusaTime[0], nextToYakusaTime[1]] : [-1, -1],
      nextToAIT: nextToAITTime ? [nextToAITTime[0], nextToAITTime[1]]: [-1, -1],
    };
  }
}
