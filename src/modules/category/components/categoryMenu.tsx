import { NavLink } from 'react-router-dom'

import Category from '../types/category'
import { Container } from 'common/components'

interface Props {
  categories: Category[]
}

const CategoryMenu = ({ categories }: Props) => {
  return (
    <section className="bg-gray-100 shadow p-4 -mt-8 mb-8">
      <Container className={`grid gap-2 grid-cols-4 items-center
        divide-x divide-gray-500 divide-opacity-40`}>
        {
          categories.map(category => {
            const { name, path } = category

            return (
              <NavLink
                exact
                key={name}
                to={path}
                activeClassName="text-indigo-500"
                className={`transition duration-300 ease-in-out
                hover:text-indigo-400 text-center font-bold`}>
                {name}
              </NavLink>
            )
          })
        }
      </Container>
    </section>
  )
}

export default CategoryMenu
