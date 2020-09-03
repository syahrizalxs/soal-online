<template>
  <b-card :title="items.name" class="custom-card" :sub-title="items.teacher">
    <b-row>
      <b-col cols="4">
        <h6>Materi: <span class="text-success">{{items.materi}}</span></h6>
      </b-col>
      <b-col cols="4">
        <h6>Soal: <span class="text-success">{{items.materi}}</span></h6>
      </b-col>
    </b-row>
    <b-button class="mt-2" variant="outline-info">Lihat Kelas</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'card',
  props: ['items']
}
</script>
<style lang="scss" scoped>

</style>
