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

  const cloneItem = () => sc.options.cloneItemFn(sc.item, tc.grp)
  const trgIndex = itemInt.insBef ? tc.idx : tc.idx + 1

  const tree = this.$store.state.builder.rootNode
  const item = sc.cnt[sc.idx]
  const parent = this.$el.getAttribute('data-node-id')
  const parentIndex = itemInt.insBef || !tc.cnt.length ? tc.idx : tc.idx + 1

  tc.options.perms.in.tree = item.canDropAt(tree, parent, parentIndex)
  console.log(tc.options.perms.in.tree ? 'may' : 'may not', 'drop', item.type, `(${item.id})`, 'in', parent, 'at position', parentIndex)

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

    const sd = new DropContext(srcResult, sc.updateFn, sc.options.allowItemRemoval)
    const td = new DropContext(trgResult, tc.updateFn, true)
    const tItemContext = new ItemContext(tc.grp, trgResult, tItemIndex, tc.options, tc.updateFn)
    return new DropResult(sd, td, tItemContext, false)
  }
}
