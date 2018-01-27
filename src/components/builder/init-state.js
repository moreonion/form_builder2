import {IntermediateNode} from './nodes/base/intermediate'
import {DnDNode} from './nodes/base/dnd'
import {DragNode} from './nodes/base/drag/drag'
import {PageNode} from './nodes/general/page'
import {TextFieldNode} from './nodes/general/text'
import {FirstNameNode} from './nodes/contact/first-name'
import {wrapDragNode} from './util'
import {encodePath} from './path'

// const initState = new IntermediateNode([ // --> root node
//   new DnDNode([
//     wrapDragNode(
//       new PageNode([
//         new DnDNode([
//           wrapDragNode(new FirstNameNode()),
//           wrapDragNode(new TextFieldNode())
//         ])
//       ]))
//   ])
// ])

const initState = new IntermediateNode([
  new DnDNode([
    new FirstNameNode(),
    new TextFieldNode()
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
