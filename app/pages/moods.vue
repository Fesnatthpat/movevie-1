<script setup lang="ts">
import { ref, computed } from 'vue'
import { Sparkles, X } from 'lucide-vue-next'

const { data: movies } = await useFetch('/api/movies')

interface Mood {
  id: string
  name: string
  color1: string
  color2: string
  shadow: string
}

const moods: Mood[] = [
  { id: 'cyberpunk', name: 'Cyberpunk', color1: '#00F0FF', color2: '#FF003C', shadow: 'rgba(0, 240, 255, 0.4)' },
  { id: 'dark', name: 'Dark & Gritty', color1: '#1A0000', color2: '#E50914', shadow: 'rgba(229, 9, 20, 0.4)' },
  { id: 'emotional', name: 'Emotional', color1: '#1E3A8A', color2: '#4C1D95', shadow: 'rgba(76, 29, 149, 0.4)' },
  { id: 'suspense', name: 'Suspenseful', color1: '#064E3B', color2: '#111827', shadow: 'rgba(6, 78, 59, 0.4)' },
  { id: 'happy', name: 'Feel Good', color1: '#FF7A00', color2: '#FFD700', shadow: 'rgba(255, 122, 0, 0.4)' },
  { id: 'lonely', name: 'Lonely', color1: '#374151', color2: '#0891B2', shadow: 'rgba(8, 145, 178, 0.4)' },
  { id: 'inspirational', name: 'Inspirational', color1: '#38BDF8', color2: '#F8FAFC', shadow: 'rgba(56, 189, 248, 0.4)' }
]

const hoveredMood = ref<Mood | null>(null)
const selectedMood = ref<Mood | null>(null)
const isAnalyzing = ref(false)

const activeMood = computed(() => selectedMood.value || hoveredMood.value || null)

const backgroundStyle = computed(() => {
  if (activeMood.value) {
    return {
      background: `radial-gradient(circle at 50% 50%, ${activeMood.value.color1} 0%, ${activeMood.value.color2} 50%, #050505 100%)`,
      opacity: hoveredMood.value && !selectedMood.value ? 0.3 : (selectedMood.value ? 0.15 : 0)
    }
  }
  return { background: 'transparent', opacity: 0 }
})

const selectMood = (mood: Mood) => {
  if (selectedMood.value === mood) return
  isAnalyzing.value = true
  selectedMood.value = mood
  
  // Simulate AI analysis delay
  setTimeout(() => {
    isAnalyzing.value = false
  }, 1500)
}

const clearSelection = () => {
  selectedMood.value = null
}

const recommendedMovies = computed(() => {
  if (!movies.value) return []
  // Mock logic: Shuffle movies array to simulate AI recommendations
  const shuffled = [...movies.value].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 6)
})
</script>

<template>
  <div class="min-h-screen pt-32 pb-20 relative overflow-hidden flex flex-col items-center">
    
    <!-- Dynamic Ambient Background -->
    <div 
      class="absolute inset-0 transition-all duration-1000 ease-cinematic z-0 pointer-events-none"
      :style="backgroundStyle"
    ></div>
    
    <!-- Heavy Vignette -->
    <div class="absolute inset-0 bg-brand-void/80 z-0 pointer-events-none mix-blend-multiply"></div>

    <div class="container mx-auto px-4 relative z-10 w-full max-w-6xl">
      
      <!-- Header -->
      <div class="text-center mb-16 transition-all duration-700 transform-gpu" :class="selectedMood ? 'scale-90 opacity-70 mb-8' : 'scale-100 opacity-100'">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
          <Sparkles class="w-4 h-4 text-brand-secondary" />
          <span class="text-sm font-medium tracking-widest uppercase text-gray-300">AI Mood Engine</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-4 text-shadow-glow transition-colors duration-500" :style="{ color: selectedMood ? selectedMood.color1 : 'white' }">
          {{ selectedMood ? `Feeling ${selectedMood.name}` : 'How do you want to feel?' }}
        </h1>
        <p v-if="!selectedMood" class="text-xl text-gray-400 max-w-2xl mx-auto">
          Let our cinematic AI curate the perfect experience based on your current emotional state.
        </p>
      </div>

      <!-- Mood Selection List -->
      <div 
        class="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 transition-all duration-700"
        :class="selectedMood ? 'opacity-0 h-0 overflow-hidden pointer-events-none scale-95' : 'opacity-100 h-auto scale-100'"
      >
        <button
          v-for="mood in moods"
          :key="mood.id"
          @mouseenter="hoveredMood = mood"
          @mouseleave="hoveredMood = null"
          @click="selectMood(mood)"
          class="group relative px-8 py-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 transform-gpu hover:scale-110 hover:-translate-y-2 overflow-hidden"
        >
          <div 
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            :style="{ background: `linear-gradient(45deg, ${mood.color1}, ${mood.color2})` }"
          ></div>
          <span class="relative z-10 text-xl font-heading font-bold text-gray-300 group-hover:text-white transition-colors duration-300">
            {{ mood.name }}
          </span>
        </button>
      </div>

      <!-- AI Analysis Loader -->
      <div v-if="isAnalyzing" class="flex flex-col items-center justify-center py-20 animate-fade-in-up">
        <div class="relative w-24 h-24 mb-8 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-t-2 border-r-2 border-brand-secondary animate-spin" style="animation-duration: 3s;"></div>
          <div class="absolute inset-2 rounded-full border-b-2 border-l-2 border-brand-primary animate-spin" style="animation-duration: 2s; animation-direction: reverse;"></div>
          <Sparkles class="w-8 h-8 text-white animate-pulse" />
        </div>
        <h3 class="text-2xl font-heading font-bold text-white mb-2">Analyzing Mood Matrix...</h3>
        <p class="text-gray-400">Curating the perfect cinematic journey</p>
      </div>

      <!-- Results Grid -->
      <div v-if="selectedMood && !isAnalyzing" class="animate-fade-in-up">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-heading font-bold text-white">Recommended for You</h2>
          <button @click="clearSelection" class="btn btn-ghost btn-sm text-gray-400 hover:text-white group">
            <X class="w-4 h-4 mr-2 transform group-hover:rotate-90 transition-transform" /> Start Over
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MovieCard 
            v-for="(movie, index) in recommendedMovies" 
            :key="movie.id" 
            :movie="movie" 
            :class="`delay-${index * 100}`"
            class="animate-fade-in-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  opacity: 0;
}
</style>
