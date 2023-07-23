import fs from 'fs'
import path from 'path'
import vue from 'vue-next-rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import scss from 'rollup-plugin-scss'
import css from 'rollup-plugin-css-only'
import { terser } from 'rollup-plugin-terser'
import minimist from 'minimist'

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
  .readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter(entry => entry && entry.substring(0, 2) !== 'ie')

const argv = minimist(process.argv.slice(2))

const projectRoot = path.resolve(__dirname, '..')

const baseConfig = {
  input: 'src/entry.vue3.js',
  plugins: {
    preVue: [
      alias({
        resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        entries: {
          '@': path.resolve(projectRoot, 'src')
        }
      })
    ],
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.ES_BUILD': JSON.stringify('false'),
      preventAssignment: true
    },
    scss: {
      fileName: 'vue-plugin-boilerplate.css',
      outputStyle: 'compressed'
    },
    css: {
      output: 'dist/vue3/vue-plugin-boilerplate.css'
    },
    vue: {
      css: false,
      template: {
        isProduction: true
      }
    },
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled'
    },
    terser: {}
  }
}

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  'vue-demi'
]

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
  'vue-demi': 'VueDemi'
}

// Customize configs for individual targets
const buildFormats = []

if (!argv.format || argv.format === 'umd') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: [
      {
        file: 'dist/vue3/index.js',
        format: 'umd',
        exports: 'named',
        globals,
        name: 'PluginBoilerplate',
        plugins: [
          terser({
            ...baseConfig.plugins.terser
          })
        ]
      },
      {
        file: 'dist/vue3/vue-plugin-boilerplate.umd.js',
        format: 'umd',
        exports: 'named',
        globals,
        name: 'PluginBoilerplate'
      },
      {
        file: 'dist/vue3/vue-plugin-boilerplate.umd.min.js',
        format: 'umd',
        exports: 'named',
        globals,
        name: 'PluginBoilerplate',
        plugins: [
          terser({
            ...baseConfig.plugins.terser
          })
        ]
      },
      {
        file: 'dist/vue3/vue-plugin-boilerplate.global.js',
        format: 'umd',
        globals,
        name: 'PluginBoilerplate'
      },
      {
        file: 'dist/vue3/vue-plugin-boilerplate.global.min.js',
        format: 'umd',
        globals,
        name: 'PluginBoilerplate',
        plugins: [
          terser({
            ...baseConfig.plugins.terser
          })
        ]
      }
    ],
    plugins: [
      replace({
        ...baseConfig.plugins.replace
      }),
      ...baseConfig.plugins.preVue,
      scss({
        ...baseConfig.plugins.scss
      }),
      css({
        ...baseConfig.plugins.css
      }),
      vue({
        ...baseConfig.plugins.vue
      }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: esbrowserslist
            }
          ]
        ]
      }),
      commonjs()
    ]
  }
  buildFormats.push(umdConfig)
}

if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    external,
    output: [
      {
        file: 'dist/vue3/vue-plugin-boilerplate.mjs',
        format: 'esm',
        exports: 'named'
      },
      {
        file: 'dist/vue3/vue-plugin-boilerplate.min.mjs',
        format: 'esm',
        exports: 'named',
        plugins: [
          terser({
            ...baseConfig.plugins.terser
          })
        ]
      }
    ],
    plugins: [
      replace({
        ...baseConfig.plugins.replace,
        'process.env.ES_BUILD': JSON.stringify('true')
      }),
      ...baseConfig.plugins.preVue,
      scss({
        ...baseConfig.plugins.scss
      }),
      css({
        ...baseConfig.plugins.css
      }),
      vue({
        ...baseConfig.plugins.vue
      }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: esbrowserslist
            }
          ]
        ]
      }),
      commonjs()
    ]
  }
  buildFormats.push(esConfig)
}

if (!argv.format || argv.format === 'cjs') {
  const cjsConfig = {
    ...baseConfig,
    external,
    output: [
      {
        compact: true,
        file: 'dist/vue3/vue-plugin-boilerplate.cjs',
        format: 'cjs',
        name: 'PluginBoilerplate',
        exports: 'named',
        globals
      },
      {
        compact: true,
        file: 'dist/vue3/vue-plugin-boilerplate.min.cjs',
        format: 'cjs',
        name: 'PluginBoilerplate',
        exports: 'named',
        globals,
        plugins: [
          terser({
            ...baseConfig.plugins.terser
          })
        ]
      }
    ],
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      scss({
        ...baseConfig.plugins.scss
      }),
      css({
        ...baseConfig.plugins.css
      }),
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true
        }
      }),
      babel(baseConfig.plugins.babel),
      commonjs()
    ]
  }
  buildFormats.push(cjsConfig)
}

// Export config
export default buildFormats
