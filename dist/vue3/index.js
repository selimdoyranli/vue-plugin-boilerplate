!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue-demi"),require("vue")):"function"==typeof define&&define.amd?define(["exports","vue-demi","vue"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).PluginBoilerplate={},e.VueDemi,e.Vue)}(this,(function(e,t,i){"use strict";var o=t.defineComponent({name:"PluginBoilerplate",setup(){const e=t.ref(null),i=t.reactive({isActive:!1}),o=t.computed((()=>{if(i.isActive)return"vue-plugin-boilerplate--active"}));return{rootRef:e,state:i,toggle:()=>{console.info(e.value),i.isActive=!i.isActive},activeClass:o}}});o.render=function(e,t,o,l,n,r){return i.openBlock(),i.createElementBlock("div",{class:i.normalizeClass(["vue-plugin-boilerplate",[e.activeClass]]),ref:"rootRef"},[i.createElementVNode("button",{onClick:t[0]||(t[0]=(...t)=>e.toggle&&e.toggle(...t))},"Toggle")],2)};var l=(()=>{const e=o;return e.install=t=>{t.component("PluginBoilerplate",e)},e})();e.default=l,Object.defineProperty(e,"__esModule",{value:!0})}));
