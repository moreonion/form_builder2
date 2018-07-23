var config = require('../../../webpack.config')

module.exports = {
  url: 'http://localhost:' + (process.env.PORT || config.devServer.port) + '/test.html',
  elements: {
    leavePage: '#trigger-request-leave-page',
    submitPage: '#trigger-request-submit-page'
  },
  sections: {
    config: {
      selector: '.mfb-config-dialog',
      elements: {
        box: '.el-dialog',
        title: '.el-dialog__title',
        addNewDataset: '.dsa-add-new-dataset',
        close: '.el-dialog__headerbtn',
        save: {
          selector: '//*[contains(@class, "mfb-config-dialog")]//*[@class="dialog-footer"]//*[text()="Save"]/parent::button',
          locateStrategy: 'xpath'
        },
        cancel: {
          selector: '//*[contains(@class, "mfb-config-dialog")]//*[@class="dialog-footer"]//*[text()="Cancel"]/parent::button',
          locateStrategy: 'xpath'
        },
        // Config form elements rendered by test plugins:
        pageLabel: '.test-page-label input',
        fieldsetLabel: '.test-fieldset-label input',
        fieldLabel: '.test-field-label input',
        fieldDescriptionText: '.test-field-description-text input'
      }
    },
    palette: {
      selector: '.mfb-palette',
      elements: {
        page: {
          selector: '//*[text()="Page"]/parent::*[contains(@class, "mfb-palette-item")]',
          locateStrategy: 'xpath'
        },
        fieldset: {
          selector: '//*[text()="Fieldset"]/parent::*[contains(@class, "mfb-palette-item")]',
          locateStrategy: 'xpath'
        },
        field: {
          selector: '//*[text()="Field"]/parent::*[contains(@class, "mfb-palette-item")]',
          locateStrategy: 'xpath'
        }
      }
    },
    builder: {
      selector: '.mfb-builder'
    },
    messageBox: {
      selector: '.el-message-box__wrapper',
      elements: {
        box: '.el-message-box',
        title: '.el-message-box__title',
        message: '.el-message-box__message',
        cancel: '.el-message-box__btns button:first-of-type',
        ok: '.el-message-box__btns button:last-of-type'
      }
    }
  }
}
