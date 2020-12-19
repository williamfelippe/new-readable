import { createSlice } from '@reduxjs/toolkit'

import Category from '../types/category'
import { fetchCategories } from './thunks'

export interface CategoryState {
  categories: Category[],
  isLoadingCategories: boolean,
  errorOnLoadCategories: string
}

const initialState: CategoryState = {
  categories: [],
  isLoadingCategories: false,
  errorOnLoadCategories: ''
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoadingCategories = true
    })
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.categories = payload
      state.isLoadingCategories = false
      state.errorOnLoadCategories = ''
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      if (!action.payload) {
        state.errorOnLoadCategories = action.error.message || ''
      }
      state.isLoadingCategories = false
    })
  }
})

export default categorySlice.reducer
