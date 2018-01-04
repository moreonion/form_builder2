import {getPaletteConfig} from '../../config/palette'

const paletteConfig = getPaletteConfig()

export const paletteModule = {
  namespaced: true,
  state: {
    paletteConfig
  },
  getters: {
    getPaletteItem: state => (groupIndex, itemIndex) => {
      return state.paletteConfig.groups[groupIndex].fields[itemIndex]
    }
  }
}
