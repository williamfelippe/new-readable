import axios from 'axios'

import { Toast } from 'common/components'

export const baseURL = 'http://localhost:3001'

const instance = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    'Authorization': 'foobar'
  }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorMessage = (error: any) => {
  if (error.response) {
    return error.response.data.toString()
  } else if (error.message) {
    return error.message.toString()
  }

  return 'Ops... an unexpected error occur'
}

instance.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = getErrorMessage(error)
    Toast.showToast(errorMessage, Toast.Type.ERROR)
    return Promise.reject(errorMessage)
  }
)

export default instance
