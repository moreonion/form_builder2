import {DnDOptions} from 'mo-vue-dnd'
import { builderModule } from '../components/builder/store';

export const PALETTE_DND_GROUP = 'palette'
export const BUILDER_DND_GROUP = 'tree'

const builderOptions = new DnDOptions(true, false)
// Just allow dnd on itself (nested)
builderOptions.permissions = [
  [BUILDER_DND_GROUP],
  [BUILDER_DND_GROUP]
]

// Do not clone nodes, just pass reference
builderOptions.cloneItemFn = node => node

export const BUILDER_DND_OPTIONS = builderOptions
