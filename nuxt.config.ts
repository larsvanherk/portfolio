// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Portfolio - Lars van Herk',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },

  css: [
    '~/assets/styles/main.scss'
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss'
  ],

  eslint: {
    config: {
      stylistic: true
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-11-01'
});
