import AbstractNode from '../base/abs-node'

export default class TextFieldNode extends AbstractNode {
  constructor(label='Textfield', labelPos='top', labelWidth='100px') {
    super()
    this.label = label
    this.labelPos = labelPos
    this.labelWidth = labelWidth
  }

  renderNode(h) {
    return (
      <el-form key={Math.random()} label-position={this.labelPos} label-width={this.labelWidth}>
        <el-form-item label={this.label}>
          <el-input></el-input>
        </el-form-item>
      </el-form>
    )
  }
}
