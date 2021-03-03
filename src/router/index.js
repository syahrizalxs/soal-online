import Vue from 'vue'
import VueRouter from 'vue-router'

const DefaultContainer = () => import(/* webpackChunkName: "BaseContainer" */'../Layout/DefaultContainer')
const Login = () => import(/* webpackChunkName: "Login" */'../pages/Login')
const MataPelajaran = () => import(/* webpackChunkName: "MataPelajaran" */'../pages/MataPelajaran')
const Profile = () => import(/* webpackChunkName: "Profile" */'../pages/Profile')

const MasterMataPelajaran = () => import(/* webpackChunkName: "MasterMapel" */'../pages/master/mata-pelajaran')
const MasterMurid = () => import(/* webpackChunkName: "MasterMurid" */'../pages/master/murid')
const MasterGuru = () => import(/* webpackChunkName: "MasterMurid" */'../pages/master/guru')
const MasterSoal = () => import(/* webpackChunkName: "MasterMurid" */'../pages/master/master-soal')

const KelasSaya = () => import(/* webpackChunkName: "KelasSaya" */'../pages/guru/kelas/kelas-saya')
const KelasSayaAdd = () => import(/* webpackChunkName: "KelasSayaAdd" */'../pages/guru/kelas/kelas-saya-add')
const KelasSayaEdit = () => import(/* webpackChunkName: "KelasSayaAdd" */'../pages/guru/kelas/kelas-saya-edit')

const KerjakanSoal = () => import(/* webpackChunkName: "Materi" */'../pages/KerjakanSoal.vue')
const Soal = () => import(/* webpackChunkName: "Materi" */'../pages/guru/soal/soal.vue')
const SoalAdd = () => import(/* webpackChunkName: "Materi" */'../pages/guru/soal/soal-add.vue')
const SoalEdit = () => import(/* webpackChunkName: "Materi" */'../pages/guru/soal/soal-edit.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/guru/soal',
      component: DefaultContainer,
      children: [
        {
          path: '/mata-pelajaran',
          name: 'MataPelajaran',
          component: MataPelajaran,
          meta: {
            authorize: 'murid'
          }
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
          path: 'master-soal',
          name: 'Master Soal',
          component: MasterSoal
        },
        {
          path: 'soal/:id',
          name: 'soal',
          component: KerjakanSoal
        },
        {
          path: 'guru/soal',
          name: 'soal',
          component: Soal,
          meta: {
            authorize: 'guru'
          }
        },
        {
          path: 'guru/soal/add',
          name: 'soal-add',
          component: SoalAdd
        },
        {
          path: 'guru/soal/edit/:id',
          name: 'soal-add',
          component: SoalEdit
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
  const token = JSON.parse(localStorage.getItem('userInfo'))
  const isLoggedin = !!token

  const { authorize } = to.meta
  const isPublic = to.matched.some(record => record.meta.public)
  if (!isPublic && !isLoggedin) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (authorize) {
      if (authorize === token.role) {
        return next()
      } else {
        return next({
          path: '/profile/' + token.username,
        })
      }
    }
    else {
      next()
    }
})

export default router
