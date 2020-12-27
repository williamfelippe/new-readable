import axios from 'axios'

import { Toast } from 'common/components'

interface ApiError {
  message: string,
  statusCode: number
}

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
  let apiError: ApiError

  if (error.response) {
    const { status, data } = error.response
    apiError = { statusCode: status, message: data.toString() }
  } else if (error.message) {
    apiError = { statusCode: error.status, message: error.message.toString() }
  } else {
    apiError = { statusCode: error.status, message: 'Ops... an unexpected error occurr' }
  }

  return apiError
}

instance.interceptors.response.use(
  response => response,
  error => {
    const apiError = getErrorMessage(error)
    Toast.showToast(apiError.message, Toast.Type.ERROR)
    return Promise.reject(apiError)
  }
)

export default instance
