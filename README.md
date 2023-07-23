[![changelog][changelog-src]][changelog-href]
[![License][license-src]][license-href]

<p align="center"> 
  <img src='/meta/logo.png' width="64" />
</p>

<p align="center">
<b>vue-plugin-boilerplate</b>
</p>

<p align="center">
Boilerplate for vue 2&3 plugin development 🟩📦
</p>

<p align="center">
<a href="https://github.com/selimdoyranli/vue-plugin-boilerplate" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/selimdoyranli/vue-plugin-boilerplate?style=social"></a>
</p>

<div align="center">
<sub><b>Sponsorship 💖</b></sub><br>
<sub><a href="https://github.com/sponsors/selimdoyranli">GitHub</a></sub><br>
<sub><a href="https://buymeacoffee.com/selimdoyranli">Buy me a coffee</a></sub><br>
</div>

## Features
- 📦 Vue2 & Vue3 support
- ⚡️ Optimized
- 🦾 TypeScript support 
- 👶🏻 Easy
- 🏗️ Module formats
- 📁 Clean structure

# Tech Stack
- [vue-demi](https://github.com/vueuse/vue-demi) for Vue2 & Vue3 support
- Rollup
- Pug
- Scss
- Typescript
- Husky
- Eslint
- Stylelint
- Prettier
- Conventional Commit
- Commitlint
- Commitizen
- [Changelogen](https://github.com/unjs/changelogen) for release management


## Installation

Clone this repo or create new repo from this template repo

```bash
git clone https://github.com/selimdoyranli/vue-plugin-boilerplate.git
```

## Development

This project requires node 18.x.x version

### Vue3

```bash
yarn build:vue3 # build for vue3
```

```bash
# Serve

cd dev/vue3

yarn install
yarn serve
```

### Vue2

```bash
yarn build:vue2 # build for vue2
```

```bash
# Serve

cd dev/vue2

yarn install
yarn serve
```

### Vue 2&3

```bash
yarn build # build for vue2 and vue3
```

#### Linter

```bash
# run eslint
yarn lint:eslint

# run eslint fix
yarn lint:eslint:fix

# run stylelint
yarn lint:stylelint

# run stylelint fix
yarn lint:stylelint:fix

# run prettier
yarn prettier

# check types
yarn type:check
```

#### Git
Using [Conventional Commits](https://www.conventionalcommits.org), commitizen, commitizen cli

```bash
# add files
git add .

# generate commit message
yarn commit # or yarn cz

# push
git push
```

#### Release & Changelog
Using [changelogen](https://github.com/unjs/changelogen) for release & changelog management, arguments are the same as changelogen

```bash
# run changelogen
yarn changelog
```

---

## Sponsorship

You can sponsor me for the continuity of my projects:

<p align="left">
  <a href="https://github.com/sponsors/selimdoyranli">
    <img src='https://img.shields.io/github/sponsors/selimdoyranli?style=for-the-badge&label=%E2%99%A5+Be+Sponsor&logo=GitHub'/>
  </a>
</p>

<p align="left">
  <a href="https://buymeacoffee.com/selimdoyranli">
    <img src='https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png'/>
  </a>
</p>

## License

[MIT License](./LICENSE)

Copyright (c) selimdoyranli <selimdoyranli@gmail.com>

<!-- Badges -->
[changelog-src]: https://img.shields.io/static/v1?label=%F0%9F%93%96&message=Release%20Notes%20|%20CHANGELOG&color=blue
[changelog-href]: ./CHANGELOG.md

[license-src]: https://img.shields.io/badge/License-MIT-blue.svg
[license-href]: ./LICENSE
