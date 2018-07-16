import Vuex from 'vuex'

import {builderModule} from '../components/builder/store'
import {configModule} from '../components/config/store'

export const store = new Vuex.Store({
  strict: true,
  state: {
    windowWidth: window.innerWidth
  },
  mutations: {
    updateWindowWidth (state) {
      state.windowWidth = window.innerWidth
    }
  },
  modules: {
    builder: builderModule,
    config: configModule
  }
})
