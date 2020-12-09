import { useEffect } from 'react'

import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Vote from 'modules/vote/types/vote'
import Formatter from 'common/utils/formatter'
import RoutesPaths from 'common/routes/routesPaths'
import { RootState } from 'common/store'
import { ArrowLeft } from 'common/assets/icons'
import { ActionsButtons, PostBadge } from 'modules/post/components'
import { fetchComments, voteComment } from 'modules/comment/store/actions'
import { Container, Loader, Title } from 'common/components'
import { fetchByPostById, votePost, deletePost } from 'modules/post/store/actions'
import { CommentsList, CreateCommentArea, NoComments } from 'modules/comment/components'

const PostDetail = () => {
  const dispatch = useDispatch()

  const { postId } = useParams<Record<string, string>>()

  const post = useSelector((state: RootState) => state.post.posts?.[postId])
  const { comments, isLoadingComments } = useSelector((state: RootState) => state.comment)

  useEffect(() => {
    if (postId) {
      dispatch(fetchByPostById(postId))
      dispatch(fetchComments(postId))
    }
  }, [dispatch, postId])

  const handleVotePost = (postId: string, vote: Vote) => {
    dispatch(votePost(postId, vote))
  }

  const handleRemovePost = (postId: string) => {
    dispatch(deletePost(postId))
  }

  const handleVoteComment = (commentId: string, vote: Vote) => {
    dispatch(voteComment(commentId, vote))
  }

  const renderCommentsArea = () => {
    if (isLoadingComments) return <Loader />

    if (comments.length <= 0) return <NoComments />

    return (
      <CommentsList
        comments={comments}
        onVote={handleVoteComment} />
    )
  }

  if (!post) return <Loader />

  return (
    <Container>
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
            onRemove={handleRemovePost}
            onVote={handleVotePost} />
        </div>

        <div className="pt-8">
          <Title
            tag="h3"
            title="Comments"
            className="mb-10" />

          {renderCommentsArea()}

          <CreateCommentArea postId={postId} />
        </div>
      </div>
    </Container>
  )
}

export default PostDetail
