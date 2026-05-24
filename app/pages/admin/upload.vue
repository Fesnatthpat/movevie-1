<script setup lang="ts">
import { ref } from 'vue'
import { UploadCloud, FileVideo, CheckCircle2, Image as ImageIcon } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const isDragging = ref(false)
const uploadStep = ref(1) // 1: Upload, 2: Details, 3: Success
const file = ref<File | null>(null)

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const onDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  if (e.dataTransfer?.files.length) {
    handleFile(e.dataTransfer.files[0])
  }
}

const onFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    handleFile(target.files[0])
  }
}

const handleFile = (f: File) => {
  if (f.type.startsWith('video/')) {
    file.value = f
    uploadStep.value = 2
  } else {
    alert('Please upload a valid video file.')
  }
}

const title = ref('')
const description = ref('')
const tags = ref('')

const publish = () => {
  // Mock API call
  setTimeout(() => {
    uploadStep.value = 3
  }, 1000)
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-heading font-bold text-white mb-2">Upload Film</h1>
      <p class="text-gray-400">Share your cinematic vision with the world.</p>
    </div>

    <!-- Stepper -->
    <ul class="steps steps-horizontal w-full mb-12">
      <li class="step step-primary">Upload Video</li>
      <li :class="['step', uploadStep >= 2 ? 'step-primary' : '']">Details & Metadata</li>
      <li :class="['step', uploadStep === 3 ? 'step-primary' : '']">Publish</li>
    </ul>

    <!-- Step 1: Upload Area -->
    <div 
      v-if="uploadStep === 1"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      :class="[
        'w-full h-80 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 relative',
        isDragging ? 'border-brand-primary bg-brand-primary/5 scale-[1.02]' : 'border-white/20 bg-brand-surface hover:border-white/40'
      ]"
    >
      <input 
        type="file" 
        accept="video/*" 
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        @change="onFileSelect"
      />
      <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <UploadCloud class="w-10 h-10 text-brand-primary" />
      </div>
      <h3 class="text-xl font-heading font-bold text-white mb-2">Drag and drop your video</h3>
      <p class="text-gray-400 mb-6 text-sm">MP4, WebM or MOV. Max 10GB.</p>
      <button class="btn btn-primary bg-brand-primary hover:bg-brand-primary/90 text-white border-none px-8 rounded-full pointer-events-none">
        Select File
      </button>
    </div>

    <!-- Step 2: Metadata Form -->
    <div v-else-if="uploadStep === 2" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6 bg-brand-surface p-6 rounded-2xl border border-white/5">
        <div class="flex items-center gap-4 p-4 bg-black/50 rounded-xl mb-6">
          <FileVideo class="w-8 h-8 text-brand-secondary" />
          <div class="flex-1 overflow-hidden">
            <p class="text-white font-medium truncate">{{ file?.name }}</p>
            <p class="text-xs text-gray-500">{{ (file?.size / (1024 * 1024)).toFixed(2) }} MB</p>
          </div>
          <button @click="uploadStep = 1" class="text-sm text-gray-400 hover:text-white">Change</button>
        </div>

        <UiInput v-model="title" label="Title" placeholder="Enter an epic title..." />
        
        <div class="form-control w-full">
          <label class="label pb-1">
            <span class="label-text text-gray-300 font-medium">Synopsis</span>
          </label>
          <textarea 
            v-model="description"
            class="textarea textarea-bordered h-32 w-full bg-white/5 border-white/10 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
            placeholder="Tell us what the film is about..."
          ></textarea>
        </div>

        <UiInput v-model="tags" label="Genres (comma separated)" placeholder="Sci-Fi, Thriller..." />
      </div>

      <div class="space-y-6">
        <!-- Thumbnail Upload -->
        <div class="bg-brand-surface p-6 rounded-2xl border border-white/5">
          <h3 class="text-lg font-heading font-semibold text-white mb-4">Thumbnail</h3>
          <div class="w-full aspect-video rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center bg-black/50 cursor-pointer hover:border-white/40 transition-colors">
            <ImageIcon class="w-8 h-8 text-gray-400 mb-2" />
            <span class="text-sm text-gray-400">Upload Image</span>
          </div>
        </div>

        <button @click="publish" class="btn btn-primary w-full bg-brand-primary hover:bg-brand-primary/90 text-white border-none box-shadow-glow">
          Publish Film
        </button>
      </div>
    </div>

    <!-- Step 3: Success -->
    <div v-else class="py-20 text-center bg-brand-surface rounded-2xl border border-white/5">
      <div class="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 class="w-12 h-12 text-green-500" />
      </div>
      <h2 class="text-3xl font-heading font-bold text-white mb-4">Upload Complete!</h2>
      <p class="text-gray-400 mb-8 max-w-md mx-auto">
        Your film "{{ title || 'Untitled' }}" is now processing and will be available worldwide shortly.
      </p>
      <div class="flex items-center justify-center gap-4">
        <NuxtLink to="/dashboard" class="btn btn-outline border-white/20 text-white hover:bg-white/10">
          Go to Dashboard
        </NuxtLink>
        <button @click="uploadStep = 1; file = null; title = ''" class="btn btn-primary bg-brand-primary hover:bg-brand-primary/90 text-white border-none">
          Upload Another
        </button>
      </div>
    </div>
  </div>
</template>
