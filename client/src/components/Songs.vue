<template>
  <v-app>
    <v-content>
      <v-container fluid dark ma-0 pa-0 fill-height>
        <Nav>
          <div slot="body" class="nav-body">
            <Cards/>
          </div>
        </Nav>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
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
    Cards
  }
}
</script>

<style scoped>
.nav-body{
  width: 100%;
}
</style>
