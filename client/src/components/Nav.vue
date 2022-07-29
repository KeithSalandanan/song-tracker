<template>
  <v-container
    fluid
    pa-0 ma-0
    fill-height
    class="overflow-hidden"
    dark
  >
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-title">Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      dark
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-music-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Songs</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container fluid class="d-flex w-100">
        <slot name="body"></slot>
    </v-container>
  </v-container>
</template>

<script>
import Cards from './Cards.vue'
export default {
  data: () => ({
    drawer: false,
    group: null
  }),
  components: {
    Cards
  }
}
</script>

<style scoped>

</style>
