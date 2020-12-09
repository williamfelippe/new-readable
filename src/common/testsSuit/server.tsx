import { rest } from 'msw'
import { setupServer, SetupServerApi } from 'msw/node'

import { baseURL } from '../utils/api'

class TestServer {
  public serverApi: SetupServerApi

  constructor() {
    this.serverApi = setupServer(
      rest.get(`${baseURL}/posts`, (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([])
        )
      }),
      rest.get(`${baseURL}/categories`, (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ categories: [] })
        )
      })
    )
  }

  get server() {
    return this.serverApi
  }

  listen() {
    this.server.listen()
  }

  reset() {
    this.server.resetHandlers()
  }

  close() {
    this.server.close()
  }
}

export default TestServer
