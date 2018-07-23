import faColumns from '@fortawesome/fontawesome-free-solid/faColumns'

export default {
  label: 'Field',
  icon: faColumns,
  group: 'generic',
  weight: 2,

  isAddable (tree) {
    return true
  },

  factory (tree) {
    return {
      type: 'field',
      label: 'New field',
      formKey: 'new_field',
      description: {
        text: '',
        enabled: true
      },
      required: false
    }
  }
}
