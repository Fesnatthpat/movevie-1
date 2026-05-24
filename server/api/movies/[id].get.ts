import { movies } from '../../utils/mockData'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const movie = movies.find(m => m.id === id)
  
  if (!movie) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Movie not found',
    })
  }
  
  return movie
})
