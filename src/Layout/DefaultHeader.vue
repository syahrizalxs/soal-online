<template>
  <div class="default-header">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="__custom-navbar">
      <b-navbar-brand href="#">E-Learning</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown text="User">
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'default-header'
}
</script>

<style lang="scss">
@import "../assets/styles/header.scss"
</style>
