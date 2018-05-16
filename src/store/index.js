import Vuex from 'vuex'

import {builderModule} from '../components/builder/store'

export const store = new Vuex.Store({
  strict: true,
  modules: {
    builder: builderModule
  }
})
