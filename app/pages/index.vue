<script setup lang="ts">
import { ref } from 'vue'
import { Play, Info } from 'lucide-vue-next'

const { data: movies } = await useFetch('/api/movies')
const { data: featuredMovie } = await useFetch('/api/movies/featured')

const trendingMovies = computed(() => {
  return movies.value?.filter((m: any) => m.isTrending) || []
})

const recommendedMovies = computed(() => {
  return movies.value?.filter((m: any) => !m.isTrending) || []
})
</script>

<template>
  <div>
    <!-- Hero Banner (Netflix Style) -->
    <section v-if="featuredMovie" class="relative h-[85vh] w-full mb-12">
      <!-- Background Image / Video -->
      <div class="absolute inset-0 w-full h-full">
        <img 
          :src="featuredMovie.thumbnail" 
          :alt="featuredMovie.title"
          class="w-full h-full object-cover"
        />
        <!-- Vignette and Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-brand-void via-brand-void/70 to-transparent w-[80%]"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-brand-void via-transparent to-transparent"></div>
        <div class="absolute inset-0 bg-black/20"></div> <!-- Subtle darken -->
      </div>

      <!-- Hero Content -->
      <div class="relative h-full flex items-center">
        <div class="container mx-auto px-4 md:px-8 mt-24">
          <div class="max-w-2xl">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-md border border-brand-primary/30">
                Movevie Original
              </span>
              <span class="text-gray-300 text-sm font-medium">{{ featuredMovie.year }}</span>
              <span class="text-gray-300 text-sm font-medium">{{ featuredMovie.duration }}</span>
            </div>

            <h1 class="text-5xl md:text-7xl font-heading font-extrabold text-white leading-tight mb-4 text-shadow-glow">
              {{ featuredMovie.title }}
            </h1>
            
            <p class="text-lg text-gray-300 mb-8 line-clamp-3 leading-relaxed max-w-xl">
              {{ featuredMovie.synopsis }}
            </p>

            <div class="flex items-center gap-4">
              <NuxtLink :to="`/watch/${featuredMovie.id}`" class="btn btn-lg bg-white text-black hover:bg-gray-200 border-none font-bold px-8">
                <Play class="w-6 h-6 fill-current mr-2" /> Play Now
              </NuxtLink>
              <NuxtLink :to="`/movie/${featuredMovie.id}`" class="btn btn-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-white/10 px-8">
                <Info class="w-6 h-6 mr-2" /> More Info
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Movie Rows -->
    <div class="-mt-32 relative z-10 pb-20 space-y-8">
      <MovieRow title="Trending Now" :movies="trendingMovies" />
      <MovieRow title="Recommended for You" :movies="recommendedMovies" />
      <MovieRow title="Sci-Fi Thrillers" :movies="movies || []" />
    </div>

    <!-- CTA Section -->
    <section class="py-20 bg-brand-surface relative overflow-hidden">
      <div class="absolute -right-20 -top-40 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px]"></div>
      <div class="absolute -left-20 -bottom-40 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[100px]"></div>
      
      <div class="container mx-auto px-4 md:px-8 text-center relative z-10">
        <h2 class="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to Watch?</h2>
        <p class="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Immerse yourself in thousands of premium cinematic experiences from independent creators worldwide.
        </p>
        <NuxtLink to="/explore" class="btn btn-lg bg-brand-primary hover:bg-brand-primary/90 text-white border-none box-shadow-glow rounded-full px-10">
          Start Exploring
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
