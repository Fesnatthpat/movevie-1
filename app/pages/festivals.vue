<script setup lang="ts">
import { Calendar, MapPin, Award, ArrowRight } from 'lucide-vue-next'

const festivals = [
  {
    id: 1,
    name: 'Neo-Cinema Vanguard Festival',
    location: 'Tokyo, Japan (Hybrid)',
    date: 'August 15-20, 2026',
    image: 'https://images.unsplash.com/photo-1540656644212-054238e88ab9?q=80&w=800&auto=format&fit=crop',
    status: 'Submissions Open',
    daysLeft: 12,
    description: 'Celebrating futuristic, sci-fi, and experimental short films that push the boundaries of storytelling.'
  },
  {
    id: 2,
    name: 'Global Indie Shorts Showcase',
    location: 'Berlin, Germany',
    date: 'October 5-10, 2026',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop',
    status: 'Submissions Closed',
    daysLeft: 0,
    description: 'A premier European festival highlighting raw, emotional, and authentic independent cinema.'
  }
]
</script>

<template>
  <div class="pt-24 pb-20 container mx-auto px-4 md:px-8">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      <div>
        <h1 class="text-4xl font-heading font-bold text-white mb-2">Film Festivals</h1>
        <p class="text-gray-400 max-w-2xl">Discover, submit to, and attend the world's most prestigious short film festivals directly through Movevie.</p>
      </div>
      <button class="btn btn-outline border-white/20 text-white hover:bg-white/10 shrink-0">
        My Submissions
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div 
        v-for="festival in festivals" 
        :key="festival.id"
        class="bg-brand-surface rounded-3xl overflow-hidden border border-white/5 flex flex-col md:flex-row group transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
      >
        <div class="md:w-2/5 h-64 md:h-auto relative overflow-hidden shrink-0">
          <img :src="festival.image" :alt="festival.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden"></div>
        </div>
        
        <div class="p-6 md:p-8 flex-1 flex flex-col">
          <div class="flex items-start justify-between mb-4">
            <span 
              :class="[
                'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                festival.daysLeft > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              ]"
            >
              {{ festival.status }}
            </span>
            <span v-if="festival.daysLeft > 0" class="text-sm font-medium text-brand-secondary flex items-center gap-1">
              <Calendar class="w-4 h-4" /> {{ festival.daysLeft }} days left
            </span>
          </div>

          <h3 class="text-2xl font-heading font-bold text-white mb-2">{{ festival.name }}</h3>
          
          <div class="space-y-2 mb-4">
            <p class="text-gray-300 text-sm flex items-center gap-2">
              <MapPin class="w-4 h-4 text-gray-500" /> {{ festival.location }}
            </p>
            <p class="text-gray-300 text-sm flex items-center gap-2">
              <Calendar class="w-4 h-4 text-gray-500" /> {{ festival.date }}
            </p>
          </div>

          <p class="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
            {{ festival.description }}
          </p>

          <button 
            :disabled="festival.daysLeft === 0"
            class="btn w-full flex items-center justify-center gap-2"
            :class="festival.daysLeft > 0 ? 'bg-white text-black hover:bg-gray-200 border-none' : 'btn-disabled bg-white/5 text-gray-500'"
          >
            Submit Film <ArrowRight v-if="festival.daysLeft > 0" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
