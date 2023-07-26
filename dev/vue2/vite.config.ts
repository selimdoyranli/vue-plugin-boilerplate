const { createVuePlugin } = require('vite-plugin-vue2')
import pugPlugin from 'vite-plugin-pug'

module.exports = {
  plugins: [createVuePlugin(), pugPlugin()],
  build: {
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  }
}
