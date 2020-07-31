<template>
  <router-view/>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './assets/styles/_base.scss';
@import './assets/styles/_colors.scss';
@import './assets/styles/header.scss';
.pointer {
  cursor: pointer;
}

* {
  letter-spacing: 1px;
}
</style>
