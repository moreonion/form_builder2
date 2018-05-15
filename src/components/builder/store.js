import initState from './init-state'

export const builderModule = {
  namespaced: true,
  state: {
    rootNode: initState,
    draggedNode: null
  },
  mutations: {
    dragNode(state, {node}) {
      state.draggedNode = node
    },
    dropNode(state) {
      state.draggedNode = null
    }
  }
}
