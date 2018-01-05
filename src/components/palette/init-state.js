import PaletteTextField from '../palette/fields/general/text'
import {PALETTE_DND_GROUP, PALETTE_DND_OPTIONS} from '../../config/dnd'

export function getPaletteConfig() {
  return {
    groups: [
      {
        label: 'Contact record fields',
        dndOptions: {
          group: {name: PALETTE_DND_GROUP, pull: true, put: false}
        },
        fields: [
          new PaletteTextField()
        ]
      },
      {
        label: 'General fields',
        dndOptions: {
          group: {name: PALETTE_DND_GROUP, pull: 'clone', put: false}
        },
        fields: [
          new PaletteTextField()
        ]
      }
    ]
  }
}
