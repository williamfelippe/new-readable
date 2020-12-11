import App from './'
import TestServer from 'common/testsSuit/server'
import Category from 'modules/category/types/category'
import MockRequests from 'common/testsSuit/mockRequest'
import { renderWithProviders, screen, waitFor } from 'common/testsSuit'

const testServer = new TestServer()

describe('The posts page', () => {
  beforeAll(() => testServer.listen())
  afterEach(() => testServer.reset())
  afterAll(() => testServer.close())

  it('should show categories after a request with content', async () => {
    const mockCategoriesList: { categories: Category[] } = {
      categories: [
        {
          path: 'redux',
          name: 'redux'
        },
        {
          path: 'react',
          name: 'react'
        }
      ]
    }

    MockRequests.mock<{ categories: Category[] }>(
      testServer.server, '/categories', mockCategoriesList
    )

    renderWithProviders(<App />)

    await waitFor(() => expect(screen.getByRole('link', { name: /redux/i })).toBeInTheDocument())
    expect(screen.getByRole('link', { name: /react/i })).toBeInTheDocument()
  })
})
