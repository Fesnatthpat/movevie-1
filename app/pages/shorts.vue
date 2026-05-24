<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { Heart, MessageCircle, Share2, Bookmark, Music, Play, Pause, MoreVertical } from 'lucide-vue-next'

definePageMeta({
  layout: false // Use custom fullscreen layout for shorts
})

const { data: movies } = await useFetch('/api/movies')

// Real vertical shorts using movie data and actual video URLs
const shorts = computed(() => {
  return movies.value?.slice(0, 5).map(m => ({
    id: m.id,
    title: m.title,
    creator: m.director, // Fixed from m.creator to m.director
    description: m.synopsis,
    videoUrl: m.videoUrl, // Real Video URL
    videoPoster: m.thumbnail, 
    likes: Math.floor(Math.random() * 50) + 10 + 'K',
    comments: Math.floor(Math.random() * 5) + 1 + 'K',
    music: `Original Sound - ${m.director}`
  })) || []
})

const activeIndex = ref(0)
const containerRef = ref<HTMLElement | null>(null)
const isPlaying = ref(true)

const handleScroll = () => {
  if (!containerRef.value) return
  const scrollPosition = containerRef.value.scrollTop
  const windowHeight = window.innerHeight
  const newIndex = Math.round(scrollPosition / windowHeight)
  
  if (newIndex !== activeIndex.value) {
    activeIndex.value = newIndex
    isPlaying.value = true // Auto-play when swiping to new short
  }
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

// Watch for play/pause state and control the actual DOM video element
watch(isPlaying, async (val) => {
  await nextTick()
  const video = document.getElementById(`short-video-${activeIndex.value}`) as HTMLVideoElement
  if (video) {
    if (val) {
      video.play().catch(e => console.log('Autoplay blocked:', e))
    } else {
      video.pause()
    }
  }
})
</script>

<template>
  <div class="bg-black w-full h-screen overflow-hidden relative text-white font-body">
    
    <!-- Top Navigation Overlay -->
    <div class="absolute top-0 left-0 w-full p-6 z-50 flex items-center justify-between pointer-events-none">
      <NuxtLink to="/" class="text-2xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2 group pointer-events-auto">
        <span class="text-brand-primary text-shadow-glow">M</span>O<span class="text-brand-secondary group-hover:text-white transition-colors">V</span>
      </NuxtLink>
      <div class="flex items-center gap-6 font-semibold pointer-events-auto">
        <span class="text-gray-400 hover:text-white cursor-pointer transition-colors">Following</span>
        <span class="text-white border-b-2 border-brand-primary pb-1">For You</span>
      </div>
      <button class="pointer-events-auto">
        <MoreVertical class="w-6 h-6 text-white" />
      </button>
    </div>

    <!-- Vertical Snap Scroll Container -->
    <div 
      ref="containerRef"
      class="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      @scroll="handleScroll"
    >
      <!-- Individual Short Section -->
      <section 
        v-for="(short, index) in shorts" 
        :key="short.id"
        class="w-full h-screen snap-always snap-center relative flex items-center justify-center bg-brand-surface"
      >
        
        <!-- Real Video Background -->
        <div class="absolute inset-0 w-full h-full cursor-pointer" @click="togglePlay">
          
          <!-- Only render the actual <video> tag if it's the active one to save memory and avoid overlap -->
          <video 
            v-if="index === activeIndex"
            :id="`short-video-${index}`"
            :src="short.videoUrl"
            :poster="short.videoPoster"
            class="w-full h-full object-cover transition-transform duration-1000"
            :class="isPlaying ? 'scale-105' : 'scale-100'"
            autoplay
            loop
            playsinline
          ></video>
          
          <!-- Show poster for non-active items -->
          <img 
            v-else
            :src="short.videoPoster" 
            :alt="short.title"
            class="w-full h-full object-cover scale-100"
          />

          <!-- Dark Overlays for Text Legibility -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 pointer-events-none"></div>
        </div>

        <!-- Play/Pause Indicator (Fades out) -->
        <div 
          v-if="!isPlaying && index === activeIndex" 
          class="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          <div class="w-20 h-20 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
            <Play class="w-10 h-10 text-white fill-white ml-2" />
          </div>
        </div>

        <!-- Content Overlay -->
        <div class="absolute inset-0 w-full h-full pointer-events-none z-30 flex flex-col justify-end p-6 md:p-12 pb-24 md:pb-12">
          <div class="flex items-end justify-between w-full max-w-6xl mx-auto gap-4">
            
            <!-- Left Info (Title, Creator, Desc) -->
            <div class="flex-1 max-w-lg pointer-events-auto">
              <NuxtLink :to="`/creator/${short.creator.replace(/\s+/g, '-').toLowerCase()}`" class="flex items-center gap-3 mb-4 group inline-flex">
                <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-primary transition-colors">
                  <img :src="`https://ui-avatars.com/api/?name=${short.creator}&background=random`" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 class="font-bold text-lg leading-tight group-hover:text-brand-primary transition-colors">{{ short.creator }}</h3>
                  <span class="text-xs text-brand-secondary font-medium tracking-wider uppercase">Pro Creator</span>
                </div>
              </NuxtLink>
              
              <h2 class="text-3xl font-heading font-extrabold mb-2 text-shadow-glow">{{ short.title }}</h2>
              <p class="text-sm text-gray-300 line-clamp-2 mb-4 leading-relaxed">{{ short.description }}</p>
              
              <div class="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full w-max text-sm text-white font-medium border border-white/5">
                <Music class="w-4 h-4 animate-spin-slow" style="animation-duration: 4s;" />
                <span class="marquee">{{ short.music }}</span>
              </div>
            </div>

            <!-- Right Actions (Floating Interaction Bar) -->
            <div class="flex flex-col items-center gap-6 pb-4 pointer-events-auto">
              <div class="flex flex-col items-center gap-1 group">
                <button class="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 hover:scale-110 transition-all transform-gpu">
                  <Heart class="w-6 h-6 group-hover:fill-brand-primary group-hover:text-brand-primary transition-colors" />
                </button>
                <span class="text-xs font-semibold">{{ short.likes }}</span>
              </div>

              <div class="flex flex-col items-center gap-1 group">
                <button class="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 hover:scale-110 transition-all transform-gpu">
                  <MessageCircle class="w-6 h-6 group-hover:fill-white transition-colors" />
                </button>
                <span class="text-xs font-semibold">{{ short.comments }}</span>
              </div>

              <div class="flex flex-col items-center gap-1 group">
                <button class="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 hover:scale-110 transition-all transform-gpu">
                  <Bookmark class="w-6 h-6 group-hover:fill-brand-secondary group-hover:text-brand-secondary transition-colors" />
                </button>
                <span class="text-xs font-semibold">Save</span>
              </div>

              <div class="flex flex-col items-center gap-1 group">
                <button class="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 hover:scale-110 transition-all transform-gpu">
                  <Share2 class="w-6 h-6 group-hover:text-brand-primary transition-colors" />
                </button>
                <span class="text-xs font-semibold">Share</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
