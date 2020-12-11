import { ReactNode } from 'react'

import classnames from 'classnames'

interface Props {
  children: ReactNode,
  className?: string
}

const Backdrop = ({ children, className }: Props) => {
  const classes = classnames(`top-0 left-0 w-full h-full z-40 fixed bg-white
  bg-opacity-90 flex items-center justify-center`, className)

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Backdrop
