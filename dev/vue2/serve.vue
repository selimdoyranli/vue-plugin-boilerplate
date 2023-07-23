<template>
  <div id="app">
    <plugin-boilerplate />
  </div>
</template>

<script>
import PluginBoilerplate from '../../dist/vue2'

export default {
  name: 'ServeDev',
  components: {
    PluginBoilerplate
  }
}
</script>

<style>
@import '../../dist/vue2/vue-plugin-boilerplate.css';
</style>
