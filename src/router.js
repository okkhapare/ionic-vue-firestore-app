import Vue from 'vue'
import Router from 'vue-router'
import UserLoginView from './views/UserLoginView'
import AccountListView from './views/AccountListView'
import AddAccount from './components/account/AddAccount'
import EditAccount from './components/account/EditAccount'
import AccountDetailsView from './views/AccountDetailsView'
import Bill from './views/Bill'
import ClearBill from './views/ClearBill'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '', component: AccountListView, name: 'AccountList', meta: { requiresAuth: true } },
    { path: '/login', component: UserLoginView, name: 'UserLogin', meta: { requiresGuest: true } },
    { path: '/account-list/add-account', component: AddAccount, name: 'AddAccount', meta: { requiresAuth: true } },  
    { path: '/account-list/edit-account/:customerId', component: EditAccount, name: 'EditAccount', meta: { requiresAuth: true } },    
    { path: '/account-list/account/:customerId', component: AccountDetailsView, name: 'AccountDetails', meta: { requiresAuth: true } },
    { path: '/account-list/account/bill/:customerId', component: Bill, name: 'Bill', meta: { requiresAuth: true } },
    { path: '/account-list/account/bill/clear-bill/:customerId', component: ClearBill, name: 'ClearBill', meta: { requiresAuth: true } }
  ]
})
