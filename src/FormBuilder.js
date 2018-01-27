import {mapState, mapGetters} from 'vuex'
import {DnDContext} from 'mo-vue-dnd'
import './FormBuilder.scss'
import Palette from './components/palette/Palette.vue'
import Settings from './components/Settings.vue'
// import Legend from './components/Legend.vue'
import Builder from './components/builder/Builder'

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
        return props.item.renderNode(h)
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
          </el-row>
        </div>
      </DnDContext>)
  }
}
