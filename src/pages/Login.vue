<template>
  <div class="wrapper">
    <div class="left-content">

    </div>
    <div class="right-content">
      <div class="container form-wrapper">
        <h5>Selamat Datang di E-Learning SD</h5>
        <b-form class="mt-4">
          <b-form-group
            id="input-group-1"
            label="Email"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password" label-for="input-2">
            <b-form-input
              id="input-2"
              type="password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <b-button class="login-btn mt-5" @click="onLogin" block>LOGIN</b-button>
          <p class="text-muted mt-1" style="text-align: center;">atau</p>
          <b-button class="register-btn" block>Daftar</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../config/firebase'

const db = firebase.firestore()

export default {
  methods: {
    async onLogin () {
      const employeesData = []
      await db.collection('employees')
        .where('name', '==', 'Syahrizal')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            employeesData.push({
              id: doc.id,
              name: doc.data().name,
              date: doc.data().date
            })
            console.log(doc.id, '=>', doc.data())
          })
          return employeesData
        })
        .catch((error) => {
          console.log('Error getting documents: ', error)
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
