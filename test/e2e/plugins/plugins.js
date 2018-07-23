import root from './element-types/root'
import page from './element-types/page'
import fieldset from './element-types/fieldset'
import field from './element-types/field'
import pageTemplate from './element-templates/page'
import fieldsetTemplate from './element-templates/fieldset'
import fieldTemplate from './element-templates/field'

window.moFormBuilder = {
  plugins: {
    types: {
      root,
      page,
      fieldset,
      field
    },
    templates: [
      pageTemplate,
      fieldsetTemplate,
      fieldTemplate
    ]
  }
}
