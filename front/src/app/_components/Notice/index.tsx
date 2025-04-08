import styles from './index.module.scss';

export default function Notice() {
  return (
    <section className={styles.notice} id="notice">
      <h1>お知らせ</h1>

      <div className={styles.content}>
        <p>
          <a href="https://bus.bigbell.dev/">https://bus.bigbell.dev/</a> から引き継ぎました!
        </p>
      </div>
    </section>
  );
}
