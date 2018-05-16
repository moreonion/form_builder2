/**
 * This is the plugin for the `fieldset` element template.
 */

import faObjectGroup from '@fortawesome/fontawesome-free-solid/faObjectGroup'

export default {
  /** Appearance in the palette. */
  label: 'Formatted text',
  icon: faObjectGroup,
  group: 'Generic fields',
  weight: 2,

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
      type: 'formatted',
      data: ''
    }
  }
}
