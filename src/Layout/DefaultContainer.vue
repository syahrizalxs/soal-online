<template>
  <div class="default-container">
    <nav>
      <DefaultHeader />
    </nav>
    <div class="wrapper h-100">
      <div class="sidebar">
        <DefaultSidebar />
      </div>
      <!-- <div class="content" style="background-color: blud;">asd</div> -->
    </div>
  </div>
</template>

<script>
import DefaultHeader from './DefaultHeader'
import DefaultSidebar from './DefaultMainContent'
export default {
  name: 'default-container',
  components: {
    DefaultHeader,
    DefaultSidebar
  }
}
</script>
<style lang="scss" scoped>
.default-container {
  height: 100%;
}
.wrapper {
  display: flex;
  height: 100%;
}
.sidebar {
  width: 15%;
  height: 100%;
}
</style>
