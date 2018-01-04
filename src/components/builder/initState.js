import IntermediateNode from './nodes/base/intermediate'
import PageNode from './nodes/general/page'
import TextFieldNode from './nodes/general/textfield'

const initState = new IntermediateNode([new PageNode([new TextFieldNode('INIT :)')])])

export default initState
