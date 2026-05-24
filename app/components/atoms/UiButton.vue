<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  loading?: boolean
  disabled?: boolean
  to?: string
}>()

const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300'
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg'
}
const variantClasses = {
  primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 box-shadow-glow',
  secondary: 'bg-brand-secondary text-black hover:bg-brand-secondary/90',
  glass: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10',
  outline: 'border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40',
  ghost: 'text-gray-300 hover:text-white hover:bg-white/10'
}

const buttonClass = computed(() => [
  baseClasses,
  sizeClasses[props.size || 'md'],
  variantClasses[props.variant || 'primary'],
  props.block ? 'w-full' : '',
  (props.loading || props.disabled) ? 'opacity-50 cursor-not-allowed' : ''
])
</script>

<template>
  <component 
    :is="to ? 'NuxtLink' : 'button'"
    :to="to"
    :disabled="disabled || loading"
    :class="buttonClass"
  >
    <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
    <slot />
  </component>
</template>
