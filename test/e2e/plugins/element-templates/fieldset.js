import faColumns from '@fortawesome/fontawesome-free-solid/faColumns'

export default {
  label: 'Fieldset',
  icon: faColumns,
  group: 'generic',
  weight: 1,

  isAddable (tree) {
    return true
  },

  factory (tree) {
    return {
      type: 'fieldset',
      label: 'New Fieldset',
      formKey: 'new_fieldset',
      foo: 'baz'
    }
  }
}
