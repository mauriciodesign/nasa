import Vue from 'vue'
import VueRouter from 'vue-router'
import Apod from '../views/Apod.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/apod',
    name: 'apod',
    component: Apod
  },
  {
    path: '/rover',
    name: 'rover',
    component: () => import(/* webpackChunkName: "rover" */ '../views/Rover.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
