import {DnDOptions} from 'mo-vue-dnd'
import { builderModule } from '../components/builder/store';

export const PALETTE_DND_GROUP = 'palette'
export const BUILDER_DND_GROUP = 'tree'

const palettePermissions = [
  [],                   // in: from nowhere
  [BUILDER_DND_GROUP]   // out: just to builder
]

const createBuilderNode = item => item.nodeFactory()

const contactItemsOptions = new DnDOptions()
contactItemsOptions.permissions = palettePermissions
contactItemsOptions.cloneItemFn = createBuilderNode

export const PALETTE_CONTACT_DND_OPTIONS = contactItemsOptions

const generalItemsOptions = new DnDOptions()
generalItemsOptions.allowItemRemoval = false
generalItemsOptions.permissions = palettePermissions
generalItemsOptions.cloneItemFn = createBuilderNode

export const PALETTE_GENERAL_DND_OPTIONS = generalItemsOptions

const builderOptions = new DnDOptions(true, true)
// Just allow dnd on itself (nested)
builderOptions.permissions = [
  [PALETTE_DND_GROUP, BUILDER_DND_GROUP], // in: from palette or builder
  [BUILDER_DND_GROUP]                     // out: just to builder
]

// Do not clone nodes, just pass reference
builderOptions.cloneItemFn = node => node

export const BUILDER_DND_OPTIONS = builderOptions
