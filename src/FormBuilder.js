import {mapState, mapGetters} from 'vuex'
import {DnDContext} from 'mo-vue-dnd'
import './FormBuilder.scss'
import Palette from './components/palette/Palette'
import Settings from './components/Settings'
// import Legend from './components/Legend'
import Builder from './components/builder/Builder'
import {AbstractNode} from './components/builder/nodes/base/abstract'

export default {
  components: {
    DnDContext,
    Builder,
    Palette,
    Settings,
    // Legend
  },
  computed: {
    ...mapGetters('palette', {
      palette: 'paletteState'
    }),
    ...mapState('builder', ['rootNode'])
  },
  methods: {
    prettyPrintPalette(palette) {
      return {
        groups: palette.groups.map(group => {
          return {
            label: group.label,
            items: group.items.map(item => {
              return {
                label: item.label,
                icon: item.icon.iconName
              }
            })
          }
        })
      }
    }
  },
  render(h) {
    const slots = {
      default: props => {
        return props.item instanceof AbstractNode ?
          props.item.renderNode(h):
          props.item.renderItem(h)
      }
    }
    return (
      <DnDContext scopedSlots={slots}>
        <div class="wrapper">
          <el-row gutter={20}>
            <el-col xs={24} sm={8}>
              <Palette/>
            </el-col>
            <el-col xs={24} sm={14}>
              <Settings/>
              <Builder rootNode={this.rootNode}/>
            </el-col>
            <el-col xs={24} sm={14}>
              <h4>Builder</h4>
              <pre style="font-size: 8px">{JSON.stringify(this.rootNode, null, 2)}</pre>
              <h4>Palette</h4>
              <pre style="font-size: 8px">{JSON.stringify(this.palette, null, 2)}</pre>
            </el-col>
          </el-row>
        </div>
      </DnDContext>)
  }
}
