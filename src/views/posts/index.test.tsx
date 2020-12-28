import * as ReactRouterDom from 'react-router-dom'

import Posts from './'
import Post from 'modules/post/types/post'
import TestServer from 'common/testsSuit/server'
import RoutesPaths from 'common/routes/routesPaths'
import MockRequests, { HttpMethods } from 'common/testsSuit/mockRequest'
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
    commentCount: 0
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

const mockPost = {
  id: 'test',
  timestamp: 14848115,
  title: 'Test title',
  body: 'Test body',
  author: 'Test author',
  category: 'react',
  voteScore: 2,
  deleted: false,
  commentCount: 3
}

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

  it('should show confirmation modal when clicking at "remove" button in a post', async () => {
    MockRequests.mock<Post[]>(testServer.server, '/posts', mockPostsList)

    prepare()

    const [removeButton] = await screen.findAllByTestId('remove-button')
    userEvent.click(removeButton)

    const modal = await screen.findByText('Are you sure that you want to delete this post?')
    expect(modal).toBeInTheDocument()

    const noButton = screen.getByRole('button', { name: /no/i })
    userEvent.click(noButton)

    expect(modal).not.toBeInTheDocument()
  })

  it('should remove post when confirm in modal', async () => {
    // Mocking apis
    MockRequests.mock<Post[]>(testServer.server, '/posts', mockPostsList)
    MockRequests.mock<Post>(
      testServer.server,
      '/posts/:postId',
      mockPost,
      { httpMethod: HttpMethods.DELETE }
    )

    // render component
    prepare()

    // Verify if posts were rendered
    const firstPost = await screen.findByText(mockPostsList[0].title)
    const secondPost = screen.getByText(mockPostsList[1].title)
    expect(firstPost).toBeInTheDocument()
    expect(secondPost).toBeInTheDocument()

    // Clicking on remove button of first post
    const [removeButton] = await screen.findAllByTestId('remove-button')
    userEvent.click(removeButton)

    // Verifying if confirm modal appear
    const modal = await screen.findByText('Are you sure that you want to delete this post?')
    expect(modal).toBeInTheDocument()

    // Confirm deletion
    const yesButton = screen.getByRole('button', { name: /yes/i })
    userEvent.click(yesButton)

    // Verifying if modal was closed
    await waitFor(() => expect(modal).not.toBeInTheDocument())

    // Verifying if post was really removed
    expect(firstPost).not.toBeInTheDocument()
    expect(secondPost).toBeInTheDocument()
  })

  it('should open comments sidebar when clicking at "comment" button in a post', async () => {
    // Mocking apis
    MockRequests.mock<Post[]>(
      testServer.server,
      '/posts',
      mockPostsList
    )
    MockRequests.mock<Post>(
      testServer.server,
      '/posts/:postId',
      { ...mockPost, voteScore: 3 },
      { httpMethod: HttpMethods.POST }
    )
    MockRequests.mock<Comment[]>(
      testServer.server,
      '/posts/:postId/comments',
      []
    )

    // render component
    prepare()

    // Clicking on comment button of first post
    const [commentButton] = await screen.findAllByTestId('comment-button')
    userEvent.click(commentButton)

    // Verifying if comments sidebar is visible
    const sidebar = await screen.findByTestId('sidebar')
    expect(sidebar).toHaveClass('-translate-x-0')

    // Verifying if comments sidebar is hidden
    const closeButton = screen.getByTestId('sidebar-close-button')
    userEvent.click(closeButton)

    await waitFor(() => expect(sidebar).toHaveClass('translate-x-full'))
    expect(mockHistoryPush).toHaveBeenCalledWith(RoutesPaths.ROOT)
  })
})
