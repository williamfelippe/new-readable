import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { fetchComments } from 'modules/comment/store/actions'

const useCommentsSidebar = (postId: string | null) => {
  const dispatch = useDispatch()

  const [isCommentsSidebarOpen, setIsCommentsSidebarOpen] = useState<boolean>(false)

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

  const handleCommentsSideBarClosing = () => setIsCommentsSidebarOpen(false)

  return { isCommentsSidebarOpen, handleCommentsSideBarClosing }
}

export default useCommentsSidebar
