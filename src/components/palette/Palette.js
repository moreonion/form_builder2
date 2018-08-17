/**
 * Palette component.
 */

import {mapState} from 'vuex'
import {DnDItems} from 'mo-vue-dnd' // eslint-disable-line no-unused-vars

import Item from './item'

import {PALETTE_DND_GROUP, PALETTE_DND_OPTIONS} from '../../config/dnd'
import {plugins} from '../../config/global'

export default {
  name: 'Palette',

  data () {
    return {
      /** {string[]} Array of identifiers of the groups. */
      groups: Drupal.settings.campaignion_form_builder.paletteGroups.map(group => group.name),
      /** {string[]} Array of display labels of the groups. */
      groupLabels: Drupal.settings.campaignion_form_builder.paletteGroups.map(group => group.label),
      /** {integer} Zero-based index of the expanded group. */
      expanded: 0,
      /** {Object[]} Array of template plugins. */
      elTemplates: plugins.templates
    }
  },

  computed: {
    /** {(Node|null)} The tree. */
    ...mapState('builder', ['rootNode'])
  },

  methods: {
    /**
     * Instantiate items for a group.
     * @param {string} group Ientifier of the group.
     * @returns {Item[]} Array of item instances belonging to this group.
     */
    itemsByGroup (group) {
      const items = []
      this.elTemplates.filter(elTemplate => elTemplate.group === group)
        .sort((a, b) => a - b)
        .forEach((elTemplate) => {
          items.push(new Item(elTemplate))
        })
      return items
    }
  },

  render (h) {
    // Render the palette items into DnDItems’ default slots.
    const slots = {default: props => props.item.renderFn(h)}

    const content = this.groups.map((groupName, i) => (
      <el-collapse v-model={this.expanded} accordion>
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
