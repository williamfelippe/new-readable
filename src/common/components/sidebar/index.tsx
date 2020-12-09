import { ReactNode } from 'react'

import classnames from 'classnames'

import Button from '../button'
import { CloseIcon } from 'common/assets/icons'

interface Props {
  children: ReactNode,
  open: boolean,
  onClose: () => void
}

const Sidebar = ({ children, open, onClose }: Props) => {
  const classes = classnames(`transform top-0 right-0 w-1/4 bg-white fixed h-full
  overflow-auto ease-in-out transition-all duration-300 z-30
  border-l-2 border-opacity-60 shadow p-8`, {
    '-translate-x-0': open,
    'translate-x-full': !open
  })

  return (
    <>
      <aside className={classes}>
        <Button
          onClick={onClose}
          className="hover:text-indigo-400 text-base mb-8">
          <CloseIcon />
        </Button>

        {open && children}
      </aside>
      {
        open && (
          <div
            className={`fixed w-full h-full top-0 left-0
            z-20 bg-white bg-opacity-90`} />
        )
      }
    </>
  )
}

export default Sidebar
