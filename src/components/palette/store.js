import {getPaletteConfig} from './initState'
import {PALETTE_DND_OPTIONS} from '../../config/dnd'

const paletteConfig = getPaletteConfig()

export const paletteModule = {
  namespaced: true,
  state: {
    paletteConfig,
    dndOptions: PALETTE_DND_OPTIONS,
    activeName: 0 // active collapse index
  },
  getters: {
    getPaletteItem: state => (groupIndex, itemIndex) => {
      return state.paletteConfig.groups[groupIndex].fields[itemIndex]
    }
  }
}
