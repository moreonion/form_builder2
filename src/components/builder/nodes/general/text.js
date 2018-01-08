import AbstractNode from '../base/abstract'

export default class TextFieldNode extends AbstractNode {
  constructor(label='Textfield', labelPos='top', labelWidth='100px') {
    super()
    this.type = 'text'
    this.label = label
    this.labelPos = labelPos
    this.labelWidth = labelWidth
    this.key = Math.random()
  }

  renderNode(h) {
    return (
      <el-form id={this.path} key={this.key} label-position={this.labelPos} label-width={this.labelWidth}>
        <el-form-item label={this.label}>
          <el-input></el-input>
        </el-form-item>
      </el-form>
    )
  }

  toString() {
    return {
      type: this.type,
      path: this.path,
      label: this.label
    }
  }
}
