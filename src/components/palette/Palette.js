import {mapState} from 'vuex'
import {DnDItems} from 'mo-vue-dnd'
import bus from '../../bus'

import Item from './item'

import {ITEM_DROP} from '../../events'
import {PALETTE_DND_GROUP, PALETTE_DND_OPTIONS} from '../../config/dnd'

// TODO: get groups from server
// TODO: get plugins from global scope, combine them with drupal settings
import page from '../../plugins/element-templates/page'
import fieldset from '../../plugins/element-templates/fieldset'
import select from '../../plugins/element-templates/select'

export default {
  name: 'Palette',
  data() {
    return {
      groups: ['CRM fields', 'Generic fields', 'Containers'],
      expanded: [0, 1, 2],
      // TODO register plugins automatically:
      elTemplates: [
        page,
        fieldset,
        select
      ]
    }
  },
  computed: {
    ...mapState('builder', ['rootNode'])
  },
  methods: {
    itemsByGroup(group) {
      const items = []
      this.elTemplates.filter(elTemplate => elTemplate.group === group)
        .sort((a, b) => a - b)
        .forEach((elTemplate) => {
          items.push(new Item(elTemplate, this.$store))
        })
      return items
    },
    onCollapseToggle(expanded) {
      this.expanded = expanded
    }
  },
  render(h) {
    const slots = {default: props => props.item.renderFn(h)}

    const content = this.groups.map((paletteGroup, i) => (
      <el-collapse value={this.expanded} onChange={this.onCollapseToggle}>
        <el-collapse-item title={paletteGroup} name={i}>
          <DnDItems group={PALETTE_DND_GROUP}
            options={PALETTE_DND_OPTIONS}
            items={this.itemsByGroup(this.groups[i])}
            scopedSlots={slots} />
        </el-collapse-item>
      </el-collapse>))

    return <div class="mfb-palette">{content}</div>
  }
}
