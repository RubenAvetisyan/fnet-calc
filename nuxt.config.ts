import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  ssr: false,
  static:true,
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-ionic'
  ],
  ionic: {
    integrations: {
      //
    },
    css: {
      basic: true,
      core: true,
      utilities: true
    },
    config: {
      //
    }
  },

  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
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
  }
})
