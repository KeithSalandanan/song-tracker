<template>
  <v-card dark>
    <h1>Login</h1>
    <v-form>
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
          <v-btn block @click="login">Login</v-btn>
        </v-row>
      </v-container>
    </v-form>
    <div v-html="error" class="error"/><br>
    <v-container>
      <p>Doesn't have an account? <router-link to="register" >Sign Up</router-link> here</p>
    </v-container>
    <div v-if="isUserLoggedIn">
      <p>Already Logged In</p>
    </div>
  </v-card>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import $store from '../store/store'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      isUserLoggedIn: false,
      show1: true
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        $store.dispatch('setToken', response.data.token)
        $store.dispatch('setUser', response.data.user)
        this.isUserLoggedIn = $store.state.isUserLoggedIn
        this.$router.push({name: 'dashboard'})
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
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
