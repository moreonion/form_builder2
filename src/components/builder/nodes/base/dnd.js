import IntermediateNode from './intermediate'

import {decodePaletteItem} from '../../../palette/decode'

import {BUILDER_DND_OPTIONS} from '../../../../config/dnd'
import {PALETTE_DND_WRAPER_CLASSNAME} from '../../../../config/palette'

import {store} from '../../../../store'

import {getNode} from '../../get-node'
import {decodePath} from '../../decode-path'

export default class DnDNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=BUILDER_DND_OPTIONS) {
    super(initChildren)
    this.type = 'dnd'
    this.dndOptions = dndOptions
    this.key = Math.random()
  }

  addHandler(event) {
    if(event.from.className === PALETTE_DND_WRAPER_CLASSNAME) {
      // Handle DnD from palette to builder
      const paletteItemInfo = decodePaletteItem(event.item.id)
      if(paletteItemInfo !== null) {
        event.to.removeChild(event.to.children[event.newIndex])

        const {paletteGroupIndex, paletteItemIndex} = paletteItemInfo
        const paletteItemModel = store.getters['palette/getPaletteItem'](paletteGroupIndex, paletteItemIndex)

        this.addChild(event.newIndex, paletteItemModel.nodeFactory())
      }
    } else {
      // Handle DnD from builder to builder
      const encodedNodePath = event.item.id
      const rootNode = store.state.builder.rootNode
      // Get node by encoded tree path
      const node = getNode(rootNode, decodePath(encodedNodePath))
      this.addChild(event.newIndex, node)
    }
  }

  updateHandler(event) {
    // Handle DnD within builder
    // Set new array reference, so that data stays reactiv
    const lastIndex = event.from.children.length-1
    if(event.oldIndex < event.newIndex) {
      if(event.newIndex === lastIndex) {
        this.setChildren(this.children.slice(0, event.oldIndex)
          .concat(this.children.slice(event.oldIndex+1))
          .concat(this.children[event.oldIndex]))
      } else {
        this.setChildren(this.children.slice(0, event.oldIndex)
          .concat(this.children.slice(event.oldIndex+1, event.newIndex+1))
          .concat(this.children[event.oldIndex])
          .concat(this.children.slice(event.newIndex+1)))
      }
    } else {
      if(event.oldIndex === lastIndex) {
        this.setChildren(this.children.slice(0, event.newIndex)
          .concat(this.children[event.oldIndex])
          .concat(this.children.slice(event.newIndex, event.oldIndex)))
      } else {
        this.setChildren(this.children.slice(0, event.newIndex)
          .concat(this.children[event.oldIndex])
          .concat(this.children.slice(event.newIndex, event.oldIndex))
          .concat(this.children.slice(event.oldIndex+1)))
      }
    }
  }

  removeHandler(event) {
    const encodedNodePath = event.item.id
    const nodePath = decodePath(encodedNodePath)
    const lastIndex = nodePath[nodePath.length-1]
    this.removeChildByIndex(lastIndex)
  }

  renderNode(h) {
    const emptyState = (
      <div key={Math.random()} style={{height: '50px'}}>
        <h1>Empty DnD container :)</h1>
      </div>
    )
    const children = this.children.length > 0 ? this.children.map(child => child.renderNode(h)) : emptyState
    debugger
    return (
      <draggable key={this.key} options={this.dndOptions}
        onAdd={this.addHandler.bind(this)}
        onUpdate={this.updateHandler.bind(this)}
        onRemove={this.removeHandler.bind(this)}>
        {children}
      </draggable>
    )
  }
}
