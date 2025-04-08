'use client';

import useSWR from 'swr';
import styles from './index.module.scss';
import { ofetch } from 'ofetch';

const apiUrl = new URL('/api/v1/mode', process.env.NEXT_PUBLIC_API_URL);

interface ModeRes {
  operationMode: string | null;
}

export default function TimeTable() {
  const { data, error, isLoading } = useSWR(apiUrl.toString(), () => {
    try {
      return ofetch<ModeRes>(apiUrl.toString());
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  });

  const mode = data?.operationMode;

  return (
    <>
      <section className={styles.table_section} id="to-ait">
        <h1>八草 → 大学</h1>
        <h3>時刻表</h3>

        <table data-active={mode === 'A'}>
          <tr>
            <th>時</th>
            <th>分</th>
            <th>時</th>
            <th>分</th>
          </tr>
          <tr>
            <td width="10%">8</td>
            <td width="40%">00　05　10　15　20　25　30　35　40　45　50　55</td>
            <td width="10%">15</td>
            <td width="40%">05　15　30　45</td>
          </tr>
          <tr>
            <td>9</td>
            <td>00　05　10　15　20　25　30　35　40　50　55</td>
            <td>16</td>
            <td>00　15　30　45</td>
          </tr>
          <tr>
            <td>10</td>
            <td>00　05　10　15　20　25　30　35　45　55</td>
            <td>17</td>
            <td>00　10　25　40</td>
          </tr>
          <tr>
            <td>11</td>
            <td>05　15　25　35　45　55</td>
            <td>18</td>
            <td>00　15　45</td>
          </tr>
          <tr>
            <td>12</td>
            <td>05　15　25　35　45　55</td>
            <td>19</td>
            <td>00　15　30　45</td>
          </tr>
          <tr>
            <td>13</td>
            <td>05　20　35　50</td>
            <td>20</td>
            <td>00　30</td>
          </tr>
          <tr>
            <td>14</td>
            <td>05　15　25　35　45　55</td>
            <td>21</td>
            <td>00</td>
          </tr>
        </table>

        <table data-active={mode === 'B'}>
          <tr>
            <th>時</th>
            <th>分</th>
            <th>時</th>
            <th>分</th>
          </tr>
          <tr>
            <td width="10%">8</td>
            <td width="40%">00　10　20　35　45</td>
            <td width="10%">15</td>
            <td width="40%">05　35</td>
          </tr>
          <tr>
            <td>9</td>
            <td>00　05　25　35　50</td>
            <td>16</td>
            <td>05　45</td>
          </tr>
          <tr>
            <td>10</td>
            <td>00　10　30　55</td>
            <td>17</td>
            <td>10　45</td>
          </tr>
          <tr>
            <td>11</td>
            <td>00　25　50</td>
            <td>18</td>
            <td>05　35</td>
          </tr>
          <tr>
            <td>12</td>
            <td>25</td>
            <td>19</td>
            <td>35</td>
          </tr>
          <tr>
            <td>13</td>
            <td>35</td>
            <td>20</td>
            <td>25</td>
          </tr>
          <tr>
            <td>14</td>
            <td>05　35</td>
            <td>21</td>
            <td>05</td>
          </tr>
        </table>

        <table data-active={mode === 'C'}>
          <tr>
            <th>時</th>
            <th>分</th>
            <th>時</th>
            <th>分</th>
          </tr>
          <tr>
            <td width="10%">8</td>
            <td width="40%">10　35</td>
            <td width="10%">15</td>
            <td width="40%">05　35</td>
          </tr>
          <tr>
            <td>9</td>
            <td>00　25　50</td>
            <td>16</td>
            <td>05　45</td>
          </tr>
          <tr>
            <td>10</td>
            <td>10　55</td>
            <td>17</td>
            <td>10　45</td>
          </tr>
          <tr>
            <td>11</td>
            <td>25　50</td>
            <td>18</td>
            <td>05　35</td>
          </tr>
          <tr>
            <td>12</td>
            <td>25</td>
            <td>19</td>
            <td>35</td>
          </tr>
          <tr>
            <td>13</td>
            <td>35</td>
            <td>20</td>
            <td>25</td>
          </tr>
          <tr>
            <td>14</td>
            <td>05　35</td>
            <td>21</td>
            <td>05</td>
          </tr>
        </table>
      </section>

      <section className={styles.table_section} id="to-yakusa">
        <h1>大学 → 八草</h1>
        <h3>時刻表</h3>

        <table data-active={mode === 'A'}>
          <tr>
            <th>時</th>
            <th>分</th>
            <th>時</th>
            <th>分</th>
          </tr>
          <tr>
            <td width="10%">8</td>
            <td width="40%">20　50</td>
            <td width="10%">15</td>
            <td width="40%">00　10　20　30　40　50</td>
          </tr>
          <tr>
            <td>9</td>
            <td>20　50</td>
            <td>16</td>
            <td>00　05　10　15　25　30　35　40　45　50　55</td>
          </tr>
          <tr>
            <td>10</td>
            <td>20 50</td>
            <td>17</td>
            <td>00　10　15　20　25　30　35　40　45　55</td>
          </tr>
          <tr>
            <td>11</td>
            <td>00　10　20　30　40　50</td>
            <td>18</td>
            <td>00　10　20　30　40　50</td>
          </tr>
          <tr>
            <td>12</td>
            <td>00　10　20　30　40　50</td>
            <td>19</td>
            <td>00　15　30　45</td>
          </tr>
          <tr>
            <td>13</td>
            <td>00　15　30　45</td>
            <td>20</td>
            <td>00　15　30　45</td>
          </tr>
          <tr>
            <td>14</td>
            <td>00　10　20　30　40　45　50　55</td>
            <td>21</td>
            <td>00　15　30　45</td>
          </tr>
        </table>

        <table data-active={mode === 'B'}>
          <tr>
            <th>時</th>
            <th>分</th>
            <th>時</th>
            <th>分</th>
          </tr>
          <tr>
            <td width="10%">8</td>
            <td width="40%">50</td>
            <td width="10%">15</td>
            <td width="40%">20　50</td>
          </tr>
          <tr>
            <td>9</td>
            <td>40</td>
            <td>16</td>
            <td>20</td>
          </tr>
          <tr>
            <td>10</td>
            <td>05　50</td>
            <td>17</td>
            <td>00　30　55</td>
          </tr>
          <tr>
            <td>11</td>
            <td>15　40</td>
            <td>18</td>
            <td>20　50</td>
          </tr>
          <tr>
            <td>12</td>
            <td>10</td>
            <td>19</td>
            <td>20　50</td>
          </tr>
          <tr>
            <td>13</td>
            <td>20　50</td>
            <td>20</td>
            <td>40</td>
          </tr>
          <tr>
            <td>14</td>
            <td>20　50</td>
            <td>21</td>
            <td>30</td>
          </tr>
        </table>

        <table data-active={mode === 'C'}>
          <tr>
            <th>時</th>
            <th>分</th>
            <th>時</th>
            <th>分</th>
          </tr>
          <tr>
            <td width="10%">8</td>
            <td width="40%">50</td>
            <td width="10%">15</td>
            <td width="40%">20　50</td>
          </tr>
          <tr>
            <td>9</td>
            <td>40</td>
            <td>16</td>
            <td>20</td>
          </tr>
          <tr>
            <td>10</td>
            <td>05　50</td>
            <td>17</td>
            <td>00　30　55</td>
          </tr>
          <tr>
            <td>11</td>
            <td>15　40</td>
            <td>18</td>
            <td>20　50</td>
          </tr>
          <tr>
            <td>12</td>
            <td>10</td>
            <td>19</td>
            <td>20　50</td>
          </tr>
          <tr>
            <td>13</td>
            <td>20　50</td>
            <td>20</td>
            <td>40</td>
          </tr>
          <tr>
            <td>14</td>
            <td>20　50</td>
            <td>21</td>
            <td>30</td>
          </tr>
        </table>
      </section>
    </>
  );
}
