import Vue from 'vue'
import App from './App.vue'
import router from './router'
import IonicVue from '@ionic/vue'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/firestore'
import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(IonicVue, moment, firebase)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
