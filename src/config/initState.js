import IntermediateNode from '../components/nodes/base/intermediate'
import PageNode from '../components/nodes/general/page'
import TextFieldNode from '../components/nodes/general/textfield'

const initState = new IntermediateNode([new PageNode([new TextFieldNode('INIT :)')])])

export default initState
