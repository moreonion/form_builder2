import Vue from 'vue'
import {
  Row, Col
} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Row)
Vue.use(Col)
