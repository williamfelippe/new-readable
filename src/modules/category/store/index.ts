import Category from '../types/category'
import {
  SET_CATEGORIES,
  SET_IS_LOADING_CATEGORIES,
  SET_ERROR_ON_LOAD_CATEGORIES,
  CategoriesActionTypes
} from './types'

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

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action: CategoriesActionTypes) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.categories }
    case SET_IS_LOADING_CATEGORIES:
      return { ...state, isLoadingCategories: action.isLoadingCategories }
    case SET_ERROR_ON_LOAD_CATEGORIES:
      return { ...state, errorOnLoadCategories: action.errorOnLoadCategories }
    default:
      return state
  }
}

export default reducer
