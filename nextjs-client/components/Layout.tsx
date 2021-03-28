import {ReactNode} from 'react'

import Navbar from './Navbar'

type Props = {
  children?: ReactNode
}

export const Layout = ({children}: Props) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto mt-20 py-4 px-2">{children}</div>
    </div>
  )
}
