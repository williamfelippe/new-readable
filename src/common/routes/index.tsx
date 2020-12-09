import { Suspense, lazy } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import RoutesPaths from './routesPaths'
import { Loader } from 'common/components'
import { Header } from 'modules/app/components'

const Posts = lazy(() => import('views/posts'))
const PostForm = lazy(() => import('views/postForm'))
const PostDetail = lazy(() => import('views/postDetail'))

const Routes = () => {
  return (
    <Router>
      <Header />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={[RoutesPaths.NEW_POST, RoutesPaths.EDIT_POST]}>
            <PostForm />
          </Route>

          <Route exact path={RoutesPaths.POST_DETAIL}>
            <PostDetail />
          </Route>

          <Route exact path={[RoutesPaths.ROOT, RoutesPaths.FILTER_BY_CATEGORY]}>
            <Posts />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default Routes
