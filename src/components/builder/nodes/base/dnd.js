import IntermediateNode from './intermediate'
import TextFieldNode from '../general/textfield'

import {BUILDER_DND_OPTIONS} from '../../../../config/dnd'

export default class DndNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=BUILDER_DND_OPTIONS) {
    super(initChildren)
    this.dndOptions = dndOptions
  }

  addHandler(event) {
    if(event.from.className === 'paletteWrapper') {
      event.to.removeChild(event.to.children[event.newIndex])
      this.children.splice(event.newIndex, 0, new TextFieldNode('ADD'))
    }
  }

  renderNode(h) {
    return (
      <draggable options={this.dndOptions} onAdd={this.addHandler.bind(this)}>
        {this.children.map(child => child.renderNode(h))}
      </draggable>
    )
  }
}
