import {clone} from '../../utils'

export const configModule = {
  namespaced: true,
  state: {
    originalNode: null // Reference to the node that is being edited at the moment.
  },
  mutations: {
    editNode(state, {node}) {
      state.originalNode = node
    },
    leaveNode(state) {
      state.originalNode = null
    },
    updateNode(state, {editedNode}) {
      // Don’t alter id and children.
      const keys = Object.keys(editedNode).filter(key => ['id', 'children'].indexOf(key) === -1)
      keys.forEach(key => state.originalNode[key] = clone(editedNode[key]))
      state.originalNode = null
    }
  }
}
