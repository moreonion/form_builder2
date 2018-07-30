export const FORM_BUILDER_GLOBAL = 'moFormBuilder'

window[FORM_BUILDER_GLOBAL] = window[FORM_BUILDER_GLOBAL] || {
  plugins: {
    // Populated by plugins registering themselves via commons.registerPlugins
    types: {},
    templates: []
  },
  commons: {} // Set by mfb-plugin-commons
}

export const plugins = window[FORM_BUILDER_GLOBAL].plugins
