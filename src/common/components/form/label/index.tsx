import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import clsx from 'clsx'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  label: string,
  htmlFor: string
}

const Label = ({ label, className, htmlFor, ...rest }: Props) => {
  const classes = clsx('mb-2 text-sm', className)

  return (
    <label className={classes} htmlFor={htmlFor}
      {...rest}>{label}
    </label>
  )
}

export default Label
