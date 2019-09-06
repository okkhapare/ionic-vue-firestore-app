import Vue from 'vue'
import Router from 'vue-router'
import CategoryListView from './views/CategoryListView'
import MenuListView from './views/MenuListView'
import AddMenuItem from './components/menu/AddMenuItem'
import EditMenuItem from './components/menu/EditMenuItem'
import AccountListView from './views/AccountListView'
import AddAccount from './components/account/AddAccount'
import EditAccount from './components/account/EditAccount'
import AccountDetailsView from './views/AccountDetailsView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: AccountListView, name: 'AccountList' },
    { path: '/account-list/add-account', component: AddAccount, name: 'AddAccount' },  
    { path: '/account-list/edit-account/:customerId', component: EditAccount, name: 'EditAccount' },    
    { path: '/account-list/account/:customerId', component: AccountDetailsView, name: 'AccountDetails' },  
    { path: '/categories', component: CategoryListView, name: 'CategoryList' },
    { path: '/category/:categoryId/menu-list', component: MenuListView, name: 'MenuList' },
    { path: '/category/:categoryId/add-menu', component: AddMenuItem, name: 'AddMenuItem' },
    { path: '/category/:categoryId/menu/:menuId/edit', component: EditMenuItem, name: 'EditMenuItem' },  
  ]
})
