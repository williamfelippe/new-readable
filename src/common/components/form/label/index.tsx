import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import classnames from 'classnames'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  label: string,
  htmlFor: string
}

const Label = ({ label, className, htmlFor, ...rest }: Props) => {
  const classes = classnames('mb-2 text-sm', className)

  return (
    <label className={classes} htmlFor={htmlFor}
      {...rest}>{label}
    </label>
  )
}

export default Label
