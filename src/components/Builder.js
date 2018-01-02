export default {
  functional: true,
  render(h, context) {
    // Children of root node must be 'page' nodes
    return context.props.rootNode.children.map(child => {
      return child.renderNode(h)
    })
  }
}
