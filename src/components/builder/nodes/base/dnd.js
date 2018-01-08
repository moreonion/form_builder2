import IntermediateNode from './intermediate'

import {decodePaletteItem} from '../../../palette/decode'

import {BUILDER_DND_OPTIONS} from '../../../../config/dnd'
import {PALETTE_DND_WRAPER_CLASSNAME} from '../../../../config/palette'

import {store} from '../../../../store'

import {getNode} from '../../get-node'
import {decodePath} from '../../decode-path'
import PageNode from '../general/page'

export default class DnDNode extends IntermediateNode {
  constructor(initChildren=[], dndOptions=BUILDER_DND_OPTIONS) {
    super(initChildren)
    this.type = 'dnd'
    this.dndOptions = dndOptions
  }

  addHandler(event) {
    if(event.from.className === PALETTE_DND_WRAPER_CLASSNAME) {
      // Handle DnD from palette to builder
      const paletteItemInfo = decodePaletteItem(event.item.id)
      if(paletteItemInfo !== null) {
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

  moveHandler(event) {
    const encodedNodePath = event.dragged.id
    const rootNode = store.state.builder.rootNode
    const node = getNode(rootNode, decodePath(encodedNodePath))

    if(node instanceof PageNode) {
     /*
      * RULE: Page node is only allowed as child of root node.
      */
      return event.to.parentNode.id === 'root'
    } else if(event.to.parentNode.id === 'root') {
     /*
      * RULE: Children of root may only be page nodes.
      */
      return node instanceof PageNode
    }

    return true
  }

  renderNode(h) {
    const emptyState = (
      <div key={Math.random()} style={{'min-height': '150px'}}>
        <h1>Empty DnD container :)</h1>
      </div>)

    const children = this.children.length > 0 ? this.children.map(child => child.renderNode(h)) : emptyState

    /*
     * NOTE: value={[]} move={..} is the same trick as in `./components/palette/Palette.vue`
     */
    return (
      <draggable value={[]} key={Math.random()} options={this.dndOptions}
        move={this.moveHandler.bind(this)}
        onAdd={this.addHandler.bind(this)}
        onUpdate={this.updateHandler.bind(this)}
        onRemove={this.removeHandler.bind(this)}>
        {children}
      </draggable>)
  }

  toString() {
    return {
      type: this.type,
      path: this. path,
      children: this.children.map(child => child.toString())
    }
  }
}
