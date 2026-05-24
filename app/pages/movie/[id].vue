<script setup lang="ts">
import { Play, Plus, Share2, ThumbsUp } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: movie } = await useFetch(`/api/movies/${route.params.id}`)
const { data: movies } = await useFetch('/api/movies')

const similarMovies = computed(() => {
  if (!movies.value || !movie.value) return []
  return movies.value.filter((m: any) => m.id !== movie.value.id && m.genre.some((g: string) => movie.value.genre.includes(g))).slice(0, 4)
})
</script>

<template>
  <div v-if="movie" class="pb-20">
    <!-- Cinematic Header -->
    <div class="relative h-[70vh] w-full">
      <img :src="movie.thumbnail" :alt="movie.title" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/50 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-brand-void via-brand-void/80 to-transparent w-3/4"></div>
      
      <div class="absolute bottom-0 left-0 w-full p-4 md:p-12 z-10">
        <div class="container mx-auto">
          <div class="max-w-3xl">
            <h1 class="text-5xl md:text-6xl font-heading font-bold text-white mb-4 text-shadow-glow">{{ movie.title }}</h1>
            
            <div class="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-6">
              <span class="text-brand-primary font-semibold text-lg">{{ movie.rating }} ★</span>
              <span>{{ movie.year }}</span>
              <span>{{ movie.duration }}</span>
              <span class="border border-white/20 px-2 py-0.5 rounded text-xs">HD</span>
            </div>

            <p class="text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {{ movie.synopsis }}
            </p>

            <div class="flex flex-wrap items-center gap-4">
              <NuxtLink :to="`/watch/${movie.id}`" class="btn btn-lg bg-white text-black hover:bg-gray-200 border-none font-bold px-8">
                <Play class="w-6 h-6 fill-current mr-2" /> Play
              </NuxtLink>
              <button class="btn btn-lg btn-circle btn-outline border-white/20 text-white hover:bg-white/10" title="Add to Watchlist">
                <Plus class="w-6 h-6" />
              </button>
              <button class="btn btn-lg btn-circle btn-outline border-white/20 text-white hover:bg-white/10" title="Like">
                <ThumbsUp class="w-6 h-6" />
              </button>
              <button class="btn btn-lg btn-circle btn-outline border-white/20 text-white hover:bg-white/10" title="Share">
                <Share2 class="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Movie Details Grid -->
    <div class="container mx-auto px-4 md:px-12 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div class="md:col-span-2 space-y-8">
        <section>
          <h3 class="text-2xl font-heading font-bold text-white mb-4">About</h3>
          <p class="text-gray-300 leading-relaxed">{{ movie.synopsis }}</p>
        </section>

        <!-- Director / Creator Profile -->
        <section class="bg-brand-surface p-6 rounded-2xl border border-white/5 flex items-center gap-6">
          <div class="w-20 h-20 rounded-full bg-white/10 overflow-hidden shrink-0">
            <!-- Mock Avatar -->
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop" alt="Director" class="w-full h-full object-cover" />
          </div>
          <div>
            <p class="text-sm text-brand-secondary mb-1">Directed by</p>
            <h4 class="text-xl font-heading font-bold text-white mb-2">{{ movie.director }}</h4>
            <NuxtLink to="/creator/c1" class="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              View Profile &rarr;
            </NuxtLink>
          </div>
        </section>
      </div>

      <div class="space-y-6 text-sm">
        <div>
          <span class="text-gray-500 block mb-1">Genres</span>
          <div class="flex flex-wrap gap-2">
            <span v-for="genre in movie.genre" :key="genre" class="text-gray-200 hover:text-white cursor-pointer">{{ genre }}</span>
          </div>
        </div>
        <div>
          <span class="text-gray-500 block mb-1">Audio Languages</span>
          <span class="text-gray-200">English, Japanese, Spanish</span>
        </div>
        <div>
          <span class="text-gray-500 block mb-1">Subtitles</span>
          <span class="text-gray-200">English, Spanish, French, German</span>
        </div>
      </div>
    </div>

    <!-- Similar Movies -->
    <div class="mt-20">
      <MovieRow title="More Like This" :movies="similarMovies" />
    </div>
  </div>
  
  <!-- Loading State -->
  <div v-else class="h-screen flex items-center justify-center">
    <span class="loading loading-spinner loading-lg text-brand-primary"></span>
  </div>
</template>
