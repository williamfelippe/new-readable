import { ReactNode } from 'react'

import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { Router, Route } from 'react-router-dom'
import { configureStore, Store } from '@reduxjs/toolkit'
import { createMemoryHistory, MemoryHistory } from 'history'

import RoutesPaths from '../routes/routesPaths'
import { rootReducer } from '../store'

interface Props {
  children: ReactNode
}

interface RenderWithProviderOptions {
  route?: string,
  path?: string,
  history?: MemoryHistory,
  store?: Store
}

export const renderWithProviders = (
  ui: ReactNode,
  {
    route = RoutesPaths.ROOT,
    path = RoutesPaths.ROOT,
    history = createMemoryHistory({ initialEntries: [route] }),
    store = configureStore({ reducer: rootReducer })
  }: RenderWithProviderOptions = {}
) => {
  const Wrapper = ({ children }: Props) => (
    <Provider store={store}>
      <Router history={history}>
        <Route path={path}>
          {children}
        </Route>
      </Router>
    </Provider>
  )

  return {
    ...render(
      <Wrapper>{ui}</Wrapper>
    ),
    history
  }
}

export { userEvent }
export * from '@testing-library/react'
