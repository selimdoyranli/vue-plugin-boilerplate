import fs from 'fs'
import path from 'path'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import scss from 'rollup-plugin-scss'
import sass from 'sass'
import css from 'rollup-plugin-css-only'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
const VUE_VERSION = process.env.VUE_VERSION

// Require vue package by version
const vue = require(`vue-rollup-plugin-vue${VUE_VERSION}`)

// Set vue directory name by vue version for src, dist and entry file
const VUE_DIRNAME = `vue${VUE_VERSION}`

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = require('../babel.config').presets.filter(entry => entry[0] === '@babel/preset-env')[0][1]

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
  .readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter(entry => entry && entry.substring(0, 2) !== 'ie')

const baseConfig = {
  input: `src/entry.${VUE_DIRNAME}.js`,
  plugins: {
    preVue: [
      alias({
        resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        entries: {
          '@': path.resolve(__dirname, '../src')
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
      sass: sass
    },
    css: {},
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
        file: `dist/${VUE_DIRNAME}/index.js`,
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
        file: `dist/${VUE_DIRNAME}/vue-plugin-boilerplate.umd.js`,
        format: 'umd',
        exports: 'named',
        globals,
        name: 'PluginBoilerplate'
      },
      {
        file: `dist/${VUE_DIRNAME}/vue-plugin-boilerplate.umd.min.js`,
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
        file: `dist/${VUE_DIRNAME}/vue-plugin-boilerplate.global.js`,
        format: 'umd',
        globals,
        name: 'PluginBoilerplate'
      },
      {
        file: `dist/${VUE_DIRNAME}/vue-plugin-boilerplate.global.min.js`,
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
              ...babelPresetEnvConfig,
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
        file: `dist/${VUE_DIRNAME}/vue-plugin-boilerplate.mjs`,
        format: 'esm',
        exports: 'named'
      },
      {
        file: `dist/${VUE_DIRNAME}/vue-plugin-boilerplate.min.mjs`,
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
        file: `dist/${VUE_DIRNAME}/vue-plugin-boilerplate.cjs`,
        format: 'cjs',
        name: 'PluginBoilerplate',
        exports: 'named',
        globals
      },
      {
        compact: true,
        file: `dist/${VUE_DIRNAME}/vue-plugin-boilerplate.min.cjs`,
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

// Types
const typesConfig = {
  input: './src/types/index.d.ts',
  output: [{ file: 'dist/index.d.ts', format: 'es' }],
  plugins: [dts()]
}
buildFormats.push(typesConfig)

// Base style minifier
const baseStyleMinifierConfig = {
  input: `dist/${VUE_DIRNAME}/vue-plugin-boilerplate.css`,
  output: {
    file: `./dist/${VUE_DIRNAME}/vue-plugin-boilerplate.min.css`
  },
  plugins: [
    scss({
      fileName: `vue-plugin-boilerplate.min.css`,
      sass: sass,
      outputStyle: 'compressed'
    })
  ]
}

buildFormats.push(baseStyleMinifierConfig)

// Export config
export default buildFormats
