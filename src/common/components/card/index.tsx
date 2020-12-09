import { ReactNode } from 'react'

import classnames from 'classnames'

interface Props {
  children: ReactNode,
  className?: string,
  dataTestId?: string
}

const Card = ({ children, className, dataTestId }: Props) => {
  const classes = classnames('bg-white p-4 shadow rounded-md', className)

  return (
    <div data-testid={dataTestId} className={classes}>
      {children}
    </div>
  )
}

export default Card
