<script setup lang="ts">
import { Play } from 'lucide-vue-next'

const props = defineProps<{
  movie: {
    id: string
    title: string
    thumbnail: string
    duration: string
    rating: number
    genre: string[]
  }
}>()
</script>

<template>
  <div class="group relative overflow-hidden rounded-xl aspect-video cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 shadow-lg hover:shadow-2xl">
    <!-- Thumbnail Image -->
    <img 
      :src="movie.thumbnail" 
      :alt="movie.title"
      class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60"
    />
    
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

    <!-- Content overlay (visible on hover) -->
    <div class="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
      <h3 class="text-white font-heading font-bold text-lg leading-tight mb-1">{{ movie.title }}</h3>
      
      <div class="flex items-center gap-3 text-xs text-gray-300 mb-3">
        <span class="text-brand-primary font-semibold">{{ movie.rating }} ★</span>
        <span>{{ movie.duration }}</span>
        <span>{{ movie.genre[0] }}</span>
      </div>

      <div class="flex gap-2">
        <NuxtLink :to="`/watch/${movie.id}`" class="btn btn-sm bg-white text-black hover:bg-gray-200 border-none flex-1 font-bold">
          <Play class="w-4 h-4 fill-current" /> Play
        </NuxtLink>
        <NuxtLink :to="`/movie/${movie.id}`" class="btn btn-sm btn-circle bg-white/20 hover:bg-white/30 border-white/10 text-white backdrop-blur-md">
          <span class="text-lg leading-none">+</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
