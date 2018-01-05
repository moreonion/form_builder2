import IntermediateNode from './nodes/base/intermediate'

export function getNode(node, path) {
  if(node instanceof IntermediateNode) {
    const restPath = path.length > 1 ? path.slice(1) : []
    return path.length > 0 ?
      getNode(node.children[path[0]], restPath) : node
  } else {
    return node
  }
}
