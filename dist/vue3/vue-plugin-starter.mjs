import { defineComponent, ref, reactive, computed } from 'vue-demi';
import { openBlock, createElementBlock, normalizeClass, createElementVNode } from 'vue';

var script = defineComponent({
  name: 'PluginStarter',
  setup() {
    const baseClassName = 'vue-plugin-starter';
    const rootRef = ref(null);
    const state = reactive({
      isActive: false
    });
    const toggle = () => {
      console.info(rootRef.value);
      state.isActive = !state.isActive;
    };
    const activeClass = computed(() => {
      if (state.isActive) {
        return `${baseClassName}--active`;
      }
    });
    return {
      rootRef,
      state,
      toggle,
      activeClass
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["vue-plugin-starter", [_ctx.activeClass]]),
    ref: "rootRef"
  }, [createElementVNode("button", {
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggle && _ctx.toggle(...args))
  }, "Toggle")], 2);
}

script.render = render;

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_vue3 = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = script;

  // Attach install function executed by Vue.use()
  installable.install = app => {
    app.component('PluginStarter', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_vue3 as default };
