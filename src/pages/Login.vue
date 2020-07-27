<template>
  <div class="wrapper">
    <div class="left-content">
     <img src="../assets/login.jpg">
    </div>
    <div class="right-content">
      <div class="container form-wrapper">
        <h5>Selamat Datang di E-Learning SD</h5>
        <b-form class="mt-4" v-if="loginComponent">
          <h6 class="text-info">Silahkan Masuk untuk melanjutkan</h6>
          <b-form-group
            id="input-group-1"
            label="Email"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="email"
              required
              v-model="username"
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password" label-for="input-2">
            <b-form-input
              id="input-2"
              type="password"
              required
              v-model="password"
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
            <p class="text-danger text-center" v-if="incorrectPassword">Username / Password salah!</p>
          <b-button class="login-btn mt-5" @click="onLogin" block>Masuk</b-button>
          <p class="text-muted my-3c" style="text-align: center;">atau</p>
          <b-button class="register-btn" @click="loginComponent = !loginComponent" block>Daftar</b-button>
        </b-form>
        <b-form class="mt-4" v-if="!loginComponent">
          <h6 class="text-info">Lengkapi form dibawah ini untuk mendaftar</h6>
          <b-form-group
            id="input-group-1"
            label="Username"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              autocomplete="new-password"
              required
              v-model="username"
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Full Name"
          >
            <b-form-input
              id="input-1"
              required
              v-model="fullname"
              placeholder="Enter Full Name"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Password" label-for="input-2">
            <b-form-input
              type="password"
              required
              v-model="password"
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Confirm Password" label-for="input-2">
            <b-form-input
              type="password"
              required
              v-model="confirmPassword"
              placeholder="Confirm password"
            ></b-form-input>
            <p class="text-danger mt-1" style="font-size: 12px;" v-if="confirmPassword && confirmPassword !== password">
              Password did not match.
            </p>
          </b-form-group>
          <b-button class="login-btn mt-5" @click="onRegister" :disabled="!username || !password || !confirmPassword || !fullname" block>Daftar</b-button>
          <p class="text-muted my-3" style="text-align: center;">Sudah punya akun ?</p>
          <b-button class="register-btn" @click="loginComponent = !loginComponent" block>Login</b-button>
        </b-form>
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
      username: '',
      password: '',
      confirmPassword: '',
      fullname: '',
      nis: '',
      phoneNumber: '',
      loginComponent: true,
      role: 'murid',
      incorrectPassword: false
    }
  },
  methods: {
    async onLogin () {
      const self = this
      var docRef = db.collection('users').doc(this.username)
      docRef.get().then(function (doc) {
        if (doc.exists) {
          if (doc.data().password === self.password) {
            const userInfo = doc.data()
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            self.$router.replace('/')
          } else {
            self.incorrectPassword = true
          }
        } else {
          incorrectPassword = true
        }
      }).catch(function (error) {
        console.log('Error getting document:', error)
      })
    },
    async onRegister () {
      const self = this
      db.collection('users').doc(this.username).set({
        username: this.username,
        password: this.password,
        fullname: this.fullname,
        role: this.role
      })
        .then(function () {
          Swal.fire('Succesfully', 'Registrasi berhasil! Silahkan masuk untuk melanjutkan!', 'success')
          self.loginComponent = !self.loginComponent
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  height: 100%;
  display: flex;
  color: #fff;
}
.left-content {
  background-color: map-get($colors, dark);
  height: 100%;
  width: 70%;
  // background-image: url('../assets/login.jpg');
  // background-repeat: no-repeat;
  // background-size: cover;
}
.right-content {
  display: flex;
  background-color: map-get($colors, dark );
  height: 100%;
  width: 30%;
  align-items: center;
}

.login-btn {
  background-color: map-get($colors, base);
  border: none;

  &:hover {
    background-color: map-get($colors, secondary );
  }
}
.register-btn {
  background-color: transparent;
  border: 1px solid map-get($colors, red);
  color: map-get($colors , red );

  &:hover {
    background-color: map-get($colors, red );
    color: #fff;
  }
}
</style>
