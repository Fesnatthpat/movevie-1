<script setup lang="ts">
import { Bell, Heart, MessageSquare, Award, UserPlus } from 'lucide-vue-next'

const notifications = [
  {
    id: 1,
    type: 'like',
    icon: Heart,
    iconColor: 'text-brand-primary',
    content: 'Kaito Tanaka liked your review on "Neon Dreams".',
    time: '2h ago',
    unread: true
  },
  {
    id: 2,
    type: 'comment',
    icon: MessageSquare,
    iconColor: 'text-blue-400',
    content: 'Sarah Jenkins commented on your post: "Great observation!"',
    time: '5h ago',
    unread: true
  },
  {
    id: 3,
    type: 'festival',
    icon: Award,
    iconColor: 'text-yellow-400',
    content: 'Reminder: Neo-Cinema Vanguard Festival submissions close in 12 days.',
    time: '1d ago',
    unread: false
  },
  {
    id: 4,
    type: 'follow',
    icon: UserPlus,
    iconColor: 'text-green-400',
    content: 'Elena Rostova started following you.',
    time: '2d ago',
    unread: false
  }
]
</script>

<template>
  <div class="pt-24 pb-20 container mx-auto px-4 md:px-8 max-w-3xl">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-heading font-bold text-white flex items-center gap-2">
        <Bell class="w-8 h-8 text-brand-primary" />
        Notifications
      </h1>
      <button class="text-sm text-brand-secondary hover:text-white transition-colors">Mark all as read</button>
    </div>

    <div class="space-y-4">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        :class="[
          'p-4 md:p-6 rounded-2xl border transition-colors flex items-start gap-4',
          notification.unread ? 'bg-brand-surface border-brand-primary/30' : 'bg-black border-white/5 opacity-70'
        ]"
      >
        <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
          <component :is="notification.icon" :class="['w-5 h-5', notification.iconColor]" />
        </div>
        
        <div class="flex-1">
          <p class="text-gray-200 mb-1" v-html="notification.content"></p>
          <p class="text-xs text-gray-500">{{ notification.time }}</p>
        </div>

        <div v-if="notification.unread" class="w-2 h-2 rounded-full bg-brand-primary mt-2"></div>
      </div>
    </div>
  </div>
</template>
