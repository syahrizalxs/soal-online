<template>
  <b-row class="row nilai-siswa w-100 mt-3 p-2">
    <b-col cols="12">
      <div class="row">
        <div class="col-12 text-center">
          <h3>
            Nilai Siswa
          </h3>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <table class="table">
					<tr>
						<th>No</th>
						<th>Nama Lengkap</th>
						<th>NIS</th>
						<th>Kelas</th>
            <th>Mata Pelajaran</th>
						<th>Nilai</th>
						<th>Aksi</th>
					</tr>
					<tr  v-for="(item, index) in userReport" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.namaLengkap }}</td>
            <td>{{ item.nis }}</td>
            <td>{{ item.kelas }}</td>
            <td>{{ userInfo.namaMataPelajaran }}</td>
            <td>{{ item.report.nilai }}</td>
            <td><b-button @click="$router.push({ name: 'rapor-siswa', params: { id: item.nis } })">Lihat rapor {{item.namaLengkap}}</b-button></td>
          </tr>
				</table>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../../../config/firebase'

const db = firebase.firestore()
export default {
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
    async getUserInfo () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      await db.collection('users')
        .doc(userInfo.username)
        .get()
        .then(res => {
          this.userInfo = res.data()
        })
    },
    async getReport () {
      const data = []
      await db
        .collection('report')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            data.push(doc.data())
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      await data.forEach(item => {
        item.listReport.forEach(child => {
          if (child.kodeMataPelajaran === this.userInfo.kodeMataPelajaran) {
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
          }
        })
      })
    }
  }
}
</script>

<style>

</style>
