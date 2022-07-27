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
  export default {
    data: () => ({
      required: (value) =>  !!value || 'Required.',
      song: {
        title: null,
        artist: null,
        album: null,
        link: null,

      },
      dialog: false,
    }),
    methods : {
      async createSong(){
        console.log(this.song)
        try {
          await SongsService.addSong(this.song)
          this.closeModal()
        } catch (error) {
          console.log(error)
        }
      },
      closeModal(){
        this.$emit('close')
      }
    }
  }
</script>