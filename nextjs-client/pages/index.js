import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fullbazel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Fullbazel</h1>

        <p className={styles.description}>
          Let's <code className={styles.code}>build</code> something great!
        </p>

        <div className={styles.grid}>
          <a className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Coming soon</p>
          </a>

          <a href="https://github.com/drakery3d/fullbazel" className={styles.card}>
            <h3>Source &rarr;</h3>
            <p>The source code is on GitHub</p>
          </a>

          <a className={styles.card}>
            <h3>Disussions &rarr;</h3>
            <p>Example realtime messaging feature.</p>
          </a>
        </div>
      </main>
    </div>
  )
}
