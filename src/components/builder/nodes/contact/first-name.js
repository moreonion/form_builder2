import TextFieldNode from '../general/text'

export default class FirstNameNode extends TextFieldNode {
  constructor(label='First name', labelPos='top', labelWidth='100px') {
    super(label, labelPos, labelWidth)
    this.type = 'first-name'
  }
}
