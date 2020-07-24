import Vue from 'vue'
import VueRouter from 'vue-router'
import Apod from '../views/Apod.vue'
import Firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/apod',
    name: 'apod',
    component: Apod,
    alias:['/home','/'],
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/rover',
    name: 'rover',
    component: () => import(/* webpackChunkName: "rover" */ '../views/Rover.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      login: true
    }
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
  let authRequired = to.matched.some(router => router.meta.requireLogin);
  let authLogin = to.matched.some(router => router.meta.login);

  !user && authRequired ? next('/login') : next()
  user && authLogin ? next('/apod') : next()
  !user && !authLogin ? next('/login') : next()

})

export default router
