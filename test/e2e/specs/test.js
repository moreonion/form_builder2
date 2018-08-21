// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

/* eslint-disable no-unused-expressions */

// XPaths relative to .mfb-element-XXX
var handle = `preceding-sibling::*[contains(@class, "mfb-draggable-handle")]`
var editBtn = `preceding-sibling::*[contains(@class, "mfb-draggable-edit-btn")]`

module.exports = {
  'app is being rendered': function (client) {
    var app = client.page.app()

    app.navigate()
      .waitForElementVisible(app.section.palette.selector, 5000)
      .assert.visible(app.section.palette.selector)
      .assert.visible(app.section.builder.selector)
      .assert.hidden(app.section.config.selector)
  },

  'builder renders tree': function (client) {
    var rootEl = `//*[contains(@class, "mfb-builder")]/*[@class="mfb-element-root"]`

    client
      .useXpath()
      .assert.visible(rootEl)
      .assert.visible(`${rootEl}//*[@class="mfb-element-test-page"]`)
      .assert.visible(`${rootEl}//*[@class="mfb-element-test-page"]//*[@class="mfb-element-test-fieldset"]`)
      .assert.visible(`${rootEl}//*[@class="mfb-element-test-page"]//*[@class="mfb-element-test-fieldset"]//*[@class="mfb-element-test-field"]`)
      .useCss()
  },

  'builder renders draggables': function (client) {
    client
      .useXpath()
      .assert.elementNotPresent(`//*[@class="mfb-element-root"]/${handle}`)
      .assert.hidden(`//*[@class="mfb-element-test-page"]/${handle}`)
      .assert.hidden(`//*[@class="mfb-element-test-fieldset"]/${handle}`)
      .assert.hidden(`//*[@class="mfb-element-test-field"]/${handle}`)
      .assert.hidden(`//*[@class="mfb-element-test-page"]/${editBtn}`)
      .assert.hidden(`//*[@class="mfb-element-test-fieldset"]/${editBtn}`)
      .assert.hidden(`//*[@class="mfb-element-test-field"]/${editBtn}`)
      .useCss()
  },

  'drag area and edit button are shown on hover': function (client) {
    client
      .moveToElement(`.mfb-element-test-fieldset legend`, 5, 5)
      .useXpath()
      .assert.visible(`//*[@class="mfb-element-test-fieldset"]/${handle}`)
      .assert.visible(`//*[@class="mfb-element-test-fieldset"]/${editBtn}`)
      .assert.hidden(`//*[@class="mfb-element-test-page"]/${handle}`)
      .assert.hidden(`//*[@class="mfb-element-test-page"]/${editBtn}`)
      .assert.hidden(`//*[@class="mfb-element-test-field"]/${handle}`)
      .assert.hidden(`//*[@class="mfb-element-test-field"]/${editBtn}`)
      .useCss()
  },

  'field can be dragged from fieldset into page': function (client) {
    client
      .useXpath()
      .drag(`//*[@class="mfb-element-test-field"]/${handle}`, `//*[@class="mfb-element-test-page"]/*[contains(@class, "mfb-element-children")]`)
      .assert.visible(`//*[@class="mfb-element-test-page"]//*[not(@class="mfb-element-test-fieldset")]//*[@class="mfb-element-test-field"]`)
      .assert.elementNotPresent(`//*[@class="mfb-element-test-page"]//*[@class="mfb-element-test-fieldset"]//*[@class="mfb-element-test-field"]`)
      .useCss()
  },

  'new field can be dragged from palette into fieldset': function (client) {
    client
      .useXpath()
      .drag(`//*[text()="Field"]/ancestor::*[contains(@class, "mfb-palette-item")]`, `//*[@class="mfb-element-test-fieldset"]/*[contains(@class, "mfb-element-children")]`)
      .assert.visible(`//*[@class="mfb-element-test-page"]//*[@class="mfb-element-test-fieldset"]//*[@class="mfb-element-test-field"]/*[text()="Hello from New field!"]`)
      .useCss()
  },

  'field can be configured': function (client) {
    var app = client.page.app()
    var dialog = app.section.config

    client
      .moveToElement(`.mfb-element-test-fieldset .mfb-element-test-field`, 5, 5)
      .useXpath()
      .click(`//*[@class="mfb-element-test-fieldset"]//*[@class="mfb-element-test-field"]/${editBtn}`)
      .useCss()
    dialog
      .waitForElementVisible('@box', 1000)
      .assert.value('@fieldLabel', 'New field')
      .clearValue('@fieldLabel')
      .setValue('@fieldLabel', 'My field')
      .click('@save')
      .waitForElementNotVisible('@box', 1000)
    client.assert.containsText('.mfb-element-test-fieldset .mfb-element-test-field h3', 'Hello from My field!')
  },

  'tree is persisted to server on form step submit': function (client) {
    var app = client.page.app()

    client
      .listenXHR()
      .pause(500)

    app.click('@submitPage')

    client
      .pause(500)
      .getAlertText(function (result) {
        client.assert.equal(result.value, 'You can leave the page now.')
        client.acceptAlert()
      })
      .getXHR('/tree', 1000, function (xhrs) {
        client.assert.equal(xhrs.length, 1)
        client.assert.equal(xhrs[0].method, 'PUT')
        client.assert.equal(xhrs[0].httpResponseCode, '200')

        var data = {
          children: [
            {
              children: [
                {
                  children: [],
                  type: 'field',
                  label: 'Field',
                  id: 5,
                  formKey: 'field_0',
                  description: {
                    text: '',
                    enabled: false
                  },
                  required: false
                },
                {
                  children: [
                    {
                      children: [],
                      type: 'field',
                      label: 'My field',
                      id: 6,
                      formKey: 'new_field',
                      description: {
                        text: '',
                        enabled: true
                      },
                      required: false
                    }
                  ],
                  type: 'fieldset',
                  label: 'My fieldset',
                  id: 4,
                  formKey: 'fieldset_2',
                  foo: 'bar'
                }
              ],
              type: 'page',
              label: 'My first page',
              id: 1,
              formKey: 'page_0',
              wrapperCls: ''
            }
          ],
          type: 'root',
          id: 0
        }

        client.assert.deepEqual(JSON.parse(xhrs[0].requestData), data)
      })

    client.end()
  }
}
