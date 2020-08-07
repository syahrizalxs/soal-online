import Vue from 'vue'
import VueRouter from 'vue-router'

const DefaultContainer = () => import(/* webpackChunkName: "BaseContainer" */'../Layout/DefaultContainer')
const Login = () => import(/* webpackChunkName: "Login" */'../pages/Login')
const MataPelajaran = () => import(/* webpackChunkName: "MataPelajaran" */'../pages/MataPelajaran')
const Profile = () => import(/* webpackChunkName: "Profile" */'../pages/Profile')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/mata-pelajaran',
      component: DefaultContainer,
      children: [
        {
          path: '/mata-pelajaran',
          name: 'MataPelajaran',
          component: MataPelajaran
        },
        {
          path: '/profile/:id',
          name: 'Profile',
          component: Profile
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        public: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log({ next, to, from })
  const token = JSON.parse(localStorage.getItem('userInfo'))
  const isLoggedin = !!token
  const isPublic = to.matched.some(record => record.meta.public)
  if (!isPublic && !isLoggedin) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
