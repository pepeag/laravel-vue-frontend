import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/postlist',
    name: 'postlist',
    component: () => import('../views/ListsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/postcreate',
    name: 'postcreate',
    component: () => import('../views/PostCreateView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: () => import('../views/users/UserListView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/useredit',
    name: 'useredit',
    component: () => import('../views/users/UserEditView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      visitor: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      visitor: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../components/Logout.vue'),
    meta: {
      requiresAuth: true
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
        name: "login"
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.visitor)) {
    if (store.getters.loggedIn) {
      next({
        name: "home"
      })
    } else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
