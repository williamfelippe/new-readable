import { createSlice } from '@reduxjs/toolkit'

import Comment from '../types/comment'
import { fetchComments, postComment, voteComment } from './thunks'

export interface CommentState {
  comments: Comment[],
  isLoadingComments: boolean,
  errorOnLoadComments: string
}

const initialState: CommentState = {
  comments: [],
  isLoadingComments: false,
  errorOnLoadComments: ''
}

const addComment = (state: CommentState, newComment: Comment) => {
  const comments = [
    ...state.comments.filter(comment => comment.id !== newComment?.id),
    newComment
  ]

  return comments
}

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearComments(state) {
      state.comments = []
      state.isLoadingComments = false
      state.errorOnLoadComments = ''
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoadingComments = true
    })
    builder.addCase(fetchComments.fulfilled, (state, { payload }) => {
      state.comments = payload
      state.isLoadingComments = false
      state.errorOnLoadComments = ''
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      if (!action.payload) {
        state.errorOnLoadComments = action.error.message || ''
      }

      state.isLoadingComments = false
    })
    builder.addCase(postComment.fulfilled, (state, { payload }) => {
      state.comments = addComment(state, payload)
    })
    builder.addCase(voteComment.fulfilled, (state, { payload }) => {
      state.comments = addComment(state, payload)
    })
  }
})

export const { clearComments } = commentSlice.actions

export default commentSlice.reducer
