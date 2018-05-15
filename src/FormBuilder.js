import {mapState, mapGetters} from 'vuex'
import {DnDContext} from 'mo-vue-dnd'
import bus from './bus'
import {ITEM_DRAG, ITEM_DROP} from './events'
import Item from './components/palette/item'

import './FormBuilder.scss'

import Palette from './components/palette/Palette'
import Builder from './components/builder/Builder'
import Version from './components/version/Version'
import Debug from './components/debug/Debug'

var unwatchDnd

export default {
  computed: {
    ...mapState('builder', ['rootNode'])
  },
  mounted() {
    // Unless mo-vue-dnd emits more events, we have to watch child component state :-(
    unwatchDnd = this.$refs.dndContext.$watch('state', val => {
      if (val) {
        var draggedNode = this.$refs.dndContext.selIt.cnt[this.$refs.dndContext.selIt.idx]
        // If it’s a palette item, get the according node.
        if (draggedNode instanceof Item) {
          draggedNode = draggedNode.nodeFactoryProxy()
        }
        bus.$emit(ITEM_DRAG, {node: draggedNode})
        this.$store.commit('builder/dragNode', {node: draggedNode})
      } else {
        bus.$emit(ITEM_DROP, {node: this.$store.state.builder.draggedNode})
        this.$store.commit('builder/dropNode')
      }
    })
  },
  beforeDestroy() {
    unwatchDnd()
  },
  render(h) {
    const slots = {default: props => props.item.renderFn(h)}
    return (
      <DnDContext scopedSlots={slots} ref={'dndContext'}>
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
