import Comment from '../types/comment'

export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_IS_LOADING_COMMENTS = 'SET_IS_LOADING_COMMENTS'
export const SET_ERROR_ON_LOAD_COMMENTS = 'SET_ERROR_ON_LOAD_COMMENTS'
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS'

export interface SetCommentsAction {
  type: typeof SET_COMMENTS
  comments: Comment[]
}

export interface AddCommentAction {
  type: typeof ADD_COMMENT
  comment: Comment
}

export interface SetIsLoadingCommentsAction {
  type: typeof SET_IS_LOADING_COMMENTS
  isLoadingComments: boolean
}

export interface SetErrorOnLoadCommentsAction {
  type: typeof SET_ERROR_ON_LOAD_COMMENTS
  errorOnLoadComments: string
}

export interface ClearCommentsAction {
  type: typeof CLEAR_COMMENTS
}

export type CommentsActionTypes = SetCommentsAction | AddCommentAction |
  SetIsLoadingCommentsAction | SetErrorOnLoadCommentsAction | ClearCommentsAction
