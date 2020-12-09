import Category from '../types/category'

export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_IS_LOADING_CATEGORIES = 'SET_IS_LOADING_CATEGORIES'
export const SET_ERROR_ON_LOAD_CATEGORIES = 'SET_ERROR_ON_LOAD_CATEGORIES'

export interface SetCategoriesAction {
  type: typeof SET_CATEGORIES
  categories: Category[]
}

export interface SetIsLoadingCategoriesAction {
  type: typeof SET_IS_LOADING_CATEGORIES
  isLoadingCategories: boolean
}

export interface SetErrorOnLoadCategoriesAction {
  type: typeof SET_ERROR_ON_LOAD_CATEGORIES
  errorOnLoadCategories: string
}

export type CategoriesActionTypes = SetCategoriesAction |
  SetIsLoadingCategoriesAction | SetErrorOnLoadCategoriesAction
