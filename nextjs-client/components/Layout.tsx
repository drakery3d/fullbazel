import {ReactNode} from 'react'

import styles from './layout.module.sass'
import {Navbar} from './Navbar'

type Props = {
  children?: ReactNode
}

export const Layout = ({children}: Props) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
