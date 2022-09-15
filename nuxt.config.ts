import { defineNuxtConfig } from 'nuxt'

const startUrl = process.env.NUXT_START_URL || 'http://localhost:3000/'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@kevinmarrec/nuxt-pwa'
  ],
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
  hooks: {
    'vite:extendConfig': function (config: any, { isServer }: any) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },

  pwa: {
    manifest: {
      name: 'fNet Price Calculator',
      short_name: 'fnet-calc',
      lang: 'en',
      background_color: '#fff',
      start_url: startUrl
    },
    icon: {
      fileName: 'apple-icon.png',
    },
    workbox: {
      enabled: true
    }
  },
  meta: {
    meta: [{ name: "viewport", content: "width=device-width, initial-scale=1"}]
  }
})
