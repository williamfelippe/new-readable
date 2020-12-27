import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'

import Vote from 'modules/vote/types/vote'
import Formatter from 'common/utils/formatter'
import RoutesPaths from 'common/routes/routesPaths'
import { RootState } from 'common/store'
import { ArrowLeft } from 'common/assets/icons'
import { useConfirmationDeleteModal } from 'modules/post/hooks'
import { CreateCommentAreaPosition } from 'modules/comment/components/createArea'
import { fetchComments, voteComment } from 'modules/comment/slice/thunks'
import { Container, Loader, Title, Toast } from 'common/components'
import { ActionsButtons, ConfirmModal, PostBadge } from 'modules/post/components'
import { fetchByPostById, votePost, deletePost } from 'modules/post/slice/thunks'
import { CommentsList, CreateCommentArea, NoComments } from 'modules/comment/components'

const PostDetail = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { postId } = useParams<Record<string, string>>()

  const post = useSelector((state: RootState) => state.post.posts?.[postId])
  const { comments, isLoadingComments } = useSelector((state: RootState) => state.comment)

  const {
    isOpen: isModalOpen,
    handleModalClosing,
    handleModalOpening
  } = useConfirmationDeleteModal()

  useEffect(() => {
    if (postId) {
      dispatch(fetchByPostById(postId))
      dispatch(fetchComments(postId))
    }
  }, [dispatch, postId])

  const handleVotePost = (postId: string, vote: Vote) => {
    dispatch(votePost({ postId, vote }))
  }

  const handleRemovePost = async () => {
    await dispatch(deletePost(postId))
    handleModalClosing()
    history.replace(RoutesPaths.ROOT)
    Toast.showToast('Post successfully remove!')
  }

  const handleVoteComment = (commentId: string, vote: Vote) => {
    dispatch(voteComment({ commentId, vote }))
  }

  const renderCommentsList = () => {
    if (isLoadingComments) {
      return (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )
    }

    if (comments.length <= 0) return <NoComments />

    return (
      <CommentsList
        comments={comments}
        onVote={handleVoteComment} />
    )
  }

  if (!post) return <Loader full />

  return (
    <Container>
      <>
        <NavLink
          exact
          to={RoutesPaths.ROOT}
          className={`hover:text-indigo-400 transition
          ease-in-out duration-300`}>
          <ArrowLeft />
        </NavLink>

        <div className="max-w-5xl mx-auto divide-y divide-gray-400">
          <div className="flex flex-col mb-8">
            <PostBadge
              category={post.category} />

            <Title
              tag="h2"
              title={post.title}
              className="mb-3" />

            <p className="text-base text-center">
              by {post.author} at <span className="italic">
                {Formatter.getHumanizedDate(post.timestamp)}
              </span>
            </p>

            <p className="text-xl text-center mt-10 mb-12">
              {post.body}
            </p>

            <ActionsButtons
              post={post}
              onRemove={handleModalOpening}
              onVote={handleVotePost} />
          </div>

          <div className="pt-8">
            <Title
              tag="h3"
              title="Comments"
              className="mb-10" />

            {renderCommentsList()}

            <CreateCommentArea
              postId={postId}
              position={CreateCommentAreaPosition.FIXED} />
          </div>
        </div>

        <ConfirmModal
          isOpen={isModalOpen}
          onAccept={handleRemovePost}
          onRefuse={handleModalClosing} />
      </>
    </Container>
  )
}

export default PostDetail
