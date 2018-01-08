import {TextFieldNode} from '../general/text'

export const NODE_TYPE_FIRST_NAME = 'first-name'

export class FirstNameNode extends TextFieldNode {
  constructor(label='First name', labelPos='top', labelWidth='100px') {
    super(label, labelPos, labelWidth)
    this.type = NODE_TYPE_FIRST_NAME
  }
}
