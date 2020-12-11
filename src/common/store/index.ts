import { createLogger } from 'redux-logger'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import postReducer from 'modules/post/slice'
import commentReducer from 'modules/comment/slice'
import categoryReducer from 'modules/category/slice'

const logger = createLogger({ level: 'info', collapsed: true })

export const rootReducer = combineReducers({
  post: postReducer,
  comment: commentReducer,
  category: categoryReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
export default store
