import styles from './index.module.scss';

export default function Notice() {
  return (
    <section className={styles.notice} id="notice">
      <h1>お知らせ</h1>

      <div className={styles.content}>
        <p>
          このたび、「愛工大バス時刻案内(<a href="https://bus.bigbell.dev/">bus.bigbell.dev</a>
          )」サイトのサービスを当研究室にて引き継ぐこととなりました。
          今後は、皆様の大学生活がより快適になるよう、利便性の高いサービスの提供に努めてまいります。
          また、さらなる使いやすさを目指して、順次アップデートも予定しております。 どうぞよろしくお願いいたします。
        </p>
      </div>
    </section>
  );
}
