import {BUILDER_ROOT_DIV_ID} from '../../config/builder'

export default {
  functional: true,
  render(h, {props:{rootNode}}) {
    // Children of root node must be 'page' nodes
    return (
      <div id={BUILDER_ROOT_DIV_ID}>
        {rootNode.children.map(child => child.renderNode(h))}
      </div>
    )
  }
}
