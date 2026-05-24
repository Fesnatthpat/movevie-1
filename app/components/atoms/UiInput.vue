<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string | number
  label?: string
  type?: string
  placeholder?: string
  error?: string
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label pb-1">
      <span class="label-text text-gray-300 font-medium">{{ label }}</span>
    </label>
    <input
      :type="type || 'text'"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'w-full bg-white/5 border text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 transition-all',
        error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand-primary focus:ring-brand-primary/50',
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      ]"
    />
    <label v-if="error" class="label pt-1">
      <span class="label-text-alt text-red-500">{{ error }}</span>
    </label>
  </div>
</template>
