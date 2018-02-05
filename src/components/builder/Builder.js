export default {
  functional: true,
  render(h, {props:{rootNode}}) {
    /* All model checks must be applied before. Builder
     * assumes valid model.
     * E.g. Children of root node must be 'page' nodes
     */
    return (
      <div style={{'margin-left': '32px'}}>
        {rootNode.children.map(child => child.renderFn(h))}
      </div>)
  }
}
