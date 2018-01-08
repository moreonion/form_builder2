import TextFieldNode from '../general/text'

export default class LastNameNode extends TextFieldNode {
  constructor(label='Last name', labelPos='top', labelWidth='100px') {
    super(label, labelPos, labelWidth)
    this.type = 'last-name'
  }
}
