import { Ref, DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'

import classnames from 'classnames'

import Label from '../label'
import ErrorMessage from '../errorMessage'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  name: string,
  label?: string,
  error?: string
}

const TextArea = forwardRef((
  {
    name,
    label,
    error,
    className,
    ...rest
  }: Props,
  textareaRef: Ref<HTMLTextAreaElement>
) => {
  const textAreaClasses = classnames(`appearance-none placeholder-gray-400 resize-none
  border border-gray-200 rounded-md w-full py-3 px-4 text-gray-700 rounded
  leading-5 focus:outline-none focus:ring-2 focus:ring-indigo-200 block`, {
    'border-2 border-red-500': Boolean(error)
  })

  return (
    <div className={classnames('flex flex-col', className)}>
      {label && <Label htmlFor={name} label={label} />}

      <textarea
        ref={textareaRef}
        name={name}
        className={textAreaClasses}
        {...rest} />

      {error && <ErrorMessage error={error} />}
    </div>
  )
})

export default TextArea
