import {DnDOptions} from 'mo-vue-dnd'
import {Palette, PaletteGroup} from './palette-model'

import TextFieldItem from './fields/general/text'
import PageFieldItem from './fields/general/page'
import FieldSetItem from './fields/general/field-set'

import FirstNameItem from './fields/contact/first-name'
import LastNameItem from './fields/contact/last-name'

import {PALETTE_DND_GROUP, PALETTE_DND_OPTIONS, BUILDER_DND_GROUP} from '../../config/dnd'

const palettePermissions = [
  [],                   // in: from nowhere
  [BUILDER_DND_GROUP]   // out: just to builder
]

const contactItemsOptions = new DnDOptions()
contactItemsOptions.permissions = palettePermissions

const generalItemsOptions = new DnDOptions()
generalItemsOptions.allowItemRemoval = false
generalItemsOptions.permissions = palettePermissions

export function getInitPaletteState() {
  return new Palette([
    new PaletteGroup('Contact', contactItemsOptions, [
      new FirstNameItem(),
      new LastNameItem()
    ]),
    new PaletteGroup('General fields', generalItemsOptions, [
      new TextFieldItem(),
      new PageFieldItem(),
      new FieldSetItem()
    ])
  ])
}
