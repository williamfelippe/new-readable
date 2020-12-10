import Post from '../types/post'

export const SET_POSTS = 'SET_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const SET_IS_LOADING_POSTS = 'SET_IS_LOADING_POSTS'
export const SET_ERROR_ON_LOAD_POSTS = 'SET_ERROR_ON_LOAD_POSTS'
export const CHANGE_COMMENT_NUMBER = 'CHANGE_COMMENT_NUMBER'

export interface SetPostsAction {
  type: typeof SET_POSTS,
  posts: Post[]
}

export interface AddPostAction {
  type: typeof ADD_POST,
  post: Post
}

export interface RemovePostAction {
  type: typeof REMOVE_POST,
  postId: string
}

export interface SetIsLoadingPostsAction {
  type: typeof SET_IS_LOADING_POSTS,
  isLoadingPosts: boolean
}

export interface SetErrorOnLoadPostsAction {
  type: typeof SET_ERROR_ON_LOAD_POSTS,
  errorOnLoadPosts: string
}

export interface ChangeCommentNumberAction {
  type: typeof CHANGE_COMMENT_NUMBER,
  postId: string
}

export type PostsActionTypes = SetPostsAction | AddPostAction | RemovePostAction |
  SetIsLoadingPostsAction | SetErrorOnLoadPostsAction | ChangeCommentNumberAction
