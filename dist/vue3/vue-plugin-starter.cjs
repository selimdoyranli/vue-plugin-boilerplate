'use strict';Object.defineProperty(exports,'__esModule',{value:true});var vueDemi=require('vue-demi'),vue=require('vue');var script = vueDemi.defineComponent({
  name: 'PluginStarter',
  setup: function setup() {
    var baseClassName = 'vue-plugin-starter';
    var rootRef = vueDemi.ref(null);
    var state = vueDemi.reactive({
      isActive: false
    });
    var toggle = function toggle() {
      console.info(rootRef.value);
      state.isActive = !state.isActive;
    };
    var activeClass = vueDemi.computed(function () {
      if (state.isActive) {
        return "".concat(baseClassName, "--active");
      }
    });
    return {
      rootRef: rootRef,
      state: state,
      toggle: toggle,
      activeClass: activeClass
    };
  }
});function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["vue-plugin-starter", [_ctx.activeClass]]),
    ref: "rootRef"
  }, [vue.createElementVNode("button", {
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.toggle && _ctx.toggle.apply(_ctx, arguments);
    })
  }, "Toggle")], 2);
}script.render = render;// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_vue3 = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = script;

  // Attach install function executed by Vue.use()
  installable.install = function (app) {
    app.component('PluginStarter', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
exports["default"]=entry_vue3;