import Vue from 'vue'

import './vendor'

import {store} from './store'

import FormBuilder from './FormBuilder.vue'

new Vue({
  el: '#app',
  store,
  render() {
    return <FormBuilder/>
  }
})
