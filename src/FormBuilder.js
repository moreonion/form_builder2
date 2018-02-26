import {mapState, mapGetters} from 'vuex'
import {DnDContext} from 'mo-vue-dnd'

import './FormBuilder.scss'

import Palette from './components/palette/Palette'
import Builder from './components/builder/Builder'
import BuilderContext from './components/builder/context/Context'
import Version from './components/version/Version'
import Debug from './components/debug/Debug'
// import Settings from './components/Settings'
// import Legend from './components/Legend'

export default {
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
    const slots = {default: props => props.item.renderFn(h, props.item)}
    return (
      <DnDContext scopedSlots={slots}>
        <div class="wrapper">
          <el-row gutter={20}>
            <el-col xs={24} sm={8}>
              <Palette/>
              <Version/>
            </el-col>
            <el-col xs={24} sm={14}>
              {/* <Settings/> */}
              <BuilderContext>
                <Builder rootNode={this.rootNode}/>
              </BuilderContext>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <Debug/>
            </el-col>
          </el-row>
        </div>
      </DnDContext>)
  }
}
