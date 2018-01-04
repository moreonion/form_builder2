import Vuex from 'vuex'

import {builderModule} from '../components/builder/store'
import {paletteModule} from '../components/palette/store'

export const store = new Vuex.Store({
  modules: {
    palette: paletteModule,
    builder: builderModule
  }
})
