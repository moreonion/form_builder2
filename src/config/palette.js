
const PaletteRaw = {
  groups: [
    {
      label: 'Contact record fields',
      fields: [
        {label: 'Salutation'},
        {label: 'Gender'},
        {label: 'Title'},
        {label: 'Date of birth'},
        {label: 'Street address'},
        {label: 'Country'},
        {label: 'Region'},
        {label: 'City'},
        {label: 'Phone number'},
        {label: 'Mobile number'},
        {label: 'Comment'},
        {label: 'Snail Mail Opt-in'},
        {label: 'Postcode'},
        {label: 'Newsletter'}
      ]
    },
    {
      label: 'General fields',
      fields: [
        {label: 'Textfield'},
        {label: 'Textarea'},
        {label: 'Number'},
        {label: 'Radios'},
        {label: 'Checkboxes'},
        {label: 'Select list'},
        {label: 'Grid'},
        {label: 'Date'},
        {label: 'Time'},
        {label: 'Currency'},
        {label: 'File'},
        {label: 'Hidden'},
        {label: 'Markup'},
        {label: 'Fieldset'},
        {label: 'Pagebreak'},
      ]
    },
    {
      label: 'Payment fields',
      fields: [
        {label:'Currency'}
      ]
    }
  ]
}

function cloneWithIds(palette) {
  let groupIdCounter = 0
  let fieldIdCounter = 0
  const groups = palette.groups
  return {
    ...palette,
    groups: groups.map(g => {
      return {
        ...g,
        id: groupIdCounter++,
        fields: g.fields.map(f => {
          return {
            ...f, id: fieldIdCounter++
          }
        })
      }
    })
  }
}

export const getPaletteConfig = () => cloneWithIds(PaletteRaw)
