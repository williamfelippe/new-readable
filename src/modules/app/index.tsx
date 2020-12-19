import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Routes from 'common/routes'
import { RootState } from 'common/store'
import { fetchCategories } from 'modules/category/slice/thunks'
import { ErrorRecoverState, Loader, Toast } from 'common/components'

import 'tailwindcss/tailwind.css'

const App = () => {
  const dispatch = useDispatch()

  const {
    isLoadingCategories,
    errorOnLoadCategories
  } = useSelector((state: RootState) => state.category)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  if(isLoadingCategories) return <Loader full />

  if(errorOnLoadCategories) {
    return (
      <ErrorRecoverState
        onTryAgain={() => dispatch(fetchCategories())}
        errorMessage={errorOnLoadCategories} />
    )
  }

  return (
    <>
      <Toast />
      <main className="bg-gray-50 h-auto min-h-screen">
        <Routes />
      </main>
    </>
  )
}

export default App
