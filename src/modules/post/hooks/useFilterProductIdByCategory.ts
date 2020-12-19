import { useMemo } from 'react'

import Post from '../types/post'
import { CategoryTypes } from 'modules/category/utils/constants'

const useFilterProductIdByCategory = (
  categoryId: string,
  posts: Record<string, Post>,
  postsIds: string[]
) => {
  const currentPostsIds = useMemo(() => {
    if(postsIds.length <= 0) return postsIds

    if (categoryId && categoryId !== CategoryTypes.ALL) {
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

  return currentPostsIds
}

export default useFilterProductIdByCategory
