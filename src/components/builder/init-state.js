import IntermediateNode from './nodes/base/intermediate'
import {DnDNode} from './nodes/base/dnd'
import {DragNode} from './nodes/base/drag/drag'
import {PageNode} from './nodes/general/page'
import {TextFieldNode} from './nodes/general/text'
import {encodePath} from './encode-path'

const initState = new IntermediateNode([ // --> root node
  new DnDNode([
    new PageNode([
      new DnDNode([
        new DragNode(
          new TextFieldNode())
      ])
    ])
  ])
])

/*
 * Attach path encoding
 * E.g.: 0-1-0-2
 * Meaning start with root node, take 0 child, then 1 child, ... to locate leaf
 * Needed to manage data model with nested drag and drop.
 */
encodePath(initState, '')

export default initState
