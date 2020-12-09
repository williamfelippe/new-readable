import Post from '../types/post'
import {
  SET_POSTS,
  ADD_POST,
  SET_IS_LOADING_POSTS,
  SET_ERROR_ON_LOAD_POSTS,
  CHANGE_COMMENT_NUMBER,
  PostsActionTypes
} from './types'

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

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action: PostsActionTypes) => {
  switch (action.type) {
    case SET_POSTS: {
      const { posts, postsIds } = normalizePostList(action.posts)

      return { ...state, posts, postsIds }
    }

    case ADD_POST: {
      const postId = action.post.id

      return {
        ...state,
        posts: { ...state.posts, [postId]: action.post },
        postsIds: [...state.postsIds, postId]
      }
    }

    case SET_IS_LOADING_POSTS:
      return { ...state, isLoadingPosts: action.isLoadingPosts }

    case SET_ERROR_ON_LOAD_POSTS:
      return { ...state, errorOnLoadPosts: action.errorOnLoadPosts }

    case CHANGE_COMMENT_NUMBER: {
      const { postId } = action
      const post = state.posts[postId]

      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]: {
            ...post,
            commentCount: post.commentCount + 1
          }
        }
      }
    }

    default:
      return state
  }
}

export default reducer
