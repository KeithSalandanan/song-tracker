<template>
<v-container class="song-section">
    <div class="title">
        <h1>Your Songs</h1>
    </div>
    <v-data-table
      :headers="headers"
      :items="songs"
      sort-by="title"
      class="elevation-1"
    >
    <template v-slot:top>
      <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card dark>
            <v-card-title>
              <span class="text-h5">Edit Song</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                 <v-col cols="12">
                <v-text-field
                  label="Title of Song*"
                  required
                  v-model="editedItem.title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Artist*"
                  required
                  v-model="editedItem.artist"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Album*"
                  required
                  v-model="editedItem.album"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Link*"
                  required
                  v-model="editedItem.link"
                ></v-text-field>
              </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card dark>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Song Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Artist', value: 'artist' },
        { text: 'Album', value: 'album' },
        { text: 'Link', value: 'link' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      songs: [],
      editedIndex: -1,
      editedItem: {
        title: '',
        artist: '',
        album: '',
        link: '',
      },
      defaultItem: {
        title: null,
        artist: null,
        album: null,
        link: null,
      },

    }
  },
  async mounted () {
    const res = await SongsService.getAllSongs()
    this.songs = res.data
    console.log(this.songs)
  },
  watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
  methods: {
    editItem (item) {
        this.editedIndex = this.songs.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.songs.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.songs.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.songs[this.editedIndex], this.editedItem)
        } else {
          this.songs.push(this.editedItem)
        }
        this.close()
      }
  }
  
}
</script>

<style scoped>
h1{
    color: #fafafa;
}
.song-section{
    display: flex;
    flex-direction: column;
    margin-top: 30px;
}
.title {
    display: flex;
    justify-content: start;
    padding-bottom: 15px;
}
</style>
