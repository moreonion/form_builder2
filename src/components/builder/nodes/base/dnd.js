import IntermediateNode from './intermediate'
import TextFieldNode from '../general/textfield'

import {decodePaletteItem} from '../../../palette/decode'

import {BUILDER_DND_OPTIONS} from '../../../../config/dnd'
import {PALETTE_DND_WRAPER_CLASSNAME} from '../../../../config/palette'

import {store} from '../../../../store'

export default class DndNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=BUILDER_DND_OPTIONS) {
    super(initChildren)
    this.dndOptions = dndOptions
  }

  addHandler(event) {
    console.log('add')
    if(event.from.className === PALETTE_DND_WRAPER_CLASSNAME) {
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

  updateHandler(event) {
    // Handle DnD within builder
    // Set new array reference, so that data stays reactiv
    const lastIndex = event.from.children.length-1
    if(event.oldIndex < event.newIndex) {
      if(event.newIndex === lastIndex) {
        this.children = this.children.slice(0, event.oldIndex)
          .concat(this.children.slice(event.oldIndex+1))
          .concat(this.children[event.oldIndex])
      } else {
        this.children = this.children.slice(0, event.oldIndex)
          .concat(this.children.slice(event.oldIndex+1, event.newIndex+1))
          .concat(this.children[event.oldIndex])
          .concat(this.children[event.newIndex+1])
      }
    } else {
      if(event.oldIndex === lastIndex) {
        this.children = this.children.slice(0, event.newIndex)
          .concat(this.children[event.oldIndex])
          .concat(this.children.slice(event.newIndex, event.oldIndex))
      } else {
        this.children = this.children.slice(0, event.newIndex)
          .concat(this.children[event.oldIndex])
          .concat(this.children.slice(event.newIndex, event.oldIndex))
          .concat(this.children.slice(event.oldIndex+1))
      }
    }
  }

  renderNode(h) {
    return (
      <draggable options={this.dndOptions} onAdd={this.addHandler.bind(this)} onUpdate={this.updateHandler.bind(this)}>
        {this.children.map(child => child.renderNode(h))}
      </draggable>
    )
  }
}
