import Vue from 'vue'
import VueRouter from 'vue-router'
import Apod from '../views/Apod.vue'
import Firebase from 'firebase'

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

router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.login);
  if (!user && authRequired) {
    next('/login')
  } else {
    next();
  }
})
export default router
