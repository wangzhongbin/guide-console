import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [{
  path: '',
  redirect: '/home/index'
}, {
  path: '/home',
  name: 'Home',
  redirect: '/home/index',
  component: Home,
  children: [{
    path: 'index',
    component: (resolve) => require(['@/views/Index'], resolve),
    name: 'HomeIndex',
    meta: { id: 1, title: '首页', icon: 'dashboard' }
  }]
}, {
  path: '/login',
  name: 'Login',
  component: Login
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
