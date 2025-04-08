'use client';

import { ofetch } from 'ofetch';
import styles from './index.module.scss';
import useSWR from 'swr';
import BusInfo from './BusInfo';

const apiUrl = new URL('/api/v2/afterbus', process.env.NEXT_PUBLIC_API_URL);

const destinations = ['toAIT', 'toYakusa'] as const;
type Destination = (typeof destinations)[number];
export type BusTimeTable = { [key in Destination]: string[] };
type BusTimeTableRes = {
  BusTimeTable: BusTimeTable;
};

export default function NextTime() {
  const { data, error, isLoading } = useSWR(apiUrl.toString(), () => {
    try {
      return ofetch<BusTimeTableRes>(apiUrl.toString());
    } catch (error) {
      throw new Error('Failed to fetch next bus data');
    }
  });

  return (
    <section className={styles.next_time}>
      <h1>Next Time</h1>
      <BusInfo busTimeTable={data?.BusTimeTable} />
    </section>
  );
}
