<template>
	<div class="mata-pelajaran">
		<div class="row">
			<div class="col-4">
				<h4>Master Mata Pelajaran</h4>
			</div>
			<div class="col-8" align="right">
				<b-button variant="outline-info" @click="modalShow = true">+ Tambah Mata Pelajaran</b-button>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-12">
				<table>
					<tr>
						<th>No</th>
						<th>Kode Mata Pelajaran</th>
						<th>Nama Mata Pelajaran</th>
					</tr>
					<tr  v-for="(item, index) in mataPelajaranList" :key="index">
						<td>{{ index + 1 }}</td>
						<td>{{ item.kodeMataPelajaran }}</td>
						<td>{{ item.namaMataPelajaran }}</td>
					</tr>
				</table>
			</div>
		</div>

		<b-modal id="my-modal" v-model="modalShow" title="Tambah Mata Pelajaran" size="xl" hide-footer>
			<div>
				<b-form>
					<b-form-group
						id="input-group-1"
						label="Kode Mata Pelajaran:"
						label-for="input-1"
					>
						<b-form-input
							id="input-1"
							v-model="form.kodeMataPelajaran"
							type="text"
							required
							placeholder="Kode Mata Pelajaran"
						></b-form-input>
					</b-form-group>

					<b-form-group id="input-group-2" label="Nama Mata Pelajaran:" label-for="input-2">
						<b-form-input
							id="input-2"
							v-model="form.namaMataPelajaran"
							required
							placeholder="Nama Mata Pelajaran"
						></b-form-input>
					</b-form-group>
				</b-form>
			</div>
			<div align="right">
				<b-button type="submit" @click="modalShow = false" class="mr-2" variant="outline-danger">BATAL</b-button>
				<b-button variant="success" @click.prevent="save">SIMPAN</b-button>
			</div>
		</b-modal>
	</div>
</template>

<script>
import firebase from '../../config/firebase'
import Swal from 'sweetalert2'

const db = firebase.firestore()
export default {
  name: 'Master-mata-pelajaran',
  data () {
    return {
      form: {},
      modalShow: false,
      mataPelajaranList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.$parent.isLoading = true
      const data = []
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
