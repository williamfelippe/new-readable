import { ReactNode } from 'react'

import clsx from 'clsx'

interface Props {
  children: ReactNode,
  className?: string
}

const Container = ({ children, className }: Props) => {
  const classes = clsx('container mx-auto px-4', className)
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Container
