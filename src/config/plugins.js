import capitalize from 'lodash.capitalize'

export const ELEMENT_TYPE_PREVIEW_COMPONENT_NAME_PREFIX = 'fbElPreview'
export const ELEMENT_TYPE_CONFIG_COMPONENT_NAME_PREFIX = 'fbElConfig'

export function componentName(pluginName, component='preview') {
  if (component === 'preview') {
    return ELEMENT_TYPE_PREVIEW_COMPONENT_NAME_PREFIX + capitalize(pluginName)
  } else if (component === 'config') {
    return ELEMENT_TYPE_CONFIG_COMPONENT_NAME_PREFIX + capitalize(pluginName)
  }
}
