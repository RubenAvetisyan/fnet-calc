import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    'nuxt-ionic',
    '@nuxtjs/color-mode',
  ],
  ionic: {
    integrations: {      
      pwa: true
    },
    css: {
      basic:true,
      core: true,
      utilities: true
    }
  },
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  // https://github.com/nuxt/framework/issues/6204#issuecomment-1201398080
  // hooks: {
  //   'vite:extendConfig': function (config: any, { isServer }: any) {
  //     if (isServer) {
  //       // Workaround for netlify issue
  //       // https://github.com/nuxt/framework/issues/6204
  //       config.build.rollupOptions.output.inlineDynamicImports = true
  //     }
  //   },
  // },

  head: {
    title: 'Netcalc - fNet Telecom',
    htmlAttrs: {
      lang: 'hy'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Family Networc Telecom - Price calculator for exact tariffs' }
    ],
  },

  css: ['~/assets/core.css']
})
