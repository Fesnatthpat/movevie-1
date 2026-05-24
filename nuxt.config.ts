import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ['./app/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});