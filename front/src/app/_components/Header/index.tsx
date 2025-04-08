import styles from './index.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <span>愛工大バス時刻案内</span>
        <br />
        <span>＜非公式＞</span>
      </h1>

      <p>次のバス出発時刻を表示するサービス</p>
    </header>
  );
}
