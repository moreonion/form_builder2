import PaletteTextfield from '../palette/fields/general/textfield'

export function getPaletteConfig() {
  return {
    groups: [
      {
        label: 'Contact record fields',
        fields: []
      },
      {
        label: 'General fields',
        fields: [
          new PaletteTextfield()
        ]
      }
    ]
  }
}
