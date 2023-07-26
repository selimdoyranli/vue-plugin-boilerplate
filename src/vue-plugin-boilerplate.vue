<template lang="pug">
.vue-plugin-boilerplate(ref="rootRef" :class="[activeClass]")
  button(@click="toggle") Toggle
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue-demi'
import type { BaseClassNameTypes } from '@/types'

export default defineComponent({
  name: 'PluginBoilerplate',
  setup() {
    const baseClassName: BaseClassNameTypes = 'vue-plugin-boilerplate'

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

<style lang="scss">
@import './vue-plugin-boilerplate.scss';
</style>
