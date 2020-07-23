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
        login: true
    }
  },
  {
    path: '/rover',
    name: 'rover',
    component: () => import(/* webpackChunkName: "rover" */ '../views/Rover.vue'),
    meta: {
        login: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      whitLogin: true
    },
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
  let authRequire = to.matched.some(router => router.meta.login);
  let loginPage = to.matched.some(router => router.meta.whitLogin);

  !user && authRequire ? next('/login') : next();

  user && loginPage ? next('/') : next();
})

export default router
