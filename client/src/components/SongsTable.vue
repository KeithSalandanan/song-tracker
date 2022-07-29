<template>
<v-container dark height="418px" class="song-section">
    <div class="table-title">
        <h1>Your Songs</h1>
    </div>
    <v-data-table
      dark
      :headers="headers"
      :items="songs"
      sort-by="id"
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
                  :rules="[required]"
                  v-model="editedItem.title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Artist*"
                  required
                  :rules="[required]"
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
                  :rules="[required]"
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
                  :rules="[required]"
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
  </v-data-table>
</v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
import vuetifyToast from 'vuetify-toast'
export default {
  props: {
    isRefetch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      required: (value) => !!value || 'Required.',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Song Title',
          align: 'start',
          sortable: false,
          value: 'title'
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
        link: ''
      },
      defaultItem: {
        title: null,
        artist: null,
        album: null,
        link: null
      },
      error: null
    }
  },
  async mounted () {
    await this.fetchSongs()
  },
  watch: {
    isRefetch: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.fetchSongs()
        this.isRefetch = false
      }
    },
    dialog (val) {
      console.log(this.isRefetch)
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  methods: {
    async fetchSongs () {
      const res = await SongsService.getAllSongs()
      this.songs = res.data
      console.log(this.songs)
    },
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

    async deleteItemConfirm () {
      try {
        await SongsService.delete(this.editedItem.id)
        vuetifyToast.success(`The song ${this.editedItem.title} was deleted.`)
      } catch (error) {
        console.log(error)
        vuetifyToast.error('Unexpected error in deleting the song')
      }
      this.isRefetch = true
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
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.editedItem)
        .every(key => !!this.editedItem[key])

      if (!areAllFieldsFilledIn) {
        vuetifyToast.success('Please fill in all the required fields')
        return
      }
      if (this.editedIndex > -1) {
        Object.assign(this.songs[this.editedIndex], this.editedItem)
        console.log('editing')
        try {
          await SongsService.put(this.editedItem)
          this.$router.push({
            name: 'song',
            params: {
              songId: this.editedItem.id
            }
          })
          vuetifyToast.success('Song updated successfully.')
          this.isRefetch = true
          this.$router.push({name: 'dashboard'})
          // this.$emit('refetchData', true)
          // this.resetFields()
        } catch (error) {
          console.log(error)
        }
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
    min-height: 418px;
}
.table-title {
    font-family: 'Rubik', sans-serif;
    display: flex;
    justify-content: start;
    padding-bottom: 15px;
}
</style>
