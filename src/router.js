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
    { path: '', component: CategoryListView, name: 'CategoryList' },
    { path: '/category/:categoryId/menu-list', component: MenuListView, name: 'MenuList' },
    { path: '/category/:categoryId/add-menu', component: AddMenuItem, name: 'AddMenuItem' },
    { path: '/category/:categoryId/menu/:menuId/edit', component: EditMenuItem, name: 'EditMenuItem' }  
  ]
})
