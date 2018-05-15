import Vuex from 'vuex'

import {builderModule} from '../components/builder/store'

export const store = new Vuex.Store({
  modules: {
    builder: builderModule
  }
})
