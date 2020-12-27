import { ReactNode } from 'react'

import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
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
  initialState?: Record<string, unknown>,
  history?: MemoryHistory,
  store?: Store
}

export const renderWithProviders = (
  ui: ReactNode,
  {
    route = RoutesPaths.ROOT,
    path = RoutesPaths.ROOT,
    initialState = {},
    store = configureStore({ reducer: rootReducer, preloadedState: initialState }),
    history = createMemoryHistory({ initialEntries: [route] })
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

const getByTextWithMarkup = (text: string) => {
  return (
    screen.getByText((_, node) => {
      const hasText = (node: HTMLElement) => node.textContent === text

      const container = node as HTMLElement
      const childrenDontHaveText = Array.from(container.children).every(
        child => !hasText(child as HTMLElement)
      )

      return hasText(node as HTMLElement) && childrenDontHaveText
    })
  )
}

export { userEvent, getByTextWithMarkup }
export * from '@testing-library/react'
