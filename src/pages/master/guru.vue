<template>
	<div class="guru">
		<div class="row">
			<div class="col-4">
				<h4>Master Guru</h4>
			</div>
			<div class="col-8" align="right">
				<b-button variant="outline-info" @click="modalShow = true">+ Tambah Data Guru</b-button>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-12">
				<table>
					<tr>
						<th>No</th>
						<th>Username</th>
						<th>Nama Lengkap</th>
						<th>NIP</th>
						<th>Aksi</th>
					</tr>
					<tr  v-for="(item, index) in guruList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.fullname }}</td>
            <td>{{ item.nip }}</td>
						<td class="text-center">
							<b-button variant="primary" @click="onEdit(item)" class="m-1">
                <b-icon icon="pencil"></b-icon>
              </b-button>
              <b-button variant="danger" @click="onDelete(item)" class="m-1s">
                <b-icon icon="trash"></b-icon>
              </b-button>
						</td>
          </tr>
				</table>
			</div>
		</div>

		<b-modal id="my-modal" v-model="modalShow" title="Tambah Guru" size="lg" hide-footer>
			<div>
				<b-form>
					<b-form-group
						id="input-group-1"
						label="Username"
						label-for="input-1"
					>
						<b-form-input
							id="input-1"
							v-model="form.username"
							:disabled="isEdit"
							type="text"
							required
							placeholder="Username"
						></b-form-input>
					</b-form-group>
          <b-form-group
						id="input-group-2"
						label="Nama Lengkap"
						label-for="input-2"
					>
						<b-form-input
							id="input-2"
							v-model="form.fullname"
							type="text"
							required
							placeholder="Nama Lengkap"
						></b-form-input>
          </b-form-group>
          <b-form-group
						id="input-group-3"
						label="NIP"
						label-for="input-3"
					>
						<b-form-input
							id="input-2"
							v-model="form.nip"
							:disabled="isEdit"
							type="text"
							required
							placeholder="NIP"
						></b-form-input>
					</b-form-group>
          <!-- <b-form-group
						id="input-group-5"
						label="Mengajar Mata Pelajaran"
						label-for="input-5"
					>
						<select v-model="selectedMataPelajaran" @change="changeMataPelajaran" class="form-control">
							<option disabled selected>Pilih Mata Pelajaran</option>
							<option v-for="(item, index) in optionsMataPelajaran" :key="index" :value="item">{{item.namaMataPelajaran}}</option>
						</select>
					</b-form-group> -->
				</b-form>
			</div>
			<div align="right">
				<b-button type="submit" @click="modalShow = false" class="mr-2" variant="outline-danger">BATAL</b-button>
				<b-button variant="success" :disabled="form.username === '' || form.fullname === '' || form.nip === ''" @click.prevent="save">SIMPAN</b-button>
			</div>
		</b-modal>
	</div>
</template>

<script>
import firebase from '../../config/firebase'
import Swal from 'sweetalert2'

const db = firebase.firestore()
export default {
  name: 'Master-guru',
  data () {
    return {
      form: {
        username: '',
        fullname: '',
        nip: '',
        kelas: '',
        namaMataPelajaran: '',
        kodeMataPelajaran: ''
      },
      optionsMataPelajaran: [],
      modalShow: false,
      isEdit: false,
      guruList: [],
      selectedMataPelajaran: ''
    }
  },
  created () {
    this.getData()
    this.getListMataPelajaran()
  },
  watch: {
    modalShow () {
      if (!this.modalShow) {
        this.form = {}
        this.isEdit = false
      }
    }
  },
  methods: {
    onEdit (item) {
      this.modalShow = true
      this.isEdit = true
      this.form = item
    },
    onDelete (item) {
      const doc = item.username
      const self = this
      Swal.fire({
        title: 'Apakah anda yakin ?',
        text: 'Ini tidak dapat dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Hapus'
      }).then((result) => {
        if (result.isConfirmed) {
          db.collection('users').doc(doc).delete().then(function () {
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
      this.$parent.isLoading = true
      const data = []
      await db.collection('users')
        .where('role', '==', 'guru')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            data.push(doc.data())
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      this.guruList = data
      this.$parent.isLoading = false
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
    changeMataPelajaran () {
      this.form.kodeMataPelajaran = this.selectedMataPelajaran.kodeMataPelajaran
      this.form.namaMataPelajaran = this.selectedMataPelajaran.namaMataPelajaran
    },
    async save () {
      const self = this
      db.collection('users').doc(this.form.username).set({
        fullname: this.form.fullname,
        username: this.form.username,
        nip: this.form.nip,
        password: '123qwe',
        role: 'guru',
        kelas: this.form.kelas
      })
        .then(function () {
          Swal.fire('Succesfully', 'Berhasil!', 'success')
          self.getData()
          self.form = {}
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
	.guru {
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
