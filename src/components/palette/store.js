import {getPaletteConfig} from '../../config/palette'

const paletteConfig = getPaletteConfig()

export const paletteModule = {
  namespaced: true,
  state: {
    paletteConfig
  }
}
