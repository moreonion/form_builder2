import PaletteTextField from './fields/general/text'
import PalettePageField from './fields/general/page'
import PaletteFieldSetField from './fields/general/field-set'

import PaletteFirstNameField from './fields/contact/first-name'
import PaletteLastNameField from './fields/contact/last-name'

import {PALETTE_DND_GROUP, PALETTE_DND_OPTIONS} from '../../config/dnd'

export function getInitPaletteState() {
  return {
    groups: [
      {
        label: 'Contact',
        dndOptions: {
          group: {name: PALETTE_DND_GROUP, pull: true, put: false},
          sort: false
        },
        fields: [
          new PaletteFirstNameField(),
          new PaletteLastNameField()
        ]
      },
      {
        label: 'General fields',
        dndOptions: {
          group: {name: PALETTE_DND_GROUP, pull: 'clone', put: false},
          sort: false
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
