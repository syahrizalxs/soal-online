import Vue from 'vue'
import VueRouter from 'vue-router'
const DefaultContainer = () => import(/* webpackChunkName: "BaseContainer" */'../Layout/DefaultContainer')
const Login = () => import(/* webpackChunkName: "Login" */'../pages/Login')
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DefaultContainer,
      children: []
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

// router.beforeEach((to, from, next) => {})

export default router
