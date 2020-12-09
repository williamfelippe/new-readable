import { useState, useEffect, useCallback, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import Vote from 'modules/vote/types/vote'
import RoutesPaths from 'common/routes/routesPaths'
import { RootState } from 'common/store'
import { PlusIcon } from 'common/assets/icons'
import { fetchCategories } from 'modules/category/store/actions'
import { CategoryMenu } from 'modules/category/components'
import { CommentsSidebar } from 'modules/comment/components'
import {
  NoPosts,
  PostList
} from 'modules/post/components'
import {
  clearComments,
  fetchComments
} from 'modules/comment/store/actions'
import {
  votePost,
  fetchPosts,
  deletePost
} from 'modules/post/store/actions'
import {
  Button,
  Container,
  ErrorRecoverState,
  Loader,
  Modal
} from 'common/components'

interface ModalData {
  isOpen: boolean,
  data: Record<string, unknown> | null
}

const Posts = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const location = useLocation<Location>()

  const { categoryId } = useParams<Record<string, string>>()

  const [modalData, setModalData] = useState<ModalData>({ isOpen: false, data: null })

  const postId = new URLSearchParams(location.search).get('postId')

  const {
    posts,
    postsIds,
    isLoadingPosts,
    errorOnLoadPosts
  } = useSelector((state: RootState) => state.post)

  const {
    categories,
    errorOnLoadCategories
  } = useSelector((state: RootState) => state.category)

  const currentPostsIds = useMemo(() => {
    if (categoryId && categoryId !== 'all') {
      let filteredPostsIds: string[] = []
      postsIds.forEach(postsId => {
        if (posts[postsId].category === categoryId) {
          filteredPostsIds = [...filteredPostsIds, postsId]
        }
      })

      return filteredPostsIds
    }

    return postsIds
  }, [categoryId, posts, postsIds])

  const [isCommentsSidebarOpen, setIsCommentsSidebarOpen] = useState<boolean>(false)

  const fetchCategoriesAndPosts = useCallback(() => {
    dispatch(fetchCategories())
    dispatch(fetchPosts())
  }, [dispatch])

  useEffect(() => {
    fetchCategoriesAndPosts()
  }, [fetchCategoriesAndPosts])

  useEffect(() => {
    const openCommentsSideBar = () => {
      setIsCommentsSidebarOpen(true)
    }

    const onComment = async (postId: string) => {
      openCommentsSideBar()
      dispatch(fetchComments(postId))
    }

    if (postId) {
      onComment(postId)
    }
  }, [dispatch, postId])

  const openPageToAddNewPost = () => history.push(RoutesPaths.NEW_POST)

  const closeCommentsSideBar = () => setIsCommentsSidebarOpen(false)

  const onRemove = (postId: string) => setModalData({ isOpen: true, data: { postId } })

  const closeModal = () => setModalData({ isOpen: false, data: null })

  const removePost = () => {
    if (modalData.data) {
      dispatch(deletePost(modalData.data.postId as string))
    }
  }

  const onVotePost = (postId: string, vote: Vote) => dispatch(votePost(postId, vote))

  const closeCommentsArea = async () => {
    closeCommentsSideBar()
    dispatch(clearComments())
    history.push(RoutesPaths.ROOT)
  }

  const renderContent = () => {
    if (isLoadingPosts) {
      return <Loader full />
    }

    if (errorOnLoadPosts || errorOnLoadCategories) {
      return (
        <ErrorRecoverState
          onTryAgain={fetchCategoriesAndPosts} />
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
          onRemove={onRemove} />

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

      <Modal isOpen={modalData.isOpen}>
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-6">
            Are you sure that you want to delete this post?
          </p>

          <div className="flex items-center justify-center">
            <Button
              onClick={removePost}
              className={`mr-20 bg-indigo-400 hover:bg-indigo-500 transition
              duration-300 ease-in-out text-white py-2 px-8`}>
              Yes
            </Button>

            <Button
              onClick={closeModal}
              className={`bg-white text:gray-500 hover:bg-gray-500 hover:text-white
              transition duration-300 ease-in-out border-solid border
              border-gray-400 py-2 px-8`}>
              No
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Posts
