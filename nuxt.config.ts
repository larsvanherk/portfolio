// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Portfolio - Lars van Herk'
    }
  },

  css: [
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

  devtools: { enabled: true },
  compatibilityDate: '2024-11-01'
});
