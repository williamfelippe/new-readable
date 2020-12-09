import { Dispatch } from 'redux'

import Vote from 'modules/vote/types/vote'
import CommentService from '../services'
import Comment, { NewComment } from '../types/comment'
import { changeCommentNumber } from 'modules/post/store/actions'
import {
  SET_COMMENTS,
  ADD_COMMENT,
  SET_IS_LOADING_COMMENTS,
  SET_ERROR_ON_LOAD_COMMENTS,
  CLEAR_COMMENTS
} from './types'

export const setComments = (comments: Comment[]) => {
  return { type: SET_COMMENTS, comments }
}

export const addComment = (comment: NewComment) => {
  return { type: ADD_COMMENT, comment }
}

export const setIsLoadingCommentsAction = (isLoadingComments: boolean) => {
  return { type: SET_IS_LOADING_COMMENTS, isLoadingComments }
}

export const setErrorOnLoadCommentsAction = (errorOnLoadComments: string) => {
  return { type: SET_ERROR_ON_LOAD_COMMENTS, errorOnLoadComments }
}

export const clearComments = () => {
  return { type: CLEAR_COMMENTS }
}

export const fetchComments = (postId: string) => async (dispatch: Dispatch) => {
  try {
    setIsLoadingCommentsAction(true)
    const comments = await CommentService.getComments(postId)
    dispatch(setComments(comments))
  } catch (error) {
    dispatch(setErrorOnLoadCommentsAction('error'))
  } finally {
    dispatch(setIsLoadingCommentsAction(false))
  }
}

export const postComment = (newComment: NewComment) => async (dispatch: Dispatch) => {
  const comment = await CommentService.postComment(newComment)
  dispatch(addComment(comment))
  dispatch(changeCommentNumber(comment.parentId))
}

export const voteComment = (commentId: string, vote: Vote) => async (dispatch: Dispatch) => {
  const comment = await CommentService.voteComment(commentId, vote)
  dispatch(addComment(comment))
}
