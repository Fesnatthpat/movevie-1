<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{
  title: string
  movies: any[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)

const scroll = (direction: 'left' | 'right') => {
  if (scrollContainer.value) {
    const scrollAmount = direction === 'left' ? -400 : 400
    scrollContainer.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="py-6 group">
    <div class="flex items-center justify-between px-4 md:px-8 mb-4">
      <h2 class="text-xl md:text-2xl font-heading font-bold text-white">{{ title }}</h2>
      <NuxtLink to="/explore" class="text-sm font-medium text-brand-secondary hover:text-white transition-colors">
        See all
      </NuxtLink>
    </div>

    <div class="relative">
      <!-- Scroll Left Button -->
      <button 
        @click="scroll('left')"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-full bg-gradient-to-r from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-start px-2 hidden md:flex"
      >
        <ChevronLeft class="w-8 h-8 text-white hover:scale-125 transition-transform" />
      </button>

      <!-- Horizontal Scroll Container -->
      <div 
        ref="scrollContainer"
        class="flex gap-4 overflow-x-auto px-4 md:px-8 pb-8 pt-4 no-scrollbar snap-x snap-mandatory"
      >
        <div 
          v-for="movie in movies" 
          :key="movie.id"
          class="flex-none w-[280px] md:w-[320px] snap-start"
        >
          <MovieCard :movie="movie" />
        </div>
      </div>

      <!-- Scroll Right Button -->
      <button 
        @click="scroll('right')"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-full bg-gradient-to-l from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end px-2 hidden md:flex"
      >
        <ChevronRight class="w-8 h-8 text-white hover:scale-125 transition-transform" />
      </button>
    </div>
  </div>
</template>
