export const doc = document

export function findAncestorByClassName(child, clsName) {
  if(!child) {return}
  if(child.parentNode === document) {
    return null
  } else if(child.classList.contains(clsName)) {
    return child
  } else {
    return child.parentNode && child.parentNode.classList.contains(clsName) ?
      child.parentNode:
      findAncestorByClassName(child.parentNode, clsName)
  }
}
