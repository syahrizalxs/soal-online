<template>
  <div class="wrapper">
    <nav class="sidebar bg-dark text-light">
      <ul>
        <!-- <li class="list-items pointer" @click="$router.push('/guru/kelas-saya')" v-if="isGuru" :class="[$route.name === 'Kelas Saya' ? 'active' : '']"><b-icon class="h2 m-2 p-1" icon="book"></b-icon><span class="m-2 p-1">Kelas Saya</span></li> -->
        <li class="list-items pointer" @click="$router.push('/master-mata-pelajaran')" v-if="isAdmin" :class="[$route.name === 'Master Mata Pelajaran' ? 'active' : '']"><b-icon class="h2 m-2 p-1" icon="book"></b-icon><span class="m-2 p-1">Master Mata Pelajaran</span></li>
        <li class="list-items pointer" @click="$router.push('/master-soal')" v-if="isAdmin" :class="[$route.name === 'Master Soal' ? 'active' : '']"><b-icon class="h2 m-2 p-1" icon="book"></b-icon><span class="m-2 p-1">Master Soal</span></li>
        <li class="list-items pointer" @click="$router.push('/master-murid')" v-if="isAdmin" :class="[$route.name === 'Master Murid' ? 'active' : '']"><b-icon class="h2 m-2 p-1" icon="person"></b-icon><span class="m-2 p-1">Master Murid</span></li>
        <li class="list-items pointer" @click="$router.push('/master-guru')" v-if="isAdmin" :class="[$route.name === 'Master Guru' ? 'active' : '']"><b-icon class="h2 m-2 p-1" icon="person-circle"></b-icon><span class="m-2 p-1">Master Guru</span></li>
        <li class="list-items pointer" @click="$router.push('/guru/soal')" v-if="isGuru" :class="[$route.name === 'soal' ? 'active' : '']"><b-icon class="h2 m-2 p-1" icon="book"></b-icon><span class="m-2 p-1">Soal</span></li>
        <li class="list-items pointer" @click="$router.push('/guru/nilai-siswa')" v-if="isGuru" :class="[$route.name === 'nilai-siswa' ? 'active' : '']"><b-icon class="h2 m-2 p-1" icon="person"></b-icon><span class="m-2 p-1">Nilai Siswa</span></li>
        <li class="list-items pointer" v-if="isMurid" :class="[$route.name === 'MataPelajaran' ? 'active' : '']" @click="$router.push('/mata-pelajaran')"><b-icon class="h2 m-2 p-1" icon="book"></b-icon><span class="m-2 p-1">Mata Pelajaran</span></li>
        <li class="list-items pointer" v-if="isMurid" :class="[$route.name === 'rapor-siswa' ? 'active' : '']" @click="$router.push('/rapor-siswa/' + userInfo.nis)"><b-icon class="h2 m-2 p-1" icon="check"></b-icon><span class="m-2 p-1">Nilai Saya</span></li>
          <b-collapse v-for="(item, index) in array" :key="index" id="collapsible-mata-pelajaran">
            <b-list-group>
              <b-list-group-item class="pointer bg-dark ml-2">&#8226; {{item}}</b-list-group-item>
            </b-list-group>
          </b-collapse>
          <li class="list-items pointer" :class="[$route.name === 'Profile' ? 'active' : '']" v-if="isMurid || isGuru" @click="$router.push('/profile/' + userInfo.username)"><b-icon class="h2 m-2 p-1" icon="person"></b-icon><span class="m-2 p-1">Profile</span></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      array: ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Agama'],
      userInfo: '',
      isMurid: false,
      isGuru: false,
      isAdmin: false,
      link: [{ name: 'Mata Pelajaran', link: '/mata-pelajaran', collapsibleName: 'collapsible-mata-pelajaran' }]
    }
  },
  methods: {
    getUserInfo () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.isMurid = this.userInfo.role === 'murid'
      this.isAdmin = this.userInfo.role === 'admin'
      this.isGuru = this.userInfo.role === 'guru'
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #343a40 !important;
  height: 100% !important;
}

nav {
  width: 100%;
  ul {
  }
  li {
    list-style: none;
  }
}

.list-items {
  display: flex;
  // border-bottom: .7px solid #cccccc;
  border-top: 0.2px solid #707070;
  &:hover {
    background-color: #3d4042d2;
  }
}
.active {
  border-left: 4px solid map-get($colors, base );
  color: map-get($colors, base)
}
</style>
