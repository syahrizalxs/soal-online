<template>
  <div class="mata-pelajaran">
    <div class="heading">
      <h3 class="text-center">Mata Pelajaran Saya</h3>
    </div>
    <div class="content mt-2">
      <b-row>
        <b-col cols="3" v-for="(item, index) in classList" :key="index">
          <Card :items="item" class="mt-3" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card'
export default {
  components: {
    Card
  },
  data () {
    return {
      classList: [
        { name: 'Matematika', teacher: 'Bangbang S.kom', materi: 20, soal: 6 },
        { name: 'Bahasa Inggris', teacher: 'Desi S.kom', materi: 18, soal: 5 },
        { name: 'Bahasa Indonesia', teacher: 'John S.kom', materi: 23, soal: 12 },
        { name: 'PKN', teacher: 'Joe S.kom', materi: 13, soal: 7 },
        { name: 'Agama Islam', teacher: 'Mira S.ag', materi: 13, soal: 7 },
        { name: 'Penjaskes', teacher: 'Taslim S.b', materi: 13, soal: 7 }
      ]
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
</style>
