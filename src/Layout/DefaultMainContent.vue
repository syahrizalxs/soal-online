<template>
  <div class="wrapper">
    <nav class="sidebar bg-dark text-light">
      <ul>
        <li class="list-items pointer" v-b-toggle.collapse-1><b-icon class="h2 m-2 p-1" icon="book"></b-icon><span class="m-2 p-1">Mata Pelajaran</span></li>
          <b-collapse v-for="(item, index) in array" :key="index" id="collapse-1">
            <b-list-group>
              <b-list-group-item class="pointer bg-dark ml-2">&#8226; {{item}}</b-list-group-item>
            </b-list-group>
          </b-collapse>
          <li class="list-items pointer"><b-icon class="h2 m-2 p-1" icon="person"></b-icon><span class="m-2 p-1">Profile</span></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      array: ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Agama']
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: map-get($colors, light);
  height: 100% !important;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(240,240,240,1);
  -moz-box-shadow: 10px 10px 5px 0px rgba(240,240,240,1);
  box-shadow: 10px 10px 5px 0px rgba(240,240,240,1);
}

nav {
  width: 100%;
  ul {
  }
  li {
    list-style: none;
  }
}

.list-items {
  display: flex;
  border-bottom: .7px solid #cccccc;
  border-top: .7px solid #cccccc;
}

</style>
