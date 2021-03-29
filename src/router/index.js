import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/anasayfa' },
  {
    path: '/anasayfa',
    name: 'Home',
    component: () => import('../views/Home.vue'),

  },
  {
    path: '/search/:title',
    name: 'Search',
    component: () => import('../components/search.vue')
  },
  {
    path: '/auth/',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
  },

  {
    path: '/panel/',
    name: 'panel',
    component: () => import('../views/Admin.vue'),
    beforeEnter: async (to, from, next) => {
      const token = await Vue.$cookies.get('token')
      token && store.commit("setToken", token);
      const Auth = store.getters['isAuth']
      if (Auth) {
        next(true)
      } else {
        next({ name: 'Home' })
      }
    },
    children: [
      {
        path: "form",
        name: 'Form',
        component: () => import('../views/admin/Form.vue'),
      },
      {
        path: "makeup",
        name: 'Makeup',
        component: () => import('../views/admin/Makeup.vue'),
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.afterEach( () => {
  const x = Vue.$cookies.isKey('token')
  if (x) {
    const token = Vue.$cookies.get('token')
    token && store.commit("setToken", token);
  }
})
export default router

