import axios from 'axios'

const url = Drupal.settings.campaignion_form_builder.endpoints.tree

export default {
  put: function (data) {
    return axios.put(url, data)
  },
  get: function () {
    return axios.get(url)
  }
}
