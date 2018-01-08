import {getPaletteConfig} from './init-state'

export const paletteModule = {
  namespaced: true,
  state: {
    paletteConfig: getPaletteConfig(),
    activeName: 0 // active collapse index
  },
  getters: {
    getPaletteItem: state => (groupIndex, itemIndex) => {
      return state.paletteConfig.groups[groupIndex].fields[itemIndex]
    }
  }
}
