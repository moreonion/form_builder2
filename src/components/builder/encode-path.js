import IntermediateNode from './nodes/base/intermediate'

export function encodePath(node, pathId) {
  node.path = pathId
  if(node instanceof IntermediateNode) {
    node.children.forEach((child, i) => {
      encodePath(child, pathId.length > 0 ? `${pathId}-${i}`: `${i}`)
    })
  }
}
