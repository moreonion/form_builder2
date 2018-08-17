import {Node} from './components/builder/node'
import {registerTakenId} from './components/builder/id'
import {store} from './store'
import {plugins} from './config/global'

/**
 * Deep-clone an object.
 * @param {Object} obj Object to clone.
 * @returns {Object} Cloned object.
 */
export function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Recursively parse a tree POJO.
 * @param {Object} obj Tree consisting of plain objects.
 * @returns {Node} Tree consisting of instances of Node.
 */
export function parseTree (obj) {
  const childNodes = []
  const config = {}

  // Bump id counter up.
  registerTakenId(obj.id)

  if (obj.children) {
    // Generate a node instance for each child and collect them.
    for (var i = 0, j = obj.children.length; i < j; i++) {
      childNodes.push(parseTree(obj.children[i]))
    }
  }

  // Collect the config properties.
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'children') {
      config[key] = obj[key]
    }
  }

  return new Node(config, childNodes)
}

/**
 * Recursively append a node to the last node that accepts the parent-child relationship.
 * @param {Node} parent Try to append the child as this parent’s last child. If this fails, try the last child’s children.
 * @param {Node} child  The node to append.
 * @returns {boolean} Succeeded appending the node.
 */
export function recursiveAppendNode (parent, child) {
  const index = parent.children.length
  var success
  if (plugins.types[parent.type] && plugins.types[parent.type].acceptsChild(store.state.builder.rootNode, parent, child, index) &&
  plugins.types[child.type] && plugins.types[child.type].acceptsParent(store.state.builder.rootNode, parent, child, index)) {
    // If parent and child like each other, append to parent.
    store.commit('builder/addChild', {node: parent, child, index})
    success = true
  } else {
    // Try if the parent’s children like the node as a child.
    for (let i = parent.children.length - 1; i >= 0; i--) {
      if (recursiveAppendNode(parent.children[i], child)) {
        success = true
        break
      }
    }
  }
  return success
}

/**
 * Dispatch a custom JavaScript event.
 * @param {HTMLElement} el DOM element to dispatch the event on.
 * @param {string} type Event name.
 */
export function dispatch (el, type) {
  const e = document.createEvent('Event')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}
