import Head from 'next/head'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fullbazel</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Fullstack Example Monorepo with Bazel" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Fullbazel</h1>

        <p className={styles.description}>
          Let's <code className={styles.code}>build</code> something great!
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Coming soon</p>
          </div>

          <a href="https://github.com/drakery3d/fullbazel" className={styles.card}>
            <h2>Source &rarr;</h2>
            <p>The source code is on GitHub</p>
          </a>

          <div className={styles.card}>
            <h2>Disussions &rarr;</h2>
            <p>Example realtime messaging feature.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
