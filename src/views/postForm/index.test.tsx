import * as ReactRouterDom from 'react-router-dom'

import PostForm from './'
import Post from 'modules/post/types/post'
import TestServer from 'common/testsSuit/server'
import RoutesPaths from 'common/routes/routesPaths'
import MockRequests, { HttpMethods } from 'common/testsSuit/mockRequest'
import {
  getByTextWithMarkup,
  renderWithProviders,
  screen,
  userEvent,
  waitFor
} from 'common/testsSuit'

const mockHistoryReplace = jest.fn()
const mockHistoryGoBack = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDom,
  useHistory: () => ({
    replace: mockHistoryReplace,
    goBack: mockHistoryGoBack
  })
}))

const categories = [
  { path: 'react', name: 'react' },
  { path: 'redux', name: 'redux' }
]

const mockPost: Post = {
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

const testServer = new TestServer()

describe('Post form page', () => {
  beforeAll(() => testServer.listen())
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => {
    testServer.reset()
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })
  afterAll(() => testServer.close())

  describe('when creating a post', () => {
    const prepare = (params = {
      route: RoutesPaths.NEW_POST,
      path: RoutesPaths.NEW_POST,
      initialState: { category: { categories } }
    }) => {
      return renderWithProviders(<PostForm />, params)
    }

    it('should return to previous page when click on back button', () => {
      prepare()

      const backButton = screen.getByTestId('back-button')
      userEvent.click(backButton)

      expect(mockHistoryGoBack).toHaveBeenCalledTimes(1)
    })

    it('should have "Add post" title', () => {
      prepare()

      const title = getByTextWithMarkup('Add post')
      expect(title).toBeInTheDocument()
    })

    it('should not submit form with errors', async () => {
      prepare()

      const submitButton = screen.getByRole('button', { name: /save/i })

      userEvent.click(submitButton)

      await waitFor(() => expect(screen.getByText('Title is required')).toBeInTheDocument())
      expect(screen.getByText('Comment is required')).toBeInTheDocument()
      expect(screen.getByText('Category is required')).toBeInTheDocument()
    })

    it('should show error when comment has less than 10 characters', async () => {
      prepare()

      const titleInput = screen.getByRole('textbox', { name: /title/i })
      userEvent.type(titleInput, 'A title')

      const commentInput = screen.getByRole('textbox', { name: /comment/i })
      userEvent.type(commentInput, 'A comment')

      const categoryInput = screen.getByRole('combobox', { name: /category/i })
      userEvent.selectOptions(categoryInput, 'react')

      const submitButton = screen.getByRole('button', { name: /save/i })
      userEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Comment should have at least 10 characters'))
          .toBeInTheDocument()
      })
    })

    it('should submit the form when all fields are fulfilled', async () => {
      MockRequests.mock<Post>(testServer.server, '/posts', mockPost, { httpMethod: HttpMethods.POST })

      prepare()

      const titleInput = screen.getByRole('textbox', { name: /title/i })
      userEvent.type(titleInput, 'A title')

      const commentInput = screen.getByRole('textbox', { name: /comment/i })
      userEvent.type(commentInput, 'A perfect comment')

      const categoryInput = screen.getByRole('combobox', { name: /category/i })
      userEvent.selectOptions(categoryInput, 'react')

      const submitButton = screen.getByRole('button', { name: /save/i })
      userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockHistoryReplace)
          .toHaveBeenCalledWith(RoutesPaths.EDIT_POST.replace(':postId', mockPost.id))
      })
    })
  })

  describe('when editing a post', () => {
    const prepare = (params = {
      route: RoutesPaths.EDIT_POST.replace(':postId', mockPost.id),
      path: RoutesPaths.EDIT_POST,
      initialState: { category: { categories } }
    }) => {
      return renderWithProviders(<PostForm />, params)
    }

    it('should have "Edit post" title', async () => {
      MockRequests.mock<Post>(testServer.server, `/posts/:postId`, mockPost)

      prepare()

      await waitFor(() => {
        const title = getByTextWithMarkup('Edit post')
        expect(title).toBeInTheDocument()
      })
    })

    it('should fulfill the fields with previous value', async () => {
      MockRequests.mock<Post>(testServer.server, '/posts/:postId', mockPost)

      prepare()

      const loader = screen.getByTestId('loader')
      expect(loader).toBeInTheDocument()

      const titleInput = await screen.findByRole('textbox', { name: /title/i })
      const commentInput = screen.getByRole('textbox', { name: /comment/i })
      const categoryInput = screen.getByRole('combobox', { name: /category/i })

      await waitFor(() => expect(titleInput).toHaveValue(mockPost.title))
      expect(commentInput).toHaveValue(mockPost.body)
      expect(categoryInput).toHaveValue(mockPost.category)
    })

    it('should show error state when api fail', async () => {
      MockRequests.mock<string>(
        testServer.server,
        '/posts/:postId',
        'Error message mock',
        { status: 400 }
      )

      prepare()

      const errorMessage = await screen.findByText('Error message mock')
      expect(errorMessage).toBeInTheDocument()
    })
  })
})
