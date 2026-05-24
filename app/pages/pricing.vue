<script setup lang="ts">
import { Check } from 'lucide-vue-next'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    interval: '/month',
    description: 'Perfect for casual viewers who want to discover indie cinema.',
    features: [
      'Ad-supported streaming',
      '720p HD Video Quality',
      'Access to community feed',
      'Create 1 Watchlist'
    ],
    buttonText: 'Current Plan',
    buttonClass: 'btn-outline border-white/20 text-white hover:bg-white/10',
    popular: false
  },
  {
    name: 'Premium',
    price: '$8.99',
    interval: '/month',
    description: 'The ultimate cinematic experience with high quality streaming.',
    features: [
      'Ad-free streaming',
      '4K HDR Video Quality',
      'Download for offline viewing',
      'Unlimited Watchlists',
      'Early access to new releases',
      'Spatial Audio support'
    ],
    buttonText: 'Upgrade to Premium',
    buttonClass: 'bg-brand-primary hover:bg-brand-primary/90 text-white border-none box-shadow-glow',
    popular: true
  },
  {
    name: 'Creator Pro',
    price: '$19.99',
    interval: '/month',
    description: 'Built for filmmakers to distribute and monetize their work.',
    features: [
      'Everything in Premium',
      'Upload unlimited films (up to 4K)',
      'Advanced audience analytics',
      'Monetization tools (keep 100%)',
      'Festival submission discounts',
      'Verified creator badge'
    ],
    buttonText: 'Become a Creator',
    buttonClass: 'bg-white hover:bg-gray-200 text-black border-none',
    popular: false
  }
]
</script>

<template>
  <div class="pt-24 pb-20 container mx-auto px-4 md:px-8">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Choose Your Cinematic Journey</h1>
      <p class="text-xl text-gray-400">
        Whether you're a film enthusiast or a creator, we have a plan designed for you.
      </p>
    </div>

    <!-- Pricing Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div 
        v-for="tier in tiers" 
        :key="tier.name"
        :class="[
          'relative p-8 rounded-3xl border transition-all duration-300 flex flex-col',
          tier.popular 
            ? 'bg-brand-surface border-brand-primary scale-100 md:scale-105 z-10 box-shadow-glow' 
            : 'bg-black border-white/10 hover:border-white/30'
        ]"
      >
        <!-- Popular Badge -->
        <div v-if="tier.popular" class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Most Popular
        </div>

        <h3 class="text-2xl font-heading font-semibold text-white mb-2">{{ tier.name }}</h3>
        <p class="text-gray-400 text-sm mb-6 h-10">{{ tier.description }}</p>
        
        <div class="mb-8">
          <span class="text-5xl font-bold text-white">{{ tier.price }}</span>
          <span class="text-gray-400">{{ tier.interval }}</span>
        </div>

        <ul class="space-y-4 mb-8 flex-1">
          <li v-for="feature in tier.features" :key="feature" class="flex items-start gap-3">
            <Check class="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
            <span class="text-gray-300">{{ feature }}</span>
          </li>
        </ul>

        <button :class="['btn w-full rounded-xl font-bold', tier.buttonClass]">
          {{ tier.buttonText }}
        </button>
      </div>
    </div>
    
    <!-- FAQ Section Mockup -->
    <div class="mt-32 max-w-3xl mx-auto text-center">
      <h3 class="text-2xl font-heading font-bold text-white mb-4">Have questions?</h3>
      <p class="text-gray-400 mb-8">Can I cancel anytime? Yes. Do creators retain rights? 100%.</p>
      <button class="btn btn-ghost text-brand-secondary hover:bg-brand-secondary/10">Read full FAQ</button>
    </div>
  </div>
</template>
