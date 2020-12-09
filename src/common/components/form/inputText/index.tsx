import { Ref, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import classnames from 'classnames'

import Label from '../label'
import ErrorMessage from '../errorMessage'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string,
  label?: string,
  error?: string
};

const InputText = forwardRef((
  {
    label,
    name,
    error,
    className,
    ...rest
  }: Props,
  inputRef: Ref<HTMLInputElement>
) => {
  const inputClasses = classnames(`appearance-none placeholder-gray-400
  border border-gray-200 rounded-md w-full py-3 px-4 text-gray-700 rounded
  leading-5 focus:outline-none focus:ring-2 focus:ring-indigo-200 block`, {
    'border-2 border-red-500': Boolean(error)
  })

  return (
    <div className={classnames('flex flex-col', className)}>
      {label && <Label htmlFor={name} label={label} />}

      <input
        type="text"
        name={name}
        ref={inputRef}
        className={inputClasses}
        {...rest} />

      {error && <ErrorMessage error={error} />}
    </div>
  )
})

export default InputText
