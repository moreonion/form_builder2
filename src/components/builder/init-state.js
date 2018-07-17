import {Node} from './node'

const initState = new Node({type: 'root'}, [
  new Node({
    type: 'page',
    label: 'My first page',
    formKey: 'page_0',
    wrapperCls: ''
  }, [])
])

export default initState
