import PaletteTextField from './fields/general/text'
import PalettePageField from './fields/general/page'
import PaletteFieldSetField from './fields/general/field-set'

import PaletteFirstNameField from './fields/contact/first-name'

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
          new PaletteFirstNameField()
        ]
      },
      {
        label: 'General fields',
        dndOptions: {
          group: {name: PALETTE_DND_GROUP, pull: 'clone', put: false}
        },
        fields: [
          new PaletteTextField(),
          new PalettePageField(),
          new PaletteFieldSetField()
        ]
      }
    ]
  }
}
