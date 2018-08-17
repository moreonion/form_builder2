import {DnDOptions} from 'mo-vue-dnd'
import {store} from '../store'

export const PALETTE_DND_GROUP = 'palette'
export const BUILDER_DND_GROUP = 'tree'

const palettePermissions = [
  [],                   // in: from nowhere
  [BUILDER_DND_GROUP]   // out: just to builder
]

// When a palette item is dragged and about to be dropped in the builder,
// this function is called every time the ghost element is displayed in a new container.
// It returns the node that is cached by the watcher on DnDContext in the FormBuilder
// component when the user starts to drag a palette item.
const getCachedNode = () => store.state.builder.draggedNode

const paletteOptions = new DnDOptions()
paletteOptions.allowItemRemoval = false
paletteOptions.permissions = palettePermissions
paletteOptions.cloneItemFn = getCachedNode

// Don’t wrap item, the isAddable function wants to control if the item has a handle at all
paletteOptions.wrapDnDHandle = false

export const PALETTE_DND_OPTIONS = paletteOptions

const builderOptions = new DnDOptions()
builderOptions.permissions = [
  [PALETTE_DND_GROUP, BUILDER_DND_GROUP], // in: from palette or builder
  [BUILDER_DND_GROUP]                     // out: just to builder
]

// Do not clone nodes, just pass reference
builderOptions.cloneItemFn = node => node

// Drag elements only by their handle
builderOptions.wrapDnDHandle = false

export const BUILDER_DND_OPTIONS = builderOptions
