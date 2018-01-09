import {BUILDER_ROOT_DIV_ID} from '../../config/builder'

export default {
  functional: true,
  render(h, {props:{rootNode}}) {
    /* All model checks must be applied before. Builder
     * assumes valid model.
     * E.g. Children of root node must be 'page' nodes
     */
    return (
      <div id={BUILDER_ROOT_DIV_ID} style={{'margin-left': '32px'}}>
        {rootNode.children.map(child => child.renderNode(h))}
      </div>)
  }
}
