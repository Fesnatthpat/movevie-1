import { movies } from '../../utils/mockData'

export default defineEventHandler((event) => {
  const featured = movies.find(m => m.isFeatured)
  return featured || movies[0]
})
