import {DragNode} from './nodes/base/drag/drag'
import IntermediateNode from './nodes/base/intermediate'

export function wrapDragNode(node) {
  return new DragNode(node)
}

export function getNode(node, path) {
  if(node instanceof IntermediateNode) {
    const restPath = path.length > 1 ? path.slice(1) : []
    return path.length > 0 ?
      getNode(node.children[path[0]], restPath) : node
  } else {
    return node
  }
}

export function encodePath(node, pathId) {
  node.path = pathId
  if(node instanceof IntermediateNode) {
    node.children.forEach((child, i) => {
      encodePath(child, pathId.length > 0 ? `${pathId}-${i}`: `${i}`)
    })
  }
}

export function decodePath(str) {
  return str.split('-').map(s => parseInt(s))
}

