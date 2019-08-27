import Vue from 'vue'
import Router from 'vue-router'
import CategoryListView from './views/CategoryListView'
import MenuListView from './views/MenuListView'
import AddMenu from './components/menu/AddMenu'
import EditMenu from './components/menu/EditMenu'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '', component: CategoryListView },
    { path: '/category/:categoryId/menu-list', component: MenuListView },
    { path: '/category/:categoryId/add-menu', component: AddMenu, name: 'AddMenu' },
    { path: '/category/:categoryId/menu-list/:menuId', component: EditMenu, name: 'EditMenu' }  
  ]
})
