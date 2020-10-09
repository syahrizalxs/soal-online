<template>
	<div class="mata-pelajaran">
		<div class="row">
			<div class="col-4">
				<h4>Materi Saya</h4>
			</div>
			<div class="col-8" align="right">
				<b-button variant="outline-info" @click="$router.push('/guru/kelas-saya/add')">+ Tambah Materi</b-button>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-12">
			</div>
		</div>
		<div class="row">
			<div class="col-12 mb-2" v-for="(item, index) in mataPelajaranList" :key="index">
				<b-card :title=" 'Pertemuan - ' + item.pertemuanKe" :sub-title="item.namaMataPelajaran">
					<div class="row">
						<div class="col-6" align="left">
							<b-card-text>Nama Materi: {{item.judulMateri}}</b-card-text>
						</div>
						<div class="col-6" align="right">
							<b-button variant="info">Edit</b-button>
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
			userInfo: {}
    }
  },
  created () {
		this.getData()
		// this.$store.commit('changeName', 'Ariz')
		// console.log(this.$store.getters.name)
  },
  methods: {
    async onInputVideo (evt) {
			this.$parent.isLoading = true
      const self = this
      const file = document.getElementById('video').files[0]
      const ref = `video/${file.name}`
      const storageRef = firebase.storage().ref(ref)
      // put request upload file to firebase storage
      await storageRef.put(file).then(async function (snapshot) {
        const resUrl = await firebase.storage().ref(ref).getDownloadURL()
        console.log({ resUrl })
        if (resUrl) {
          self.form.videoUrl = resUrl
        }
      })
        .catch(e => {
          console.log(e)
          Swal.fire('Error', 'Terjadi Kesalahan saat upload foto!', 'error')
				})
			this.$parent.isLoading = false
    },
    async getData () {
			const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      await db.collection('users')
        .doc(userInfo.username)
        .get()
        .then(res => {
          this.userInfo = res.data()
				})
      this.$parent.isLoading = true
      const data = []
			await db.collection('materi')
				.orderBy('pertemuanKe', 'asc')
				.where('nip', '==', this.userInfo.nip)
				.get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            data.push(doc.data())
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      this.mataPelajaranList = data
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
