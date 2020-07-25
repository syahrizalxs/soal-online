<template>
  <div class="wrapper">
    <div class="left-content">

    </div>
    <div class="right-content">
      <div class="container form-wrapper">
        <h5>Selamat Datang di E-Learning SD</h5>
        <b-form class="mt-4" v-if="loginComponent">
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
          <b-button class="login-btn mt-5" @click="onLogin" block>Masuk</b-button>
          <p class="text-muted mt-1" style="text-align: center;">atau</p>
          <b-button class="register-btn" @click="loginComponent = !loginComponent" block>Daftar</b-button>
        </b-form>
        <b-form class="mt-4" v-if="!loginComponent">
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
          </b-form-group>
          <b-button class="login-btn mt-5" @click="onRegister" block>Daftar</b-button>
          <p class="text-muted mt-1" style="text-align: center;">Sudah punya akun ?</p>
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
      role: 'murid'
    }
  },
  methods: {
    async onLogin () {
      db.collection('users').doc(username).set({
        username: this.username,
        password: this.password,
        fullname: this.fullname,
        role: this.role
      })
        .then(function () {
          Swal.fire('Succesfully', 'Registrasi berhasil!', 'success')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    async onRegister () {
      db.collection('users').doc(this.username).set({
        username: this.username,
        password: this.password,
        fullname: this.fullname,
        role: this.role
      })
        .then(function () {
          Swal.fire('Succesfully', 'Registrasi berhasil!', 'success')
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
  background-image: url('../assets/login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
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
