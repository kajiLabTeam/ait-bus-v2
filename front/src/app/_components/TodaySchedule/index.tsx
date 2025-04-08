'use client';

import useSWR from 'swr';
import styles from './index.module.scss';
import { ofetch } from 'ofetch';
import { useMemo } from 'react';

const apiUrl = new URL('/api/v1/mode', process.env.NEXT_PUBLIC_API_URL);

interface ModeRes {
  operationMode: string | null;
}

export default function TodaySchedule() {
  const { data, error, isLoading } = useSWR(apiUrl.toString(), () => {
    try {
      return ofetch<ModeRes>(apiUrl.toString());
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  });

  const message = useMemo(() => {
    if (isLoading) return '取得中...';
    return data?.operationMode ? `今日は${data.operationMode}ダイヤです` : '取得中...';
  }, [isLoading, data]);

  return (
    <section className={styles.schedule}>
      <h1>本日の運行ダイヤ</h1>

      <p className={styles.content}>{message}</p>
    </section>
  );
}
