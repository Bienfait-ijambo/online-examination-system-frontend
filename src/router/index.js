import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/backend/users.vue')
  },

  {
    path: '/subjects',
    name: 'subjects',
    component: () => import(/* webpackChunkName: "users" */ '../views/backend/subjects.vue')
  },
 
]

const router = new VueRouter({
  mode:"history",
  routes
})

export default router
