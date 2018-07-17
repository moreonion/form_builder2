import Vue from 'vue'

import './global.scss'

import './config/globalObj'
import './vendor'
import {store} from './store'
import eventBus from './bus'
import events from './events'
import plugins from './plugins'
import FormBuilder from './FormBuilder' // eslint-disable-line no-unused-vars

import {componentName} from './config/plugins'

// Register DnDMdArea so it can be dynamically used by palette/item.js
import {DnDMdArea} from 'mo-vue-dnd'
Vue.component('DnDMdArea', DnDMdArea)

// Register plugin components
for (let type in window.moFormBuilder.plugins.types) {
  if (window.moFormBuilder.plugins.types.hasOwnProperty(type)) {
    if (window.moFormBuilder.plugins.types[type].preview) {
      Vue.component(componentName(type, 'preview'), window.moFormBuilder.plugins.types[type].preview)
    }
    if (window.moFormBuilder.plugins.types[type].config) {
      Vue.component(componentName(type, 'config'), window.moFormBuilder.plugins.types[type].config)
    }
  }
}

Vue.prototype.$eventBus = eventBus
Vue.prototype.$events = events

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  plugins,
  render () {
    return <FormBuilder/>
  }
})
