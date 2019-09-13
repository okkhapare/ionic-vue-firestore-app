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

// nav guards
router.beforeEach((to, from , next) => {
  // check for requiresAuth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check if NOT logged in
    if (!firebase.auth().currentUser) {
      // go to login page
      next({ name: 'UserLogin', query: { redirect: to.fullPath } })
    } else {
      // proceed to route
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // check if logged in
    if (firebase.auth().currentUser) {
      // go to login page
      next({ name: 'AccountList', query: { redirect: to.fullPath } })
    } else {
      // proceed to route
      next()
    }
  } else {
    // proceed to route
    next()
  }
})

// check user state
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


