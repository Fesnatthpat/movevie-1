<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Search, Bell, Menu, User, Clapperboard, Home, Compass, X } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const route = useRoute()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navigation = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Moods', path: '/moods', icon: Compass }, 
  { name: 'Shorts', path: '/shorts', icon: Compass },
  { name: 'Live Premiere', path: '/premiere', icon: Clapperboard },
  { name: 'Collab Network', path: '/collab', icon: Clapperboard },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-brand-void text-white font-body">
    <!-- Navbar -->
    <!-- Floating Dock Navigation -->
    <header 
      :class="[
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-cinematic w-[95%] max-w-6xl',
        isScrolled ? 'top-4' : 'top-8'
      ]"
    >
      <div class="dock-container px-6 py-3 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2 group transform-gpu transition-transform hover:scale-105">
          <span class="text-brand-primary text-shadow-glow">M</span>O<span class="text-brand-secondary group-hover:text-white transition-colors">V</span>
        </NuxtLink>
        
        <!-- Center Nav -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.name" 
            :to="item.path"
            :class="[
              'text-sm font-medium transition-all duration-300 hover:text-white relative group',
              route.path === item.path ? 'text-white font-semibold' : 'text-gray-400'
            ]"
          >
            {{ item.name }}
            <span :class="['absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300', route.path === item.path ? 'bg-brand-primary box-shadow-glow scale-100' : 'bg-transparent scale-0 group-hover:bg-white/50 group-hover:scale-100']"></span>
          </NuxtLink>
        </nav>

        <!-- Right Actions -->
        <div class="hidden md:flex items-center gap-5">
          <button class="text-gray-400 hover:text-white transition-colors hover:scale-110 transform-gpu">
            <Search class="w-5 h-5" />
          </button>
          <NuxtLink to="/notifications" class="text-gray-400 hover:text-white transition-colors relative hover:scale-110 transform-gpu">
            <Bell class="w-5 h-5" />
            <span class="absolute top-0 right-0 w-2 h-2 bg-brand-primary rounded-full box-shadow-glow"></span>
          </NuxtLink>
          <div class="dropdown dropdown-end ml-2">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar border border-white/20 p-0.5 hover:border-brand-secondary transition-colors box-shadow-glow-cyan">
              <div class="w-8 rounded-full bg-brand-surface flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop" class="w-full h-full object-cover" />
              </div>
            </div>
            <ul tabindex="0" class="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-glass-heavy border border-white/10 rounded-2xl w-52 text-gray-200">
              <li><NuxtLink to="/dashboard" class="hover:bg-white/10 rounded-xl py-2">Dashboard</NuxtLink></li>
              <li><NuxtLink to="/pricing" class="hover:bg-white/10 rounded-xl py-2">Subscription</NuxtLink></li>
              <li><NuxtLink to="/festivals" class="hover:bg-white/10 rounded-xl py-2">Festivals</NuxtLink></li>
              <div class="divider my-1 before:bg-white/10 after:bg-white/10"></div>
              <li><a class="text-brand-primary hover:text-brand-primary hover:bg-white/5 rounded-xl py-2">Sign Out</a></li>
            </ul>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="md:hidden flex items-center gap-4">
          <button @click="isMobileMenuOpen = true" class="text-gray-300 hover:text-white">
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Mobile Drawer -->
    <aside 
      :class="[
        'fixed top-0 right-0 h-full w-64 bg-brand-surface-hover border-l border-white/10 z-[70] transform transition-transform duration-300 ease-in-out flex flex-col',
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="p-5 flex justify-end">
        <button @click="isMobileMenuOpen = false" class="text-gray-400 hover:text-white">
          <X class="w-6 h-6" />
        </button>
      </div>
      <nav class="flex-1 px-4 flex flex-col gap-2">
        <NuxtLink 
          v-for="item in navigation" 
          :key="item.name" 
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          @click="isMobileMenuOpen = false"
        >
          <component :is="item.icon" class="w-5 h-5" />
          {{ item.name }}
        </NuxtLink>
        <div class="divider my-2 before:bg-white/10 after:bg-white/10"></div>

        <NuxtLink to="/dashboard" class="px-4 py-3 text-gray-300 flex items-center gap-3">
          Dashboard
        </NuxtLink>
        <NuxtLink to="/notifications" class="px-4 py-3 text-gray-300 flex items-center gap-3">
          Notifications <span class="badge badge-sm badge-error">3</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 w-full pt-0">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-brand-surface border-t border-white/5 pt-16 pb-8 mt-auto">
      <div class="container mx-auto px-4 md:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 class="text-lg font-heading font-bold text-white mb-4">Movevie</h3>
            <p class="text-sm text-gray-400 leading-relaxed">
              Empowering indie filmmakers and bringing premium cinematic experiences to audiences worldwide.
            </p>
          </div>
          <div>
            <h4 class="font-medium text-white mb-4">Platform</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="/explore" class="hover:text-white transition-colors">Explore</NuxtLink></li>
              <li><NuxtLink to="/pricing" class="hover:text-white transition-colors">Pricing</NuxtLink></li>
              <li><NuxtLink to="/festivals" class="hover:text-white transition-colors">Festivals</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-white mb-4">Creators</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="/community" class="hover:text-white transition-colors">Community</NuxtLink></li>
              <li><a href="#" class="hover:text-white transition-colors">Monetization</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-white mb-4">Legal</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; 2026 Movevie Inc. All rights reserved.</p>
          <div class="flex gap-4 mt-4 md:mt-0">
            <a href="#" class="hover:text-white transition-colors">Twitter</a>
            <a href="#" class="hover:text-white transition-colors">Instagram</a>
            <a href="#" class="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
