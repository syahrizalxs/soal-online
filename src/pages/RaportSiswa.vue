<template>
  <b-row class="row nilai-siswa w-100 mt-3 p-2">
    <b-col cols="12">
      <div class="row">
        <div class="col-12 text-right">
          <b-button variant="success" @click="generatePdf()">Cetak</b-button>
        </div>
      </div>
      <div id="report" class="row mt-3">
        <div class="col-12">
          <h3 class="mt-3 text-center" style="max-height: 80px;">Laporan Nilai Siswa</h3>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Nama Lengkap</th>
                  <th>NIS</th>
                  <th>Kelas</th>
                  <th>Mata Pelajaran</th>
                  <th>Tanggal Pengerjaan</th>
                  <th>Nilai</th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="(item, index) in userReport" :key="index">
                  <!-- <td>{{ index + 1 }}</td> -->
                  <td>{{ index === 0 ? item.namaLengkap : '' }}</td>
                  <td>{{ index === 0 ? item.nis : '' }}</td>
                  <td>{{ index === 0 ? item.kelas : '' }}</td>
                  <td>{{ userInfo.namaMataPelajaran }}</td>
                  <td>{{ item.report.tanggalPengerjaan.nanoseconds | convertNano }}</td>
                  <td>{{ item.report.nilai }}</td>
                </tr>
                <tr >
                  <th colspan="4"></th>
                  <th>Rata - Rata</th>
                  <th>{{ getRataRata() / userReport.length }}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>


import firebase from '../config/firebase'
import { convertNano } from '../common/helper/time'

const db = firebase.firestore()
export default {
  filters: {
    convertNano
  },
  data: () => {
    return {
      userReport: [],
      userInfo: {}
    }
  },
  async created () {
    await this.getUserInfo()
    this.getReport()
  },
  methods: {
    getRataRata () {
      let report = this.userReport.map(item => {
        return item.report
      })
      console.log({ report })
      return report.reduce((acc, current) => {
        return acc + current.nilai
      },0)

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

    generatePdf () {
      const title = document.title
      document.title = 'Laporan nilai ' + this.userReport[0].namaLengkap
      this.$htmlToPaper('report')
      document.title = title
    },
    async getReport () {
      let data = []
      await db
        .collection('report')
        .where('nis', '==', this.$route.params.id)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log({ doc: doc.data()})
            data.push(doc.data())
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
        await data.forEach(item => {
          item.listReport.forEach(child => {
              this.userReport.push({
                namaLengkap: item.nama,
                nis: item.nis,
                kelas: item.kelas,
                report: {
                  jawabanBenar: child.jawabanBenar,
                  nilai: child.nilai,
                  tanggalPengerjaan: child.tanggalPengerjaan
                }
              })
          })
        })
    }
  }
}
</script>

<style>

</style>