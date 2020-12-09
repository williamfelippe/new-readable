import { ReactNode } from 'react'

import classnames from 'classnames'

import Backdrop from '../backdrop'

interface Props {
  isOpen: boolean,
  children: ReactNode
}

const Modal = ({ isOpen, children }: Props) => {
  const classes = classnames(
    `max-w-lg w-full rounded-lg bg-white fixed p-8 shadow transform
    ease-in-out transition-all duration-300 border border-solid border-gray-200`
  )

  if(!isOpen) return null

  return (
    <Backdrop>
      <div className={classes}>
        {children}
      </div>
    </Backdrop>
  )
}

export default Modal
