import {IntermediateNode} from './nodes/base/intermediate'
import {DnDNode} from './nodes/base/dnd'
import {PageNode} from './nodes/general/page'
import {TextFieldNode} from './nodes/general/text'
import {FieldSetNode} from './nodes/general/field-set';

const initState = new IntermediateNode([
  new PageNode([
    new DnDNode([
      new FieldSetNode([
        new DnDNode([
          new TextFieldNode('Other')
        ])
      ]),
      new TextFieldNode('Text 123'),
    ])
  ])
])

export default initState
