<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMouseMoving = ref(true)
let mouseTimeout: ReturnType<typeof setTimeout>

const handleMouseMove = () => {
  isMouseMoving.value = true
  clearTimeout(mouseTimeout)
  mouseTimeout = setTimeout(() => {
    isMouseMoving.value = false
  }, 3000)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  handleMouseMove()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  clearTimeout(mouseTimeout)
})
</script>

<template>
  <div class="min-h-screen bg-black text-white font-body overflow-hidden">
    <!-- Auto-hiding Navbar -->
    <header 
      :class="[
        'fixed top-0 w-full z-50 transition-all duration-500 ease-in-out bg-gradient-to-b from-black/80 to-transparent pt-6 pb-12 px-6',
        isMouseMoving ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      ]"
    >
      <div class="flex items-center gap-6">
        <button 
          @click="router.back()" 
          class="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors text-white"
        >
          <ArrowLeft class="w-6 h-6" />
        </button>
        <div class="flex-1">
          <!-- Optional Slot for dynamic header content like Movie Title -->
          <slot name="header" />
        </div>
      </div>
    </header>

    <!-- Main Player Area -->
    <main class="w-full h-screen relative">
      <slot />
    </main>
  </div>
</template>
