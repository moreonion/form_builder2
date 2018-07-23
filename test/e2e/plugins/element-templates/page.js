import faColumns from '@fortawesome/fontawesome-free-solid/faColumns'

export default {
  label: 'Page',
  icon: faColumns,
  group: 'generic',
  weight: 0,

  isAddable (tree) {
    return true
  },

  factory (tree) {
    return {
      type: 'page',
      label: 'New page',
      formKey: 'new_page',
      wrapperCls: 'foo'
    }
  }
}
