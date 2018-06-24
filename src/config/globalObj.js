window.moFormBuilder = window.moFormBuilder || {
  plugins: {
    // Populated by plugins registering themselves via commons.registerPlugins
    types: {},
    templates: []
  },
  commons: {} // Set by mfb-plugin-commons
}
