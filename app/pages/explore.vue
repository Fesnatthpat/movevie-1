<script setup lang="ts">
import { ref, computed } from 'vue'
import { Filter, Search, SlidersHorizontal } from 'lucide-vue-next'

const { data: movies } = await useFetch('/api/movies')

const searchQuery = ref('')
const activeGenre = ref('All')
const genres = ['All', 'Sci-Fi', 'Thriller', 'Drama', 'Action', 'Documentary', 'Music', 'Romance', 'Mystery', 'Post-Apocalyptic']

const filteredMovies = computed(() => {
  if (!movies.value) return []
  let filtered = movies.value

  if (activeGenre.value !== 'All') {
    filtered = filtered.filter((m: any) => m.genre.includes(activeGenre.value))
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter((m: any) => 
      m.title.toLowerCase().includes(q) || 
      m.synopsis.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q)
    )
  }

  return filtered
})
</script>

<template>
  <div class="pt-24 pb-20 container mx-auto px-4 md:px-8">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      <h1 class="text-4xl font-heading font-bold text-white">Explore Films</h1>
      
      <!-- Search & Filter Bar -->
      <div class="flex items-center gap-4 w-full md:w-auto">
        <div class="relative w-full md:w-80">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search movies, directors..." 
            class="w-full bg-white/5 border border-white/10 text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
          />
        </div>
        <button class="btn btn-circle btn-outline border-white/10 text-white hover:bg-white/10">
          <SlidersHorizontal class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Genre Pills -->
    <div class="flex gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
      <button
        v-for="genre in genres"
        :key="genre"
        @click="activeGenre = genre"
        :class="[
          'px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 border',
          activeGenre === genre 
            ? 'bg-brand-primary text-white border-brand-primary box-shadow-glow' 
            : 'bg-transparent text-gray-300 border-white/20 hover:border-white/50 hover:text-white'
        ]"
      >
        {{ genre }}
      </button>
    </div>

    <!-- Grid -->
    <div v-if="filteredMovies.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <MovieCard 
        v-for="movie in filteredMovies" 
        :key="movie.id" 
        :movie="movie" 
      />
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-32">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
        <Search class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-xl font-heading font-semibold text-white mb-2">No films found</h3>
      <p class="text-gray-400">Try adjusting your filters or search query.</p>
    </div>
  </div>
</template>
