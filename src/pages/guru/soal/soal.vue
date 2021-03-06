<template>
	<div class="mata-pelajaran">
		<div class="row">
			<div class="col-4">
				<h4>Soal</h4>
			</div>
			<div class="col-8" align="right">
				<b-button variant="outline-info" v-if="listSoal < 2" @click="$router.push('/guru/soal/add')">+ Tambah Soal</b-button>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-12">
			</div>
		</div>
		<div class="row">
			<div class="col-12 mb-2" v-for="(item, index) in listSoal" :key="index">
				<b-card :title="item.namaMataPelajaran" :sub-title="item.tipeSoal === 'ganjil' ? 'Ganjil' : 'Genap'" sub-title-text-variant="warning">
					<div class="row">
						<div class="col-4">
							<b-card bg-variant="primary" text-variant="white">
                <h3 class="text-center">Waktu Mulai</h3>
                <b-card-text class="text-center"><b-icon icon="clock"></b-icon> {{ item.waktuMulai || 'Belum di Set' }}</b-card-text>
              </b-card>
						</div>
						<div class="col-4">
							<b-card bg-variant="success" text-variant="white">
                <h3 class="text-center">Waktu Selesai</h3>
                <b-card-text class="text-center"><b-icon icon="clock"></b-icon> {{ item.waktuSelesai || 'Belum di Set' }}</b-card-text>
              </b-card>
						</div>
						<div class="col-4">
							<b-card bg-variant="dark" text-variant="white">
                <h3 class="text-center">Jumlah Soal</h3>
                <b-card-text class="text-center"><b-icon icon="book"></b-icon> {{ item.listSoal.length }}</b-card-text>
              </b-card>
						</div>
          </div>
          <div class="row mt-3">
						<div class="col-12" align="right">
							<b-button variant="info" size="sm" @click="onEdit(item)">
                <b-icon icon="pencil"></b-icon> Edit
              </b-button>
						</div>
					</div>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from '../../../config/firebase'
import Swal from 'sweetalert2'

const db = firebase.firestore()
export default {
  name: 'kelas-saya',
  data () {
    return {
      form: {},
      modalShow: false,
      mataPelajaranList: [],
      userInfo: {},
      selectedMataPelajaran: '',
      optionsMataPelajaran: [],
      listSoal: []
    }
  },
  computed: {},
  created () {
    this.getData()
    // this.$store.commit('changeName', 'Ariz')
    // console.log(this.$store.getters.name)
  },
  methods: {
    onEdit (params) {
      this.$router.push('soal/edit/' + params.id)
    },
    onDelete (params) {
      const doc = params.id
      const self = this
      Swal.fire({
        title: 'Apakah anda yakin ?',
        text: 'Ini tidak dapat dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Hapus'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await db.collection('materi').doc(doc).delete().then(function () {
            Swal.fire(
              'Terhapus',
              'Berhasil Menghapus Data.',
              'success'
            )
            self.getData()
          }).catch(function (error) {
            Swal.fire(
              'Gagal!',
              'Terjadi Kesalahan',
              'error'
            )
          })
        }
      })
    },
    async getData () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      await db.collection('users')
        .doc(userInfo.username)
        .get()
        .then(res => {
          this.userInfo = res.data()
        })
      if (!this.userInfo.kodeMataPelajaran) {
        Swal.fire('Perhatian', 'Anda tidak dapet mengakses halaman ini sebelum anda mengisi bidang mata pelajaran anda', 'error', this.$router.push('/profile/' + this.userInfo.username))
      }
      this.$parent.isLoading = true
      const data = []
      await db.collection('master-soal')
        .where('kodeMataPelajaran', '==', this.userInfo.kodeMataPelajaran)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const result = doc.data()
            result.id = doc.id
            data.push(result)
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      this.listSoal = data
      this.$parent.isLoading = false
    },
    async save () {
      const self = this
      db.collection('matapelajaran').doc(this.form.kodeMataPelajaran).set({
        kodeMataPelajaran: this.form.kodeMataPelajaran,
        namaMataPelajaran: this.form.namaMataPelajaran
      })
        .then(function () {
          Swal.fire('Succesfully', 'Berhasil!', 'success')
          self.getData()
          self.modalShow = false
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
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
	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	td, th {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}

	tr:nth-child(even) {
		background-color: #17a3b875;
		color: #000;
	}
</style>
