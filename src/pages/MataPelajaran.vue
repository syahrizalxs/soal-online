<template>
  <div class="mata-pelajaran">
    <div class="heading mb-3">
      <h3 class="text-left">Mata Pelajaran Saya</h3>
    </div>
    <div class="content mt-2">
      <b-row class="mt-2" v-if="materiList.length > 0">
        <div class="col-12 mt-2" v-for="(item, index) in materiList" :key="index">
          <b-card :title=" 'Soal - ' + item.data.tipeSoal" :sub-title="item.data.namaMataPelajaran">
            <div class="row">
              <div class="col-6" align="left">
                <b-card-text>Jumlah Soal: <span style="font-weight: bold;">{{item.data.listSoal.length}}</span></b-card-text>
                <!-- <b-card-text>Jumlah Soal: {{item.data.waktuMulai | converDate }}</b-card-text> -->
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                Soal akan dibuka pada: <span style="font-weight: bold;">{{ item.data.waktuMulai | converDate }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-12" align="right">
                <!-- :disabled="timeNow < getJsDate(item.data.waktuMulai) || timeNow > getJsDate(item.data.waktuSelesai)" -->
                <b-button variant="info" @click="onDetail(item)">Kerjakan Soal</b-button>
              </div>
            </div>
				  </b-card>
        </div>
      </b-row>
      <b-row v-else>
        <b-col class="text-center m-5"> <p>Materi Belum tersedia</p> </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// import Card from '../components/Card'
import firebase from '../config/firebase'
import { converDate, duration } from '../common/helper/time'

const db = firebase.firestore()
export default {
  components: {
    // Card
  },
  filters: {
    converDate,
    duration
  },
  data () {
    return {
      timeNow: new Date(),
      selected: '',
      userInfo: {},
      mataPelajaranList: [],
      isGanjil: undefined,
      interval: null,
      materiList: [],
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
  beforeDestroy () {
    clearInterval(this.interval)
  },
  async created () {
    this.$parent.isLoading = true
    await this.getUserInfo()
    await this.getMataPelajaran()
    this.selected = this.mataPelajaranList[0].value
    this.getMataPelajaranList()
    this.$parent.isLoading = false
    this.interval = setInterval(() => {
      this.timeNow = new Date()
    }, 1000)
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

      this.isGanjil = this.userInfo.nis.substr(this.userInfo.nis.length - 1) % 2 === 1
    },
    async getMataPelajaran () {
      const data = []
      await db.collection('master-soal')
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

    getJsDate (date) {
      return new Date(date)
    },
    async getMataPelajaranList () {
      this.$parent.isLoading = true
      const data = []
      await db.collection('master-soal')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (doc.data().waktuMulai !== '' && doc.data().listSoal.length !== 0) {
              data.push({ data: doc.data(), doc: doc.id })
            }
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      if (this.isGanjil) {
        this.materiList = data.filter(item => item.data.tipeSoal === 'ganjil')
      } else {
        this.materiList = data.filter(item => item.data.tipeSoal === 'genap')
      }
      this.$parent.isLoading = false
    },
    onDetail (data) {
      this.$router.push('soal/' + data.doc)
    }
  },
  watch: {
    selected () {
      this.getMataPelajaranList()
    }
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
