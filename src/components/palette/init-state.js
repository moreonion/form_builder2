import {Palette} from './palette'
import {PaletteGroup} from './palette-group'

import PaletteTextField from './fields/general/text'
import PalettePageField from './fields/general/page'
import PaletteFieldSetField from './fields/general/field-set'

import PaletteFirstNameField from './fields/contact/first-name'
import PaletteLastNameField from './fields/contact/last-name'

import {PALETTE_DND_GROUP, PALETTE_DND_OPTIONS} from '../../config/dnd'

export function getInitPaletteState() {
  return new Palette([
    new PaletteGroup('Contact', {
      group: {name: PALETTE_DND_GROUP, pull: true, put: false},
      sort: false
    }, [
      new PaletteFirstNameField(),
      new PaletteLastNameField()
    ]),
    new PaletteGroup('General fields', {
      group: {name: PALETTE_DND_GROUP, pull: 'clone', put: false},
      sort: false
    }, [
      new PaletteTextField(),
      new PalettePageField(),
      new PaletteFieldSetField()
    ])
  ])
}
