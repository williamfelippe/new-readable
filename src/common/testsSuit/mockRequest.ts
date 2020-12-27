import { rest } from 'msw'
import { SetupServerApi } from 'msw/node'

import { baseURL } from '../utils/api'

export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

type Method = HttpMethods.GET | HttpMethods.POST | HttpMethods.PUT | HttpMethods.DELETE

interface Options {
  status?: number,
  delay?: number,
  httpMethod?: Method
}

const getRestApiByMethod = (httpMethod: Method) => rest[httpMethod]

class MockRequests {
  static mock = <T>(
    server: SetupServerApi,
    url: string,
    response: T,
    {
      status = 200,
      delay = 0,
      httpMethod = HttpMethods.GET
    }: Options = {}
  ) => {
    const restApi = getRestApiByMethod(httpMethod)

    server.use(
      restApi(`${baseURL}${url}`, (_, res, ctx) => {
        return res(
          ctx.delay(delay),
          ctx.status(status),
          ctx.json(response)
        )
      })
    )
  }
}

export default MockRequests
