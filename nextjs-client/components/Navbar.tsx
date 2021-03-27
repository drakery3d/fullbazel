import Link from 'next/link'

import styles from './navbar.module.sass'

export const Navbar = () => {
  return (
    <div className={styles.header}>
      <nav>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={styles.logo}>
          <path style={{fill: '#76D275'}} d="M144 32 l112 112 -112 112 l-112 -112z" />
          <path style={{fill: '#43A047'}} d="M32 144 v112 l112 112 v-112z" />
          <path style={{fill: '#76D275'}} d="M368 32  l112 112 -112 112 -112 -112z" />
          <path style={{fill: '#43A047'}} d="M480 144 v112 l-112 112 v-112z" />
          <path style={{fill: '#43A047'}} d="M256 144 l112 112 -112 112 -112 -112z" />
          <path style={{fill: '#00701A'}} d="M256 368 v112 l-112 -112  v-112z" />
          <path style={{fill: '#004300'}} d="M256 368 l112 -112 v112 l-112 112z" />
        </svg>

        <div className={`${styles.menu} ${styles.big}`}>
          <div className="item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
          <div className="item">
            <Link href="/discussions">
              <a>Dicussions</a>
            </Link>
          </div>
          <div className="item">
            <Link href="/docs">
              <a>Docs</a>
            </Link>
          </div>
        </div>

        <div className={`${styles.menu} ${styles.small}`}>
          <div className={styles.item}>
            <Link href="/">
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
                </svg>
              </a>
            </Link>
          </div>
          <div className={styles.item}>
            <Link href="/discussions">
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M22 6h-3v9H6v3h12l4 4V6zm-5 7V2H2v15l4-4h11z" />
                </svg>
              </a>
            </Link>
          </div>
          <div className={styles.item}>
            <Link href="/docs">
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 3H5v18l7-3 7 3V3z" />
                </svg>
              </a>
            </Link>
          </div>
        </div>

        <div className={styles.misc}>
          <div className={styles.theme}>
            <span className={`material-icons ${styles.icon}`}>dark_mode</span>
            {/* <span className="material-icons icon">light_mode</span> */}
          </div>
          <div className={styles.signin}>
            <a>Sign In</a>
          </div>
        </div>
      </nav>
    </div>
  )
}
