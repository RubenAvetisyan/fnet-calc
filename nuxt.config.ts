import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: process.env.NODE_ENV === "development" ? "/api" : "http://192.168.1.56:3000/api",
    }
  },
  modules: ['nuxt-ionic'],
  ionic: {
    integrations: {
      //
    },
    css: {
      basic: true,
      core: true,
      utilities: true,
    },
  },
})
