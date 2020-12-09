import Comment from '../types/comment'
import {
  SET_COMMENTS,
  ADD_COMMENT,
  SET_IS_LOADING_COMMENTS,
  SET_ERROR_ON_LOAD_COMMENTS,
  CLEAR_COMMENTS,
  CommentsActionTypes
} from './types'

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

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action: CommentsActionTypes) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, comments: action.comments }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments.filter(comment => comment.id !== action.comment?.id),
          action.comment
        ]
      }
    case SET_IS_LOADING_COMMENTS:
      return { ...state, isLoadingComments: action.isLoadingComments }
    case SET_ERROR_ON_LOAD_COMMENTS:
      return { ...state, errorOnLoadComments: action.errorOnLoadComments }
    case CLEAR_COMMENTS:
      return { ...state, comments: [] }
    default:
      return state
  }
}

export default reducer
