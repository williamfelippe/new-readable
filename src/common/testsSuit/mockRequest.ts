import { rest } from 'msw'
import { SetupServerApi } from 'msw/node'

import { baseURL } from '../utils/api'

class MockRequests {
  static mock = <T>(
    server: SetupServerApi,
    url: string,
    response: T,
    {
      status = 200,
      delay = 0
    } = {}
  ) => {
    server.use(
      rest.get(`${baseURL}${url}`, (_, res, ctx) => {
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
