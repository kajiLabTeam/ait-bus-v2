import type { BusTimeTable } from '@api/repository/busv2.repository';
import dayjs from 'dayjs';
import styles from './index.module.scss';

interface Props {
  busTimeTable: BusTimeTable | undefined;
}

export default function BusInfo({ busTimeTable }: Props) {
  const now = dayjs().format('HH:mm');
  console.log(busTimeTable);
  const nextBusToAIT = busTimeTable?.toAIT.find(bus => bus > now);
  const afterNextBusToAIT = nextBusToAIT && busTimeTable?.toAIT.find(bus => bus > nextBusToAIT);
  const nextBusToYakusa = busTimeTable?.toYakusa.find(bus => bus > now);
  const afterNextBusToYakusa = nextBusToYakusa && busTimeTable?.toYakusa.find(bus => bus > nextBusToYakusa);

  return (
    <div className={styles.bus_info} id="next-time">
      <h2>八草→大学</h2>
      <h3>next</h3>
      <p className={styles.to_ait_1}>{nextBusToAIT ?? '本日の運行は終了しました'}</p>
      <h3>after the next</h3>
      <p className={styles.to_ait_2}>{afterNextBusToAIT ?? '本日の運行は終了しました'}</p>

      <hr />

      <h2>大学→八草</h2>
      <h3>next</h3>
      <p className={styles.to_yakusa_1}>{nextBusToYakusa ?? '本日の運行は終了しました'}</p>
      <h3>after the next</h3>
      <p className={styles.to_yakusa_2}>{afterNextBusToYakusa ?? '本日の運行は終了しました'}</p>
    </div>
  );
}
