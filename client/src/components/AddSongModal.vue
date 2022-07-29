<template>
   <v-card dark>
        <v-card-title>
          <h2>Add a Song</h2>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Title of Song"
                  required
                  :rules="[required]"
                  v-model="song.title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Artist"
                  required
                  :rules="[required]"
                  v-model="song.artist"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Album"
                  required
                  :rules="[required]"
                  v-model="song.album"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Link"
                  required
                  :rules="[required]"
                  v-model="song.link"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeModal"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="createSong"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import SongsService from '../services/SongsService'
import vuetifyToast from 'vuetify-toast'

export default {
  data: () => ({
    required: (value) => !!value || 'Required.',
    song: {
      title: null,
      artist: null,
      album: null,
      link: null
    },
    dialog: false,
    error: null,
    defaultItem: {
      title: null,
      artist: null,
      album: null,
      link: null
    }
  }),
  methods: {
    async createSong () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])

      if (!areAllFieldsFilledIn) {
        vuetifyToast.success('Please fill in all the required fields')
        return
      }

      try {
        await SongsService.addSong(this.song)
        vuetifyToast.success('Song added successfully.')
        this.$emit('refetchData', true)
        this.resetFields()
      } catch (error) {
        console.log(error)
      }
    },
    closeModal () {
      console.log(this.song)
      this.resetFields()
      console.log(this.song)
      this.$emit('close')
    },
    resetFields () {
      this.$nextTick(() => {
        this.song = Object.assign({}, this.defaultItem)
      })
    }
  },
  components: {
    vuetifyToast
  }
}
</script>
