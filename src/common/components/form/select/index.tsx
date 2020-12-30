import { Ref, DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'

import clsx from 'clsx'

import Label from '../label'
import ErrorMessage from '../errorMessage'

interface Option {
  value: string,
  label: string
}

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  name: string,
  options: Option[],
  label?: string,
  error?: string
}

const Select = forwardRef((
  {
    name,
    options,
    label,
    error,
    className,
    ...rest
  }: Props,
  selectRef: Ref<HTMLSelectElement>
) => {
  const selectClasses = clsx(`placeholder-gray-400 bg-white py-2
  border border-gray-200 rounded-md w-full py-3 px-4 text-gray-700 rounded
  leading-5 focus:outline-none focus:ring-2 focus:ring-indigo-200 block`, {
    'border-2 border-red-500': Boolean(error)
  })

  return (
    <div className={clsx('flex flex-col', className)}>
      {label && <Label htmlFor={name} label={label} />}

      <select
        name={name}
        ref={selectRef}
        className={selectClasses}
        {...rest}>
        <option value="" className="text-gray-700 text-md">
          Choose an option
        </option>
        {
          options.map(option => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-700 text-md">
              {option.label}
            </option>
          ))
        }
      </select>

      {error && <ErrorMessage error={error} />}
    </div>
  )
})

export default Select
