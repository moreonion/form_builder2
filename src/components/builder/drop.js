import DropResult from '../../../node_modules/mo-vue-dnd/src/drop/DropResult'
import DropContext from '../../../node_modules/mo-vue-dnd/src/drop/DropContext'
import ItemContext from '../../../node_modules/mo-vue-dnd/src/items/ItemContext'

import bus from '../../bus'

export default function drop(itemIntersection) {
  const debug = {}
  debug.itemInt = itemIntersection
  const itemInt = itemIntersection
  const sc = itemInt.srcCtx
  const tc = itemInt.trgCtx

  // A small guide to how this handler seems to work:
  //
  // `sc.cnt` - Array of all items in the container where the dragged item belonged,
  //           in their original order, including the dragged item
  // `sc.idx` - the index of the dragged item at its original position in its original container
  // `tc.cnt` - Array of all items in the container that the dradgged item is to be added to,
  //           in their original order, not including the dragged item
  // tc.idx - the index where the dragged item would be added
  //
  // `trgResult` - Array of all items in the target container as it will look like if the
  //               dragged item is dropped here - including the dragged item
  //
  // `this` refers to the DnDItems instance (container) that fired the handler

  const cloneItem = () => sc.options.cloneItemFn(sc.item, tc.grp)
  const trgIndex = itemInt.insBef ? tc.idx : tc.idx + 1

  const operationAccepted = targetIndex => {
    const tree = this.$store.state.builder.rootNode
    const draggedNode = this.$store.state.builder.draggedNode // Get the dragged node from the store to be sure it’s not the palette item.
    const newParent = this.$parent.$options.propsData.element // Get the target element via the DnDItems’ parent component.
    var acceptedByParent, acceptsParent

    try {
      acceptedByParent = this.$root.$options.plugins.types[newParent.type].acceptsChild(tree, newParent, draggedNode, targetIndex)
    } catch (e) {
      acceptedByParent = this.$root.$options.plugins.types['missing'].acceptsChild(tree, newParent, draggedNode, targetIndex)
    }
    try {
      acceptsParent = this.$root.$options.plugins.types[draggedNode.type].acceptsParent(tree, newParent, draggedNode, targetIndex)
    } catch (e) {
      acceptsParent = this.$root.$options.plugins.types['missing'].acceptsParent(tree, newParent, draggedNode, targetIndex)
    }

    return acceptsParent && acceptedByParent
  }

  if(itemInt.isSameContext) {
    // source=traget
    let trgResult = null
    let needsUpdate = false
    if(sc.idx === tc.idx) {
      trgResult = sc.cnt
    } else if(sc.idx < tc.idx) {
      if(itemInt.insBef && sc.idx === tc.idx-1) {
        trgResult = sc.cnt
      } else {
        needsUpdate = true
        trgResult = sc.cnt.slice(0, sc.idx)
          .concat(sc.cnt.slice(sc.idx+1, trgIndex))
          .concat(cloneItem())
          .concat(sc.cnt.slice(trgIndex))
      }
    } else {
      if(!itemInt.insBef && sc.idx === tc.idx+1) {
        trgResult = sc.cnt
      } else {
        needsUpdate = true
        trgResult = sc.cnt.slice(0, trgIndex)
          .concat(cloneItem())
          .concat(sc.cnt.slice(trgIndex, sc.idx))
          .concat(sc.cnt.slice(sc.idx+1))
      }
    }

    let tItemIndex = null
    if(sc.idx < tc.idx) {
      tItemIndex = itemInt.insBef ? tc.idx-1: tc.idx
    } else if(sc.idx > tc.idx) {
      tItemIndex = itemInt.insBef ? tc.idx: tc.idx+1
    } else {
      tItemIndex = tc.idx
    }

    debug.srcResult = srcResult
    debug.trgResult = trgResult
    bus.$emit('debug-drop', debug)

    if (!operationAccepted(tItemIndex)) {
      // Can’t drop the item here.
      return null
    }

    // const sd = td (source = target)
    const td = new DropContext(trgResult, sc.updateFn, needsUpdate)
    const tItemContext = new ItemContext(tc.grp, trgResult, tItemIndex, tc.options, tc.updateFn)
    return new DropResult(td, td, tItemContext, true)
  } else {
    // source!==target
    var srcResult = sc.options.allowItemRemoval ?
      sc.cnt.filter((val, index) => index !== sc.idx):
      sc.cnt

    let trgResult = null
    let tItemIndex = null
    if(tc.cnt.length === 0) {
      // target is []
      trgResult = [cloneItem()]
      tItemIndex = 0
    } else {
      trgResult = tc.cnt.slice(0, trgIndex)
        .concat(cloneItem())
        .concat(tc.cnt.slice(trgIndex))

      tItemIndex = itemInt.insBef ? tc.idx: tc.idx+1
    }

    debug.srcResult = srcResult
    debug.trgResult = trgResult
    bus.$emit('debug-drop', debug)

    if (!operationAccepted(tItemIndex)) {
      // Can’t drop the item here.
      return null
    }

    const sd = new DropContext(srcResult, sc.updateFn, sc.options.allowItemRemoval)
    const td = new DropContext(trgResult, tc.updateFn, true)
    const tItemContext = new ItemContext(tc.grp, trgResult, tItemIndex, tc.options, tc.updateFn)
    return new DropResult(sd, td, tItemContext, false)
  }
}
