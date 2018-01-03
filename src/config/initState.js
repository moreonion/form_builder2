import IntermediateNode from '../components/builder/nodes/base/intermediate'
import PageNode from '../components/builder/nodes/general/page'
import TextFieldNode from '../components/builder/nodes/general/textfield'

const initState = new IntermediateNode([new PageNode([new TextFieldNode('INIT :)')])])

export default initState
