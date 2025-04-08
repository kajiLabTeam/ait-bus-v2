'use client';

import styles from './index.module.scss';
import { useHash } from '@/hooks/useHash';

const menus = [
  { id: 'next-time', label: '次の出発時間' },
  { id: 'notice', label: 'お知らせ' },
  { id: 'today-schedule', label: '今日の運行ダイヤ' },
  { id: 'to-ait', label: '[時刻表]八草→大学' },
  { id: 'to-yakusa', label: '[時刻表]大学→八草' },
] as const;

export default function Menu() {
  const [hash] = useHash();

  return (
    <nav className={styles.menu}>
      <ul>
        {menus.map(menu => (
          <li key={menu.id}>
            <a href={`#${menu.id}`} className={hash === menu.id ? styles.active : ''}>
              {menu.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
