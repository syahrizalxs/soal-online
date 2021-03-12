import Vue from 'vue'
import Vuex from 'vuex'
import { store } from './store/store'
import App from './App.vue'
import router from './router'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VCalendar from 'v-calendar'
import VueTheMask from 'vue-the-mask'
import Loading from '../src/components/Loading'
import CKEditor from '@ckeditor/ckeditor5-vue2'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueHtmlToPaper from 'vue-html-to-paper'

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.use(VueHtmlToPaper, options)

Vue.use(CKEditor)
Vue.filter('convertDay', function (value) {
  if (!value) return ''
  value = new Date(value)
  console.log(value)
  return value.toLocaleString('id-ID')
})

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VCalendar, {
  componentPrefix: 'vc' // Use <vc-calendar /> instead of <v-calendar />
})

Vue.use(VueTheMask)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.component('my-loading', Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
