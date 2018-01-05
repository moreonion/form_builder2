import {getPaletteConfig} from './initState'

export const paletteModule = {
  namespaced: true,
  state: {
    paletteConfig: getPaletteConfig(),
    activeName: 1 // active collapse index
  },
  getters: {
    getPaletteItem: state => (groupIndex, itemIndex) => {
      return state.paletteConfig.groups[groupIndex].fields[itemIndex]
    }
  }
}
