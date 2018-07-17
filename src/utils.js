import {Node} from './components/builder/node'
import {registerTakenId} from './components/builder/id'

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
