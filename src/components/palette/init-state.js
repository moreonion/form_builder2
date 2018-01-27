import {DnDOptions} from 'mo-vue-dnd'
import {Palette, PaletteGroup} from './palette-model'

import PaletteTextField from './fields/general/text'
import PalettePageField from './fields/general/page'
import PaletteFieldSetField from './fields/general/field-set'

import PaletteFirstNameField from './fields/contact/first-name'
import PaletteLastNameField from './fields/contact/last-name'

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
      new PaletteFirstNameField(),
      new PaletteLastNameField()
    ]),
    new PaletteGroup('General fields', generalItemsOptions, [
      new PaletteTextField(),
      new PalettePageField(),
      new PaletteFieldSetField()
    ])
  ])
}
