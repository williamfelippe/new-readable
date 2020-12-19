import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'common/store'
import { OrderBy } from '../types/orderBy'

const postItemsSelector = (state: RootState) => state.post.posts
const postIdsSelector = (state: RootState) => state.post.postsIds

export const sortPostsSelector = createSelector(
  [
    postItemsSelector,
    postIdsSelector,
    (_: unknown, orderBy: OrderBy) => orderBy
  ],
  (posts, postIds, orderBy) => {
    return (
      [...postIds].sort((firstId, secondId) => {
        const firstPost = posts[firstId]
        const secondPost = posts[secondId]

        if (firstPost[orderBy] === secondPost[orderBy]) return 0
        if (firstPost[orderBy] < secondPost[orderBy]) return -1
        return 1
      })
    )
  }
)
