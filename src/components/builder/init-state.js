import {IntermediateNode} from './nodes/base/intermediate'
import {DnDNode} from './nodes/base/dnd'
import {DragNode} from './nodes/base/drag/drag'
import {PageNode} from './nodes/general/page'
import {TextFieldNode} from './nodes/general/text'
import {FirstNameNode} from './nodes/contact/first-name'

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
  new PageNode([
    new DnDNode([
      new TextFieldNode('Text 123')
    ])
  ])
])

export default initState
