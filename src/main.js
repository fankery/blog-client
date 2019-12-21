import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './styles/element-variables.scss'
import 'font-awesome/css/font-awesome.min.css'
import './utils/filter_utils.js'
import echarts from 'echarts/lib/echarts'
//
import axios from 'axios'
import commonAjax from './api/index'
import commonAjaxUpload from './api/uploadAjax'
import commonAjaxExport from './api/exportAjax'

axios.defaults.crossDomain = true
axios.defaults.withCredentials = true

Vue.prototype.commonAjax = commonAjax
Vue.prototype.commonAjaxUpload = commonAjaxUpload
Vue.prototype.commonAjaxExport = commonAjaxExport

Vue.use(ElementUI)
Vue.config.productionTip = false
window.bus = new Vue()
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
