import {DnDOptions} from 'mo-vue-dnd'

export const PALETTE_DND_GROUP = 'palette'
export const BUILDER_DND_GROUP = 'tree'

const palettePermissions = [
  [],                   // in: from nowhere
  [BUILDER_DND_GROUP]   // out: just to builder
]

const createBuilderNode = item => item.nodeFactoryProxy()

const paletteOptions = new DnDOptions()
paletteOptions.allowItemRemoval = false
paletteOptions.permissions = palettePermissions
paletteOptions.cloneItemFn = createBuilderNode

// Don’t wrap item, the isAddable function wants to control if the item has a handle at all
paletteOptions.wrapDnDHandle = false

export const PALETTE_DND_OPTIONS = paletteOptions

const builderOptions = new DnDOptions()
// Just allow dnd on itself (nested)
builderOptions.permissions = [
  [PALETTE_DND_GROUP, BUILDER_DND_GROUP], // in: from palette or builder
  [BUILDER_DND_GROUP]                     // out: just to builder
]

// Do not clone nodes, just pass reference
builderOptions.cloneItemFn = node => node

// Drag elements only by their handle
builderOptions.wrapDnDHandle = false

export const BUILDER_DND_OPTIONS = builderOptions
