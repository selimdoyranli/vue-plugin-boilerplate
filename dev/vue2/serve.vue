<template>
  <div id="app">
    <plugin-starter />
  </div>
</template>

<script>
import PluginStarter from '../../dist/vue2'

export default {
  name: 'ServeDev',
  components: {
    PluginStarter
  }
}
</script>

<style>
@import '../../dist/vue2/vue-plugin-starter.css';
</style>
