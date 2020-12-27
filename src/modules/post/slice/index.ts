import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Post from '../types/post'
import {
  deletePost,
  fetchByPostById,
  fetchPosts,
  votePost
} from './thunks'

export interface PostState {
  posts: Record<string, Post>,
  postsIds: string[],
  isLoadingPosts: boolean,
  errorOnLoadPosts: string
}

const initialState: PostState = {
  posts: {},
  postsIds: [],
  isLoadingPosts: false,
  errorOnLoadPosts: ''
}

const normalizePostList = (unnormalizedPosts: Post[]) => {
  let posts: Record<string, Post> = {}
  let postsIds: string[] = []

  unnormalizedPosts.forEach(post => {
    posts = { ...posts, [post.id]: post }
    postsIds = [...postsIds, post.id]
  })

  return { posts, postsIds }
}

const addPost = (state: PostState, post: Post) => {
  const postId = post.id

  const posts = { ...state.posts, [postId]: post }
  const postsIds = [...state.postsIds.filter(id => id !== postId), postId]

  return { posts, postsIds }
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    changeCommentNumber(state, action: PayloadAction<string>) {
      const postId = action.payload

      state.posts[postId].commentCount = state.posts[postId].commentCount + 1
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoadingPosts = true
    }),
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      const { posts, postsIds } = normalizePostList(payload)
      state.posts = posts
      state.postsIds = postsIds
      state.isLoadingPosts = false
      state.errorOnLoadPosts = ''
    }),
    builder.addCase(fetchPosts.rejected, (state, action) => {
      if (!action.payload) {
        state.errorOnLoadPosts = action.error.message || ''
      }

      state.isLoadingPosts = false
    }),
    builder.addCase(fetchByPostById.pending, (state) => {
      state.isLoadingPosts = true
    }),
    builder.addCase(fetchByPostById.fulfilled, (state, { payload }) => {
      const { posts, postsIds } = addPost(state, payload)

      state.posts = posts
      state.postsIds = postsIds
      state.isLoadingPosts = false
    }),
    builder.addCase(fetchByPostById.rejected, (state, action) => {
      if (!action.payload) {
        state.errorOnLoadPosts = action.error.message || ''
      }

      state.isLoadingPosts = false
    }),
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      const { id: postId } = payload

      const posts = { ...state.posts }
      delete posts[postId]

      state.posts = posts
      state.postsIds = state.postsIds.filter(id => id !== postId)
    }),
    builder.addCase(votePost.fulfilled, (state, { payload }) => {
      const { posts, postsIds } = addPost(state, payload)

      state.posts = posts
      state.postsIds = postsIds
    })
  }
})

export const { changeCommentNumber } = postSlice.actions

export default postSlice.reducer
