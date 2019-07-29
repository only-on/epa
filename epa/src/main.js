// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/styles/layout/layout.less'
import './assets/styles/cover/cover.less'
import './assets/styles/base/base.less'
import Icon from 'vue2-svg-icon/Icon.vue'
Vue.component('icon', Icon)

Vue.config.productionTip = false

Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
