import { ReactNode } from 'react'

import classnames from 'classnames'

interface Props {
  children: ReactNode,
  className?: string
}

const Container = ({ children, className }: Props) => {
  const classes = classnames('container mx-auto px-4', className)
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Container
