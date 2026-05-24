<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Filter, MapPin, Briefcase, Star, MessageSquare, ChevronRight, CheckCircle } from 'lucide-vue-next'

const categories = ['All', 'Directors', 'Cinematographers', 'Editors', 'Actors', 'Composers', 'VFX Artists']
const activeCategory = ref('All')

// Mock Talent Data
const talents = ref([
  {
    id: 1,
    name: 'Elena Rostova',
    role: 'Cinematographer',
    location: 'Berlin, DE',
    rate: '$500/day',
    availability: 'Available Next Month',
    verified: true,
    rating: 4.9,
    projects: 34,
    skills: ['RED Camera', 'Low-light', 'Drone'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Director',
    location: 'Los Angeles, CA',
    rate: '$1200/day',
    availability: 'Currently Busy',
    verified: true,
    rating: 4.8,
    projects: 12,
    skills: ['Sci-Fi', 'Commercial', 'Action'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    role: 'Editor',
    location: 'Remote',
    rate: '$400/day',
    availability: 'Available Now',
    verified: false,
    rating: 4.7,
    projects: 89,
    skills: ['Premiere Pro', 'DaVinci Resolve', 'Color Grading'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'David Okafor',
    role: 'Composer',
    location: 'London, UK',
    rate: '$1000/project',
    availability: 'Available Now',
    verified: true,
    rating: 5.0,
    projects: 45,
    skills: ['Orchestral', 'Synthwave', 'Sound Design'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop'
  }
])

const jobs = ref([
  {
    id: 1,
    title: 'Looking for a Lead Actor (Sci-Fi Short)',
    budget: '$2000 Flat',
    location: 'Toronto, Canada',
    type: 'Actors',
    urgency: 'High',
    posted: '2 hours ago'
  },
  {
    id: 2,
    title: 'VFX Artist needed for 30s sequence',
    budget: '$500 - $800',
    location: 'Remote',
    type: 'VFX Artists',
    urgency: 'Medium',
    posted: '5 hours ago'
  }
])

const filteredTalents = computed(() => {
  if (activeCategory.value === 'All') return talents.value
  return talents.value.filter(t => t.role === activeCategory.value || t.role.includes(activeCategory.value.slice(0,-1)))
})
</script>

<template>
  <div class="min-h-screen pt-32 pb-20 bg-brand-void text-white">
    <div class="container mx-auto px-4 md:px-8 max-w-7xl">
      
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl md:text-6xl font-heading font-extrabold mb-4 text-shadow-glow">Movevie Collab Network</h1>
        <p class="text-xl text-gray-400 max-w-3xl">
          Connect with world-class independent filmmakers. Hire talent, find gigs, and create your next masterpiece together.
        </p>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Sidebar (Filters) -->
        <aside class="lg:col-span-3 space-y-8">
          
          <!-- Search -->
          <div class="relative">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search skills, names..." 
              class="w-full bg-brand-surface border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-brand-primary transition-colors text-white"
            />
          </div>

          <!-- Categories -->
          <div>
            <h3 class="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Filter class="w-4 h-4 text-brand-secondary" /> Disciplines
            </h3>
            <div class="flex flex-col gap-2">
              <button 
                v-for="cat in categories" 
                :key="cat"
                @click="activeCategory = cat"
                :class="[
                  'text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300',
                  activeCategory === cat ? 'bg-brand-primary text-white box-shadow-glow' : 'hover:bg-white/5 text-gray-400 hover:text-white'
                ]"
              >
                {{ cat }}
              </button>
            </div>
          </div>
          
          <!-- Job Board Promo -->
          <div class="p-6 bg-gradient-to-br from-brand-surface to-brand-surface-hover border border-brand-primary/30 rounded-2xl relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-[50px] group-hover:bg-brand-primary/40 transition-colors duration-500"></div>
            <h3 class="font-heading font-bold text-xl mb-2 relative z-10">Post a Job</h3>
            <p class="text-sm text-gray-400 mb-6 relative z-10">Looking for crew? Post your project details and reach 50,000+ creators.</p>
            <button class="btn btn-sm bg-brand-primary hover:bg-brand-primary/90 text-white border-none w-full relative z-10">Create Listing</button>
          </div>
        </aside>

        <!-- Right Content (Talent Grid & Jobs) -->
        <div class="lg:col-span-9 space-y-12">
          
          <!-- Talent Grid -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-heading font-bold">Featured Creators</h2>
              <span class="text-sm text-gray-400">{{ filteredTalents.length }} results</span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="talent in filteredTalents" 
                :key="talent.id"
                class="bg-brand-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 transform-gpu hover:-translate-y-1 hover:shadow-2xl group relative"
              >
                <!-- Cover Image -->
                <div class="h-32 w-full relative">
                  <img :src="talent.cover" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent"></div>
                  
                  <div class="absolute top-4 right-4 flex gap-2">
                    <span class="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold">{{ talent.rate }}</span>
                  </div>
                </div>

                <!-- Avatar & Info -->
                <div class="px-6 pb-6 relative">
                  <div class="flex justify-between items-end -mt-10 mb-4">
                    <div class="w-20 h-20 rounded-xl border-4 border-brand-surface overflow-hidden shadow-xl relative">
                      <img :src="talent.avatar" class="w-full h-full object-cover" />
                      <div v-if="talent.verified" class="absolute bottom-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-brand-surface">
                        <CheckCircle class="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <button class="btn btn-sm btn-circle bg-white/5 hover:bg-white/20 border-none text-white">
                      <MessageSquare class="w-4 h-4" />
                    </button>
                  </div>

                  <h3 class="font-heading font-bold text-xl flex items-center gap-2">
                    {{ talent.name }}
                  </h3>
                  <p class="text-brand-secondary text-sm font-medium mb-4">{{ talent.role }}</p>

                  <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                    <span class="flex items-center gap-1"><MapPin class="w-4 h-4" /> {{ talent.location }}</span>
                    <span class="flex items-center gap-1"><Star class="w-4 h-4 text-yellow-500 fill-current" /> {{ talent.rating }}</span>
                    <span class="flex items-center gap-1"><Briefcase class="w-4 h-4" /> {{ talent.projects }} Projects</span>
                  </div>

                  <!-- Skills Tags -->
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="skill in talent.skills" 
                      :key="skill"
                      class="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-300 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Job Board Preview -->
          <section class="mt-16 pt-16 border-t border-white/5">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-heading font-bold">Latest Opportunities</h2>
              <a href="#" class="text-brand-secondary text-sm font-medium hover:underline flex items-center">View All Jobs <ChevronRight class="w-4 h-4 ml-1" /></a>
            </div>

            <div class="space-y-4">
              <div 
                v-for="job in jobs" 
                :key="job.id"
                class="p-5 bg-brand-surface/50 border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-brand-surface transition-colors cursor-pointer"
              >
                <div>
                  <div class="flex items-center gap-3 mb-2">
                    <span 
                      :class="[
                        'px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider',
                        job.urgency === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
                      ]"
                    >
                      {{ job.urgency }} URGENCY
                    </span>
                    <span class="text-xs text-gray-500">{{ job.posted }}</span>
                  </div>
                  <h4 class="font-bold text-lg text-white mb-1">{{ job.title }}</h4>
                  <div class="flex items-center gap-4 text-sm text-gray-400">
                    <span class="flex items-center gap-1"><MapPin class="w-4 h-4" /> {{ job.location }}</span>
                    <span class="flex items-center gap-1 text-green-400"><Briefcase class="w-4 h-4" /> {{ job.budget }}</span>
                  </div>
                </div>
                <button class="btn btn-outline btn-sm text-white hover:bg-white hover:text-black shrink-0">
                  Apply Now
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  </div>
</template>
