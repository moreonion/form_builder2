/** The name of the global variable containing the plugins and their common dependencies. */
export const FORM_BUILDER_GLOBAL = 'moFormBuilder'

window[FORM_BUILDER_GLOBAL] = window[FORM_BUILDER_GLOBAL] || {
  plugins: {
    // Populated by plugins registering themselves via commons.registerPlugins
    types: {},
    templates: []
  },
  commons: {} // Set by mfb-plugin-commons
}

/** The object containing the plugins. */
export const plugins = window[FORM_BUILDER_GLOBAL].plugins
