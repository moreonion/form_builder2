import {IntermediateNode} from './nodes/base/intermediate'
import {DnDNode} from './nodes/base/dnd'
// import {DragNode} from './nodes/base/drag/drag'
import {PageNode} from './nodes/general/page'
import {TextFieldNode} from './nodes/general/text'
import {FieldSetNode} from './nodes/general/field-set';

const initState = new IntermediateNode([
  new DnDNode([
    new PageNode([
      new DnDNode([
        new FieldSetNode([
          new DnDNode([])
        ])
        // new TextFieldNode('Text 123'),
        // new FieldSetNode([
        //    new DnDNode([
        //      new TextFieldNode('text', 'label')
        //    ])
        // ])
      ])
    ]),
    new PageNode([
      new DnDNode([
      ])
    ])
  ])
])

export default initState
