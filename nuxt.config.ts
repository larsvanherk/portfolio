import tailwindcss from '@tailwindcss/vite';

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
    '~/assets/styles/tailwind.css',
    '~/assets/styles/main.scss'
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts'
  ],

  eslint: {
    config: {
      stylistic: true
    }
  },

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  devtools: { enabled: true },
  compatibilityDate: '2026-11-01'
});
