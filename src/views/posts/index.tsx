import { useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import Vote from 'modules/vote/types/vote'
import RoutesPaths from 'common/routes/routesPaths'
import { RootState } from 'common/store'
import { PlusIcon } from 'common/assets/icons'
import { clearComments } from 'modules/comment/slice'
import { CategoryMenu } from 'modules/category/components'
import { CommentsSidebar } from 'modules/comment/components'
import { CategoryTypes } from 'modules/category/utils/constants'
import {
  useCommentsSidebar,
  useConfirmationDeleteModal,
  useFilterProductIdByCategory
} from 'modules/post/hooks'
import {
  ConfirmModal,
  NoPosts,
  PostList
} from 'modules/post/components'
import {
  votePost,
  fetchPosts,
  deletePost
} from 'modules/post/slice/thunks'
import {
  Button,
  Container,
  ErrorRecoverState,
  Loader,
  Toast
} from 'common/components'

const Posts = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const location = useLocation<Location>()

  const { categoryId = CategoryTypes.ALL } = useParams<Record<string, string>>()

  const postId = new URLSearchParams(location.search).get('postId')

  const {
    posts,
    postsIds,
    isLoadingPosts,
    errorOnLoadPosts
  } = useSelector((state: RootState) => state.post)

  const { categories } = useSelector((state: RootState) => state.category)

  const currentPostsIds = useFilterProductIdByCategory(categoryId, posts, postsIds)

  const {
    isOpen: isModalOpen,
    data: modalData,
    handleModalClosing,
    handleModalOpening
  } = useConfirmationDeleteModal()

  const {
    isCommentsSidebarOpen,
    handleCommentsSideBarClosing
  } = useCommentsSidebar(postId)

  const getPosts = useCallback(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  useEffect(() => {
    getPosts()
  }, [getPosts])

  const openPageToAddNewPost = () => {
    history.push(RoutesPaths.NEW_POST)
  }

  const onVotePost = (postId: string, vote: Vote) => {
    dispatch(votePost({ postId, vote }))
  }

  const removePost = async () => {
    if (modalData) {
      await dispatch(deletePost(modalData.postId as string))
      handleModalClosing()
      Toast.showToast('Post successfully remove!')
    }
  }

  const closeCommentsArea = async () => {
    handleCommentsSideBarClosing()
    dispatch(clearComments())
    history.push(RoutesPaths.ROOT)
  }

  const renderContent = () => {
    if (isLoadingPosts) return <Loader full />

    if (errorOnLoadPosts) {
      return (
        <ErrorRecoverState
          errorMessage={errorOnLoadPosts}
          onTryAgain={getPosts} />
      )
    }

    if (currentPostsIds.length <= 0) {
      return <NoPosts />
    }

    return (
      <Container className="pb-16">
        <PostList
          posts={posts}
          postsIds={currentPostsIds}
          onVote={onVotePost}
          onRemove={handleModalOpening} />

        <Button
          floating
          disabled={isLoadingPosts}
          className={`fixed right-3 bottom-3 lg:right-6 transition
          duration-300 ease-in-out lg:bottom-6 xl:right-8 xl:bottom-8
          bg-white hover:shadow-lg`}
          onClick={openPageToAddNewPost}>
          <PlusIcon />
        </Button>

        <CommentsSidebar
          postId={postId}
          isOpen={isCommentsSidebarOpen}
          onClose={closeCommentsArea} />
      </Container>
    )
  }

  return (
    <>
      <CategoryMenu categories={categories} />

      {renderContent()}

      <ConfirmModal
        isOpen={isModalOpen}
        onAccept={removePost}
        onRefuse={handleModalClosing} />
    </>
  )
}

export default Posts
