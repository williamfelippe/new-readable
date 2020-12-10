import api from 'common/utils/api'
import Category from '../types/category'
import RoutesPaths from 'common/routes/routesPaths'
import { CategoryTypes } from '../utils/constants'

class CategoryService {
  static async getCategories() {
    const response = await api.get<{ categories: Category[] }>('/categories')
    return response.data.categories.map(category => {
      return category.name === CategoryTypes.ALL
        ? { ...category, path: RoutesPaths.ROOT }
        : category
    })
  }
}

export default CategoryService
