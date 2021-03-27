import Head from 'next/head'

import styles from '../styles/Home.module.sass'

export default function Home() {
  const tags = [
    'nodejs',
    'mysql',
    'docker',
    'kubernetes',
    'angular',
    'typescript',
    'kafka',
    'progressive-web-app',
    'websockets',
    'google-cloud',
    'bazel',
    'monorepo',
    'server-side-rendering',
    'docker-comopse',
  ]

  return (
    <div className={styles.host}>
      <Head>
        <title>Fullbazel</title>
      </Head>

      <main className={styles.container}>
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path style={{fill: '#76D275'}} d="M144 32 l112 112 -112 112 l-112 -112z" />
          <path style={{fill: '#43A047'}} d="M32 144 v112 l112 112 v-112z" />
          <path style={{fill: '#76D275'}} d="M368 32  l112 112 -112 112 -112 -112z" />
          <path style={{fill: '#43A047'}} d="M480 144 v112 l-112 112 v-112z" />
          <path style={{fill: '#43A047'}} d="M256 144 l112 112 -112 112 -112 -112z" />
          <path style={{fill: '#00701A'}} d="M256 368 v112 l-112 -112  v-112z" />
          <path style={{fill: '#004300'}} d="M256 368 l112 -112 v112 l-112 112z" />
        </svg>

        <h1 className={styles.title}>Fullstack Bazel</h1>
        <p className={styles.message}>Let's build something great!</p>
        <span className={styles.line}></span>

        <div className={styles.tags}>
          {tags.map((value, index) => {
            return <span key={index}>{value}</span>
          })}
        </div>
      </main>
    </div>
  )
}
