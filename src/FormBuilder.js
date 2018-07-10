import {mapState, mapGetters} from 'vuex'
import {DnDContext} from 'mo-vue-dnd'
import bus from './bus'
import {ITEM_DRAG, ITEM_DROP} from './events'
import Item from './components/palette/item'

import './FormBuilder.scss'

import Palette from './components/palette/Palette'
import Builder from './components/builder/Builder'
import ConfigDialog from './components/config/ConfigDialog'
// import Debug from './components/debug/Debug'

import {PALETTE_DISPLAY_BREAKPOINT} from './config/general'

var unwatchDnd
var resizeHandler

export default {
  computed: {
    ...mapState('builder', ['rootNode'])
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      palettePopoverVisible: false
    }
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

    // Node module needs a reference to vuex store.
    this.$store.state.builder.rootNode.referenceStore(this.$store)

    resizeHandler = () => {
      this.windowWidth = window.innerWidth
    }
    window.addEventListener('resize', resizeHandler)

    // Hide mobile palette popover on drag.
    bus.$on(ITEM_DRAG, this.itemDragHandler)
  },
  beforeDestroy() {
    unwatchDnd()
    window.removeEventListener('resize', resizeHandler)
    bus.$off(ITEM_DRAG, this.itemDragHandler)
  },
  methods: {
    itemDragHandler() {
      this.palettePopoverVisible = false
    },
    text(text) {
      switch (text) {
        case 'show palette dropdown': return Drupal.t('Add field')
      }
    }
  },
  render(h) {
    const slots = {default: props => props.item.renderFn(h)}
    const mobilePalette = this.windowWidth < PALETTE_DISPLAY_BREAKPOINT ?
      <el-popover
        class="mfb-show-mobile-palette"
        v-model={this.palettePopoverVisible}
        placement="bottom"
        visible-arrow={false}
        width={this.windowWidth - 10}
        trigger="click">
        <el-button type="primary" slot="reference">
          {this.text('show palette dropdown')}<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <Palette />
      </el-popover>
      : null
    const desktopPalette = this.windowWidth >= PALETTE_DISPLAY_BREAKPOINT ? <Palette /> : null

    return (
      <div>
        <DnDContext scopedSlots={slots} ref={'dndContext'}>
          {mobilePalette}
          <Builder rootNode={this.rootNode}/>
          {desktopPalette}
        </DnDContext>
        <ConfigDialog />
      </div>
    )
  }
}
