import Vue from 'vue'
import Router from 'vue-router'
import CategoryListView from './views/CategoryListView'
import MenuListView from './views/MenuListView'
import AddMenuItem from './components/menu/AddMenuItem'
import EditMenuItem from './components/menu/EditMenuItem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '', component: CategoryListView },
    { path: '/category/:categoryId/menu-list', component: MenuListView },
    { path: '/category/:categoryId/add-menu', component: AddMenuItem, name: 'AddMenu' },
    { path: '/category/:categoryId/menu-list/:menuId', component: EditMenuItem, name: 'EditMenu' }  
  ]
})
