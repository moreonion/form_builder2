import {mapState, mapGetters} from 'vuex'
import {DnDItems} from 'mo-vue-dnd'
import './Palette.scss'
import {encodePaletteItem, decodePaletteItem} from './util'
import {PALETTE_DND_WRAPER_CLASSNAME} from '../../config/palette'
import {BUILDER_ROOT_DIV_ID} from '../../config/builder'
import PageFieldItem from './fields/general/page'

export default {
  components: {DnDItems},
  computed: {
    paletteWrapperClsName: () => PALETTE_DND_WRAPER_CLASSNAME,
    ...mapState('palette', ['activeName']),
    ...mapGetters('palette', {
      palette: 'paletteState'
    })
  },
  methods: {
    encodePaletteItem,
    moveHandler(event) {
      const paletteModelId = decodePaletteItem(event.dragged.id)
      if(paletteModelId !== null) {
        const {paletteGroupIndex, paletteItemIndex} = paletteModelId
        const paletteModel = this.$store.getters['palette/getPaletteItem'](paletteGroupIndex, paletteItemIndex)

        if(paletteModel instanceof PageFieldItem) {
          /*
          * RULE: Page node is only allowed as child of root node.
          */
          return event.to.parentNode.id === BUILDER_ROOT_DIV_ID
        } else if(event.to.parentNode.id === BUILDER_ROOT_DIV_ID) {
          /*
          * RULE: Children of root may only be page nodes.
          */
          return paletteModel instanceof PageFieldItem
        }
      }

      return true
    },
    removeHandler(event) {
    },
    endHandler(event) {
    }
  },
  render() {
    const renderItem = props => (
      <div class="paletteItem">
        <fa-icon icon={props.item.icon}></fa-icon> <span>{props.item.label}</span>
      </div>)
    const slots = {default: renderItem}

    const content = this.palette.groups.map((paletteGroup, i) => (
      <el-collapse value={this.activeName} accordion>
        <el-collapse-item title={paletteGroup.label} name={i} key={i}>
          <DnDItems items={paletteGroup.items} options={paletteGroup.dndOptions} scopedSlots={slots}/>
        </el-collapse-item>
      </el-collapse>))

    return <div>{content}</div>
  }
}