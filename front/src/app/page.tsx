import Header from './_components/Header';
import Menu from './_components/Header/Menu';
import NextTime from './_components/NextTime';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <Header />

      <Menu />
      <main className={styles.main}>
        <NextTime />
      </main>
    </>
  );
}
