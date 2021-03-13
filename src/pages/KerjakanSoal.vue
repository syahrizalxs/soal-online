<template>
  <div class="kerjakan-soal overflow-hidden">
    <div class="row head-soal">
      <div class="col-12">
        <div class="heading">
          Soal {{soal.namaMataPelajaran}}
        </div>
        <div class="tipe-soal">
          {{soal.tipeSoal.toUpperCase()}}
        </div>
      </div>
    </div>
    <div class="row mb-5" v-for="(item, index) in soalFiltered" :key="index">
      <div class="col-12 my-2">
        <b-card class="flex">
          <span class="no-soal">{{ index + 1 + (( currentPage - 1 ) * 10) }}.</span>
          <div class="soal-container">
            <div>
              <span class="soal-body" v-html="item.soal"></span>
            </div>
          </div>
        </b-card>
        <div class="row">
          <div v-for="data in item.pilihan" :key="data.key" class="col-6">
            <div class="mt-2" style="cursor: pointer;">
              <b-card @click="onAnswer(data.key, index)" class="answer-box " :class="[item.userResponse === data.key ? 'active-answer' : '']">
                <b-card-text>
                  <div class="row">
                    <div style="font-weight: 500;" class="col-2">
                      {{data.key}}.
                    </div>
                    <div class="col-10" style="margin-left: -50px; min-height: 80px;">
                      {{data.value}}
                    </div>
                  </div>
                </b-card-text>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-6">
        Terjawab {{terjawab}}/{{soal.listSoal.length}}
      </div>
      <div class="col-6" align="right">
        <b-button variant="primary" @click="onSelesaiSoal">SELESAI & KIRIM</b-button> <br>
        <small class="text-danger">*Harap isi semua soal sebelum mengirim hasil pengerjaan</small>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
       <b-pagination
        class="mx-auto"
        limit="5"
        pills
        :total-rows="totalRows"
        v-model="currentPage"
        :per-page="perPage"
        align="center"
      />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import firebase from '../config/firebase'
const db = firebase.firestore()

export default {
  name: 'soal',
  data: () => {
    return {
      soal: {
        listSoal: [
          {
            userResponse: ''
          }
        ]
      },
      isReportExist: false,
      userReport: {},
      selected: '',
      currentPage: 1,
      perPage: 10,
      terjawab: 0,
      userInfo: {}
    }
  },
  async created () {
    this.getSoal()
    await this.getUserInfo()
    this.checkReportExist()
  },
  watch: {
    currentPage: {
      immediate: true,
      handler: () => {
        // this.terjawab()
      }
    }
  },
  computed: {
    totalRows () {
      return this.soal.listSoal.length
    },
    soalFiltered () {
      const items = this.soal.listSoal
      // Return just page of items needed
      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    }

  },
  methods: {
    async checkReportExist () {
      await db.collection('report')
        .doc(this.userInfo.username)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.isReportExist = true
            this.userReport = doc.data()
          }
        }).catch((error) => {
          erroe
        })
    },

    async getUserInfo () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      await db.collection('users')
        .doc(userInfo.username)
        .get()
        .then(res => {
          this.userInfo = res.data()
        })
    },
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
      this.soal.listSoal.forEach(item => item.userResponse = '')
    },
    onAnswer (value, index) {
      this.soal.listSoal[index + 1 + ((this.currentPage - 1) * this.perPage) - 1].userResponse = value
      this.terjawab = this.soal.listSoal.filter(item => item.userResponse !== '').length
      this.$forceUpdate()
    },
    onSelesaiSoal () {
      if (this.terjawab !== this.soal.listSoal.length) {
        return Swal.fire('Perhatian', 'Soal harus terjawab semua', 'error')
      }
      const correctAnswer = this.soal.listSoal.filter(item => item.kunciJawaban === item.userResponse).length
      const nilai = correctAnswer / this.soal.listSoal.length * (1 * 100)

      const params = Object.assign({
        nilai,
        jawabanBenar: correctAnswer,
        tanggalPengerjaan: new Date(),
        jumlahSoal: this.soal.listSoal.length,
        kodeMataPelajaran: this.soal.kodeMataPelajaran,
        namaMataPelajaran: this.soal.namaMataPelajaran
      })

      const paramForExist = this.userReport.listReport

      if (this.isReportExist) {
        paramForExist.push(params)
      }

      const self = this
      db.collection('report')
        .doc(this.userInfo.username)
        .set({
          username: this.userInfo.username,
          nama: this.userInfo.fullname,
          nis: this.userInfo.nis,
          kelas: this.userInfo.kelas,
          listReport: this.isReportExist ? paramForExist : [params]
        }, { merge: true })
        .then(function () {
          Swal.fire('Succesfully', 'Berhasil!', 'success')
          self.$router.go(-1)
          // self.modalShow = false
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.answer-box {
  width: 100%;
   &:hover {
     background-color: #00b4d8;
     transition: ease-in-out .3s;
     color: white;
   }
}

.active-answer {
  background-color: #0096c7;
  color: white;
}

.kerjakan-soal {
  margin: 1rem;
  padding: 1rem;
  border: .5px rgb(204, 204, 204) solid;
  width: 100vw;
  background-color: rgb(247, 247, 247);
  .heading {
    text-align: center;
    width: 100%;
    font-size: 24px;
  }
  .tipe-soal {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
