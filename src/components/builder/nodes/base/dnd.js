import IntermediateNode from './intermediate'
import TextFieldNode from '../general/textfield'

import {decodePaletteItem} from '../../../palette/decode'

import {BUILDER_DND_OPTIONS} from '../../../../config/dnd'

import {store} from '../../../../store'

export default class DndNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=BUILDER_DND_OPTIONS) {
    super(initChildren)
    this.dndOptions = dndOptions
  }

  addHandler(event) {
    if(event.from.className === 'paletteWrapper') {
      // Handle DnD from palette to builder
      const paletteItemInfo = decodePaletteItem(event.item.id)
      if(paletteItemInfo !== null) {
        event.to.removeChild(event.to.children[event.newIndex])

        const {paletteGroupIndex, paletteItemIndex} = paletteItemInfo
        const paletteItemModel = store.getters['palette/getPaletteItem'](paletteGroupIndex, paletteItemIndex)

        this.children.splice(event.newIndex, 0, paletteItemModel.nodeFactory())
      }
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
