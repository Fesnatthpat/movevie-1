<script setup lang="ts">
import { ref } from 'vue'
import { LayoutDashboard, Film, BarChart3, Settings, LogOut, ArrowLeft, Upload, Bookmark } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()

const sidebarItems = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'My Films', path: '#', icon: Film },
  { name: 'Upload Film', path: '/upload', icon: Upload },
  { name: 'Saved', path: '#', icon: Bookmark },
  { name: 'Analytics', path: '#', icon: BarChart3 },
  { name: 'Settings', path: '#', icon: Settings },
]
</script>

<template>
  <div class="min-h-screen bg-brand-void text-white font-body flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-brand-surface border-r border-white/5 flex flex-col hidden md:flex fixed h-full z-40">
      <div class="p-6">
        <NuxtLink to="/" class="text-2xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2">
          <span class="text-brand-primary">M</span>O<span class="text-brand-secondary">V</span>EVIE
        </NuxtLink>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <NuxtLink 
          v-for="item in sidebarItems" 
          :key="item.name" 
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium',
            route.path === item.path 
              ? 'bg-brand-primary/10 text-brand-primary' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5" />
          {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="p-4 mt-auto border-t border-white/5">
        <button class="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-colors text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-white/5">
          <LogOut class="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 md:ml-64 flex flex-col min-h-screen bg-brand-void relative">
      <!-- Mobile Top Bar -->
      <div class="md:hidden flex items-center p-4 border-b border-white/5 bg-brand-surface sticky top-0 z-30">
        <NuxtLink to="/" class="text-gray-400 hover:text-white mr-4">
          <ArrowLeft class="w-6 h-6" />
        </NuxtLink>
        <span class="font-heading font-semibold text-lg flex-1">Dashboard</span>
      </div>
      
      <div class="flex-1 p-6 md:p-10 w-full max-w-[1200px] mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
