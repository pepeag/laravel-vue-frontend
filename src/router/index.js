import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta:{
      visitor:true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../components/Logout.vue'),
    meta:{
      requiresAuth:true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name:"login"
      })
    } else {
      next()
    }
  }else if (to.matched.some(record => record.meta.visitor)) {
    if (store.getters.loggedIn) {
      next({
        name:"home"
      })
    } else {
      next()
    }
  }
   else {
    next() // make sure to always call next()!
  }
})

export default router
