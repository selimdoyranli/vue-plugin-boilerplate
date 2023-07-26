var __require = /* @__PURE__ */ (x =>
  typeof require !== 'undefined'
    ? require
    : typeof Proxy !== 'undefined'
    ? new Proxy(x, {
        get: (a, b) => (typeof require !== 'undefined' ? require : a)[b]
      })
    : x)(function (x) {
  if (typeof require !== 'undefined') return require.apply(this, arguments)
  throw new Error('Dynamic require of "' + x + '" is not supported')
})

// vite.config.ts
import pugPlugin from 'vite-plugin-pug'
var { createVuePlugin } = __require('vite-plugin-vue2')
module.exports = {
  plugins: [createVuePlugin(), pugPlugin()],
  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHsgY3JlYXRlVnVlUGx1Z2luIH0gPSByZXF1aXJlKCd2aXRlLXBsdWdpbi12dWUyJyk7XG5pbXBvcnQgcHVnUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLXB1ZydcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBsdWdpbnM6IFtjcmVhdGVWdWVQbHVnaW4oKSwgcHVnUGx1Z2luKCldLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIG1ha2Ugc3VyZSB0byBleHRlcm5hbGl6ZSBkZXBzIHRoYXQgc2hvdWxkbid0IGJlIGJ1bmRsZWRcbiAgICAgIC8vIGludG8geW91ciBsaWJyYXJ5XG4gICAgICBleHRlcm5hbDogW1widnVlXCJdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIFByb3ZpZGUgZ2xvYmFsIHZhcmlhYmxlcyB0byB1c2UgaW4gdGhlIFVNRCBidWlsZFxuICAgICAgICAvLyBmb3IgZXh0ZXJuYWxpemVkIGRlcHNcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogXCJWdWVcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogW1widnVlLWRlbWlcIl0sXG4gIH0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQ0EsT0FBTyxlQUFlO0FBRHRCLElBQU0sRUFBRSxnQkFBZ0IsSUFBSSxVQUFRO0FBR3BDLE9BQU8sVUFBVTtBQUFBLEVBQ2YsU0FBUyxDQUFDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztBQUFBLEVBQ3hDLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUdiLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBLFFBR04sU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxVQUFVO0FBQUEsRUFDdEI7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
