<template v-slot:activator="{ on, attrs }">
<div class="card-section">
<v-row class="d-flex justify-center cards-banner">
  <v-card
    color="#2b2b2b"
    dark
    class="cards"
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
        rounded
        size="80"
        color="#383838"
      >
      <v-col>
           <div class="card-sum-title">
             Total songs
           </div>
        <h1 class="text-title">{{this.songs.length}}</h1>
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
    dark
    color="#2b2b2b"
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
    dark
    color="#2b2b2b"
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
        rounded
        size="80"
        color="#383838"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions class="d-flex justify-center">
      <v-btn
        tile
        text
        block
      >
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</v-row>
<SongsTable
:is-refetch="isRefetch"
/>
<v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <AddSong
       @refetchData="refetchData"
       @close="dialog = false"
      />
    </v-dialog>
</v-row>

</div>
</template>

<script>
import SongsService from '../services/SongsService'
import AddSong from './AddSongModal.vue'
import SongsTable from './SongsTable.vue'
export default {
  data: () => ({
    songs: [],
    dialog: false,
    isRefetch: false
  }),
  components: {
    AddSong,
    SongsTable
  },
  async created () {
    await this.fetchSongs()
  },
  async mounted () {
    await this.fetchSongs()
  },
  methods: {
    async fetchSongs () {
      const res = await SongsService.getAllSongs()
      this.songs = res.data
    },
    async refetchData (val) {
      if (val) {
        this.dialog = false
        this.isRefetch = true
        await this.fetchSongs()
      }
    }

  }
}
</script>

<style>
.card-section{
  margin-top: 30px;
}

.cards-banner{
  gap: 15px;
}

.card-sum-title {
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: bolder;
  font-size: 8px;
}

h1 {
  color: #a274f3;
  outline-width: 1rem;
}

.cards{
  color: #fafafa;
}
</style>
