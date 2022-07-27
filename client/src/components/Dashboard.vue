<template>
  <v-app>
    <v-container fluid dark ma-0 pa-0>
      <Nav>
        <div slot="body" class="nav-body">
          <Cards />
        <SongsTable/>
      </div>
    </Nav>
  </v-container>
  </v-app>
</template>
<script>
import SongsTable from './SongsTable.vue'
import Cards from './Cards.vue'
import Nav from './Nav.vue'
export default {
  data () {
    return {
      drawer: false,
      dialog: false
    }
  },
  methods: {
  },
  components: {
    Nav,
    Cards,
    SongsTable
  }
}
</script>

<style scoped>
.nav-body{
  width: 100%;
}
</style>
