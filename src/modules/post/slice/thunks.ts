import { createAsyncThunk } from '@reduxjs/toolkit'

import Vote from 'modules/vote/types/vote'
import PostService from 'modules/post/services'

export const fetchPosts = createAsyncThunk(
  'category/fetchPosts', async () => {
    return await PostService.getPosts()
  }
)

export const fetchByPostById = createAsyncThunk(
  'category/fetchByPostById', async (postId: string) => {
    return await PostService.getPost(postId)
  }
)

export const deletePost = createAsyncThunk(
  'category/deletePost', async (postId: string) => {
    return await PostService.deletePost(postId)
  }
)

export const votePost = createAsyncThunk(
  'category/votePost', async ({ postId, vote }: { postId: string, vote: Vote }) => {
    return await PostService.votePost(postId, vote)
  }
)
