<template>
  <div class="kerjakan-soal overflow-hidden">
    <div class="row head-soal">
      <div class="col-12">
        <div class="heading">
          Soal {{soal.namaMataPelajaran}}
        </div>
        <div class="tipe-soal">
          Ganjil
        </div>
      </div>
    </div>
    <div class="row" v-for="(item, index) in soalFilterd" :key="index">
      <div class="col-12 my-2">
        <b-card>
          <b-card-text>
            <span class="text-muted" style="font-weight: bold;">{{ currentPage }}.</span> {{item.soal}}
          </b-card-text>
          <b-form-group>
            <b-form-radio-group stacked v-model="item.userResponse" name="radio-answer">
              <b-form-radio v-for="data in item.pilihan" :key="data.key" :value="data.key">{{data.key}}. {{data.value}}</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-card>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        Terjawab {{terjawab.length}}/{{soal.listSoal.length}}
      </div>
    </div>
    <div class="row">
      <div class="col-12">
       <b-pagination
        class="mx-auto"
        pills
        :total-rows="totalRows" 
        v-model="currentPage"
        :per-page="perPage"
        align="center"
      />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../config/firebase'
const db = firebase.firestore()

export default {
  name: 'soal',
  data: () =>  {
    return {
      userResponse: [],
      soal: {
        listSoal: []
      },
      selected: '',
      currentPage: 1,
      perPage: 1
    }
  },
  created () {
    this.getSoal()
  },
  computed: {
    terjawab () {
      return this.soal.listSoal.filter(item => {
        return item.userResponse === ''
      })
    },
    totalRows () {
      return this.soal.listSoal.length
    },
    soalFilterd () {
      const items = this.soal.listSoal
      // Return just page of items needed
      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    }
    
  },
  methods: {
    async getSoal () {
      // console.log(this.$parent)
      this.$parent.isLoading = true
      await db.collection('master-soal')
        .doc(this.$route.params.id)
        .get()
        .then(res => {
          this.soal = res.data()
        })
      this.$parent.isLoading = false
      this.soal.listSoal.forEach(item => item.userResponse = '')
    }
  }
}
</script>

<style lang="scss" scoped>
.kerjakan-soal {
  margin: 1rem;
  padding: 1rem;
  border: .5px rgb(204, 204, 204) solid;
  width: 100vw;
  background-color: rgb(247, 247, 247);
  .heading {
    text-align: center;
    width: 100%;
    font-size: 24px;
  }
  .tipe-soal {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>