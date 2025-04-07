import dayjs from 'dayjs';
import type { Brand } from '../types/utils';
import { toBrand, unwrapBrand } from '../utils';

export const modes = ['A', 'B', 'C'] as const;
type ModeType = (typeof modes)[number];
export type Mode = Brand<'mode', ModeType | null>;
export const toMode = (value: ModeType | null): Mode => toBrand<'mode', ModeType | null>(value);
export type UnwrapMode<T> = T extends Brand<'mode', infer U> ? U : never;

interface ModeMap {
  [key: string]: Mode;
}
type Hour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
export const destinations = ['toAIT', 'toYakusa'] as const;
type Destination = (typeof destinations)[number];
type TimeTable = {
  [key in Mode]: {
    [key in Destination]: {
      [key in Hour]: number[];
    };
  };
};

interface NextBus {
  mode: Mode;
  isFirst: boolean;
  isLast: boolean;
  nextToYakusa: [hour: number, minute: number];
  nextToAIT: [hour: number, minute: number];
}

export function isHour(hour: number): hour is Hour {
  return hour >= 0 && hour <= 23;
}

export class BusRepository {
  private mode: ModeMap = {
    '2025-04-01': toMode('C'),
    '2025-04-02': toMode('C'),
    '2025-04-03': toMode('A'),
    '2025-04-04': toMode('A'),
    '2025-04-05': toMode(null),
    '2025-04-06': toMode(null),
    '2025-04-07': toMode('A'),
    '2025-04-08': toMode('A'),
    '2025-04-09': toMode('A'),
    '2025-04-10': toMode('A'),
    '2025-04-11': toMode('A'),
    '2025-04-12': toMode(null),
    '2025-04-13': toMode(null),
    '2025-04-14': toMode('A'),
    '2025-04-15': toMode('A'),
    '2025-04-16': toMode('A'),
    '2025-04-17': toMode('A'),
    '2025-04-18': toMode('A'),
    '2025-04-19': toMode(null),
    '2025-04-20': toMode(null),
    '2025-04-21': toMode('A'),
    '2025-04-22': toMode('A'),
    '2025-04-23': toMode('A'),
    '2025-04-24': toMode('A'),
    '2025-04-25': toMode('A'),
    '2025-04-26': toMode(null),
    '2025-04-27': toMode(null),
    '2025-04-28': toMode('A'),
    '2025-04-29': toMode('A'),
    '2025-04-30': toMode('A'),
    '2025-05-01': toMode(null),
    '2025-05-02': toMode(null),
    '2025-05-03': toMode(null),
    '2025-05-04': toMode(null),
    '2025-05-05': toMode(null),
    '2025-05-06': toMode(null),
    '2025-05-07': toMode('A'),
    '2025-05-08': toMode('A'),
    '2025-05-09': toMode('A'),
    '2025-05-10': toMode(null),
    '2025-05-11': toMode(null),
    '2025-05-12': toMode('A'),
    '2025-05-13': toMode('A'),
    '2025-05-14': toMode('A'),
    '2025-05-15': toMode('A'),
    '2025-05-16': toMode('A'),
    '2025-05-17': toMode(null),
    '2025-05-18': toMode(null),
    '2025-05-19': toMode('A'),
    '2025-05-20': toMode('A'),
    '2025-05-21': toMode('A'),
    '2025-05-22': toMode('A'),
    '2025-05-23': toMode('A'),
    '2025-05-24': toMode(null),
    '2025-05-25': toMode(null),
    '2025-05-26': toMode('A'),
    '2025-05-27': toMode('A'),
    '2025-05-28': toMode('A'),
    '2025-05-29': toMode('A'),
    '2025-05-30': toMode('A'),
    '2025-05-31': toMode(null),
    '2025-06-01': toMode(null),
    '2025-06-02': toMode('A'),
    '2025-06-03': toMode('A'),
    '2025-06-04': toMode('A'),
    '2025-06-05': toMode('A'),
    '2025-06-06': toMode('A'),
    '2025-06-07': toMode('A'),
    '2025-06-08': toMode(null),
    '2025-06-09': toMode('A'),
    '2025-06-10': toMode('A'),
    '2025-06-11': toMode('A'),
    '2025-06-12': toMode('A'),
    '2025-06-13': toMode('A'),
    '2025-06-14': toMode(null),
    '2025-06-15': toMode(null),
    '2025-06-16': toMode('A'),
    '2025-06-17': toMode('A'),
    '2025-06-18': toMode('A'),
    '2025-06-19': toMode('A'),
    '2025-06-20': toMode('A'),
    '2025-06-21': toMode(null),
    '2025-06-22': toMode(null),
    '2025-06-23': toMode('A'),
    '2025-06-24': toMode('A'),
    '2025-06-25': toMode('A'),
    '2025-06-26': toMode('A'),
    '2025-06-27': toMode('A'),
    '2025-06-28': toMode(null),
    '2025-06-29': toMode(null),
    '2025-06-30': toMode('A'),
    '2025-07-01': toMode('A'),
    '2025-07-02': toMode('A'),
    '2025-07-03': toMode('A'),
    '2025-07-04': toMode('A'),
    '2025-07-05': toMode(null),
    '2025-07-06': toMode(null),
    '2025-07-07': toMode('A'),
    '2025-07-08': toMode('A'),
    '2025-07-09': toMode('A'),
    '2025-07-10': toMode('A'),
    '2025-07-11': toMode('A'),
    '2025-07-12': toMode('A'),
    '2025-07-13': toMode('A'),
    '2025-07-14': toMode('A'),
    '2025-07-15': toMode('A'),
    '2025-07-16': toMode('A'),
    '2025-07-17': toMode('A'),
    '2025-07-18': toMode('A'),
    '2025-07-19': toMode(null),
    '2025-07-20': toMode(null),
    '2025-07-21': toMode('A'),
    '2025-07-22': toMode('A'),
    '2025-07-23': toMode('A'),
    '2025-07-24': toMode('A'),
    '2025-07-25': toMode('A'),
    '2025-07-26': toMode('A'),
    '2025-07-27': toMode('A'),
    '2025-07-28': toMode('A'),
    '2025-07-29': toMode('A'),
    '2025-07-30': toMode('A'),
    '2025-07-31': toMode('A'),
    '2025-08-01': toMode('A'),
    '2025-08-02': toMode(null),
    '2025-08-03': toMode(null),
    '2025-08-04': toMode('A'),
    '2025-08-05': toMode('A'),
    '2025-08-06': toMode('A'),
    '2025-08-07': toMode('C'),
    '2025-08-08': toMode('C'),
    '2025-08-09': toMode(null),
    '2025-08-10': toMode(null),
    '2025-08-11': toMode(null),
    '2025-08-12': toMode(null),
    '2025-08-13': toMode(null),
    '2025-08-14': toMode(null),
    '2025-08-15': toMode(null),
    '2025-08-16': toMode(null),
    '2025-08-17': toMode(null),
    '2025-08-18': toMode('C'),
    '2025-08-19': toMode('C'),
    '2025-08-20': toMode('C'),
    '2025-08-21': toMode('C'),
    '2025-08-22': toMode('C'),
    '2025-08-23': toMode(null),
    '2025-08-24': toMode(null),
    '2025-08-25': toMode('C'),
    '2025-08-26': toMode('C'),
    '2025-08-27': toMode('C'),
    '2025-08-28': toMode('C'),
    '2025-08-29': toMode('C'),
    '2025-08-30': toMode(null),
    '2025-08-31': toMode(null),
    '2025-09-01': toMode('C'),
    '2025-09-02': toMode('C'),
    '2025-09-03': toMode('C'),
    '2025-09-04': toMode('C'),
    '2025-09-05': toMode('C'),
    '2025-09-06': toMode(null),
    '2025-09-07': toMode(null),
    '2025-09-08': toMode('C'),
    '2025-09-09': toMode('C'),
    '2025-09-10': toMode('C'),
    '2025-09-11': toMode('C'),
    '2025-09-12': toMode('C'),
    '2025-09-13': toMode(null),
    '2025-09-14': toMode(null),
    '2025-09-15': toMode(null),
    '2025-09-16': toMode('C'),
    '2025-09-17': toMode('C'),
    '2025-09-18': toMode('A'),
    '2025-09-19': toMode('B'),
    '2025-09-20': toMode(null),
    '2025-09-21': toMode(null),
    '2025-09-22': toMode('A'),
    '2025-09-23': toMode(null),
    '2025-09-24': toMode('A'),
    '2025-09-25': toMode('A'),
    '2025-09-26': toMode('A'),
    '2025-09-27': toMode(null),
    '2025-09-28': toMode(null),
    '2025-09-29': toMode('A'),
    '2025-09-30': toMode('A'),
    '2025-10-01': toMode('A'),
    '2025-10-02': toMode('A'),
    '2025-10-03': toMode('A'),
    '2025-10-04': toMode(null),
    '2025-10-05': toMode(null),
    '2025-10-06': toMode('A'),
    '2025-10-07': toMode('A'),
    '2025-10-08': toMode('A'),
    '2025-10-09': toMode('B'),
    '2025-10-10': toMode('B'),
    '2025-10-11': toMode('A'),
    '2025-10-12': toMode('A'),
    '2025-10-13': toMode(null),
    '2025-10-14': toMode('A'),
    '2025-10-15': toMode('A'),
    '2025-10-16': toMode('A'),
    '2025-10-17': toMode('A'),
    '2025-10-18': toMode('A'),
    '2025-10-19': toMode(null),
    '2025-10-20': toMode('A'),
    '2025-10-21': toMode('A'),
    '2025-10-22': toMode('A'),
    '2025-10-23': toMode('A'),
    '2025-10-24': toMode('A'),
    '2025-10-25': toMode('A'),
    '2025-10-26': toMode('A'),
    '2025-10-27': toMode('A'),
    '2025-10-28': toMode('A'),
    '2025-10-29': toMode('A'),
    '2025-10-30': toMode('A'),
    '2025-10-31': toMode('B'),
    '2025-11-01': toMode('A'),
    '2025-11-02': toMode('A'),
    '2025-11-03': toMode('A'),
    '2025-11-04': toMode('A'),
    '2025-11-05': toMode('A'),
    '2025-11-06': toMode('A'),
    '2025-11-07': toMode('A'),
    '2025-11-08': toMode('A'),
    '2025-11-09': toMode('A'),
    '2025-11-10': toMode('A'),
    '2025-11-11': toMode('A'),
    '2025-11-12': toMode('A'),
    '2025-11-13': toMode(null),
    '2025-11-14': toMode('A'),
    '2025-11-15': toMode('A'),
    '2025-11-16': toMode(null),
    '2025-11-17': toMode('A'),
    '2025-11-18': toMode('A'),
    '2025-11-19': toMode('A'),
    '2025-11-20': toMode('A'),
    '2025-11-21': toMode('A'),
    '2025-11-22': toMode('A'),
    '2025-11-23': toMode(null),
    '2025-11-24': toMode('A'),
    '2025-11-25': toMode('A'),
    '2025-11-26': toMode('A'),
    '2025-11-27': toMode('A'),
    '2025-11-28': toMode('A'),
    '2025-11-29': toMode('A'),
    '2025-11-30': toMode('A'),
    '2025-12-01': toMode('A'),
    '2025-12-02': toMode('A'),
    '2025-12-03': toMode('A'),
    '2025-12-04': toMode('A'),
    '2025-12-05': toMode('A'),
    '2025-12-06': toMode(null),
    '2025-12-07': toMode(null),
    '2025-12-08': toMode('A'),
    '2025-12-09': toMode('A'),
    '2025-12-10': toMode('A'),
    '2025-12-11': toMode('A'),
    '2025-12-12': toMode('A'),
    '2025-12-13': toMode('A'),
    '2025-12-14': toMode(null),
    '2025-12-15': toMode('A'),
    '2025-12-16': toMode('A'),
    '2025-12-17': toMode('A'),
    '2025-12-18': toMode('A'),
    '2025-12-19': toMode('A'),
    '2025-12-20': toMode(null),
    '2025-12-21': toMode(null),
    '2025-12-22': toMode('A'),
    '2025-12-23': toMode('A'),
    '2025-12-24': toMode('A'),
    '2025-12-25': toMode('A'),
    '2025-12-26': toMode(null),
    '2025-12-27': toMode(null),
    '2025-12-28': toMode(null),
    '2025-12-29': toMode(null),
    '2025-12-30': toMode(null),
    '2025-12-31': toMode(null),
    '2027-01-01': toMode(null),
    '2027-01-02': toMode(null),
    '2027-01-03': toMode(null),
    '2027-01-04': toMode(null),
    '2027-01-05': toMode(null),
    '2027-01-06': toMode('C'),
    '2027-01-07': toMode('C'),
    '2027-01-08': toMode('A'),
    '2027-01-09': toMode('A'),
    '2027-01-10': toMode(null),
    '2027-01-11': toMode(null),
    '2027-01-12': toMode(null),
    '2027-01-13': toMode('A'),
    '2027-01-14': toMode('A'),
    '2027-01-15': toMode('A'),
    '2027-01-16': toMode('A'),
    '2027-01-17': toMode('A'),
    '2027-01-18': toMode('A'),
    '2027-01-19': toMode('A'),
    '2027-01-20': toMode('A'),
    '2027-01-21': toMode(null),
    '2027-01-22': toMode('A'),
    '2027-01-23': toMode('A'),
    '2027-01-24': toMode(null),
    '2027-01-25': toMode(null),
    '2027-01-26': toMode('C'),
    '2027-01-27': toMode('A'),
    '2027-01-28': toMode('A'),
    '2027-01-29': toMode('A'),
    '2027-01-30': toMode('A'),
    '2027-01-31': toMode(null),
    '2027-02-01': toMode(null),
    '2027-02-02': toMode('A'),
    '2027-02-03': toMode('A'),
    '2027-02-04': toMode('A'),
    '2027-02-05': toMode('A'),
    '2027-02-06': toMode('A'),
    '2027-02-07': toMode(null),
    '2027-02-08': toMode(null),
    '2027-02-09': toMode('A'),
    '2027-02-10': toMode('C'),
    '2027-02-11': toMode(null),
    '2027-02-12': toMode('C'),
    '2027-02-13': toMode('C'),
    '2027-02-14': toMode(null),
    '2027-02-15': toMode(null),
    '2027-02-16': toMode('C'),
    '2027-02-17': toMode('C'),
    '2027-02-18': toMode('C'),
    '2027-02-19': toMode('C'),
    '2027-02-20': toMode('C'),
    '2027-02-21': toMode(null),
    '2027-02-22': toMode(null),
    '2027-02-23': toMode(null),
    '2027-02-24': toMode('C'),
    '2027-02-25': toMode('C'),
    '2027-02-26': toMode('C'),
    '2027-02-27': toMode('C'),
    '2027-02-28': toMode(null),
    '2027-03-01': toMode(null),
    '2027-03-02': toMode('C'),
    '2027-03-03': toMode('C'),
    '2027-03-04': toMode('A'),
    '2027-03-05': toMode('C'),
    '2027-03-06': toMode('C'),
    '2027-03-07': toMode('A'),
    '2027-03-08': toMode('A'),
    '2027-03-09': toMode('C'),
    '2027-03-10': toMode('C'),
    '2027-03-11': toMode('C'),
    '2027-03-12': toMode('C'),
    '2027-03-13': toMode('C'),
    '2027-03-14': toMode(null),
    '2027-03-15': toMode(null),
    '2027-03-16': toMode('C'),
    '2027-03-17': toMode('C'),
    '2027-03-18': toMode('C'),
    '2027-03-19': toMode('C'),
    '2027-03-20': toMode(null),
    '2027-03-21': toMode(null),
    '2027-03-22': toMode(null),
    '2027-03-23': toMode('A'),
    '2027-03-24': toMode('C'),
    '2027-03-25': toMode('C'),
    '2027-03-26': toMode('C'),
    '2027-03-27': toMode('C'),
    '2027-03-28': toMode(null),
    '2027-03-29': toMode(null),
    '2027-03-30': toMode('C'),
    '2027-03-31': toMode('C'),
  };

  private timeTable = {
    A: {
      toAIT: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
        9: [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 55],
        10: [0, 5, 10, 15, 20, 25, 30, 35, 45, 55],
        11: [5, 15, 25, 35, 45, 55],
        12: [5, 15, 25, 35, 45, 55],
        13: [5, 20, 35, 50],
        14: [5, 15, 25, 35, 45, 55],
        15: [5, 15, 30, 45],
        16: [0, 15, 30, 45],
        17: [0, 10, 25, 40],
        18: [0, 15, 45],
        19: [0, 15, 30, 45],
        20: [0, 30],
        21: [0],
        22: [],
        23: [],
      },
      toYakusa: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [20, 50],
        9: [20, 50],
        10: [20, 50],
        11: [0, 10, 20, 30, 40, 50],
        12: [0, 10, 20, 30, 40, 50],
        13: [0, 15, 30, 45],
        14: [0, 10, 20, 30, 40, 45, 50, 55],
        15: [0, 10, 20, 30, 40, 50],
        16: [0, 5, 10, 15, 25, 30, 35, 40, 45, 50, 55],
        17: [0, 10, 15, 20, 25, 30, 35, 40, 45, 55],
        18: [0, 10, 20, 30, 40, 50],
        19: [0, 15, 30, 45],
        20: [0, 15, 30, 45],
        21: [0, 15, 30, 45],
        22: [],
        23: [],
      },
    },
    B: {
      toAIT: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [0, 10, 20, 35, 45],
        9: [0, 5, 25, 35, 50],
        10: [0, 10, 30, 55],
        11: [0, 25, 50],
        12: [25],
        13: [35],
        14: [5, 35],
        15: [5, 35],
        16: [5, 45],
        17: [10, 45],
        18: [5, 35],
        19: [35],
        20: [25],
        21: [5],
        22: [],
        23: [],
      },
      toYakusa: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [50],
        9: [40],
        10: [5, 50],
        11: [15, 40],
        12: [10],
        13: [20, 50],
        14: [20, 50],
        15: [20, 50],
        16: [20],
        17: [0, 30, 55],
        18: [20, 50],
        19: [20, 50],
        20: [40],
        21: [30],
        22: [],
        23: [],
      },
    },
    C: {
      toAIT: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [10, 35],
        9: [0, 25, 50],
        10: [10, 55],
        11: [25, 50],
        12: [25],
        13: [35],
        14: [5, 35],
        15: [5, 35],
        16: [5, 45],
        17: [10, 45],
        18: [5, 35],
        19: [35],
        20: [25],
        21: [5],
        22: [],
        23: [],
      },
      toYakusa: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [50],
        9: [40],
        10: [5, 50],
        11: [15, 40],
        12: [10],
        13: [20, 50],
        14: [20, 50],
        15: [20, 50],
        16: [20],
        17: [0, 30, 55],
        18: [20, 50],
        19: [20, 50],
        20: [40],
        21: [30],
        22: [],
        23: [],
      },
    },
  } satisfies TimeTable;

  /**
   * 指定した日付のモードを取得する
   * @param date - 日付
   */
  getModeByDate(date: Date): Mode {
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    const mode = this.mode[dateStr] ?? null;

    return mode;
  }

  /**
   * 一年分のモードを取得する
   * @returns
   */
  getModes(): ModeMap {
    return this.mode;
  }

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
    const mode = this.getModeByDate(datetime);
    const times = this.getBusTimes(datetime);
    console.log({ mode, times });

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
    console.log({ nextToYakusaIndex, nextToAITIndex });
    const isFirst = nextToYakusaIndex + offset === 0 && nextToAITIndex + offset === 0;
    const isLast = nextToYakusaIndex === -1 && nextToAITIndex === -1;
    const nextToYakusaTime = times.toYakusa[nextToYakusaIndex + offset];
    const nextToAITTime = times.toAIT[nextToAITIndex + offset];

    return {
      mode,
      isFirst,
      isLast,
      nextToYakusa: [nextToYakusaTime[0], nextToYakusaTime[1]],
      nextToAIT: [nextToAITTime[0], nextToAITTime[1]],
    };
  }

  /**
   * 1日のバスの時刻表を取得する
   */
  getDateTimeTable(mode: ModeType, destination: Destination) {
    return this.timeTable[mode][destination];
  }

  getTimeTable() {
    return this.timeTable;
  }
}
