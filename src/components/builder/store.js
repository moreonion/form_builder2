import initState from './init-state'
import {Node} from './node'

export const builderModule = {
  namespaced: true,
  state: {
    rootNode: initState,
    draggedNode: null
  },
  mutations: {
    setChildren(state, {node, children}) {
      node.children = children
      for (let i = 0, j = node.children.length; i < j; i++) {
        node.children[i].setParent(node)
      }
    },
    addChild(state, {node, index, child}) {
      node.children.splice(index, 0, child)
      child.setParent(node)
    },
    removeChildByIndex(state, {node, index}) {
      node.children.splice(index, 1)
    },
    removeChild(state, {node, child}) {
      for (var i = 0, j = node.children.length; i < j; i++) {
        if (node.children[i] === child) {
          node.children.splice(i, 1)
          break
        }
      }
    },
    dragNode(state, {node}) {
      state.draggedNode = node
    },
    dropNode(state) {
      state.draggedNode = null
    },
    setElementProperty(state, {element, key, value}) {
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
