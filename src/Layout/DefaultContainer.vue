<template>
  <div class="default-container">
    <DefaultHeader />
  </div>
</template>

<script>
import DefaultHeader from './DefaultHeader'
export default {
  name: 'default-container',
  components: {
    DefaultHeader
  }
}
</script>

<style>
h1 {
  color: red;
}
</style>
