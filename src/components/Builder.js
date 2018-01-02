export default {
  functional: true,
  render: (h, context) => {
    return context.props.rootNode.children.map(c => {
      return <mo-node node={c}></mo-node>
    })
  }
}
