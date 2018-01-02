export default {
  functional: true,
  render: (h, context) => {
    return (<div>{context.props.node.value}</div>)
  }
}
