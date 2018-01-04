import {getPaletteConfig} from './initState'
import {PALETTE_DND_OPTIONS} from '../../config/dnd'

export const paletteModule = {
  namespaced: true,
  state: {
    paletteConfig: getPaletteConfig(),
    dndOptions: PALETTE_DND_OPTIONS,
    activeName: 1 // active collapse index
  },
  getters: {
    getPaletteItem: state => (groupIndex, itemIndex) => {
      return state.paletteConfig.groups[groupIndex].fields[itemIndex]
    }
  }
}
