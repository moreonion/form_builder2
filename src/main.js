import Vue from 'vue'

import './vendor'

import FormBuilder from './FormBuilder.vue'

new Vue({
  el: '#app',
  render: h => h(FormBuilder)
})
