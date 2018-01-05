export const PALETTE_DND_GROUP = 'palette'
export const BUILDER_DND_GROUP = 'tree'

export const BUILDER_DND_OPTIONS = {
  group: {name: BUILDER_DND_GROUP, pull: true, put: [BUILDER_DND_GROUP, PALETTE_DND_GROUP]},
  animation: 100
}
