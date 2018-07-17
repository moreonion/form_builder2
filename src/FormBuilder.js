import {mapState} from 'vuex'
import bus from './bus'
import {ITEM_DRAG, ITEM_DROP} from './events'
import Item from './components/palette/item'

import './FormBuilder.scss'

import {DnDContext} from 'mo-vue-dnd' // eslint-disable-line no-unused-vars
import Palette from './components/palette/Palette' // eslint-disable-line no-unused-vars
import Builder from './components/builder/Builder' // eslint-disable-line no-unused-vars
import ConfigDialog from './components/config/ConfigDialog' // eslint-disable-line no-unused-vars
// import Debug from './components/debug/Debug'

import {PALETTE_DISPLAY_BREAKPOINT} from './config/general'

var unwatchDnd
var resizeHandler

export default {
  computed: {
    ...mapState('builder', ['rootNode']),
    ...mapState(['windowWidth'])
  },
  data () {
    return {
      palettePopoverVisible: false
    }
  },
  mounted () {
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

    // Node module needs a reference to the root Vue instance.
    this.$store.state.builder.rootNode.referenceVueInstance(this.$root)

    resizeHandler = () => {
      this.$store.commit('updateWindowWidth')
      // Close popover when screen turned big.
      if (this.windowWidth >= PALETTE_DISPLAY_BREAKPOINT) {
        this.palettePopoverVisible = false
      }
    }
    window.addEventListener('resize', resizeHandler)

    // Hide mobile palette popover on drag.
    bus.$on(ITEM_DRAG, this.itemDragHandler)

    // Does the user touch the device?
    window.addEventListener('touchstart', function firstTouchHandler () {
      document.body.classList.add('user-touches')
      window.removeEventListener('touchstart', firstTouchHandler, false)
    }, false)
  },
  beforeDestroy () {
    unwatchDnd()
    window.removeEventListener('resize', resizeHandler)
    bus.$off(ITEM_DRAG, this.itemDragHandler)
  },
  methods: {
    itemDragHandler () {
      this.palettePopoverVisible = false
    },
    text (text) {
      switch (text) {
        case 'show palette dropdown': return Drupal.t('Add field')
        case 'Add new form fields': return Drupal.t('Add new form fields')
        case 'Form preview': return Drupal.t('Form preview')
      }
    }
  },
  render (h) {
    const slots = {default: props => props.item.renderFn(h)}
    const mobilePalette = this.windowWidth < PALETTE_DISPLAY_BREAKPOINT
      ? <el-popover
        class="mfb-show-mobile-palette"
        popper-class="mfb-palette mfb-palette-mobile"
        v-model={this.palettePopoverVisible}
        placement="bottom"
        visible-arrow={false}
        width={this.windowWidth - 10}
        trigger="click">
        <el-button slot="reference">
          {this.text('show palette dropdown')}<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <Palette />
      </el-popover>
      : null
    const desktopPalette = this.windowWidth >= PALETTE_DISPLAY_BREAKPOINT
      ? <section class="mfb-palette mfb-palette-desktop">
        <h1>{this.text('Add new form fields')}</h1>
        <Palette />
      </section>
      : null

    return (
      <div class="mfb-app">
        <DnDContext scopedSlots={slots} ref={'dndContext'}>
          {mobilePalette}
          <section class="mfb-builder">
            <h1>{this.text('Form preview')}</h1>
            <Builder rootNode={this.rootNode}/>
          </section>
          {desktopPalette}
        </DnDContext>
        <ConfigDialog />
      </div>
    )
  }
}
