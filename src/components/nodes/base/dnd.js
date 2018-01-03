import IntermediateNode from './intermediate'

import {BUILDER_DND_OPTIONS} from '../../../config/dnd'

export default class DndNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=BUILDER_DND_OPTIONS) {
    super(initChildren)
    this.dndOptions = dndOptions
  }

  renderNode(h) {
    return (
      <draggable options={this.dndOptions}>
        {this.children.map(child => child.renderNode(h))}
      </draggable>
    )
  }
}
