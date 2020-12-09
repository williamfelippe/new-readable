import { ReactNode } from 'react'

import thunk from 'redux-thunk'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, Store } from 'redux'
import { Router, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
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
    store = createStore(rootReducer, applyMiddleware(thunk))
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

export const getByTextWithMarkup = (text: string) => {
  return (
    screen.getByText((_, node) => {
      const hasText = (node: HTMLElement) => node.textContent === text
      const childrenDontHaveText = Array.from(node.children).every(
        child => !hasText(child as HTMLElement)
      )

      return hasText(node) && childrenDontHaveText
    })
  )
}

export { userEvent }
export * from '@testing-library/react'
