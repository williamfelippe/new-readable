import { useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'common/store'
import { OrderBy } from '../types/orderBy'
import { fetchPosts } from '../slice/thunks'
import { sortPostsSelector } from '../slice/selectors'

const useFetchPosts = (orderBy: OrderBy) => {
  const dispatch = useDispatch()

  const { posts, isLoadingPosts, errorOnLoadPosts } = useSelector((state: RootState) => state.post)
  const postsIds = useSelector((state: RootState) =>  sortPostsSelector(state, orderBy))

  const getPosts = useCallback(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  useEffect(() => {
    getPosts()
  }, [getPosts])

  return {
    posts,
    postsIds,
    isLoadingPosts,
    errorOnLoadPosts,
    getPosts
  }
}

export default useFetchPosts
