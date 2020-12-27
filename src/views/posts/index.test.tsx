import * as ReactRouterDom from 'react-router-dom'

import Posts from './'
import Post from 'modules/post/types/post'
import TestServer from 'common/testsSuit/server'
import RoutesPaths from 'common/routes/routesPaths'
import MockRequests from 'common/testsSuit/mockRequest'
import { renderWithProviders, screen, userEvent, waitFor } from 'common/testsSuit'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDom,
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

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

const prepare = (initialState = {}) => {
  return renderWithProviders(<Posts />, { initialState })
}

const testServer = new TestServer()

describe('The posts page', () => {
  beforeAll(() => testServer.listen())
  afterEach(() => testServer.reset())
  afterAll(() => testServer.close())

  it('should show "no posts" message when posts array is empty on request', async () => {
    prepare()

    const noPostsComponent = await screen.findByText('No posts at the moment')
    expect(noPostsComponent).toBeInTheDocument()
  })

  it('should show posts after a request with content', async () => {
    MockRequests.mock<Post[]>(testServer.server, '/posts', mockPostsList)

    prepare()

    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()

    await waitFor(() => expect(screen.getByText('Test title')).toBeInTheDocument())
    expect(screen.getByText('Test2 title')).toBeInTheDocument()
  })

  it('should redirect to new post page when click on floating button', async () => {
    MockRequests.mock<Post[]>(testServer.server, '/posts', mockPostsList)

    prepare()

    const addButton = await screen.findByTestId('add-new-post')
    userEvent.click(addButton)

    expect(mockHistoryPush).toHaveBeenCalledWith(RoutesPaths.NEW_POST)
  })

  it('should show error state when api fail', async () => {
    MockRequests.mock<string>(
      testServer.server,
      '/posts',
      'Error message mock',
      { status: 400 }
    )

    prepare()

    const errorMessage = await screen.findByText('Error message mock')
    expect(errorMessage).toBeInTheDocument()
  })
})
