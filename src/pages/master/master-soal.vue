<template>
  <div class="mata-pelajaran">
    <div class="row">
      <div class="col-4">
        <h4>Master Soal</h4>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-12">
        <div style="overflow-x: auto;">
          <table class="table">
            <tr>
              <th>No</th>
              <th style="max-width: 150px;">Kode Mata Pelajaran</th>
              <th>Nama Mata Pelajaran</th>
              <th>Tipe Soal</th>
              <th style="min-width: 150px;">Waktu Mulai</th>
              <th style="min-width: 150px;">Waktu Selesai</th>
              <th>Aksi</th>
            </tr>
            <tr v-for="(item, index) in mataPelajaranList" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.kodeMataPelajaran }}</td>
              <td>{{ item.namaMataPelajaran }}</td>
              <td>{{ item.tipeSoal.toUpperCase() }}</td>
              <td>
                <span v-if="item.waktuMulai">
                  {{ item.waktuMulai | convertDay }}
                </span>
                <span v-else>
                  Waktu Belum di Atur
                </span>
              </td>
              <td>
                <span v-if="item.waktuSelesai">
                  {{ item.waktuSelesai | convertDay }}
                </span>
                <span v-else>
                  Waktu Belum di Atur
                </span>
              </td>
              <td><b-button @click="openModalMulai(item)" variant="primary" size="sm"><b-icon icon="pencil"></b-icon></b-button></td>
            </tr>
          </table>
        </div>
        <b-modal ref="modal-1" id="modal-1" size="sm" no-close-on-esc no-close-on-backdrop ok-title="Simpan" cancel-title="Batal" @ok="onUpdate" title="Tambah Soal">
        <div class="row">
          <div class="col-12 text-center">
            <b-form>
              <b-form-group label="Atur Waktu Mulai">
                <input type="datetime-local" v-model="waktuMulai">
              </b-form-group>
              <b-form-group label="Atur Waktu Selesai">
                <input type="datetime-local" v-model="waktuSelesai">
              </b-form-group>
            </b-form>
          </div>
        </div>
      </b-modal>
      </div>
    </div>
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
      mataPelajaranList: [],
      isEdit: false,
      id: '',
      waktuMulai: '',
      waktuSelesai: ''
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
    openModalMulai (item) {
      this.id = item.id
      this.waktuMulai = item.waktuMulai
      this.waktuSelesai = item.waktuSelesai
      this.$refs['modal-1'].show()
    },
    onUpdate (bvModalEvent) {
      bvModalEvent.preventDefault()
      db.collection('master-soal').doc(this.id).update({
        waktuMulai: this.waktuMulai,
        waktuSelesai: this.waktuSelesai
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
      this.$nextTick(() => {
        this.$bvModal.hide('modal-1')
        this.getData()
      })
    },
    async getData () {
      this.$parent.isLoading = true
      const data = []
      await db
        .collection('master-soal')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let res = doc.data()
            res.id = doc.id
            data.push(res)
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
