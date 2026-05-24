<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Users, Send, Heart, Flame, Star, Ticket } from 'lucide-vue-next'

// Mock Data for Premiere
const premiereMovie = {
  title: 'Neon Odyssey',
  director: 'Marcus Chen',
  thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&auto=format&fit=crop',
  attendees: 12450
}

// Countdown Logic
const countdown = ref('00:00:00')
let countdownInterval: ReturnType<typeof setInterval>

const calculateTimeLeft = () => {
  // Mock premiere time (e.g. 5 minutes from now)
  const difference = +new Date(Date.now() + 5 * 60000) - +new Date()
  let timeLeft = {}

  if (difference > 0) {
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / 1000 / 60) % 60)
    const seconds = Math.floor((difference / 1000) % 60)
    
    countdown.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  } else {
    countdown.value = "LIVE NOW"
  }
}

// Chat Mockup
const chatMessages = ref([
  { id: 1, user: 'Alex', text: 'So hyped for this!!', isCreator: false },
  { id: 2, user: 'SarahTheFilmGeek', text: 'The cinematography looks insane from the trailer.', isCreator: false },
  { id: 3, user: 'Marcus Chen', text: 'Welcome everyone! We start in 5 minutes! 🎬', isCreator: true }
])
const newMessage = ref('')

const sendMessage = () => {
  if (newMessage.value.trim()) {
    chatMessages.value.push({
      id: Date.now(),
      user: 'You',
      text: newMessage.value,
      isCreator: false
    })
    newMessage.value = ''
    scrollToBottom()
  }
}

const chatContainer = ref<HTMLElement | null>(null)
const scrollToBottom = () => {
  setTimeout(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }, 50)
}

// Reaction Mockup
const reactions = ref<{ id: number, emoji: string, x: number }[]>([])
const sendReaction = (emoji: string) => {
  reactions.value.push({
    id: Date.now(),
    emoji,
    x: Math.random() * 80 + 10 // random horizontal position 10% to 90%
  })
  
  // Remove reaction after animation
  setTimeout(() => {
    reactions.value.shift()
  }, 2000)
}

// Auto-simulate chat
let chatInterval: ReturnType<typeof setInterval>
const mockUsers = ['FilmNerd99', 'Cinephile', 'DirectorGuy', 'EmmaVisuals']
const mockTexts = ['Woah!', 'Can\'t wait', 'Let\'s goooo', '🍿🍿🍿', 'Is the audio working?']

onMounted(() => {
  calculateTimeLeft()
  countdownInterval = setInterval(calculateTimeLeft, 1000)
  
  chatInterval = setInterval(() => {
    if (Math.random() > 0.5) {
      chatMessages.value.push({
        id: Date.now(),
        user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
        text: mockTexts[Math.floor(Math.random() * mockTexts.length)],
        isCreator: false
      })
      scrollToBottom()
    }
    
    // Simulate others reacting
    if (Math.random() > 0.7) {
      sendReaction(['❤️', '🔥', '⭐'][Math.floor(Math.random() * 3)])
    }
  }, 2000)
})

onUnmounted(() => {
  clearInterval(countdownInterval)
  clearInterval(chatInterval)
})
</script>

<template>
  <div class="h-screen pt-20 pb-0 overflow-hidden flex flex-col md:flex-row bg-black">
    
    <!-- Left: Premiere Screen -->
    <div class="flex-1 relative bg-brand-void flex flex-col items-center justify-center overflow-hidden border-r border-white/5">
      
      <!-- Ambient Background -->
      <div class="absolute inset-0 w-full h-full">
        <img :src="premiereMovie.thumbnail" class="w-full h-full object-cover opacity-30 blur-xl" />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center text-center p-8 w-full max-w-4xl">
        
        <div class="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 backdrop-blur-md mb-8 text-brand-primary font-bold tracking-widest uppercase">
          <span class="w-2 h-2 rounded-full bg-brand-primary animate-pulse box-shadow-glow"></span>
          World Premiere
        </div>

        <h1 class="text-5xl md:text-8xl font-heading font-extrabold text-white mb-4 text-shadow-glow tracking-tight">
          {{ premiereMovie.title }}
        </h1>
        <p class="text-xl md:text-2xl text-gray-400 mb-16 font-medium">Directed by {{ premiereMovie.director }}</p>

        <!-- Countdown Timer -->
        <div class="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 box-shadow-glow-cyan">
          <div class="text-6xl md:text-9xl font-heading font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {{ countdown }}
          </div>
          <div class="text-gray-400 font-bold tracking-[0.3em] uppercase mt-4 text-sm md:text-base">
            Until Showtime
          </div>
        </div>

        <!-- Virtual Ticket -->
        <div class="mt-16 flex items-center justify-center gap-4 text-gray-400">
          <Ticket class="w-5 h-5 text-brand-secondary" />
          <span>You have reserved your virtual seat. Grab some popcorn!</span>
        </div>

      </div>

      <!-- Floating Reactions Overlay -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div 
          v-for="reaction in reactions" 
          :key="reaction.id"
          class="absolute bottom-0 text-4xl animate-float-up"
          :style="{ left: `${reaction.x}%` }"
        >
          {{ reaction.emoji }}
        </div>
      </div>
    </div>

    <!-- Right: Live Chat -->
    <div class="w-full md:w-96 bg-brand-surface-hover flex flex-col h-[40vh] md:h-full relative z-30 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
      
      <!-- Chat Header -->
      <div class="p-4 border-b border-white/5 bg-brand-surface flex items-center justify-between z-10">
        <h3 class="font-bold text-white flex items-center gap-2">
          Live Chat
        </h3>
        <div class="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
          <Users class="w-3.5 h-3.5" /> {{ premiereMovie.attendees.toLocaleString() }}
        </div>
      </div>

      <!-- Chat Messages -->
      <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <div 
          v-for="msg in chatMessages" 
          :key="msg.id"
          class="animate-fade-in-up text-sm"
        >
          <span 
            :class="[
              'font-bold mr-2',
              msg.isCreator ? 'text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded text-xs tracking-wider uppercase' : (msg.user === 'You' ? 'text-brand-primary' : 'text-gray-400')
            ]"
          >
            {{ msg.user }}
          </span>
          <span class="text-gray-200 leading-relaxed">{{ msg.text }}</span>
        </div>
      </div>

      <!-- Chat Input & Reactions -->
      <div class="p-4 bg-brand-surface border-t border-white/5">
        
        <!-- Reaction Bar -->
        <div class="flex items-center justify-center gap-4 mb-4">
          <button @click="sendReaction('❤️')" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-colors transform-gpu hover:scale-110 active:scale-95">
            <Heart class="w-5 h-5 text-red-500 fill-red-500" />
          </button>
          <button @click="sendReaction('🔥')" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-colors transform-gpu hover:scale-110 active:scale-95">
            <Flame class="w-5 h-5 text-orange-500 fill-orange-500" />
          </button>
          <button @click="sendReaction('⭐')" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-colors transform-gpu hover:scale-110 active:scale-95">
            <Star class="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </button>
        </div>

        <!-- Input Field -->
        <form @submit.prevent="sendMessage" class="relative">
          <input 
            type="text" 
            v-model="newMessage"
            placeholder="Say something..." 
            class="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
          />
          <button type="submit" :disabled="!newMessage.trim()" class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-brand-primary disabled:opacity-50 transition-colors">
            <Send class="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}

@keyframes floatUp {
  0% { opacity: 0; transform: translateY(0) scale(0.5); }
  20% { opacity: 1; transform: translateY(-20px) scale(1.2); }
  80% { opacity: 0.8; transform: translateY(-100px) scale(1); }
  100% { opacity: 0; transform: translateY(-150px) scale(0.8); }
}
.animate-float-up {
  animation: floatUp 2s ease-out forwards;
}
</style>
