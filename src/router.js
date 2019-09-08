import Vue from 'vue'
import Router from 'vue-router'
import AccountListView from './views/AccountListView'
import AddAccount from './components/account/AddAccount'
import EditAccount from './components/account/EditAccount'
import AccountDetailsView from './views/AccountDetailsView'
import Bill from './views/Bill'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: AccountListView, name: 'AccountList' },
    { path: '/account-list/add-account', component: AddAccount, name: 'AddAccount' },  
    { path: '/account-list/edit-account/:customerId', component: EditAccount, name: 'EditAccount' },    
    { path: '/account-list/account/:customerId', component: AccountDetailsView, name: 'AccountDetails' },
    { path: '/account-list/account/bill/:customerId', component: Bill, name: 'Bill' }
  ]
})
