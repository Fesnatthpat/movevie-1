<script setup lang="ts">
import { Search as SearchIcon, ArrowRight } from 'lucide-vue-next'
import { ref } from 'vue'

const searchQuery = ref('')
const { data: movies } = await useFetch('/api/movies')

const results = computed(() => {
  if (!searchQuery.value || !movies.value) return []
  const q = searchQuery.value.toLowerCase()
  return movies.value.filter((m: any) => 
    m.title.toLowerCase().includes(q) || 
    m.director.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="min-h-screen bg-brand-void pt-24 pb-20">
    <div class="container mx-auto px-4 md:px-8 max-w-4xl">
      <!-- Big Search Input -->
      <div class="relative mb-12">
        <SearchIcon class="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-500" />
        <input 
          v-model="searchQuery"
          type="text" 
          autofocus
          placeholder="Search movies, creators, festivals..." 
          class="w-full bg-brand-surface border border-white/10 text-white text-xl md:text-2xl rounded-full pl-20 pr-6 py-6 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary shadow-2xl transition-all"
        />
      </div>

      <!-- Trending Keywords -->
      <div v-if="!searchQuery" class="mb-12">
        <h3 class="text-lg font-heading font-semibold text-gray-400 mb-4">Trending Searches</h3>
        <div class="flex flex-wrap gap-3">
          <span v-for="tag in ['Cyberpunk', 'Kaito Tanaka', 'Neo-Cinema Festival', 'Documentary']" :key="tag" class="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Results -->
      <div v-else>
        <h3 class="text-lg font-heading font-semibold text-white mb-6">Results for "{{ searchQuery }}"</h3>
        
        <div class="space-y-4">
          <NuxtLink 
            v-for="movie in results" 
            :key="movie.id"
            :to="`/movie/${movie.id}`"
            class="flex items-center gap-4 p-4 rounded-xl hover:bg-brand-surface border border-transparent hover:border-white/10 transition-colors group"
          >
            <img :src="movie.thumbnail" class="w-16 h-16 object-cover rounded-lg" />
            <div class="flex-1">
              <h4 class="text-white font-medium group-hover:text-brand-primary transition-colors">{{ movie.title }}</h4>
              <p class="text-sm text-gray-500">{{ movie.year }} • Directed by {{ movie.director }}</p>
            </div>
            <ArrowRight class="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
          </NuxtLink>

          <div v-if="results.length === 0" class="text-center py-12 text-gray-400">
            No results found. Try a different keyword.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
