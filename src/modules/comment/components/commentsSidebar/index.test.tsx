import CommentsSidebar from './'
import DateUtil from 'common/utils/date'
import Comment from '../../types/comment'
import MockInfoUtil from 'common/utils/mockInfo'
import TestServer from 'common/testsSuit/server'
import MockRequests, { HttpMethods } from 'common/testsSuit/mockRequest'
import { renderWithProviders, screen, userEvent } from 'common/testsSuit'

const props = {
  postId: 'id',
  isOpen: true,
  onClose: jest.fn()
}

const prepare = (otherProps = {}, params = {}) => {
  return (
    renderWithProviders(
      <CommentsSidebar
        {...props}
        {...otherProps} />,
      params
    )
  )
}

const testServer = new TestServer()

describe('CommentsSidebar', () => {
  beforeAll(() => testServer.listen())
  afterEach(() => testServer.reset())
  afterAll(() => testServer.close())

  it('should show a loader when comments are loading', () => {
    prepare({}, { initialState: { comment: { isLoadingComments: true } } })

    const loading = screen.getByTestId('loader')
    expect(loading).toBeInTheDocument()
  })

  it('should show an empty state when there is no comments', () => {
    prepare()

    const noComments = screen.getByText('No comments by now')
    expect(noComments).toBeInTheDocument()
  })

  it('should show a list of comments', () => {
    const comments: Comment[] = [
      {
        id: 'id1',
        parentId: 'parentId',
        timestamp: 151484818,
        body: 'a comment',
        author: 'me',
        voteScore: 1,
        deleted: false,
        parentDeleted: false
      },
      {
        id: 'id2',
        parentId: 'parentId',
        timestamp: 151484756,
        body: 'a second comment',
        author: 'me',
        voteScore: 1,
        deleted: false,
        parentDeleted: false
      }
    ]

    prepare({}, { initialState: { comment: { comments } } })

    const comment = screen.getByText('a comment')
    const secondComment = screen.getByText('a second comment')

    expect(comment).toBeInTheDocument()
    expect(secondComment).toBeInTheDocument()
  })

  it('should add a new comment', async () => {
    const mockComment: Comment = {
      id: MockInfoUtil.createId(),
      timestamp: DateUtil.now(),
      body: 'This is a test',
      author: MockInfoUtil.createAuthorName(),
      parentId: 'id',
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    MockRequests.mock<Comment>(
      testServer.server,
      '/comments',
      mockComment,
      { httpMethod: HttpMethods.POST }
    )

    const postState = {
      posts: {
        'id': {
          id: 'id',
          commentCount: 0
        }
      },
      postIds: ['id']
    }

    prepare({}, { initialState: { post: { ...postState } } })

    const commentsInput = screen.getByRole('textbox')
    userEvent.type(commentsInput, mockComment.body)

    const submitButton = screen.getByTestId('create-area-submit-button')
    userEvent.click(submitButton)

    const comment = await screen.findByText(mockComment.body)
    expect(comment).toBeInTheDocument()
  })
})
