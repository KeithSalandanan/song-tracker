<template v-slot:activator="{ on, attrs }">
<div class="card-section">
<v-row class="d-flex justify-center">
  <v-card
    class=""
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          <h2>Add a Song</h2>
        </div>
        <v-list-item-subtitle>Add a song or artist to your list</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
      <v-col>
        <v-list-item-title class="mb-1">
            No.of <br/>Songs
        </v-list-item-title>
        <h1>{{this.songs.length}}</h1>
      </v-col>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions class="d-flex justify-content-end">
      <v-btn
        outlined
        rounded
        text
        v-bind="attrs"
        v-on="on"
        @click="dialog = true"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card
    class=""
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Total Number of Songs
        </div>
        <v-list-item-title class="text-h5 mb-1">
          Artist
        </v-list-item-title>
        <v-list-item-subtitle>Song description</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>
  </v-card>
  <v-card
    class=""
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Song Title #
        </div>
        <v-list-item-title class="text-h5 mb-1">
          Artist
        </v-list-item-title>
        <v-list-item-subtitle>Song description</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        Button
      </v-btn>
    </v-card-actions>
  </v-card>
</v-row>
<v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <AddSong
       @close="dialog = false"
      />
    </v-dialog>
</v-row>

</div>
</template>

<script>
import SongsService from '../services/SongsService'
import AddSong from './AddSongModal.vue'
export default {
  data: () => ({
    songs: [],
    dialog: false
  }),
  components: {
    AddSong
  },
  async mounted () {
    const res = await SongsService.getAllSongs()
    this.songs = res.data
  }
}
</script>

<style>
.card-section{
  margin-top: 30px;
}
</style>
