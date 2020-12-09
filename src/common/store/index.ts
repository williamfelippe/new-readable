import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'

import postReducer from 'modules/post/store'
import commentReducer from 'modules/comment/store'
import categoryReducer from 'modules/category/store'

const logger = createLogger({
  level: 'info',
  collapsed: true
})

const middlewares = compose(applyMiddleware(thunk, logger))

export const rootReducer = combineReducers({
  post: postReducer,
  comment: commentReducer,
  category: categoryReducer
})

const store = createStore(rootReducer, middlewares)

export type RootState = ReturnType<typeof rootReducer>
export default store
