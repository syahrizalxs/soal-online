<template>
  <div>
    hahah
  </div>
</template>

<script>
import firebase from '../config/firebase'
const db = firebase.firestore()

export default {
  name: 'soal',
  data: () =>  {
    return {
      userResponse: [],
      soal: {}
    }
  },
  created () {
    this.getSoal()
  },
  methods: {
    async getSoal () {
      // console.log(this.$parent)
      this.$parent.isLoading = true
      await db.collection('master-soal')
        .doc(this.$route.params.id)
        .get()
        .then(res => {
          this.soal = res.data()
        })
      this.$parent.isLoading = false
    }
  }
}
</script>

<style>

</style>