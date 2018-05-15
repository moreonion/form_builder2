import {Node} from './node'

const initState = new Node({type: 'root'}, [
  new Node({
    type: 'page',
    title: 'My first page'
  }, [])
])

export default initState
