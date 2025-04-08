import Footer from './_components/Footer';
import Header from './_components/Header';
import Menu from './_components/Header/Menu';
import NextTime from './_components/NextTime';
import Notice from './_components/Notice';
import TimeTable from './_components/TimeTable';
import TodaySchedule from './_components/TodaySchedule';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <Header />

      <Menu />
      <main className={styles.main}>
        <NextTime />
        <Notice />
        <TodaySchedule />
        <TimeTable />
      </main>

      <Footer />
    </>
  );
}
