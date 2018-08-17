import {Node} from './node'

export const builderModule = {

  namespaced: true,

  state: {
    rootNode: null,   // The tree.
    draggedNode: null // The node that is being dragged at the moment.
  },

  mutations: {
    /**
     * Set the root node.
     * @param {Object} state Vuex state.
     * @param {Object} payload Stuff passed to the mutation.
     * @param {Node} payload.node New root node.
     */
    setRoot (state, {node}) {
      state.rootNode = node
    },

    /**
     * Set all of a node’s children at once.
     * @param {Object} state Vuex state.
     * @param {Object} payload Stuff passed to the mutation.
     * @param {Node} payload.node The node to add the child to.
     * @param {Node[]} payload.children An array of node instances.
     */
    setChildren (state, {node, children}) {
      node.children = children
      for (let i = 0, j = node.children.length; i < j; i++) {
        node.children[i].setParent(node)
      }
    },

    /**
     * Add a child to a node at a given position.
     * @param {Object} state Vuex state.
     * @param {Object} payload Stuff passed to the mutation.
     * @param {Node} payload.node The node to add the child to.
     * @param {integer} payload.index Zero-based position of the new child.
     * @param {Node} payload.child The child node to add.
     */
    addChild (state, {node, index, child}) {
      node.children.splice(index, 0, child)
      child.setParent(node)
    },

    /**
     * Remove a child from a node at a given position.
     * @param {Object} state Vuex state.
     * @param {Object} payload Stuff passed to the mutation.
     * @param {Node} payload.node The node to remove the child from.
     * @param {integer} payload.index Zero-based position of the child to remove.
     */
    removeChildByIndex (state, {node, index}) {
      node.children.splice(index, 1)
    },

    /**
     * Remove a given child from a node.
     * @param {Object} state Vuex state.
     * @param {Object} payload Stuff passed to the mutation.
     * @param {Node} payload.node The node to remove the child from.
     * @param {Node} payload.child The child to remove.
     */
    removeChild (state, {node, child}) {
      for (var i = 0, j = node.children.length; i < j; i++) {
        if (node.children[i] === child) {
          node.children.splice(i, 1)
          break
        }
      }
    },

    /**
     * Set the node that is currently dragged.
     * @param {Object} state Vuex state.
     * @param {Object} payload Stuff passed to the mutation.
     * @param {Node} payload.node Node instance being dragged.
     */
    dragNode (state, {node}) {
      state.draggedNode = node
    },

    /**
     * Reset the dragged node.
     * @param {Object} state Vuex state.
     */
    dropNode (state) {
      state.draggedNode = null
    },

    /**
     * Set a config property of a node.
     * A property has to be declared in the element template beforehand.
     * @param {Object} state Vuex state.
     * @param {Object} payload Stuff passed to the mutation.
     * @param {Node} payload.element The node.
     * @param {string} payload.key The property to set.
     * @param {*} payload.value The new value.
     */
    setElementProperty (state, {element, key, value}) {
      if (element instanceof Node) {
        if (key && typeof value !== 'undefined' && ['id', 'type'].indexOf(key) === -1) {
          if (typeof element[key] !== 'undefined') {
            element[key] = value
          } else {
            throw (new Error(`Tried to add property '${key}' to ${element.type}. Please declare the property in the element template.`))
          }
        }
      }
    }
  }
}
