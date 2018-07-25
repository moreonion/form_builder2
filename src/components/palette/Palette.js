import {mapState} from 'vuex'
import {DnDItems} from 'mo-vue-dnd' // eslint-disable-line no-unused-vars

import Item from './item'

import {PALETTE_DND_GROUP, PALETTE_DND_OPTIONS} from '../../config/dnd'

export default {
  name: 'Palette',
  data () {
    return {
      groups: Drupal.settings.campaignion_form_builder.paletteGroups.map(group => group.name),
      groupLabels: Drupal.settings.campaignion_form_builder.paletteGroups.map(group => group.label),
      expanded: Drupal.settings.campaignion_form_builder.paletteGroups.map((group, i) => i), // Every group is expanded by default.
      elTemplates: window.moFormBuilder.plugins.templates
    }
  },
  computed: {
    ...mapState('builder', ['rootNode'])
  },
  methods: {
    itemsByGroup (group) {
      const items = []
      this.elTemplates.filter(elTemplate => elTemplate.group === group)
        .sort((a, b) => a - b)
        .forEach((elTemplate) => {
          items.push(new Item(elTemplate))
        })
      return items
    },
    onCollapseToggle (expanded) {
      this.expanded = expanded
    }
  },
  render (h) {
    const slots = {default: props => props.item.renderFn(h)}

    const content = this.groups.map((groupName, i) => (
      <el-collapse value={this.expanded} onChange={this.onCollapseToggle}>
        <el-collapse-item title={this.groupLabels[i]} name={i}>
          <DnDItems group={PALETTE_DND_GROUP}
            options={PALETTE_DND_OPTIONS}
            items={this.itemsByGroup(groupName)}
            scopedSlots={slots} />
        </el-collapse-item>
      </el-collapse>))

    return <div class="mfb-palette-boxes">{content}</div>
  }
}
