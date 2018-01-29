import {Palette, PaletteGroup} from './palette-model'

import TextFieldItem from './items/general/text'
import PageFieldItem from './items/general/page'
import FieldSetItem from './items/general/field-set'

import FirstNameItem from './items/contact/first-name'
import LastNameItem from './items/contact/last-name'

import {
  PALETTE_CONTACT_DND_OPTIONS,
  PALETTE_GENERAL_DND_OPTIONS
} from '../../config/dnd'

export function getInitPaletteState() {
  return new Palette([
    new PaletteGroup('Contact', PALETTE_CONTACT_DND_OPTIONS, [
      new FirstNameItem(),
      new LastNameItem()
    ]),
    new PaletteGroup('General fields', PALETTE_GENERAL_DND_OPTIONS, [
      new TextFieldItem(),
      new PageFieldItem(),
      new FieldSetItem()
    ])
  ])
}
