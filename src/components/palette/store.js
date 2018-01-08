import {getInitPaletteState} from './init-state'

export const paletteModule = {
  namespaced: true,
  state: {
    palette: getInitPaletteState(),
    paletteConfig: {
      createdSingletons: {
        firstName: false,
        lastName: false
      }
    },
    activeName: 0 // active collapse index
  },
  getters: {
    getPaletteItem: state => (groupIndex, itemIndex) => {
      return state.palette.groups[groupIndex].fields[itemIndex]
    }
  }
}
