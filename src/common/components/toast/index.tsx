import { useEffect, useState } from 'react'

import clsx from 'clsx'

enum ToastType {
  SUCCESS,
  ERROR,
  WARNING
}

interface Payload {
  message: string,
  type: ToastType
}

const Toast = () => {
  const [isToastShowed, setIsToastShowed] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [type, setType] = useState<ToastType | null>(null)

  useEffect(() => {
    const showToast = ({ detail }: CustomEvent<Payload>) => {
      setIsToastShowed(true)
      setMessage(detail.message)
      setType(detail.type)
    }

    window.addEventListener('toast', showToast as EventListener)

    return () => window.removeEventListener('toast', showToast as EventListener)
  }, [])

  useEffect(() => {
    const clearToast = () => {
      setIsToastShowed(false)
      setMessage('')
      setType(null)
    }

    if (isToastShowed) {
      setTimeout(() => {
        clearToast()
      }, 4000)
    }
  }, [isToastShowed])

  const classes = clsx('fixed z-50 top-8 right-8 max-w-sm py-6 px-10 rounded-md text-lg font-bold', {
    'flex': isToastShowed,
    'hidden': !isToastShowed,
    'bg-green-200': type === ToastType.SUCCESS,
    'bg-red-500': type === ToastType.ERROR,
    'bg-yellow-300': type === ToastType.WARNING
  })

  return (
    <div className={classes}>
      {message}
    </div>
  )
}

const showToast = (message: string, type = ToastType.SUCCESS) => {
  const payload = {
    detail: {
      message,
      type
    }
  }

  const event = new CustomEvent<Payload>('toast', payload)
  window.dispatchEvent(event)
}

Toast.showToast = showToast
Toast.Type = ToastType

export default Toast
