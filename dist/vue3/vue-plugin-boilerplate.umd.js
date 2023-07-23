(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue-demi'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue-demi', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PluginBoilerplate = {}, global.VueDemi, global.Vue));
})(this, (function (exports, vueDemi, vue) { 'use strict';

  var script = vueDemi.defineComponent({
    name: 'PluginBoilerplate',
    setup() {
      const baseClassName = 'vue-plugin-boilerplate';
      const rootRef = vueDemi.ref(null);
      const state = vueDemi.reactive({
        isActive: false
      });
      const toggle = () => {
        console.info(rootRef.value);
        state.isActive = !state.isActive;
      };
      const activeClass = vueDemi.computed(() => {
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
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["vue-plugin-boilerplate", [_ctx.activeClass]]),
      ref: "rootRef"
    }, [vue.createElementVNode("button", {
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
      app.component('PluginBoilerplate', installable);
    };
    return installable;
  })();

  // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = directive;

  exports["default"] = entry_vue3;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
