// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
  ],
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
