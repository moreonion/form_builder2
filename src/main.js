import Vue from 'vue'

import './global.scss'

import './vendor'

import {store} from './store'

import FormBuilder from './FormBuilder'

import {componentName} from './config/plugins'

// Register DnDMdArea so it can be dynamically used by palette/item.js
import {DnDMdArea} from 'mo-vue-dnd'
Vue.component('DnDMdArea', DnDMdArea)

// TODO: Get plugins from global scope and register their components in a loop
import page from './plugins/element-types/page'
import root from './plugins/element-types/root'
import missing from './plugins/element-types/missing'
import fieldset from './plugins/element-types/fieldset'
import select from './plugins/element-types/select'

if (page.preview) Vue.component(componentName('page'), page.preview)
if (page.config) Vue.component(componentName('page', 'config'), page.config)
if (root.preview) Vue.component(componentName('root'), root.preview)
if (root.config) Vue.component(componentName('root', 'config'), root.config)
if (missing.preview) Vue.component(componentName('missing'), missing.preview)
if (missing.config) Vue.component(componentName('missing', 'config'), missing.config)
if (fieldset.preview) Vue.component(componentName('fieldset'), fieldset.preview)
if (fieldset.config) Vue.component(componentName('fieldset', 'config'), fieldset.config)
if (select.preview) Vue.component(componentName('select'), select.preview)
if (select.config) Vue.component(componentName('select', 'config'), select.config)

const plugins = {
  types: {
    root,
    page,
    missing,
    fieldset,
    select
  }
}

new Vue({
  el: '#app',
  store,
  plugins,
  render() {
    return <FormBuilder/>
  }
})
