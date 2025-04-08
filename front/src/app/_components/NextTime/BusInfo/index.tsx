import dayjs from 'dayjs';
import styles from './index.module.scss';
import type { BusTimeTable } from '..';

interface Props {
  busTimeTable: BusTimeTable | undefined;
}

function toNumber([hour, minute]: [number, number]): number {
  return hour * 60 + minute;
}

function formatHour(n: number): string {
  return n.toString().padStart(2, '0');
}

function getNextTwoBuses(busTimes: undefined | [number, number][]): [string, string] {
  if (busTimes === undefined) return ['取得中...', '取得中...'];

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const sortedBusTimes = busTimes.filter(t => toNumber(t) > currentMinutes).sort((a, b) => toNumber(a) - toNumber(b));
  const next = sortedBusTimes.at(0);
  const afterNext = sortedBusTimes.at(1);

  const nextStr = next ? `${formatHour(next[0])}:${formatHour(next[1])}` : '本日の運行は終了しました';
  const afterNextStr = afterNext ? `${formatHour(afterNext[0])}:${formatHour(afterNext[1])}` : 'ー';
  return [nextStr, afterNextStr];
}

export default function BusInfo({ busTimeTable }: Props) {
  const now = dayjs().format('HH:mm');

  const busTimesToAIT = getNextTwoBuses(busTimeTable?.toAIT);
  const busTimesToYakusa = getNextTwoBuses(busTimeTable?.toYakusa);

  return (
    <div className={styles.bus_info} id="next-time">
      <h2>八草→大学</h2>
      <h3>next</h3>
      <p className={styles.to_ait_1}>{busTimesToAIT[0]}</p>
      <h3>after the next</h3>
      <p className={styles.to_ait_2}>{busTimesToAIT[1]}</p>

      <hr />

      <h2>大学→八草</h2>
      <h3>next</h3>
      <p className={styles.to_yakusa_1}>{busTimesToYakusa[0]}</p>
      <h3>after the next</h3>
      <p className={styles.to_yakusa_2}>{busTimesToYakusa[1]}</p>
    </div>
  );
}
