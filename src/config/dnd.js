import {DnDOptions} from 'mo-vue-dnd'
import { builderModule } from '../components/builder/store';

export const PALETTE_DND_GROUP = 'palette'
export const BUILDER_DND_GROUP = 'tree'

// Do not clone nodes etc., just pass reference
const passRef = obj => obj

const palettePermissions = [
  [],                   // in: from nowhere
  [BUILDER_DND_GROUP]   // out: just to builder
]

const contactItemsOptions = new DnDOptions()
contactItemsOptions.permissions = palettePermissions
contactItemsOptions.cloneItemFn = passRef

export const PALETTE_CONTACT_DND_OPTIONS = contactItemsOptions

const generalItemsOptions = new DnDOptions()
generalItemsOptions.allowItemRemoval = false
generalItemsOptions.permissions = palettePermissions
generalItemsOptions.cloneItemFn = passRef

export const PALETTE_GENERAL_DND_OPTIONS = generalItemsOptions

const builderOptions = new DnDOptions(true, true)
// Just allow dnd on itself (nested)
builderOptions.permissions = [
  [BUILDER_DND_GROUP],
  [BUILDER_DND_GROUP]
]

builderOptions.cloneItemFn = passRef

export const BUILDER_DND_OPTIONS = builderOptions
