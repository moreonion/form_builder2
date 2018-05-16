import Vuex from 'vuex'

import {builderModule} from '../components/builder/store'
import {configModule} from '../components/config/store'

export const store = new Vuex.Store({
  strict: true,
  modules: {
    builder: builderModule,
    config: configModule
  }
})
