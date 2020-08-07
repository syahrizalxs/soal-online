<template>
  <div class="container p-2">
    <div class="row">
      <div class="col-12">
        <div class="card" style="width: 100%;">
          <div class="card-body">
            <h4 class="card-title mb-5">Profil Siswa</h4>
            <div class="row">
              <div class="col-3">
                <img :src="userInfo.fotoUrl" style="max-width: 200px;" alt="profile image" class="img-thumbnail rounded mb-3">
                <div class="form-group">
                  <label for="exampleFormControlFile1">Unggah Foto</label>
                  <input type="file" accept="image/*" @change="onChangeFile($event)" class="form-control-file" id="file">
                </div>
              </div>
              <div class="col-9" style="margin-left: -30px;">
                <div class="row">
                  <h5 class="text-muted">{{userInfo.fullname}}</h5>
                </div>
                <div class="row">
                  NIS: {{ userInfo.nis || '-'}}
                </div>
                <div class="row">
                  {{ userInfo.kelas || 'Kelas -'}}
                </div>
              </div>
            </div>
            <form>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" v-model="userInfo.username" disabled>
                    <small id="emailHelp" class="form-text text-muted">Username tidak dapat dirubah.</small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="userInfo.password" placeholder="Nama Lengkap" required>
                  </div>
                </div>
              </div>
              <hr>
              <h5 class="mb-4">Data Diri</h5>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label>Nama Lengkap</label>
                    <input type="text" class="form-control" v-model="userInfo.fullname" placeholder="Nama Lengkap" required>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label>NIS</label>
                    <input type="text" class="form-control" v-model="userInfo.nis" placeholder="Nomer Induk Siswa" required>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label>Tempat Lahir</label>
                    <input type="text" class="form-control" v-model="userInfo.tempatLahir" placeholder="Tempat Lahir" required>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label>Tanggal Lahir</label>
                    <input type="text" class="form-control" v-model="userInfo.tanggalLahir" v-mask="'##/##/####'" placeholder="DD/MM/YYYY" required>
                    <small id="emailHelp" class="form-text text-muted">Contoh: 01/12/2020</small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label> Jenis Kelamin</label><br>
                  <div class="form-check">
                    <input class="form-check-input" v-model="userInfo.jenisKelamin" type="radio" value="Laki - Laki">
                    <label class="form-check-label text-muted">Laki - Laki</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" v-model="userInfo.jenisKelamin" type="radio" value="Perempuan">
                    <label class="form-check-label text-muted">Perempuan</label>
                  </div>
                </div>
                <div class="col-6">
                  <label>Alamat</label>
                  <textarea type="text" class="form-control" v-model="userInfo.alamat" placeholder="Alamat"></textarea>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6">
                  <label for="inputState">Kelas</label>
                    <select id="inputState" v-model="userInfo.kelas" class="form-control">
                      <option disabled selected>Pilih Kelas</option>
                      <option v-for="(item, index) in optionsKelas" :key="index" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="col-6">
                  <label>No. Telephone / Handphone</label>
                  <input type="number" class="form-control" v-model="userInfo.notelp" placeholder="08123456789">
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12" align="right">
                  <button class="btn btn-outline-danger mx-3">BATAL</button>
                  <button class="btn btn-success ml-1" @click.prevent="onSave()">SIMPAN</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../config/firebase'
import Swal from 'sweetalert2'

const db = firebase.firestore()

export default {
  data () {
    return {
      userInfo: {
        kelas: undefined,
        fotoUrl: ''
      },
      file: undefined,
      show: false,
      isOpenCalender: false,
      optionsKelas: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
      empty: '../assets/logo.png'
    }
  },
  created () {
    this.getUserInfo()
    this.getDetailProfile()
  },
  methods: {
    getUserInfo () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    async getDetailProfile () {
      this.$parent.isLoading = true
      await db.collection('users')
        .doc(this.userInfo.username)
        .get()
        .then(res => {
          this.userInfo = res.data()
        })
      this.$parent.isLoading = false
    },
    async onSave () {
      this.$parent.isLoading = true
      const self = this
      await db.collection('users')
        .doc(this.userInfo.username)
        .update(this.userInfo)
        .then(function () {
          Swal.fire('Succesfully', 'Berhasil', 'success')
          self.$router.go()
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      this.$parent.isLoading = false
    },
    async onChangeFile (evt) {
      // Get the file from DOM
      console.log(evt)
      const self = this
      var file = document.getElementById('file').files[0]
      const ref = `profile/${file.name}`
      var storageRef = firebase.storage().ref(ref)

      const image = evt.target.files[0]

      // put request upload file to firebase storage
      await storageRef.put(file).then(async function (snapshot) {
        const resUrl = await firebase.storage().ref(ref).getDownloadURL()
        console.log({ resUrl })
        if (resUrl) {
          self.userInfo.fotoUrl = resUrl
        }
      })
        .catch(e => {
          Swal.fire('Error', 'Terjadi Kesalahan saat upload foto!', 'error')
          self.userInfo.fotoUrl = ''
        })
    }
  }
}
</script>

<style>
label {
  font-weight: 600;
}
</style>
