import {DnDOptions} from 'mo-vue-dnd'

export const PALETTE_DND_GROUP = 'palette'
export const BUILDER_DND_GROUP = 'tree'

const builderOptions = new DnDOptions(true, false)
// Just allow dnd on itself (nested)
builderOptions.permissions = [
  [BUILDER_DND_GROUP],
  [BUILDER_DND_GROUP]
]

export const BUILDER_DND_OPTIONS = builderOptions
