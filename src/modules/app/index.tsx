import { Provider } from 'react-redux'

import store from 'common/store'
import Routes from 'common/routes'
import { Toast } from 'common/components'

import 'tailwindcss/tailwind.css'

const App = () => {
  return (
    <Provider store={store}>
      <Toast />
      <main className="bg-gray-50 h-screen">
        <Routes />
      </main>
    </Provider>
  )
}

export default App
