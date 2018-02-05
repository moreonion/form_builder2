import {mapState, mapGetters} from 'vuex'
import {DnDItems} from 'mo-vue-dnd'
import './Palette.scss'
import {PALETTE_DND_GROUP} from '../../config/dnd'

export default {
  components: {DnDItems},
  computed: {
    ...mapState('palette', ['activeNames']),
    ...mapGetters('palette', {
      palette: 'paletteState'
    })
  },
  render(h) {
    const slots = {default: props => props.item.renderFn(h, props.item)}

    const content = this.palette.groups.map((paletteGroup, i) => (
      <el-collapse value={this.activeNames} accordion>
        <el-collapse-item title={paletteGroup.label} name={i}>
          <DnDItems group={PALETTE_DND_GROUP} items={paletteGroup.items} options={paletteGroup.dndOptions} scopedSlots={slots}/>
        </el-collapse-item>
      </el-collapse>))

    return <div>{content}</div>
  }
}
