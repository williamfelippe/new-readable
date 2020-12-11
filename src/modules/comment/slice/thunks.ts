import { createAsyncThunk } from '@reduxjs/toolkit'

import Vote from 'modules/vote/types/vote'
import CommentService from '../services'
import { NewComment } from '../types/comment'
import { changeCommentNumber } from 'modules/post/slice'

export const fetchComments = createAsyncThunk(
  'category/fetchComments', async (postId: string) => {
    return await CommentService.getComments(postId)
  }
)

export const postComment = createAsyncThunk(
  'category/postComment', async (newComment: NewComment, { dispatch }) => {
    const comment = await CommentService.postComment(newComment)
    dispatch(changeCommentNumber(comment.parentId))
    return comment
  }
)

export const voteComment = createAsyncThunk(
  'category/voteComment', async ({ commentId, vote }: { commentId: string, vote: Vote }) => {
    return await CommentService.voteComment(commentId, vote)
  }
)
