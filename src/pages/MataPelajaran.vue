<template>
  <div class="mata-pelajaran">
    <div class="heading">
      <h3 class="text-center">Mata Pelajaran Saya</h3>
    </div>
    <div class="content mt-2">
      <b-row>
        <div class="col-3">
          <label for="Pilih Mata Pelajaran">
            Pilih Mata Pelajaran
          </label>
          <b-form-select v-model="selected" :options="mataPelajaranList"></b-form-select>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card'
import firebase from '../config/firebase'

const db = firebase.firestore()
export default {
  components: {
    Card
  },
  data () {
    return {
      selected: '',
      userInfo: {},
      mataPelajaranList: [],
      classList: [
        { name: 'Matematika', teacher: 'Bangbang S.kom', materi: 20, soal: 6 },
        { name: 'Bahasa Inggris', teacher: 'Desi S.kom', materi: 18, soal: 5 },
        { name: 'Bahasa Indonesia', teacher: 'John S.kom', materi: 23, soal: 12 },
        { name: 'PKN', teacher: 'Joe S.kom', materi: 13, soal: 7 },
        { name: 'Agama Islam', teacher: 'Mira S.ag', materi: 13, soal: 7 },
        { name: 'Penjaskes', teacher: 'Taslim S.b', materi: 13, soal: 7 }
      ]
    }
  },
  async created () {
    await this.getUserInfo()
    await this.getMataPelajaran()
    this.selected = this.mataPelajaranList[0].value
  },
  methods: {
    async getUserInfo () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      await db.collection('users')
        .doc(userInfo.username)
        .get()
        .then(res => {
          this.userInfo = res.data()
				})
    },
    async getMataPelajaran () {
      let data = []
      await db.collection('matapelajaran')
				.get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            data.push(doc.data())
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      this.mataPelajaranList = await data.map(item => {
        return {
          value: item.kodeMataPelajaran,
          text: item.namaMataPelajaran 
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.mata-pelajaran {
  margin: 1rem;
  padding: 20px;
  border: .5px rgb(204, 204, 204) solid;
  width: 100vw;
  background-color: rgb(247, 247, 247);
  min-height: 800px;
  .heading {
    width: 100%;
  }
}
</style>
