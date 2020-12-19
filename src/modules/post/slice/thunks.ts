import { createAsyncThunk } from '@reduxjs/toolkit'

import Vote from 'modules/vote/types/vote'
import PostService from 'modules/post/services'

export const fetchPosts = createAsyncThunk(
  'post/fetchPosts', async () => {
    return await PostService.getPosts()
  }
)

export const fetchByPostById = createAsyncThunk(
  'post/fetchByPostById', async (postId: string) => {
    return await PostService.getPost(postId)
  }
)

export const deletePost = createAsyncThunk(
  'post/deletePost', async (postId: string) => {
    return await PostService.deletePost(postId)
  }
)

export const votePost = createAsyncThunk(
  'post/votePost', async ({ postId, vote }: { postId: string, vote: Vote }) => {
    return await PostService.votePost(postId, vote)
  }
)
