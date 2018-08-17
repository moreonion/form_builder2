import {clone} from '../../utils'

export const configModule = {
  namespaced: true,
  state: {
    originalNode: null // Reference to the node that is being edited at the moment.
  },
  mutations: {
    /**
     * Start editing a node. Set originalNode to the node being edited.
     * @param {Object} state Vuex state.
     * @param {Object} payload Mutation payload.
     * @param {Node} payload.node The node to edit.
     */
    editNode (state, {node}) {
      state.originalNode = node
    },

    /**
     * Stop editing a node. Set originalNode to null.
     * @param {Object} state Vuex state.
     */
    leaveNode (state) {
      state.originalNode = null
    },

    /**
     * Update the config of the node being edited and stop editing that node.
     * Because originalNode is a reference to the edited node in the tree, changes
     * will affect the node in the tree.
     * Afterwards, set originalNode to null.
     * @param {Object} state Vuex state.
     * @param {Object} payload Mutation payload.
     * @param {Object} payload.editedNode $data.element from the ConfigDialog component.
     */
    updateNode (state, {editedNode}) {
      // Don’t alter id and children.
      const keys = Object.keys(editedNode).filter(key => ['id', 'children'].indexOf(key) === -1)
      // Copy each property.
      keys.forEach(key => {
        state.originalNode[key] = clone(editedNode[key])
      })
      // Stop editing the node.
      state.originalNode = null
    }
  }
}
