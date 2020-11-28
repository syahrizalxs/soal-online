<template>
	<div class="mata-pelajaran">
		<div class="row">
			<div class="col-4">
				<h4>Edit Materi</h4>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-12">
        <b-form>
					<b-form-group label="Judul Materi">
						<b-form-input
							id="input-3"
							v-model="form.judulMateri"
							required
							placeholder="Judul Materi"
						></b-form-input>
					</b-form-group>

					<b-form-group
						id="input-group-1"
						label="Unggah Video"
						label-for="input-1"
					>
            <b-form-file
              style="z-index: 0;"
              class="mt-2 mb-2"
              id="video"
              accept="video/mp4,video/x-m4v,video/*"
              @change="onInputVideo($event)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <a :href="form.videoUrl" target="_blank" rel="noopener noreferrer">Lihat Video Materi</a>
					</b-form-group>

					<b-form-group
						label="Unggah File Pendukung"
						description="pdf/word/excel/powerpoint"
					>
            <b-form-file
              style="z-index: 0;"
              class="mt-2 mb-2"
              id="file"
              accept="application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.openxmlformats-officedocument.presentationml.presentation"
              @change="onInputFile($event)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <a :href="form.filePendukung" target="_blank" rel="noopener noreferrer">Lihat File Pendukung</a>
					</b-form-group>

					<b-form-group id="input-group-2" label="Kelas:" label-for="input-2">
						<b-form-input
							id="input-2"
							v-model="form.kelas"
							disabled
							required
							placeholder="Kelas"
						></b-form-input>
					</b-form-group>

					<b-form-group
						id="input-group-5"
						label="Mengajar Mata Pelajaran"
						label-for="input-5"
					>
						<select v-model="selectedMataPelajaran" @change="changeMataPelajaran" class="form-control">
							<option disabled selected>Pilih Mata Pelajaran</option>
							<option v-for="(item, index) in optionsMataPelajaran" :key="index" :value="item">{{item.namaMataPelajaran}}</option>
						</select>
					</b-form-group>

					<b-form-group id="input-group-4" label="Pertemuan Ke:" label-for="input-4" description="Isi dengan angka. Misal Pertemuan ke 1 harap isi dengan angka 1">
						<b-form-input
							id="input-4"
							v-model="form.pertemuanKe"
							required
							type="number"
							placeholder="Pertemuan Ke"
						></b-form-input>
					</b-form-group>
				</b-form>
			</div>
			<div class="col-12" align="right">
				<b-button variant="outline-danger" class="mr-3">Batal</b-button>
				<b-button variant="success" @click="save">Simpan</b-button>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from '../../../config/firebase'
import Swal from 'sweetalert2'

const db = firebase.firestore()
export default {
  name: 'Master-mata-pelajaran',
  data () {
    return {
      form: {
        namaMataPelajaran: '',
        kodeMataPelajaran: '',
        kelas: ''
      },
      modalShow: false,
      mataPelajaranList: [],
      userInfo: {},
      optionsMataPelajaran: [],
      selectedMataPelajaran: ''
    }
  },
  created () {
    this.getInfoGuru()
    this.getListMataPelajaran()
    this.getData()
  },
  methods: {
    async getData () {
      await db.collection('materi').doc(this.$route.params.id).get()
        .then(doc => {
          if (doc.exists) {
            this.form = doc.data()
          }
        })
      this.selectedMataPelajaran = {
        namaMataPelajaran: this.form.namaMataPelajaran,
        kodeMataPelajaran: this.form.kodeMataPelajaran
      }
      document.getElementById('video').placeholder = this.form.videoUrl
    },
    changeMataPelajaran () {
      this.form.kodeMataPelajaran = this.selectedMataPelajaran.kodeMataPelajaran
      this.form.namaMataPelajaran = this.selectedMataPelajaran.namaMataPelajaran
    },
    async getListMataPelajaran () {
      await db.collection('matapelajaran')
        .get()
        .then(res => {
          // res.forEach(item => this.optionsKelas.push(item.data()))
          res.forEach(item => this.optionsMataPelajaran.push(item.data()))
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getInfoGuru () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      await db.collection('users')
        .doc(userInfo.username)
        .get()
        .then(res => {
          this.userInfo = res.data()
          this.form.namaMataPelajaran = this.userInfo.namaMataPelajaran
          this.form.kodeMataPelajaran = this.userInfo.kodeMataPelajaran
          this.form.nip = this.userInfo.nip
          this.form.fullname = this.userInfo.fullname
          this.form.kelas = this.userInfo.kelas
        })
    },
    async onInputVideo (evt) {
      this.$parent.isLoading = true
      const self = this
      const file = document.getElementById('video').files[0]
      const ref = `video/${file.name}`
      const storageRef = firebase.storage().ref(ref)
      console.log(file)
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
    async onInputFile (evt) {
      this.$parent.isLoading = true
      const self = this
      const file = document.getElementById('file').files[0]
      const ref = `video/${file.name}`
      const storageRef = firebase.storage().ref(ref)
      console.log(file)
      // put request upload file to firebase storage
      await storageRef.put(file).then(async function (snapshot) {
        const resUrl = await firebase.storage().ref(ref).getDownloadURL()
        console.log({ resUrl })
        if (resUrl) {
          self.form.filePendukung = resUrl
        }
      })
        .catch(e => {
          console.log(e)
          Swal.fire('Error', 'Terjadi Kesalahan saat upload foto!', 'error')
        })
      this.$parent.isLoading = false
    },
    async save () {
      const self = this
      db.collection('materi')
        .add(self.form)
        .then(function () {
          Swal.fire('Succesfully', 'Berhasil!', 'success')
          self.$router.go(-1)
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
