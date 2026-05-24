<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Play, Pause, Maximize, Volume2, VolumeX, Settings, SkipForward, Rewind } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: false
})

const route = useRoute()
const { data: movie } = await useFetch(`/api/movies/${route.params.id}`)

const videoPlayer = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const volume = ref(1) // 0 to 1
const progress = ref(0)
const currentTime = ref('0:00')
const duration = ref('0:00')
const showControls = ref(true)

// Advanced Settings
const showSettings = ref(false)
const playbackSpeed = ref(1)
const quality = ref('1080p')
const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]
const qualities = ['4K', '1080p', '720p', '480p']

let controlsTimeout: ReturnType<typeof setTimeout>

const togglePlay = () => {
  if (videoPlayer.value) {
    if (isPlaying.value) {
      videoPlayer.value.pause()
    } else {
      videoPlayer.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const toggleMute = () => {
  if (videoPlayer.value) {
    videoPlayer.value.muted = !videoPlayer.value.muted
    isMuted.value = videoPlayer.value.muted
    if (isMuted.value) volume.value = 0
    else volume.value = videoPlayer.value.volume || 1
  }
}

const updateVolume = () => {
  if (videoPlayer.value) {
    videoPlayer.value.volume = volume.value
    isMuted.value = volume.value === 0
    videoPlayer.value.muted = isMuted.value
  }
}

const changeVolume = (amount: number) => {
  let newVol = volume.value + amount
  if (newVol > 1) newVol = 1
  if (newVol < 0) newVol = 0
  volume.value = newVol
  updateVolume()
}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

const skip = (seconds: number) => {
  if (videoPlayer.value) {
    videoPlayer.value.currentTime += seconds
  }
}

const setPlaybackSpeed = (speed: number) => {
  playbackSpeed.value = speed
  if (videoPlayer.value) {
    videoPlayer.value.playbackRate = speed
  }
  showSettings.value = false
}

const setQuality = (q: string) => {
  quality.value = q
  // In a real app, this would change the HLS/DASH manifest or video source stream
  showSettings.value = false
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const updateProgress = () => {
  if (videoPlayer.value) {
    const value = (videoPlayer.value.currentTime / videoPlayer.value.duration) * 100
    progress.value = isNaN(value) ? 0 : value
    currentTime.value = formatTime(videoPlayer.value.currentTime)
  }
}

const handleSeek = (event: MouseEvent) => {
  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const pos = (event.clientX - rect.left) / rect.width
  if (videoPlayer.value) {
    videoPlayer.value.currentTime = pos * videoPlayer.value.duration
  }
}

const handleLoadedMetadata = () => {
  if (videoPlayer.value) {
    duration.value = formatTime(videoPlayer.value.duration)
    videoPlayer.value.volume = volume.value
  }
}

const handleMouseMove = () => {
  showControls.value = true
  clearTimeout(controlsTimeout)
  controlsTimeout = setTimeout(() => {
    if (isPlaying.value && !showSettings.value) {
      showControls.value = false
    }
  }, 3000)
}

const handleKeydown = (e: KeyboardEvent) => {
  // Prevent defaults for arrows & space so the page doesn't scroll
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
    e.preventDefault()
  }

  switch (e.key.toLowerCase()) {
    case ' ':
      togglePlay()
      break
    case 'arrowright':
      skip(10)
      break
    case 'arrowleft':
      skip(-10)
      break
    case 'arrowup':
      changeVolume(0.1)
      break
    case 'arrowdown':
      changeVolume(-0.1)
      break
    case 'm':
      toggleMute()
      break
    case 'f':
      toggleFullScreen()
      break
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('keydown', handleKeydown)
  clearTimeout(controlsTimeout)
})
</script>

<template>
  <NuxtLayout name="theater">
    <template #header>
      <h2 v-if="movie" class="text-xl font-heading font-bold text-white">{{ movie.title }}</h2>
    </template>

    <div class="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <video 
        ref="videoPlayer"
        class="w-full h-full object-contain"
        :src="movie?.videoUrl"
        @timeupdate="updateProgress"
        @loadedmetadata="handleLoadedMetadata"
        @click="togglePlay"
        @ended="isPlaying = false"
      ></video>

      <!-- Custom Controls Overlay -->
      <div 
        :class="[
          'absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-16 pb-6 px-6 transition-opacity duration-500 ease-cinematic',
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        ]"
      >
        <!-- Progress Bar -->
        <div 
          class="w-full h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer relative group transition-all hover:h-2"
          @click="handleSeek"
        >
          <!-- Hover preview mockup could go here -->
          <div class="h-full bg-brand-primary rounded-full relative pointer-events-none" :style="{ width: `${progress}%` }">
            <div class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform box-shadow-glow"></div>
          </div>
        </div>

        <div class="flex items-center justify-between text-white">
          <!-- Left Controls -->
          <div class="flex items-center gap-4 md:gap-6">
            <button @click="togglePlay" class="hover:text-brand-primary transition-colors transform-gpu hover:scale-110">
              <Play v-if="!isPlaying" class="w-8 h-8 fill-current" />
              <Pause v-else class="w-8 h-8 fill-current" />
            </button>

            <button @click="skip(-10)" class="hover:text-white text-gray-300 transition-colors transform-gpu hover:scale-110">
              <Rewind class="w-6 h-6" />
            </button>
            
            <button @click="skip(10)" class="hover:text-white text-gray-300 transition-colors transform-gpu hover:scale-110">
              <SkipForward class="w-6 h-6" />
            </button>

            <div class="flex items-center gap-3 group/volume">
              <button @click="toggleMute" class="hover:text-white text-gray-300 transition-colors transform-gpu hover:scale-110">
                <VolumeX v-if="isMuted || volume === 0" class="w-6 h-6" />
                <Volume2 v-else class="w-6 h-6" />
              </button>
              
              <!-- Volume Slider -->
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                v-model.number="volume" 
                @input="updateVolume"
                class="w-0 md:w-24 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer transition-all duration-300 opacity-0 group-hover/volume:opacity-100 md:opacity-100 md:w-24"
                style="accent-color: #E50914;"
              />
            </div>

            <div class="text-sm font-medium text-gray-300 font-mono tracking-wider ml-2">
              {{ currentTime }} <span class="text-gray-500 mx-1">/</span> {{ duration }}
            </div>
          </div>

          <!-- Title Center (Optional) -->
          <div class="hidden lg:block font-heading font-semibold text-lg text-gray-200 tracking-wide text-shadow-glow">
            {{ movie?.title }}
          </div>

          <!-- Right Controls -->
          <div class="flex items-center gap-4 md:gap-6 relative">
            
            <!-- Settings Dropdown -->
            <div class="relative">
              <button @click="showSettings = !showSettings" class="hover:text-white text-gray-300 transition-colors transform-gpu hover:rotate-90 duration-300">
                <Settings class="w-6 h-6" />
              </button>
              
              <div v-if="showSettings" class="absolute bottom-full right-0 mb-6 w-48 bg-glass-heavy border border-white/10 rounded-xl p-3 shadow-2xl z-50 animate-fade-in-up">
                
                <div class="mb-3">
                  <p class="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2 px-2">Speed</p>
                  <div class="grid grid-cols-3 gap-1">
                    <button 
                      v-for="speed in speeds" 
                      :key="speed"
                      @click="setPlaybackSpeed(speed)"
                      :class="[
                        'text-xs py-1 rounded transition-colors',
                        playbackSpeed === speed ? 'bg-brand-primary text-white font-bold' : 'hover:bg-white/10 text-gray-300'
                      ]"
                    >
                      {{ speed }}x
                    </button>
                  </div>
                </div>

                <div class="divider my-2 before:bg-white/10 after:bg-white/10"></div>

                <div>
                  <p class="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2 px-2">Quality</p>
                  <div class="flex flex-col gap-1">
                    <button 
                      v-for="q in qualities" 
                      :key="q"
                      @click="setQuality(q)"
                      :class="[
                        'text-left text-sm py-1.5 px-3 rounded flex items-center justify-between transition-colors',
                        quality === q ? 'bg-brand-secondary/20 text-brand-secondary font-semibold' : 'hover:bg-white/10 text-gray-300'
                      ]"
                    >
                      {{ q }}
                      <span v-if="quality === q" class="w-1.5 h-1.5 rounded-full bg-brand-secondary box-shadow-glow-cyan"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button @click="toggleFullScreen" class="hover:text-white text-gray-300 transition-colors transform-gpu hover:scale-110">
              <Maximize class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
/* Keyframe for Settings Popup */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

/* Custom Slider thumb */
input[type=range] {
  -webkit-appearance: none;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(229, 9, 20, 0.5);
}
</style>
