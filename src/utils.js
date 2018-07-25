import {Node} from './components/builder/node'
import {registerTakenId} from './components/builder/id'
import {store} from './store'
import plugins from './plugins'

export function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function parseTree (obj) {
  const childNodes = []
  const config = {}

  registerTakenId(obj.id)

  if (obj.children) {
    for (var i = 0, j = obj.children.length; i < j; i++) {
      childNodes.push(parseTree(obj.children[i]))
    }
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'children') {
      config[key] = obj[key]
    }
  }

  return new Node(config, childNodes)
}

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

export function dispatch (el, type) {
  const e = document.createEvent('Event')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}
