<template>
  <div class="materi">
    <div class="row">
      <div class="col-4">
        <div class="row">
          <div class="col">
            <h5>Pertemuan - {{materi.pertemuanKe}}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>Materi: {{materi.judulMateri}}</p>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-10">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" :src="materi.videoUrl" allowfullscreen></iframe>
        </div>
      </div>
      <div class="col-2">
        <div class="card p-2">
          <label>File Pendukung</label>
          <b-button variant="outline-info" style="font-size: 12px;" :href="materi.filePendukung">Download Materi</b-button>
          <hr>
          <label>Unduh Video</label>
          <b-button variant="outline-info" style="font-size: 12px;" @click="download(materi.videoUrl)" >Download</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../config/firebase'

const db = firebase.firestore()
export default {
  data () {
    return {
      userInfo: {},
      materi: {}
    }
  },
  created () {
    this.getMateri()
  },
  methods: {
    download (val) {
      window.location.href = val
    },
    async getMateri () {
      this.$parent.isLoading = true
      await db.collection('materi')
        .doc(this.$route.params.id)
        .get()
        .then(res => {
          this.materi = res.data()
        })
      this.$parent.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.materi {
  margin: .7rem;
  padding: 20px;
  border: .5px rgb(204, 204, 204) solid;
  width: 100vw;
  background-color: rgb(247, 247, 247);
  min-height: 800px;
  .heading {
    width: 100%;
  }
}
</style>
