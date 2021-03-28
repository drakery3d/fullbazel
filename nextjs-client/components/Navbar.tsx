import Link from 'next/link'
import {NextRouter, withRouter} from 'next/router'
import React from 'react'

import styles from './navbar.module.sass'

interface Props {
  router: NextRouter
}

interface State {
  isDark: boolean
}

class Navbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {isDark: false}
    this.toggleTheme = this.toggleTheme.bind(this)
  }

  toggleTheme() {
    this.setState(state => ({isDark: !state.isDark}))
  }

  render() {
    const textColor = (path: string) =>
      this.props.router.pathname === path ? 'text-primary-color-dark' : ''
    const iconColor = (path: string) =>
      this.props.router.pathname === path ? 'text-primary-color-dark' : 'text-text-color-light'

    return (
      <div
        className={`fixed top-0 left-0 right-0 z-10 p-4 bg-opacity-70 bg-white shadow-md ${styles.bgBlur}`}
      >
        <nav className="h-12 max-w-5xl flex align-center mx-auto justify-between container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-10 h-10">
            <path style={{fill: '#76D275'}} d="M144 32 l112 112 -112 112 l-112 -112z" />
            <path style={{fill: '#43A047'}} d="M32 144 v112 l112 112 v-112z" />
            <path style={{fill: '#76D275'}} d="M368 32  l112 112 -112 112 -112 -112z" />
            <path style={{fill: '#43A047'}} d="M480 144 v112 l-112 112 v-112z" />
            <path style={{fill: '#43A047'}} d="M256 144 l112 112 -112 112 -112 -112z" />
            <path style={{fill: '#00701A'}} d="M256 368 v112 l-112 -112  v-112z" />
            <path style={{fill: '#004300'}} d="M256 368 l112 -112 v112 l-112 112z" />
          </svg>

          <div className="flex-1 items-center justify-between flex-wrap max-w-sm hidden md:flex md:mx-40">
            <div className="item">
              <Link href="/">
                <a className={`${textColor('/')}`}>Home</a>
              </Link>
            </div>
            <div className="item">
              <Link href="/discussions">
                <a className={`${textColor('/discussions')}`}>Dicussions</a>
              </Link>
            </div>
            <div className="item">
              <Link href="/docs">
                <a className={`${textColor('/docs')}`}>Docs</a>
              </Link>
            </div>
          </div>

          <div
            className={`flex flex-1 items-center justify-between flex-wrap ${styles.maxW32} mx-8 md:hidden`}
          >
            <div>
              <Link href="/">
                <a>
                  <svg
                    className={`w-6 h-6 fill-current ${iconColor('/')}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
                  </svg>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/discussions">
                <a>
                  <svg
                    className={`w-6 h-6 fill-current ${iconColor('/discussions')}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M22 6h-3v9H6v3h12l4 4V6zm-5 7V2H2v15l4-4h11z" />
                  </svg>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/docs">
                <a>
                  <svg
                    className={`w-6 h-6 fill-current ${iconColor('/docs')}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19 3H5v18l7-3 7 3V3z" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4">
              <span
                className="material-icons cursor-pointer w-6 h-6 fill-current text-text-color"
                onClick={this.toggleTheme}
              >
                {this.state.isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </div>
            <div className="cursor-pointer">Sign In</div>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Navbar)
