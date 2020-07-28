<template>
  <div class="default-header">
    <b-navbar toggleable="md" type="dark" variant="dark" class="__custom-navbar">
      <!-- <b-navbar-brand></b-navbar-brand> -->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="userInfo.username">
            <!-- <b-dropdown-item  class="mr-5">Profile</b-dropdown-item> -->
            <b-dropdown-item @click="onLogout" class="mr-5">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'default-header',
  data () {
    return {
      userInfo: ''
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  methods: {
    onLogout () {
      localStorage.removeItem('userInfo')
      this.$router.replace('/login')
    }
  }
}
</script>
