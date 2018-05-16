import Vue from 'vue'
import {
  Button, Row, Col, Collapse, CollapseItem, Dialog,
  Form, FormItem, Input, MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
