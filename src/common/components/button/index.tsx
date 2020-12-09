import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import classnames from 'classnames'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  floating?: boolean
}

const Button = ({ children, floating, className, ...rest }: Props) => {
  const classes = classnames(
    `cursor-pointer flex items-center justify-center
    focus:outline-none rounded-md font-bold`,
    { 'rounded-full h-16 w-16 shadow-md': floating },
    className
  )

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
