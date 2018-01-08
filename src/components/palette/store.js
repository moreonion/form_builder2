import {getInitPaletteState} from './init-state'

import {NODE_TYPE_FIRST_NAME} from '../builder/nodes/contact/first-name'
import {NODE_TYPE_LAST_NAME} from '../builder/nodes/contact/last-name'

import {
  BUILDER_SINGLETON_NODES,
  BUILDER_IS_SINGLETON_NODE_MAP
} from '../../config/builder'

export const paletteModule = {
  namespaced: true,
  state: {
    palette: getInitPaletteState(),
    paletteConfig: {
      createdSingletons: BUILDER_SINGLETON_NODES.reduce((accum, nodeType) => {
        accum[nodeType] = false
        return accum
      }, {})
    },
    activeName: 0 // active collapse index
  },
  getters: {
    paletteState: ({palette, paletteConfig:{createdSingletons}}) => {
      return {
        groups: palette.groups.map(group => {
          return {
            ...group,
            fields: group.fields.filter(item => {
              return !BUILDER_IS_SINGLETON_NODE_MAP[item.nodeType]
                || !createdSingletons[item.nodeType]
            })
          }
        })
      }
    },
    getPaletteItem: (_, getters) => (groupIndex, itemIndex) => {
      return getters.paletteState.groups[groupIndex].fields[itemIndex]
    }
  },
  mutations: {
    createSingleton({paletteConfig: {createdSingletons}}, type) {
      createdSingletons[type] = true
    },
    destroySingleton({paletteConfig: {createdSingletons}}, type) {
      createdSingletons[type] = false
    }
  }
}
