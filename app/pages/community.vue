<script setup lang="ts">
import { MessageSquare, Heart, Share2, Flame, AlertTriangle } from 'lucide-vue-next'
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    user: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      handle: '@elenafilms'
    },
    content: 'Just finished color grading my new sci-fi short "Echoes". The neon aesthetics in DaVinci Resolve are mind-blowing! Dropping the trailer next week. 🎬✨',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    likes: 342,
    comments: 28,
    isSpoiler: false,
    time: '2h ago'
  },
  {
    id: 2,
    user: {
      name: 'Marcus Cole',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
      handle: '@marcus_c'
    },
    content: 'Review: "Neon Dreams" is an absolute masterpiece. The way Kaito Tanaka uses practical lighting mixed with VFX...',
    spoilerText: 'The twist ending where the memory broker realizes he was the AI all along completely blew my mind. Best ending of 2026.',
    likes: 89,
    comments: 12,
    isSpoiler: true,
    showSpoiler: false,
    time: '5h ago'
  }
])

const toggleSpoiler = (post: any) => {
  post.showSpoiler = !post.showSpoiler
}
</script>

<template>
  <div class="pt-24 pb-20 container mx-auto px-4 md:px-8 max-w-4xl">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-heading font-bold text-white flex items-center gap-2">
        <Flame class="w-8 h-8 text-brand-primary" />
        Community Feed
      </h1>
      
      <div class="tabs tabs-boxed bg-white/5 p-1 border border-white/10">
        <a class="tab tab-active bg-white/20 text-white font-medium rounded">Trending</a>
        <a class="tab text-gray-400 hover:text-white">Following</a>
      </div>
    </div>

    <!-- Create Post -->
    <div class="bg-brand-surface p-4 md:p-6 rounded-2xl border border-white/5 mb-8 flex gap-4">
      <div class="w-12 h-12 rounded-full bg-white/10 overflow-hidden shrink-0">
        <!-- Current User Avatar -->
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1">
        <textarea 
          placeholder="What's on your cinematic mind?" 
          class="w-full bg-transparent border-none text-white focus:ring-0 resize-none h-12 pt-3 placeholder-gray-500"
        ></textarea>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div class="flex gap-2">
            <button class="btn btn-sm btn-ghost text-brand-secondary hover:bg-brand-secondary/10">Add Media</button>
            <button class="btn btn-sm btn-ghost text-red-400 hover:bg-red-400/10">Spoiler Alert</button>
          </div>
          <button class="btn btn-sm btn-primary bg-brand-primary hover:bg-brand-primary/90 text-white border-none rounded-full px-6">
            Post
          </button>
        </div>
      </div>
    </div>

    <!-- Feed -->
    <div class="space-y-6">
      <div v-for="post in posts" :key="post.id" class="bg-brand-surface p-4 md:p-6 rounded-2xl border border-white/5">
        <div class="flex items-center gap-3 mb-4">
          <img :src="post.user.avatar" class="w-10 h-10 rounded-full object-cover" />
          <div>
            <h4 class="font-medium text-white flex items-center gap-1">{{ post.user.name }}</h4>
            <p class="text-xs text-gray-500">{{ post.user.handle }} • {{ post.time }}</p>
          </div>
        </div>

        <div class="mb-4 text-gray-300 text-sm md:text-base leading-relaxed">
          <p>{{ post.content }}</p>
          
          <!-- Spoiler Protection -->
          <div v-if="post.isSpoiler" class="mt-3">
            <div v-if="!post.showSpoiler" class="bg-black/50 border border-red-500/30 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-black/70 transition-colors" @click="toggleSpoiler(post)">
              <AlertTriangle class="w-6 h-6 text-red-500 mb-2" />
              <p class="text-white font-medium">This post contains spoilers</p>
              <p class="text-xs text-gray-500 mt-1">Click to reveal</p>
            </div>
            <div v-else class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-gray-200">
              {{ post.spoilerText }}
            </div>
          </div>

          <!-- Attached Image -->
          <img v-if="post.image" :src="post.image" class="w-full rounded-xl mt-4 border border-white/5" />
        </div>

        <div class="flex items-center gap-6 pt-4 border-t border-white/5 text-gray-400">
          <button class="flex items-center gap-2 hover:text-brand-primary transition-colors text-sm">
            <Heart class="w-5 h-5" /> {{ post.likes }}
          </button>
          <button class="flex items-center gap-2 hover:text-white transition-colors text-sm">
            <MessageSquare class="w-5 h-5" /> {{ post.comments }}
          </button>
          <button class="flex items-center gap-2 hover:text-white transition-colors text-sm ml-auto">
            <Share2 class="w-5 h-5" /> Share
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
