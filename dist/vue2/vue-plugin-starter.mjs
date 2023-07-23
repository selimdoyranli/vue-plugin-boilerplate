import { defineComponent, ref, reactive, computed } from 'vue-demi';

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

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    ref: "rootRef",
    staticClass: "vue-plugin-starter",
    class: [_vm.activeClass]
  }, [_c('button', {
    on: {
      "click": _vm.toggle
    }
  }, [_vm._v("Toggle")])]);
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = undefined;
/* scoped */
const __vue_scope_id__ = undefined;
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

// Import vue component

// install function executed by Vue.use()
const install = function installComponent(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('PluginStarter', __vue_component__);
};

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
__vue_component__.install = install;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export { __vue_component__ as default };
