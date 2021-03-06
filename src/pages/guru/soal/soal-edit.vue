<template>
	<div class="mata-pelajaran">
		<div class="row">
			<div class="col-4">
				<h4>Tambah Soal</h4>
			</div>
		</div>
		<hr>
    <div class="row">
      <div class="col-6">
        <b-form-group label="Mata Pelajaran">
          <b-form-input
            v-model="parentSoal.namaMataPelajaran"
            disabled
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group label="Kode Mata Pelajaran">
          <b-form-input
            v-model="parentSoal.kodeMataPelajaran"
            disabled
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group label="Tipe Soal">
          <b-form-select disabled v-model="parentSoal.tipeSoal" :options="optionsTipe">
          </b-form-select>
        </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col-12" align="right">
        <b-button variant="outline-success" @click="openModal()">Tambah Soal</b-button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h5 style="">Total Soal: {{parentSoal.listSoal.length}}</h5>
      </div>
    </div>

    <div class="row mt-3" v-for="(item, index) in parentSoal.listSoal" :key="index">
      <div class="col-12">
        <b-card class="flex">
         <span class="no-soal">{{index + 1}}.</span>
         <div class="soal-container">
          <div>
            <span class="soal-body" v-html="item.soal"></span>
          </div>
         </div>
        <b-button class="button" size="sm" variant="danger" @click="parentSoal.listSoal.splice(index,1)"><b-icon icon="trash"></b-icon></b-button>
        </b-card>
      </div>
      <div class="col-12 mt-2 mb-3">
        <b-card>
          <b-card-text>
            <div class="row">
              <div v-for="answer in item.pilihan" :key="answer.key" class="col-6">
                {{ answer.key.toUpperCase() }} . {{ answer.value }}
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-2">
                <span style="font-weight: 500">Kunci Jawaban: {{item.kunciJawaban}}</span>
              </div>
            </div>
          </b-card-text>
        </b-card>
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mt-3" v-if="parentSoal.listSoal.length > 0" align="right">
        <b-button variant="outline-danger" class="mr-2" @click="$router.go(-1)">KEMBALI</b-button>
        <b-button variant="success" @click="simpanSoal()">SIMPAN</b-button>
      </div>
    </div>

    <b-modal ref="modal-1" id="modal-1" size="xl" no-close-on-esc no-close-on-backdrop ok-title="Tambah" @ok="onAddSoal" title="Tambah Soal">
      <div class="row">
        <div class="col-12">
          <b-form>
            <b-form-group label="Soal">
              <ckeditor :editor="editor" @input="onInputCk" v-model="form.soal" :config="editorConfig"></ckeditor>
              <!-- <b-form-textarea
                id="input-3"
                v-model="form.soal"
                rows="4"
                required
                placeholder="Tulis Soal Anda disini..."
              ></b-form-textarea> -->
            </b-form-group>

            <div v-for="item in form.pilihan" :key="item.key">
              <b-form-group :label="'Pilihan ' + item.key">
              <b-form-textarea
                id="input-3"
                v-model="item.value"
                rows="2"
                required
                :placeholder="`Tulis Pilihan ${item.key} Anda disini...`"
              ></b-form-textarea>
              </b-form-group>
            </div>

            <b-form-group label="Kunci Jawaban">
              <b-form-select v-model="form.kunciJawaban" :options="options" size="sm" class="mt-3"></b-form-select>
            </b-form-group>
          </b-form>
        </div>
      </div>
    </b-modal>

	</div>
</template>

<script>
import firebase from '../../../config/firebase'
import Swal from 'sweetalert2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const db = firebase.firestore()
export default {
  name: 'soal-add',
  data () {
    return {
      parentSoal: {
        namaMataPelajaran: '',
        kodeMataPelajaran: '',
        tipeSoal: '',
        waktuMulai: '',
        waktuSelesai: '',
        listSoal: []
      },
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // The configuration of the editor.
        toolbar: ['bold', 'italic']
      },
      form: {
        soal: '',
        kunciJawaban: 'A',
        pilihan: [
          {
            value: '',
            key: 'A'
          },
          {
            value: '',
            key: 'B'
          },
          {
            value: '',
            key: 'C'
          },
          {
            value: '',
            key: 'D'
          }
        ]
      },
      optionsTipe: [
        { value: 'ganjil', text: 'Ganjil' },
        { value: 'genap', text: 'Genap' }
      ],
      modalShow: false,
      options: [
        { value: 'A', text: 'A' },
        { value: 'B', text: 'B' },
        { value: 'C', text: 'C' },
        { value: 'D', text: 'D' }
      ]
    }
  },
  created () {
    this.getUserInfo()
    this.getDetailProfile()
    this.getDetailSoal()
  },
  methods: {
    onInputCk (evt) {
      console.log(evt)
    },
    addSoal () {
      this.listSoal.push(this.form)
      this.clear()
    },
    clear () {
      this.form = {
        soal: '',
        kunciJawaban: 'A',
        pilihan: [
          {
            value: '',
            key: 'A'
          },
          {
            value: '',
            key: 'B'
          },
          {
            value: '',
            key: 'C'
          },
          {
            value: '',
            key: 'D'
          }
        ]
      }
    },

    onAddSoal (bvModalEvent) {
      bvModalEvent.preventDefault()
      this.parentSoal.listSoal.push(this.form)
      this.clear()
      this.$nextTick(() => {
        this.$bvModal.hide('modal-1')
      })
    },

    openModal () {
      this.$refs['modal-1'].show()
    },

    getUserInfo () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.isMurid = this.userInfo.role === 'murid'
      this.isGuru = this.userInfo.role === 'guru'
    },

    async getDetailSoal () {
      this.$parent.isLoading = true
      await db.collection('master-soal')
        .doc(this.$route.params.id)
        .get()
        .then(res => {
          this.parentSoal = res.data()
        })
      this.$parent.isLoading = false
    },

    async getDetailProfile () {
      this.$parent.isLoading = true
      await db.collection('users')
        .doc(this.userInfo.username)
        .get()
        .then(res => {
          this.userInfo = res.data()
        })
      this.$parent.isLoading = false
    },

    async save () {
      const self = this
      db.collection('materi')
        .add(self.parentSoal)
        .then(function () {
          Swal.fire('Succesfully', 'Berhasil!', 'success')
          self.$router.go(-1)
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },

    async simpanSoal () {
      const self = this
      db.collection('master-soal')
        .doc(this.$route.params.id)
        .update(self.parentSoal)
        .then(function (res) {
          console.log({ res })
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

<style lang="scss">
.flex {
  display: flex;
  // background-color: rgb(209, 209, 209);
  border-radius: 10px;
}
.soal-container {
  border-radius: 10px;
  padding: 1rem;
}

.no-soal {
  font-weight: 500;
  padding: 1rem;
}
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
