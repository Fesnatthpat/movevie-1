<script setup lang="ts">
import { Play, UserPlus, Heart, MessageSquare } from 'lucide-vue-next'

// Mock Data
const creator = {
  id: 'c1',
  name: 'Kaito Tanaka',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
  cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1920&auto=format&fit=crop',
  bio: 'Tokyo-based director exploring the intersection of humanity, technology, and memory. Winner of the 2025 Neo-Cinema Vanguard Award.',
  followers: '12.4K',
  following: '142',
  films: 8
}

const { data: movies } = await useFetch('/api/movies')
const creatorMovies = computed(() => {
  if (!movies.value) return []
  return movies.value.filter((m: any) => m.director === creator.name)
})
</script>

<template>
  <div class="pb-20">
    <!-- Cover & Profile Header -->
    <div class="relative h-64 md:h-80 w-full">
      <img :src="creator.cover" alt="Cover" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-brand-void to-transparent"></div>
    </div>

    <div class="container mx-auto px-4 md:px-8 relative -mt-20 z-10">
      <div class="flex flex-col md:flex-row gap-6 md:items-end mb-8">
        <div class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-brand-void overflow-hidden bg-brand-surface shadow-2xl shrink-0">
          <img :src="creator.avatar" :alt="creator.name" class="w-full h-full object-cover" />
        </div>
        
        <div class="flex-1">
          <h1 class="text-4xl font-heading font-bold text-white mb-2">{{ creator.name }}</h1>
          <p class="text-brand-secondary font-medium mb-4">Director & Cinematographer</p>
          <div class="flex items-center gap-6 text-sm text-gray-300">
            <div class="flex flex-col"><span class="text-white font-bold text-lg">{{ creator.followers }}</span> Followers</div>
            <div class="flex flex-col"><span class="text-white font-bold text-lg">{{ creator.following }}</span> Following</div>
            <div class="flex flex-col"><span class="text-white font-bold text-lg">{{ creator.films }}</span> Films</div>
          </div>
        </div>

        <div class="flex gap-3">
          <button class="btn btn-primary bg-brand-primary hover:bg-brand-primary/90 text-white border-none box-shadow-glow">
            <UserPlus class="w-5 h-5 mr-2" /> Follow
          </button>
          <button class="btn btn-outline border-white/20 text-white hover:bg-white/10">
            Message
          </button>
        </div>
      </div>

      <div class="max-w-3xl mb-12">
        <h3 class="text-xl font-heading font-semibold text-white mb-3">About</h3>
        <p class="text-gray-300 leading-relaxed">{{ creator.bio }}</p>
      </div>

      <!-- Portfolio Grid -->
      <h3 class="text-2xl font-heading font-bold text-white mb-6">Films by {{ creator.name }}</h3>
      <div v-if="creatorMovies.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <MovieCard 
          v-for="movie in creatorMovies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>
      
      <div v-else class="text-center py-20 bg-brand-surface rounded-xl border border-white/5">
        <p class="text-gray-400">This creator hasn't published any films yet.</p>
      </div>
    </div>
  </div>
</template>
