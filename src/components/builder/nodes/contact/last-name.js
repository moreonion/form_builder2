import {TextFieldNode} from '../general/text'

export const NODE_TYPE_LAST_NAME = 'last-name'

export class LastNameNode extends TextFieldNode {
  constructor(label='Last name', labelPos='top', labelWidth='100px') {
    super(label, labelPos, labelWidth)
    this.type = NODE_TYPE_LAST_NAME
  }
}
