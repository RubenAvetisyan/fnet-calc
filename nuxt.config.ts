import { defineNuxtConfig } from 'nuxt'
// import { VitePWA } from 'vite-plugin-pwa'
// import pwaConfigurationFactory from './pwaConfiguration'

const siteName = 'Family Network Price Calculator'
const siteShortName = 'fNet-p-calc'
const siteDescription = 'Family Network Price Calculator for the Internet Providing Systems'

export default defineNuxtConfig({
  ssr: false,
  app: {
    buildAssetsDir: '/assets/'
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
  css: [
    '@ionic/core/css/core.css',
    '@ionic/core/css/normalize.css',
    '@ionic/core/css/structure.css',
    '@ionic/core/css/typography.css',
    '@ionic/core/css/ionic.bundle.css',
  ],
  unocss: {
    preflight: true,
    icons: true
  },
  colorMode: {
    classSuffix: '',
  },
  // https://github.com/nuxt/framework/issues/6204#issuecomment-1201398080
  hooks: {
    'vite:extendConfig': function (config: any, { isServer }: any) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },

  serverMiddleware: [
    { path: '/', handler: '~/server-middleware/sw.js'},
  ],

  // vite: {
  //   plugins: [
  //     VitePWA(pwaConfigurationFactory(true, undefined, siteName, siteShortName, siteDescription))
  //   ],
  // },
  meta: {
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: siteDescription },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // required theme-color: pwa
      { name: 'theme-color', content: '#f69435' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    htmlAttrs: {
      'lang': 'en',
      'data-theme': 'light' // https://daisyui.com/docs/default-themes
    }
  }
})
