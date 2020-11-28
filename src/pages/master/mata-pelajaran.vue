<template>
  <div class="mata-pelajaran">
    <div class="row">
      <div class="col-4">
        <h4>Master Mata Pelajaran</h4>
      </div>
      <div class="col-8" align="right">
        <b-button variant="outline-info" @click="modalShow = true"
          >+ Tambah Mata Pelajaran</b-button
        >
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-12">
        <table>
          <tr>
            <th>No</th>
            <th>Kode Mata Pelajaran</th>
            <th>Nama Mata Pelajaran</th>
            <th>Aksi</th>
          </tr>
          <tr v-for="(item, index) in mataPelajaranList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.kodeMataPelajaran }}</td>
            <td>{{ item.namaMataPelajaran }}</td>
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

    <b-modal
      id="my-modal"
      v-model="modalShow"
      title="Tambah Mata Pelajaran"
      size="xl"
      hide-footer
    >
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
              :disabled="isEdit"
              required
              placeholder="Kode Mata Pelajaran"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Nama Mata Pelajaran:"
            label-for="input-2"
          >
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
        <b-button
          type="submit"
          @click="modalShow = false"
          class="mr-2"
          variant="outline-danger"
          >BATAL</b-button
        >
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
      isEdit: false,
      mataPelajaranList: []
    }
  },
  created () {
    this.getData()
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
      this.form.kodeMataPelajaran = item.kodeMataPelajaran
      this.form.namaMataPelajaran = item.namaMataPelajaran
    },
    onDelete (item) {
      let doc = item.kodeMataPelajaran
      let self = this
      Swal.fire({
        title: 'Apakah anda yakin ?',
        text: "Ini tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Hapus'
      }).then((result) => {
        if (result.isConfirmed) {
          db.collection('matapelajaran').doc(doc).delete().then(function() {
            Swal.fire(
              'Terhapus',
              'Berhasil Menghapus Data.',
              'success'
            )
            self.getData()
          }).catch(function(error) {
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
      await db
        .collection('matapelajaran')
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
      db.collection('matapelajaran')
        .doc(this.form.kodeMataPelajaran)
        .set({
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
  border: 0.5px rgb(204, 204, 204) solid;
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

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #17a3b875;
  color: #000;
}
</style>
