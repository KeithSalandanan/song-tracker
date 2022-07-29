<template>
  <v-card dark>
    <h1>Sign Up</h1>
    <v-form light>
      <v-container>
        <v-row>
            <v-text-field
              v-model="email"
              label="E-mail"
            ></v-text-field>
        </v-row>
        <v-row>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
            ></v-text-field>
        </v-row>
        <v-row>
          <v-btn block @click="register">Register</v-btn>
        </v-row>
      </v-container>
    </v-form>

  <v-container>
    <p>Already have an account? <router-link to="login" >Login</router-link> here</p>
  </v-container>
  </v-card>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import vuetifyToast from 'vuetify-toast'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      show1: true
    }
  },
  methods: {
    async register () {
      try {
        const res = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', res.data.token)
        this.$store.dispatch('setUser', res.data.user)
      } catch (error) {
        this.error = error.response.data.error
        vuetifyToast.error(this.error)
      }
    }
  }
}
</script>

<style scoped>
.error{
  color:red;
}
</style>
