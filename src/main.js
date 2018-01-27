import Vue from 'vue'

import './global.scss'

import './vendor'

import {store} from './store'

import FormBuilder from './FormBuilder'

new Vue({
  el: '#app',
  store,
  render() {
    return <FormBuilder/>
  }
})
