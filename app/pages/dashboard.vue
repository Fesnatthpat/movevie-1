<script setup lang="ts">
import { Play, Eye, Clock, ThumbsUp, Activity } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

// Mock data
const stats = [
  { label: 'Total Watch Time', value: '42.5 hrs', icon: Clock, color: 'text-brand-secondary' },
  { label: 'Films Watched', value: '128', icon: Eye, color: 'text-brand-primary' },
  { label: 'Liked Films', value: '45', icon: ThumbsUp, color: 'text-green-400' },
  { label: 'Activity Score', value: '98%', icon: Activity, color: 'text-purple-400' }
]

const { data: movies } = await useFetch('/api/movies')
const recentlyWatched = computed(() => movies.value ? movies.value.slice(0, 3) : [])
const savedMovies = computed(() => movies.value ? movies.value.slice(2, 5) : [])
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-heading font-bold text-white mb-2">Welcome back, User!</h1>
      <p class="text-gray-400">Here's your cinematic journey overview.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div 
        v-for="stat in stats" 
        :key="stat.label"
        class="bg-brand-surface p-6 rounded-2xl border border-white/5 flex items-center gap-4"
      >
        <div class="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
          <component :is="stat.icon" :class="['w-6 h-6', stat.color]" />
        </div>
        <div>
          <p class="text-sm text-gray-400 mb-1">{{ stat.label }}</p>
          <p class="text-2xl font-heading font-bold text-white">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Two Column Layout for Lists -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-12">
      <!-- Recently Watched -->
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-heading font-bold text-white">Continue Watching</h2>
          <button class="text-sm text-brand-secondary hover:text-white transition-colors">See all history</button>
        </div>
        
        <div class="space-y-4">
          <div 
            v-for="movie in recentlyWatched" 
            :key="movie.id"
            class="flex gap-4 bg-brand-surface p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div class="relative w-40 aspect-video rounded-lg overflow-hidden shrink-0">
              <img :src="movie.thumbnail" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Play class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
              <!-- Progress bar mockup -->
              <div class="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                <div class="h-full bg-brand-primary" style="width: 65%"></div>
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <h4 class="font-medium text-white mb-1 group-hover:text-brand-primary transition-colors">{{ movie.title }}</h4>
              <p class="text-sm text-gray-400">{{ movie.duration }} left</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Saved / Watchlist -->
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-heading font-bold text-white">Your Watchlist</h2>
          <button class="text-sm text-brand-secondary hover:text-white transition-colors">Manage</button>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <MovieCard 
            v-for="movie in savedMovies" 
            :key="movie.id" 
            :movie="movie" 
          />
        </div>
      </div>
    </div>
  </div>
</template>
