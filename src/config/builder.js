export const BUILDER_ROOT_DIV_ID = 'root'

import {NODE_TYPE_FIRST_NAME} from '../components/builder/nodes/contact/first-name'
import {NODE_TYPE_LAST_NAME} from '../components/builder/nodes/contact/last-name'

export const BUILDER_SINGLETON_NODES = [NODE_TYPE_FIRST_NAME, NODE_TYPE_LAST_NAME]

export const BUILDER_IS_SINGLETON_NODE_MAP =
  BUILDER_SINGLETON_NODES.reduce((accum, nodeType) => {
    accum[nodeType] = true
    return accum
  }, {})
