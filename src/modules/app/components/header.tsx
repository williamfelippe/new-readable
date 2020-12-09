import { NavLink } from 'react-router-dom'

import RoutesPaths from 'common/routes/routesPaths'
import { Title } from 'common/components'

const Header = () => {
  return (
    <header className={`py-6 mb-4 lg:mb-8 border-b-2
      border-gray-200 shadow-sm bg-white`}>
      <NavLink exact to={RoutesPaths.ROOT}>
        <Title tag="h1" title="readable" />
      </NavLink>
    </header>
  )
}

export default Header
