import IntermediateNode from './nodes/base/intermediate'
import DnDNode from './nodes/base/dnd'
import PageNode from './nodes/general/page'
import TextFieldNode from './nodes/general/text'

const initState = new IntermediateNode([ // --> root node
  new DnDNode([
    new PageNode([
      new DnDNode([])
    ]),
    new PageNode([
      new DnDNode([
        new TextFieldNode('a'),
        new TextFieldNode('b')
      ])
    ])
  ])
])

export default initState
