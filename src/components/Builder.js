export default {
  functional: true,
  render(h, {props:{rootNode}}) {
    // Children of root node must be 'page' nodes
    return rootNode.children.map(child => child.renderNode(h))
  }
}
