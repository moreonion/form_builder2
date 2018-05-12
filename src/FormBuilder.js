import {mapState, mapGetters} from 'vuex'
import {DnDContext} from 'mo-vue-dnd'
import bus from './bus'
import {ITEM_DRAG, ITEM_DROP} from './events'

import './FormBuilder.scss'

import Palette from './components/palette/Palette'
import Builder from './components/builder/Builder'
import Version from './components/version/Version'
import Debug from './components/debug/Debug'
// import Settings from './components/Settings'
// import Legend from './components/Legend'

var unwatchDnd

export default {
  computed: {
    ...mapGetters('palette', {
      palette: 'paletteState'
    }),
    ...mapState('builder', ['rootNode'])
  },
  mounted() {
    // Unless mo-vue-dnd emits more events, we have to watch child component state :-(
    unwatchDnd = this.$refs.dndContext.$watch('state', function(val) {
      if (val) {
        bus.$emit(ITEM_DRAG)
        console.log('ITEM_DRAG')
      } else {
        bus.$emit(ITEM_DROP)
        console.log('ITEM_DROP')
      }
    })
  },
  beforeDestroy() {
    unwatchDnd()
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
      <DnDContext scopedSlots={slots} debug={true} ref={'dndContext'}>
        <div class="wrapper">
          <el-row gutter={20}>
            <el-col xs={24} sm={8}>
              <Palette/>
              <Version/>
            </el-col>
            <el-col xs={24} sm={14}>
              {/* <Settings/> */}
              <Builder rootNode={this.rootNode}/>
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
