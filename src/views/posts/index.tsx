import { ChangeEvent, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import Vote from 'modules/vote/types/vote'
import RoutesPaths from 'common/routes/routesPaths'
import { RootState } from 'common/store'
import { PlusIcon } from 'common/assets/icons'
import { OrderBy } from 'modules/post/types/orderBy'
import { clearComments } from 'modules/comment/slice'
import { CategoryMenu } from 'modules/category/components'
import { CommentsSidebar } from 'modules/comment/components'
import { CategoryTypes } from 'modules/category/utils/constants'
import {
  votePost,
  deletePost
} from 'modules/post/slice/thunks'
import {
  useCommentsSidebar,
  useConfirmationDeleteModal,
  useFetchPosts,
  useFilterProductIdByCategory
} from 'modules/post/hooks'
import {
  ConfirmModal,
  NoPosts,
  PostList
} from 'modules/post/components'
import {
  Button,
  Container,
  ErrorRecoverState,
  Loader,
  Select,
  Toast
} from 'common/components'

const Posts = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation<Location>()
  const { categoryId = CategoryTypes.ALL } = useParams<{ categoryId: CategoryTypes }>()

  const postId = new URLSearchParams(location.search).get('postId')

  const [orderBy, setOrderBy] = useState<OrderBy>('title')
  const { categories } = useSelector((state: RootState) => state.category)

  const { posts, postsIds, isLoadingPosts, errorOnLoadPosts, getPosts } = useFetchPosts(orderBy)

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

  const openPageToAddNewPost = () => {
    history.push(RoutesPaths.NEW_POST)
  }

  const onVotePost = (postId: string, vote: Vote) => {
    dispatch(votePost({ postId, vote }))
  }

  const removePost = async () => {
    if (modalData) {
      await dispatch(deletePost(modalData.postId))
      handleModalClosing()
      Toast.showToast('Post successfully remove!')
    }
  }

  const closeCommentsArea = async () => {
    handleCommentsSideBarClosing()
    dispatch(clearComments())
    history.push(RoutesPaths.ROOT)
  }

  const handleSelectOrderBy = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value) {
      setOrderBy(value as OrderBy)
    }
  }

  const renderContent = () => {
    if (isLoadingPosts) return <Loader full />

    if (errorOnLoadPosts) {
      return (
        <ErrorRecoverState
          onTryAgain={getPosts}
          errorMessage={errorOnLoadPosts} />
      )
    }

    if (currentPostsIds.length <= 0) {
      return <NoPosts />
    }

    return (
      <Container className="pb-16">
        <div className="flex flex-col">
          <div className="w-full max-w-xs self-end mb-8">
            <Select
              name="order_by"
              label="Order by:"
              value={orderBy}
              onChange={handleSelectOrderBy}
              options={[
                { label: 'Title', value: 'title' },
                { label: 'Vote', value: 'voteScore' },
                { label: 'Date', value: 'timestamp' }
              ]} />
          </div>

          <PostList
            posts={posts}
            postsIds={currentPostsIds}
            onVote={onVotePost}
            onRemove={handleModalOpening} />
        </div>

        <Button
          floating
          data-testid="add-new-post"
          disabled={isLoadingPosts}
          onClick={openPageToAddNewPost}
          className={`fixed right-3 bottom-3 lg:right-6 transition
          duration-300 ease-in-out lg:bottom-6 xl:right-8 xl:bottom-8
          bg-white hover:shadow-lg`}>
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
