// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
  ],
  routeRules: {
    // Add cors headers on API routes
    '/api/**': { cors: true },
  },
  auth: {
    globalAppMiddleware: true,
    /* provider: {
        type: 'authjs'
    }, */
    // включается глобальная аутентификация вместе с дефолтным окном логина
    /* globalAppMiddleware: {
      isEnabled: true
    }, */
  },
  devtools: { enabled: false },
  app: {
    head: {
      title: 'My App',
      titleTemplate: '%s | Template for GitHub/@Obscure1666'
    },    
  },
  $development: {
    app: {
      head: {
        title: 'DEV'
      },
    },
  },
  nitro: {
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true
          }
        }
      }
    }
  },
})
