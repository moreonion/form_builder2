import Vuex from 'vuex'

import {builderModule} from './modules/builder'
import {paletteModule} from './modules/palette'

export const store = new Vuex.Store({
  modules: {
    palette: paletteModule,
    builder: builderModule
  }
})
