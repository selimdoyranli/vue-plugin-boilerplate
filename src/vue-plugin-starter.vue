<template lang="pug">
.vue-plugin-starter(ref="rootRef" :class="[activeClass]")
  button(@click="toggle") Toggle
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue-demi'

export default defineComponent({
  name: 'PluginStarter',
  setup() {
    const baseClassName = 'vue-plugin-starter'

    const rootRef = ref(null)

    const state = reactive({
      isActive: false
    })

    const toggle = () => {
      console.info(rootRef.value)
      state.isActive = !state.isActive
    }

    const activeClass = computed(() => {
      if (state.isActive) {
        return `${baseClassName}--active`
      }
    })

    return {
      rootRef,
      state,
      toggle,
      activeClass
    }
  }
})
</script>

<style lang="scss" src="./vue-plugin-starter.scss"></style>
