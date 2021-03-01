import Vue from 'vue'
import VueRouter from 'vue-router'

const DefaultContainer = () => import(/* webpackChunkName: "BaseContainer" */'../Layout/DefaultContainer')
const Login = () => import(/* webpackChunkName: "Login" */'../pages/Login')
const MataPelajaran = () => import(/* webpackChunkName: "MataPelajaran" */'../pages/MataPelajaran')
const Profile = () => import(/* webpackChunkName: "Profile" */'../pages/Profile')

const MasterMataPelajaran = () => import(/* webpackChunkName: "MasterMapel" */'../pages/master/mata-pelajaran')
const MasterMurid = () => import(/* webpackChunkName: "MasterMurid" */'../pages/master/murid')
const MasterGuru = () => import(/* webpackChunkName: "MasterMurid" */'../pages/master/guru')

const KelasSaya = () => import(/* webpackChunkName: "KelasSaya" */'../pages/guru/kelas/kelas-saya')
const KelasSayaAdd = () => import(/* webpackChunkName: "KelasSayaAdd" */'../pages/guru/kelas/kelas-saya-add')
const KelasSayaEdit = () => import(/* webpackChunkName: "KelasSayaAdd" */'../pages/guru/kelas/kelas-saya-edit')

const Materi = () => import(/* webpackChunkName: "Materi" */'../pages/Materi')
const Soal = () => import(/* webpackChunkName: "Materi" */'../pages/guru/soal/soal.vue')
const SoalAdd = () => import(/* webpackChunkName: "Materi" */'../pages/guru/soal/soal-add.vue')

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
        },
        {
          path: 'master-mata-pelajaran',
          name: 'Master Mata Pelajaran',
          component: MasterMataPelajaran
        },
        {
          path: 'guru/kelas-saya',
          name: 'Kelas Saya',
          component: KelasSaya
        },
        {
          path: 'guru/kelas-saya/add',
          name: 'Kelas Saya Add',
          component: KelasSayaAdd
        },
        {
          path: 'guru/kelas-saya/:id',
          name: 'Kelas Saya Add',
          component: KelasSayaEdit
        },
        {
          path: 'master-murid',
          name: 'Master Murid',
          component: MasterMurid
        },
        {
          path: 'master-guru',
          name: 'Master Guru',
          component: MasterGuru
        },
        {
          path: 'materi/:id',
          name: 'Materi',
          component: Materi
        },
        {
          path: 'guru/soal',
          name: 'soal',
          component: Soal
        },
        {
          path: 'guru/soal/add',
          name: 'soal-add',
          component: SoalAdd
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
