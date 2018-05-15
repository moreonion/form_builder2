/**
 * This is the plugin for the `page` element template.
 */

import faColumns from '@fortawesome/fontawesome-free-solid/faColumns'

export default {
  /** Appearance in the palette. */
  label: 'Page',
  icon: faColumns,
  group: 'Containers',
  weight: 0,

  /**
   * Decides whether the element can currently be added to the tree.
   *
   * @param {Node} tree - The current state of the tree.
   * @return {boolean}
   */
  isAddable(tree) {
    return true
  },

  /**
   * Generates the config for the new element.
   * Can use the factory functions of other element template plugins.
   *
   * @param {Node} tree - The current state of the tree.
   * @return {Object} The config for the new element.
   * Must include `type` {string} matching an element type identifier.
   */
  factory(tree) {
    return {
      type: 'page',
      title: 'New page'
    }
  }
}
