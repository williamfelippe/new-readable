import { createAsyncThunk } from '@reduxjs/toolkit'

import CategoryService from '../services'

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories', async () => {
    return await CategoryService.getCategories()
  }
)
