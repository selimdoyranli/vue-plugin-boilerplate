<template lang="pug">
#app
  PluginBoilerplate
</template>

<script lang="ts">
import Vue from 'vue'

// @ts-ignore
import PluginBoilerplate from '../../../src/vue-plugin-boilerplate.vue'

export default Vue.extend({
  components: {
    PluginBoilerplate
  }
})
</script>

<style lang="scss">
@import '../../../src/vue-plugin-boilerplate.scss';
</style>
