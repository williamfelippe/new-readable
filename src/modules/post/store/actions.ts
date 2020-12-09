import { Dispatch } from 'redux'

import Post from '../types/post'
import Vote from 'modules/vote/types/vote'
import PostService from 'modules/post/services'
import {
  SET_POSTS,
  ADD_POST,
  SET_IS_LOADING_POSTS,
  SET_ERROR_ON_LOAD_POSTS,
  CHANGE_COMMENT_NUMBER
} from './types'

export const setPosts = (posts: Post[]) => {
  return { type: SET_POSTS, posts }
}

export const addPost = (post: Post) => {
  return { type: ADD_POST, post }
}

export const setIsLoadingPostsAction = (isLoadingPosts: boolean) => {
  return { type: SET_IS_LOADING_POSTS, isLoadingPosts }
}

export const setErrorOnLoadPostsAction = (errorOnLoadPosts: string) => {
  return { type: SET_ERROR_ON_LOAD_POSTS, errorOnLoadPosts }
}

export const changeCommentNumber = (postId: string) => {
  return { type: CHANGE_COMMENT_NUMBER, postId }
}

export const fetchPosts = () => async (dispatch: Dispatch) => {
  try {
    setIsLoadingPostsAction(true)
    const posts = await PostService.getPosts()
    dispatch(setPosts(posts))
  } catch(error) {
    dispatch(setErrorOnLoadPostsAction('error'))
  } finally {
    dispatch(setIsLoadingPostsAction(false))
  }
}

export const fetchByPostById = (postId: string) => async (dispatch: Dispatch) => {
  try {
    setIsLoadingPostsAction(true)
    const post = await PostService.getPost(postId)
    dispatch(addPost(post))
  } catch {
    dispatch(setErrorOnLoadPostsAction('error'))
  } finally {
    dispatch(setIsLoadingPostsAction(false))
  }
}

export const deletePost = (postId: string) => async (dispatch: Dispatch) => {
  const post = await PostService.deletePost(postId)
  dispatch(addPost(post))
}

export const votePost = (postId: string, vote: Vote) => async (dispatch: Dispatch) => {
  const post = await PostService.votePost(postId, vote)
  dispatch(addPost(post))
}
