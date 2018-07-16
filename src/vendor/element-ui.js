/* global require */

import Vue from 'vue'
import {
  Button, Col, Collapse, CollapseItem, Dialog,
  Dropdown, DropdownItem, DropdownMenu, Form, FormItem, Input, MessageBox,
  Option, Popover, Radio, RadioGroup, Row, Select, Switch
} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// Set language for element-ui.
if (Drupal.settings.campaignion_vue && Drupal.settings.campaignion_vue.element_ui_strings) {
  const locale = require('element-ui/lib/locale')
  locale.use(Drupal.settings.campaignion_vue.element_ui_strings)
}

Vue.use(Button)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(Popover)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Row)
Vue.use(Select)
Vue.use(Switch)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
