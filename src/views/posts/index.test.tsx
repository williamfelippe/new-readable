import Posts from './'
import Post from 'modules/post/types/post'
import TestServer from 'common/testsSuit/server'
import MockRequests from 'common/testsSuit/mockRequest'
import { renderWithProviders, screen, waitFor } from 'common/testsSuit'
import Category from 'modules/category/types/category'

const testServer = new TestServer()

describe('The posts page', () => {
  beforeAll(() => testServer.listen())
  afterEach(() => testServer.reset())
  afterAll(() => testServer.close())

  it('should show "no posts" message when posts array is empty on request', async () => {
    renderWithProviders(<Posts />)

    const noPostsComponent = await screen.findByText('No posts at the moment')

    expect(noPostsComponent).toBeInTheDocument()
  })

  it('should show posts after a request with content', async () => {
    const mockPostsList: Post[] = [
      {
        id: 'test',
        timestamp: 14848115,
        title: 'Test title',
        body: 'Test body',
        author: 'Test author',
        category: 'react',
        voteScore: 2,
        deleted: false,
        commentCount: 3
      },
      {
        id: 'test2',
        timestamp: 181848412,
        title: 'Test2 title',
        body: 'Test2 body',
        author: 'Test2 author',
        category: 'react',
        voteScore: 0,
        deleted: false,
        commentCount: 1
      }
    ]

    MockRequests.mock<Post[]>(testServer.server, '/posts', mockPostsList)

    renderWithProviders(<Posts />)

    await waitFor(() => expect(screen.getByText('Test title')).toBeInTheDocument())
    expect(screen.getByText('Test2 title')).toBeInTheDocument()
  })

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

    renderWithProviders(<Posts />)

    await waitFor(() => expect(screen.getByRole('link', { name: /redux/i })).toBeInTheDocument())
    expect(screen.getByRole('link', { name: /react/i })).toBeInTheDocument()
  })
})
