import { useDispatch, useSelector } from 'react-redux'

import Vote from 'modules/vote/types/vote'
import { RootState } from 'common/store'
import { voteComment } from '../slice/thunks'
import {
  CommentsList,
  CreateCommentArea,
  NoComments
} from './'
import {
  Loader,
  Sidebar,
  Title
} from 'common/components'

interface Props {
  postId: string | null,
  isOpen: boolean,
  onClose: () => void
}

const CommentsSidebar = ({
  postId,
  isOpen,
  onClose
}: Props) => {
  const dispatch = useDispatch()

  const { comments, isLoadingComments } = useSelector((state: RootState) => state.comment)

  const onVote = async (commentId: string, vote: Vote) => {
    dispatch(voteComment({ commentId, vote }))
  }

  const renderContent = () => {
    if (isLoadingComments) return <Loader />

    if (comments.length <= 0) return <NoComments />

    return (
      <CommentsList
        onVote={onVote}
        comments={comments} />
    )
  }

  return (
    <Sidebar
      open={isOpen}
      onClose={onClose}>
      <>
        <div className="px-8">
          <Title
            tag="h2"
            title="comments"
            className="mb-5" />

          {renderContent()}
        </div>

        {
          postId && (
            <CreateCommentArea
              postId={postId} />
          )
        }
      </>
    </Sidebar>
  )
}

export default CommentsSidebar
