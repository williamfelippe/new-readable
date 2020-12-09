import { Dispatch } from 'redux'

import Category from '../types/category'
import CategoryService from '../services'
import {
  SET_CATEGORIES,
  SET_IS_LOADING_CATEGORIES,
  SET_ERROR_ON_LOAD_CATEGORIES
} from './types'

export const setCategories = (categories: Category[]) => {
  return { type: SET_CATEGORIES, categories }
}

export const setIsLoadingCategoriesAction = (isLoadingCategories: boolean) => {
  return { type: SET_IS_LOADING_CATEGORIES, isLoadingCategories }
}

export const setErrorOnLoadCategoriesAction = (errorOnLoadCategories: string) => {
  return { type: SET_ERROR_ON_LOAD_CATEGORIES, errorOnLoadCategories }
}

export const fetchCategories = () => async (dispatch: Dispatch) => {
  try {
    setIsLoadingCategoriesAction(true)
    const categories = await CategoryService.getCategories()
    dispatch(setCategories(categories))
  } catch (error) {
    dispatch(setErrorOnLoadCategoriesAction('error'))
  } finally {
    dispatch(setIsLoadingCategoriesAction(false))
  }
}
