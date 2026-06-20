import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['./app/assets/css/main.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    'nuxt-headlessui'
  ],
  headlessui: {
    prefix: 'Ui'
  },
  fonts: {
    defaults: {
      weights: [400, 900]
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03'
});